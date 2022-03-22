import { useEffect } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';
import { RootState } from '../../modules';

const PostListContainer = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const location = useLocation();
  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }: RootState) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user,
    }),
  );

  useEffect(() => {
    const { tag, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    if (
      (tag === undefined || typeof tag === 'string') &&
      (page === undefined || typeof page === 'string')
    )
      dispatch(listPosts({ page, username, tag }));
  }, [dispatch, location.search, username]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
};

export default PostListContainer;
