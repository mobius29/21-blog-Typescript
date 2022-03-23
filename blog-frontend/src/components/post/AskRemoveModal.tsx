import AskModal from '../common/AskModal';

interface IProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const AskRemoveModal = ({ visible, onConfirm, onCancel }: IProps) => {
  return (
    <AskModal
      visible={visible}
      title="Delete Post"
      description="Do you really delete this post?"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default AskRemoveModal;
