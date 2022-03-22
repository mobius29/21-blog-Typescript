import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;

  &:first-child {
    padding-top: 0;
  }

  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;

    &:hover {
      color: ${palette.gray[6]};
    }
  }

  p {
    margin-top: 2rem;
  }
`;

interface IPost {
  _id: string;
  title: string;
  body: string;
  tags: string[];
  publishedDate: Date;
  user: {
    username: string;
    _id: string;
  };
}

interface IItem {
  post: IPost;
}

interface IProps {
  posts: IPost[] | null;
  loading: any;
  error: any;
  showWriteButton: {
    username: string;
    _id: string;
  } | null;
}

const PostItem = ({ post }: IItem) => {
  const { _id, title, body, tags, publishedDate, user } = post;
  return (
    <PostItemBlock>
      <Link to={`/@${user.username}/${_id}`}>{title}</Link>
      <SubInfo
        username={user.username}
        publishedDate={new Date(publishedDate)}
        hasMarginTop={false}
      />
      <Tags tags={tags} />
      <p>{body}</p>
    </PostItemBlock>
  );
};

const PostList = ({ posts, loading, error, showWriteButton }: IProps) => {
  if (error) {
    return <PostListBlock>Error</PostListBlock>;
  }
  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        {showWriteButton && (
          <Button cyan to="/write">
            Write
          </Button>
        )}
      </WritePostButtonWrapper>
      {!loading && posts && (
        <div>
          {posts.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
    </PostListBlock>
  );
};

export default PostList;
