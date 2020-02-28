import React from 'react';
import styled from 'styled-components';

// components
// import ModalItem from './paymentStatus_modalItem';
import ModalItem from './registerClasses_modalItem';

// functions
import keyGen from '../../functions/keyGen';

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
  padding-bottom: 0.75rem;
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
    letter-spacing: normal;
    color: white;
  }
`;

const ModalList = styled(ModalContent)`
  display: block;
  position: relative;
  width: 100%;
  max-height: 66vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Modal = (props) => {
  const { modalData, isActive, setModalIsActive } = props;
  const modalName = modalData.length && modalData[0].name;

  const closeModal = (e) => {
    setModalIsActive(false);
  };

  const closeModalOnMask = (e) => {
    if (e.target.getAttribute('name') === 'modalMask') {
      setModalIsActive(false);
    }
  };

  return (
    <ModalBase isActive={isActive} onClick={closeModalOnMask} name="modalMask">
      <ModalWrapper>
        <ModalTitle>
          <h1>{modalName}</h1>
        </ModalTitle>
        <ModalList>
          <ul>
            {modalData.map((classInfo) => {
              return <ModalItem classInfo={classInfo} key={keyGen()} />;
            })}
          </ul>
        </ModalList>
        <div className="container-fluid px-0">
          <div className="row justify-content-center align-items-center py-2">
            <button className="outlineButton" onClick={closeModal}>
              確認
            </button>
          </div>
        </div>
      </ModalWrapper>
    </ModalBase>
  );
};

export default Modal;
