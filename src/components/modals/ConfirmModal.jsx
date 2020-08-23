/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import Modal from 'react-modal';
import OutlineButton from '../ui/OutlineButton';
import theme from '../../json/theme.json';

Modal.setAppElement('#root');

const modalStyle = {
  overlay: {
    background: 'rgba(1, 1, 1, 0.1)',
    zIndex: '99',
  },
  content: {
    width: 480,
    maxWidth: '88vw',
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
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: white;
  `,
  header: css`
    flex: 0 0;
    width: 100%;
    padding: 20px 28px;
    font-size: 1.25rem;
    letter-spacing: 1px;
    color: white;
    background-color: ${theme.colors.gray6};
  `,
  content: css`
    flex: 1 0;
    width: 100%;
    padding: 32px 28px;
    position: relative;
    font-size: 1rem;
    letter-spacing: 1px;
    line-height: 1.5em;
    color: ${theme.colors.gray5};
    overflow-y: auto;
  `,
  strong: css`
    font-weight: 500;
    color: ${theme.colors.black};
  `,
  btnGroup: css`
    flex: 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    width: 100%;

    & button:nth-of-type(1) {
      margin-right: 1rem;
    }
  `,
  listItem: css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    padding: 8px;
    border-bottom: 1px solid ${theme.colors.gray1};
  `,
  checkbox: css`
    margin-right: 16px;
  `,
};

function ConfirmModal({
  isOpen,
  closeModal,
  content,
  onConfirm,
  confirmText,
  cancelText
}) {
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
        <div css={styles.header}>新增學生至課堂</div>
        <div css={styles.content}>
          {content || '是否繼續？'}
        </div>
        <div css={styles.btnGroup}>
          <OutlineButton
            text={cancelText || "取消"}
            color={theme.colors.gray5}
            onClick={closeModal}
          />
          <OutlineButton
            text={confirmText || "確認"}
            color={theme.colors.green}
            onClick={onConfirm}
          />
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
