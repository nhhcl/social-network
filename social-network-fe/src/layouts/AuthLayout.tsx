import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Outlet />
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f0f2f5'
  },
  card: {
    width: 360,
    padding: 24,
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  }
};
