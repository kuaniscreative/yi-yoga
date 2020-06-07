/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useCallback } from 'react';
import Modal from 'react-modal';

// actions
import removeStudentFromClass from '../../actions/removeStudentFromClass';
import OutlineButton from '../ui/OutlineButton';

// data
import theme from '../../json/theme.json';
import { useContext } from 'react';
import { loadingContext } from '../contexts/loadingContext';

Modal.setAppElement('#root');

const modalStyle = {
  overlay: {
    background: 'rgba(1, 1, 1, 0.1)',
    zIndex: '99',
  },
  content: {
    width: 480,
    height: 'auto',
    padding: 0,
    borderRadius: 8,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    overflow: 'hidden',
  },
};

const styles = {
  container: css`
    border-radius: 8px;
    background-color: white;
  `,
  header: css`
    width: 100%;
    padding: 20px 28px;
    font-size: 1.25rem;
    letter-spacing: 1px;
    color: white;
    background-color: ${theme.colors.error};
  `,
  content: css`
    width: 100%;
    padding: 32px 28px;
    font-size: 1rem;
    letter-spacing: 1px;
    line-height: 1.5em;
    color: ${theme.colors.gray5};
  `,
  strong: css`
    font-weight: 500;
    color: ${theme.colors.black};
  `,
  btnGroup: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    width: 100%;

    & button:nth-of-type(1) {
      margin-right: 1rem;
    }
  `,
};

function RemoveStudentModal({
  isOpen,
  closeModal,
  studentId,
  classId,
  date,
  time,
  studentName,
}) {
  /** Remove Handler */
  const { setLoadingBarActive } = useContext(loadingContext);

  const onConfirm = useCallback(() => {
    setLoadingBarActive(true);

    return removeStudentFromClass(studentId, classId, false).then(() => {
      setLoadingBarActive(false);
      closeModal();
    });
  }, [classId, closeModal, setLoadingBarActive, studentId]);

  return (
    <Modal
      isOpen={isOpen}
      style={modalStyle}
      className="reset-modal-default-style"
      onRequestClose={closeModal}
      disableAutoFocus
      shouldCloseOnOverlayClick
    >
      <div css={styles.container}>
        <div css={styles.header}>確認是否將學生從課堂移除</div>
        <div css={styles.content}>
          是否將學生
          <span css={styles.strong}>{studentName}</span>從
          <span css={styles.strong}>{`${date} ${time}`}</span>
          的課堂移除？
        </div>
        <div css={styles.btnGroup}>
          <OutlineButton
            text="取消"
            color={theme.colors.gray5}
            onClick={closeModal}
          />
          <OutlineButton
            text="確認"
            color={theme.colors.error}
            onClick={onConfirm}
          />
        </div>
      </div>
    </Modal>
  );
}

export default RemoveStudentModal;
