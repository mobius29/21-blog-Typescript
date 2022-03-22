import Pagination from '../../components/posts/Pagination';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import qs from 'qs';
import { RootState } from '../../modules';

const PaginationContainer = () => {
  const { lastPage, posts, loading } = useSelector(
    ({ posts, loading }: RootState) => ({
      lastPage: posts.lastPage,
      posts: posts.posts,
      loading: loading['posts/LIST_POSTS'],
    }),
  );
  const { username } = useParams();
  const location = useLocation();

  if (!posts || loading) return null;

  const { tag, page = '1' } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <Pagination
      tag={tag as string | undefined}
      username={username as string}
      page={parseInt(page as string, 10)}
      lastPage={lastPage}
    />
  );
};

export default PaginationContainer;
