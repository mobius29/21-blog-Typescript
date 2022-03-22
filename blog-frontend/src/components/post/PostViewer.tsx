import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';

const PostViewerBlock = styled(Responsive)`
  margin-top: 4px;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;

  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

interface IProps {
  post: {
    title: string;
    body: string;
    tags: string[];
    publishedDate: Date;
    user: {
      _id: string;
      username: string;
    };
  };
  error: any;
  loading: any;
}

const PostViewer = ({ post, error, loading }: IProps) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock>The Post does not exist</PostViewerBlock>;
    }

    return <PostViewerBlock>Error</PostViewerBlock>;
  }

  if (loading || !post) {
    return null;
  }

  const { title, body, user, publishedDate, tags } = post;

  return (
    <PostViewerBlock>
      <PostHead>
        <h1>{title}</h1>
        <SubInfo
          username={user.username}
          publishedDate={publishedDate}
          hasMarginTop={true}
        />
        <Tags tags={tags} />
      </PostHead>
      <PostContent dangerouslySetInnerHTML={{ __html: body }} />
    </PostViewerBlock>
  );
};

export default PostViewer;
