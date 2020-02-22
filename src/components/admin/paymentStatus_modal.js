import React from 'react';
import styled from 'styled-components';

const ModalBase = styled.div`
  display: ${(props) => (props.isActive ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(7, 7, 7, 0.1);
  z-index: 3;
`;

const ModalWrapper = styled.div`
  display: block;
  width: 92%;
  max-width: 720px;
  height: 400px;
  max-height: 92%;
  border-radius: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  box-shadow: 0 0 40px -32px;
  overflow: hidden;
`;

const ModalTitle = styled.div`
  display: block;
  width: 100%;
`;

const Modal = (props) => {
  const { modalData, setModalData, isActive, setModalIsActive } = props;
  console.log(modalData);
  const closeModal = (e) => {
    setModalIsActive(false);
  };

  return (
    <ModalBase isActive={isActive} onClick={closeModal}>
      <ModalWrapper>
        <h1></h1>
        <p></p>
      </ModalWrapper>
    </ModalBase>
  );
};

export default Modal;
