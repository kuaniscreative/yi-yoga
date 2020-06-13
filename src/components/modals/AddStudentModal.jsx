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
import { allUserContext } from '../contexts/allUserContext';
import NameTag from '../ui/nameTag';
import addStudentsToClass from '../../actions/addStudentsToClass';
import { useState } from 'react';

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
    height: 100vh;
    max-height: 80vh;
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

const CheckMark = ({ inputAnchor, selected, checked }) => {
  return (
    <div className="checkboxContainer" css={styles.checkbox}>
      <input type="checkbox" id={inputAnchor} checked={checked} onChange={() => {}}/>
      <div className="checkmark" />
    </div>
  );
};

function StudentList({ students, selected, onClick }) {
  if (!students || !students.length) {
    return '尚無學生';
  }
  return (
    <ul>
      {students.map((student) => {
        return (
          <li
            key={student.id}
            css={styles.listItem}
            onClick={() => {
              onClick(student.id);
            }}
          >
            <CheckMark
              checked={~selected.indexOf(student.id)}
              inputAnchor={student.id}
            />
            <NameTag name={student.name} nickName={student.nickName} />
          </li>
        );
      })}
    </ul>
  );
}

function AddStudentModal({
  isOpen,
  closeModal,
  classId,
}) {
  /** Get all Students */
  const { students } = useContext(allUserContext);

  /** Select Handler */
  const [selected, setSelected] = useState([]);
  const selectHalder = useCallback(
    (id) => {
      if (~selected.indexOf(id)) {
        setSelected(
          selected.filter((selection) => {
            return selection !== id;
          })
        );
      } else {
        setSelected([...selected, id]);
      }
      
    },
    [selected]
  );

  /** Confirm Handler */
  const { setLoadingBarActive } = useContext(loadingContext);

  const onConfirm = useCallback(() => {
    setLoadingBarActive(true);

    const studentInfos = selected.map((selectedId) => {
      const student = students.find((student) => {
        return student.id === selectedId
      })

      return {
        id: student.id,
        email: student.email,
        name: student.name,
        nickName: student.nickName
      }
    })
    
    return addStudentsToClass(studentInfos, classId).then(() => {
      setLoadingBarActive(false);
      closeModal();
    });
  }, [classId, closeModal, selected, setLoadingBarActive, students]);

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
          <StudentList
            students={students}
            onClick={selectHalder}
            selected={selected}
          />
        </div>
        <div css={styles.btnGroup}>
          <OutlineButton
            text="取消"
            color={theme.colors.gray5}
            onClick={closeModal}
          />
          <OutlineButton
            text="確認"
            color={theme.colors.green}
            onClick={onConfirm}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AddStudentModal;
