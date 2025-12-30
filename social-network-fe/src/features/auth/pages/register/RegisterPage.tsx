import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setLoading(true);

    try {
      // TODO: call register API sau
      console.log('REGISTER DATA', form);

      // giả lập đăng ký thành công
      setTimeout(() => {
        navigate('/login');
      }, 800);
    } catch {
      setError('Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h1 className="register-title">Create Account ✨</h1>
      <p className="register-subtitle">
        Tạo tài khoản để tham gia Social Network
      </p>

      {error && <div className="register-error">{error}</div>}

      <input
        className="register-input"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />

      <input
        className="register-input"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        className="register-input"
        type="password"
        name="password"
        placeholder="Mật khẩu"
        value={form.password}
        onChange={handleChange}
      />

      <input
        className="register-input"
        type="password"
        name="confirmPassword"
        placeholder="Nhập lại mật khẩu"
        value={form.confirmPassword}
        onChange={handleChange}
      />

      <button className="register-button" disabled={loading}>
        {loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
      </button>

      <div className="register-footer">
        <span>Đã có tài khoản?</span>
        <span className="register-link" onClick={() => navigate('/login')}>
          Đăng nhập
        </span>
      </div>
    </form>
  );
}
