import client from './client';
import qs from 'qs';

export const writePost = ({
  title,
  body,
  tags,
}: {
  title: string;
  body: string;
  tags: string[];
}) => client.post('/api/posts', { title, body, tags });

export const readPost = (id: string) => client.get(`/api/posts/${id}`);

export const listPosts = ({
  page,
  username,
  tag,
}: {
  page?: string;
  username?: string;
  tag?: string;
}) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });

  return client.get(`/api/posts?${queryString}`);
};

export const updatePost = ({
  id,
  title,
  body,
  tags,
}: {
  id: string;
  title: string;
  body: string;
  tags: string[];
}) => client.patch(`/api/posts/${id}`, { title, body, tags });

export const removePost = (id: string) => client.delete(`/api/posts/${id}`);
