import React, { useEffect, useState } from 'react';
import Preview from '../Preview';
import s from './index.module.css';
import QueryHandler from '../../api';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const count = 3;
function ArticlesList() {
  const [cursor, setCursor] = useState(0);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const handleError = () => {};

  const onLoading = async () => {
    setIsLoading(true);
    try {
      const articlesList = await QueryHandler.fetchArticles(cursor, count);
      setArticles((prevArticles) => [...prevArticles, ...articlesList.data]);
      setCursor(articlesList.cursor + count);
      if (articlesList.cursor >= articlesList.count) {
        setShowLoadMore(false);
      }
    } catch (e) {
      handleError(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    onLoading();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ul>
        {articles.map((article) => (
          <li className={s.newsItem} key={article.id}>
            <Preview article={article} />
          </li>
        ))}
      </ul>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        showLoadMore && (
          <div className={s.customButton}>
            <Button
              variant="outlined"
              size="large"
              onClick={onLoading}
              sx={{
                width: 460,
                height: 60,
              }}
            >
              LOAD MORE NEWS
            </Button>
          </div>
        )
      )}
    </>
  );
}

export default ArticlesList;
