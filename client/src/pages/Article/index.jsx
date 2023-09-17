import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import QueryHandler from '../../api';
import Container from '../../components/Container';
import s from './index.module.css';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Article() {
  const { newsId } = useParams();
  const [post, setPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    QueryHandler.fetchArticlesById(newsId).then((data) => {
      setPost(data);
      setIsLoading(false);
    });
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const handleUserKeyPress = useCallback((e) => {
    if (e.target.tagName === 'IMG') {
      const imageSrc = e.target.getAttribute('src');
      const params = new URLSearchParams({ src: imageSrc });
      navigate(`/image?${params}`, { state: { background: location } });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleUserKeyPress);
    return () => {
      window.removeEventListener('click', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Container size="lg">
        <div className={s.containerBaner}>
          <div
            className={s.baner}
            style={{
              backgroundImage: `url(${post.coverImages})`,
            }}
          />
          <h1 className={s.title}>{post.title}</h1>
        </div>
      </Container>
      <Container>
        <Markdown>{post.content}</Markdown>
      </Container>
    </>
  );
}

export default Article;
