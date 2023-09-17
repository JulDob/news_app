import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../components/Container';
import QueryHandler from '../../api';
import ArticleList from '../../components/ArticleList';

function Category() {
  const { categoryId } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    QueryHandler.fetchArticlesByCategoryId(categoryId).then((data) => {
      setArticles(data?.data ?? []);
    });
  }, [categoryId]);

  return (
    <Container>
      <ArticleList articles={articles} />
    </Container>
  );
}

export default Category;
