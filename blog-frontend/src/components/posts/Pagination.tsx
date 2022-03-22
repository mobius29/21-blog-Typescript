import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const buildLink = ({
  username,
  tag,
  page,
}: {
  username: string;
  tag?: string;
  page: number;
}) => {
  const query = qs.stringify({ tag, page });
  return username ? `/@${username}?${query}` : `/?${query}`;
};

interface IProps {
  page: number;
  lastPage: number;
  username: string;
  tag?: string;
}

const Pagination = ({ page, lastPage, username, tag }: IProps) => {
  return (
    <PaginationBlock>
      <Button
        disabled={page === 1}
        to={
          page === 1 ? undefined : buildLink({ username, tag, page: page - 1 })
        }
      >
        Prev
      </Button>
      <div>{page}</div>
      <Button
        disabled={page === lastPage}
        to={
          page === lastPage
            ? undefined
            : buildLink({ username, tag, page: page + 1 })
        }
      >
        Next
      </Button>
    </PaginationBlock>
  );
};

export default Pagination;
