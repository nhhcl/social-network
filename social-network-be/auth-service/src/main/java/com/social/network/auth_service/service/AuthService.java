package com.social.network.auth_service.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.social.network.auth_service.dto.request.CreateUserRequest;
import com.social.network.auth_service.dto.request.RegisterRequest;
import com.social.network.auth_service.entity.*;
import com.social.network.auth_service.exception.RefreshTokenExpiredException;
import com.social.network.auth_service.repository.AccountRepository;
import com.social.network.auth_service.repository.AuthOutboxEventRepository;
import com.social.network.auth_service.repository.TokenRepository;
import com.social.network.auth_service.utils.JsonUtils;
import com.social.network.auth_service.utils.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionSynchronizationAdapter;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AccountRepository accountRepository;
    private final AuthOutboxEventService authOutboxEventService;
    private final JwtUtil jwtUtil;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final KafkaTemplate<String, String> kafkaTemplate;

    public String login(String username, String password) {
        AccountEntity account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, account.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        List<String> roles = account.getRoles().stream().map(RoleEntity::getName).toList();

        String accessToken = jwtUtil.generateAccessToken(username, roles);
        String refreshToken = jwtUtil.generateRefreshToken(username);

        tokenService.createToken(account, refreshToken, "REFRESH", 60 * 24);

        return accessToken;
    }

    public String refreshAccessToken(String refreshToken){
        try{
            return tokenService.refreshAccessToken(refreshToken);
        }catch (RefreshTokenExpiredException e){
            throw e;
        }

    }

    @Transactional
    public AccountEntity register(RegisterRequest request) {
        if (accountRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already taken");
        }
        if (accountRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already taken");
        }
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        AccountEntity newAccount = accountRepository.save(AccountEntity.builder()
                .username(request.getUsername())
                .passwordHash(encodedPassword)
                .email(request.getEmail())
                .build());
        CreateUserRequest createUserRequest = CreateUserRequest.builder()
                .accountId(newAccount.getId())
                .fullName(request.getFullName())
                .gender(request.getGender())
                .dateOfBirth(request.getDateOfBirth())
                .address(request.getAddress())
                .build();
        AuthOutboxEventEntity outbox = AuthOutboxEventEntity.builder()
                .eventType(EventType.CREATE_USER)
                .aggregateId(newAccount.getId().toString())
                .payload(JsonUtils.toJson(createUserRequest))
                .retryCount(0)
                .build();
        TransactionSynchronizationManager.registerSynchronization(
                new TransactionSynchronizationAdapter() {
                    @Override
                    public void afterCommit() {
                        try {
                            System.out.println("Sending outbox event: " + outbox);
                            kafkaTemplate.send(
                                    outbox.getEventType().getValue(),  // topic từ enum
                                    outbox.getAggregateId(),
                                    outbox.getPayload()
                            ).get(); // chờ gửi xong (synchronous)
                            outbox.setStatus(OutboxStatus.SENT);
                        } catch (Exception e) {
                            outbox.setStatus(OutboxStatus.SEND_FAILED);
                        } finally {
                            System.out.println("Save outbox");
                            authOutboxEventService.saveAuthOutboxEvent(outbox);
                        }
                    }
                }
        );
        return newAccount;
    }
}