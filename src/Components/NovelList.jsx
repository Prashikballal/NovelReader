import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NovelList = () => {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const response = await axios.get('http://localhost:5294/api/Novels/All');
        setNovels(response.data);
      } catch (error) {
        console.error("Error fetching novels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNovels();
  }, []);

  if (loading) return <p>Loading novels...</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
      {novels.map(novel => (
        <div key={novel.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <img
            src={`http://localhost:5294${novel.imageUrl}`}
            alt={novel.name}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            onError={e => e.target.style.display = 'none'}
          />
          <Link to={`/novel/${novel.id}`}>{novel.name}</Link>
          <p><strong>Genre:</strong> {novel.genre}</p>
          <p><strong>Rating:</strong> {novel.rating ?? 'N/A'}</p>
          <p><strong>Price:</strong> ₹{novel.price ?? 'Free'}</p>
          <p><strong>Date:</strong> {new Date(novel.dateTime).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default NovelList;
