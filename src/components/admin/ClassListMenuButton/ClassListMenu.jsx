/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import theme from '../../../json/theme.json';
import { Fragment } from 'react';
import { POP_UP, POP_UP_OVERLAY } from '../../../constants/zIndex';

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.gray0};
    position: relative;
  `,
  listItem: css`
    flex: 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 96px;
    padding: 8px 16px;
    border-bottom: 1px solid ${theme.colors.gray3};
    font-size: 0.9rem;
    letter-spacing: 1px;
    line-height: 1.5em;
    color: ${theme.colors.gray6};
    z-index: ${POP_UP};

    &:last-of-type {
      border: none;
    }
  `,
  overlay: css`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${POP_UP_OVERLAY};
  `,
};

function ClassListMenu({ onClose }) {
  return (
    <Fragment>
      <div css={styles.overlay} onClick={onClose} />
      <div css={styles.container}>
        <button css={styles.listItem}>加入學生</button>
      </div>
    </Fragment>
  );
}

export default ClassListMenu;
