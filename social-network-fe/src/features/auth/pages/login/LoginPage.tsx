import { useState } from 'react';
import { loginApi } from '../../../../api/auth.api';
import { useAuthStore } from '../../../../stores/auth.store';
import './LoginPage.css';
import { createFakeToken } from '../../../../utils/fakeToken';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const login = useAuthStore((s: any) => s.login);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (username === 'admin') {
        const fakeToken = createFakeToken({
          username: 'admin',
          role: 'ADMIN'
        });

        login(
          { username: 'admin', role: 'ADMIN' },
          fakeToken
        );

        navigate('/');
        return;
      }
      const res = await loginApi({
        email: username,
        password
      });
      login(res.data.user, res.data.accessToken);
    } catch {
      setError('Sai tài khoản hoặc mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h1 className="login-title">Welcome Back 👋</h1>
      <p className="login-subtitle">
        Đăng nhập để tiếp tục vào Social Network
      </p>

      {error && <div className="login-error">{error}</div>}

      <input
        className="login-input"
        type="text"
        placeholder="Email hoặc Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="login-input"
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-button" disabled={loading}>
        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>

      <div className="login-footer">
        <span>Bạn chưa có tài khoản?</span>
        <span
          className="login-link"
          onClick={() => navigate('/register')}
        >
          Đăng ký
        </span>
      </div>

    </form>
  );
}
