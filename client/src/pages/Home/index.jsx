import React from 'react';
import Container from '../../components/Container';
import ArticleListTop from '../../components/ArticleListTop';
import news from '../../mockData/news';
import ArticlesList from '../../components/LoadMoreNews';

function Home() {
  const topArticles = news.slice(0, 4);
  return (
    <Container>
      <ArticleListTop articles={topArticles} />
      <ArticlesList />
    </Container>
  );
}

export default Home;
