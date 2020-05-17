import React, { useCallback } from 'react';
import Modal from 'react-modal';

// actions
import removeStudentFromClass from '../../actions/removeStudentFromClass';

Modal.setAppElement('#root');

const modalStyle = {
  overlay: {
    background: 'rgba(1, 1, 1, 0.1)',
    zIndex: '99',
  },
  content: {
    width: 480,
    height: 480,
    borderRadius: 4,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

function RemoveStudentModal({ isOpen, closeModal, studentId, classId }) {
  const onConfirm = useCallback(() => {
    return removeStudentFromClass(studentId, classId, false).then(() => {
      console.log('success');
    });
  }, [classId, studentId]);
  return (
    <Modal isOpen={isOpen} style={modalStyle}>
      <h3>將學生從課堂移除</h3>
      <p>在刪除之前請設定是否給予學生免費課堂</p>
      <button onClick={closeModal}>取消</button>
      <button onClick={onConfirm}>確認</button>
    </Modal>
  );
}

export default RemoveStudentModal;
