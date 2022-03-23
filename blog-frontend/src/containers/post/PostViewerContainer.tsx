import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import { setOriginalPost } from '../../modules/write';
import PostViewer from '../../components/post/PostViewer';
import { RootState } from '../../modules';
import PostActionButtons from '../../components/post/PostActionButtons';
import { removePost } from '../../lib/api/post';

const PostViewerContainer = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { post, error, loading, user } = useSelector(
    ({ post, loading, user }: RootState) => ({
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      user: user.user,
    }),
  );

  useEffect(() => {
    if (postId) dispatch(readPost(postId));

    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  const onEdit = () => {
    if (post) {
      dispatch(setOriginalPost(post));
      navigate('/write');
    }
  };

  const ownPost = (user && user._id) === (post && post.user._id);

  const onRemove = async () => {
    try {
      if (postId) {
        await removePost(postId);
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={
        ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />
      }
    />
  );
};

export default PostViewerContainer;
