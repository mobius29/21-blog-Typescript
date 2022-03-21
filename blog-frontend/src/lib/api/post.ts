import client from './client';

export const writePost = ({
  title,
  body,
  tags,
}: {
  title: string;
  body: string;
  tags: string[];
}) => {
  client.post('/api/posts', { title, body, tags });
};
