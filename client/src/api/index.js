import axios from 'axios';
import config from '../config';

export default class QueryHandler {
  static token = () => localStorage.getItem('accessToken') || '';

  static getBaseHeaders = () => ({
    'x-access-token': QueryHandler.token(),
  });

  static async fetchArticles(skip = 0, limit = 3) {
    const response = await axios.get(`${config.API_ROOT}/news?skip=${skip}&limit=${limit}`, {
      headers: QueryHandler.getBaseHeaders(),
    });

    const data = await response.data;
    return data;
  }

  static async fetchLatestArticles(limit = 4) {
    const response = await axios.get(`${config.API_ROOT}/news/last-articles?limit=${limit}`, {
      headers: QueryHandler.getBaseHeaders(),
    });

    const data = await response.data;
    return data;
  }

  static async fetchArticlesById(id) {
    const response = await axios.get(`${config.API_ROOT}/news/${id}`, {
      headers: QueryHandler.getBaseHeaders(),
    });

    const data = await response.data;
    return data;
  }

  static async fetchArticlesByCategoryId(categoryId) {
    const response = await axios.get(`${config.API_ROOT}/news/category/${categoryId}`, {
      headers: QueryHandler.getBaseHeaders(),
    });

    const data = await response.data;
    return data;
  }

  static async register(email, password) {
    const response = await axios.post(
      `${config.API_ROOT}/users/register`,
      {
        email,
        password,
      },
      {
        headers: QueryHandler.getBaseHeaders(),
      },
    );

    const data = await response.data;
    return data;
  }

  static async login(email, password) {
    const response = await axios.post(
      `${config.API_ROOT}/users/login`,
      {
        email,
        password,
      },
      {
        headers: QueryHandler.getBaseHeaders(),
      },
    );

    const data = await response.data;
    return data;
  }

  static async forgotPassword(email) {
    const response = await axios.post(
      `${config.API_ROOT}/users/forgot-password`,
      { email },
      {
        headers: QueryHandler.getBaseHeaders(),
      },
    );

    const data = await response.data;
    return data;
  }

  static async restorePassword(password1, password2, token) {
    const response = await axios.post(
      `${config.API_ROOT}/users/restore-password`,
      { password1, password2, token },
      {
        headers: QueryHandler.getBaseHeaders(),
      },
    );

    const data = await response.data;
    return data;
  }

  static async fetchToken() {
    const response = await axios.get(`${config.API_ROOT}/users/token`, {
      headers: QueryHandler.getBaseHeaders(),
    });

    const data = await response.data;
    return data;
  }

  static async fetchMe() {
    const response = await axios.get(`${config.API_ROOT}/users/me`, {
      headers: QueryHandler.getBaseHeaders(),
    });

    const data = await response.data;
    return data;
  }

  static async logout() {
    const response = await axios.get(`${config.API_ROOT}/users/logout`, {
      headers: QueryHandler.getBaseHeaders(),
    });

    const data = await response.data;
    return data;
  }
}
