import Post from './models/post';

export default function createFakeData() {
  const posts = [...Array(40).keys()].map((i) => ({
    title: `Post #${i}`,
    body: 'temp',
    tags: ['fake', 'data'],
  }));

  Post.insertMany(posts);
}
