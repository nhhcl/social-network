import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';

export default function MainLayout() {
  const logout = useAuthStore((s) => s.logout);

  return (
    <div style={styles.layout}>
      <header style={styles.header}>
        <h3>Social Network</h3>
        <button onClick={logout}>Logout</button>
      </header>

      <div style={styles.body}>
        <aside style={styles.sidebar}>Sidebar</aside>
        <main style={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const styles = {
  layout: { minHeight: '100vh', background: '#f0f2f5' },
  header: {
    height: 56,
    background: '#1877f2',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px'
  },
  body: { display: 'flex' },
  sidebar: {
    width: 220,
    padding: 16,
    background: '#fff'
  },
  main: {
    flex: 1,
    padding: 24
  }
};
