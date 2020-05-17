import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

// components
import NameTag from '../ui/nameTag';
import DeleteIcon from '../ui/deleteIcon';
import RemoveStudentModal from '../modals/removeStudentModal';

// data
import theme from '../../json/theme.json';

const ListItemWrapper = styled.li`
  position: relative;
  padding: 0.75em 0;
  border-bottom: 1px solid ${theme.colors.gray1};
`;

function ListItem({ name, nickName, studentId, classId }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, [setModalIsOpen]);
  const openModal = useCallback(() => {
    setModalIsOpen(true);
  }, [setModalIsOpen]);

  return (
    <ListItemWrapper>
      <NameTag name={name} nickName={nickName} />
      <button onClick={openModal}>
        <DeleteIcon />
      </button>
      <RemoveStudentModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        studentId={studentId}
        classId={classId}
      />
    </ListItemWrapper>
  );
}

export default React.memo(ListItem);
