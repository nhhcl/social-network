interface Props {
  post: {
    id: number;
    author: string;
    content: string;
  };
}

export default function PostCard({ post }: Props) {
  return (
    <div style={styles.card}>
      <h4>{post.author}</h4>
      <p>{post.content}</p>
      <div style={styles.actions}>
        <button>👍 Like</button>
        <button>💬 Comment</button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: 16,
    background: '#fff',
    borderRadius: 8,
    marginBottom: 16
  },
  actions: {
    display: 'flex',
    gap: 12
  }
};
