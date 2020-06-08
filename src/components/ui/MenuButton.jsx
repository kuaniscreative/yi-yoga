/** @jsx jsx */

import { jsx, css } from '@emotion/core';

import menuIcon from '../../static/icon-member-menu.png';

const styles = {
  btn: css`
    padding: 12px;
    position: relative;
  `,
  img: css`
    width: 100%;
    height: 100%;
    object-fit: contain;
  `,
};

function MenuButton({ onClick, customStyle }) {
  return (
    <button type="button" css={[styles.btn, customStyle]} onClick={onClick}>
      <img src={menuIcon} alt="open-menu" css={styles.img} />
    </button>
  );
}

export default MenuButton;

