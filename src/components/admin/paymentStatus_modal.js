import React from 'react';
import styled from 'styled-components';

// data
import theme from '../../json/theme.json';

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

const ModalContent = styled.div`
  padding: 1rem 2rem;
`;

const ModalTitle = styled(ModalContent)`
  display: block;
  width: 100%;
  background: ${theme.colors.gray6};

  h1 {
    font-size: 1rem;
    line-height: 2em;
    color: white;
  }
  p {
    font-size: 0.75rem;
    letter-spacing: normal;
    color: white;
  }
`;

const ModalList = styled.ul`
  display: block;
  position: relative;
  width: 100%;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const titleOutputs = {
  pending: '未付款',
  paid: '待確認',
  finished: '已完成'
};

const Modal = (props) => {
  const { modalData, setModalData, isActive, setModalIsActive } = props;
  const { session, type, payments } = modalData;

  const closeModal = (e) => {
    setModalIsActive(false);
  };

  return (
    <ModalBase isActive={isActive} onClick={closeModal}>
      <ModalWrapper>
        <ModalTitle>
          <h1>{titleOutputs[type]}</h1>
          <p>{session}</p>
        </ModalTitle>
        <ModalList></ModalList>
      </ModalWrapper>
    </ModalBase>
  );
};

export default Modal;
