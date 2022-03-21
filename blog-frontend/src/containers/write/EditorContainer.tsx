import { useEffect, useCallback } from 'react';
import Editor from '../../components/write/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/write';
import { RootState } from '../../modules';

const EditorContainer = () => {
  const dispatch = useDispatch();
  const { title, body } = useSelector(({ write }: RootState) => ({
    title: write.title,
    body: write.body,
  }));

  const onChangeField = useCallback(
    (payload: { key: string; value: string }) => dispatch(changeField(payload)),
    [dispatch],
  );

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return <Editor onChangeField={onChangeField} title={title} body={body} />;
};

export default EditorContainer;
