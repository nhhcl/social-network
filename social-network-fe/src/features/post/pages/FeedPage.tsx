import { useEffect, useState } from 'react';
import { getFeedApi } from '../../../api/post.api';
import PostCard from '../components/PostCard';

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeedApi()
      .then((res) => setPosts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading feed...</p>;

  return (
    <div style={styles.feed}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

const styles = {
  feed: {
    maxWidth: 600,
    margin: '0 auto'
  }
};
