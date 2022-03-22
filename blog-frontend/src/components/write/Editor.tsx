import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import { useRef, useEffect } from 'react';

const EditorBlock = styled(Responsive)`
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }

  .ql-editor.ql-black::before {
    left: 0px;
  }
`;

interface IProps {
  title: string;
  onChangeField: ({ key, value }: { key: string; value: string }) => void;
}

const Editor = ({ title, onChangeField }: IProps) => {
  const quillElement = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (quillElement.current) {
      quillInstance.current = new Quill(quillElement.current, {
        theme: 'bubble',
        placeholder: '',
        modules: {
          toolbar: [
            [{ header: '1' }, { header: '2' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block', 'link', 'image'],
          ],
        },
      });

      const quill = quillInstance.current;
      quill.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user') {
          onChangeField({ key: 'body', value: quill.root.innerHTML });
        }
      });
    }
  }, [onChangeField]);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  return (
    <EditorBlock>
      <TitleInput
        placeholder="Input the title"
        onChange={onChangeTitle}
        value={title}
      />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;
