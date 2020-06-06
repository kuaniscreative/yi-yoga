/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import theme from '../../json/theme.json';

const styles = {
  btn: css`
    padding: 0.75em 2em;
    border: 1px solid ${theme.colors.gray6};
    border-radius: 1.5em;
    font-size: 0.9rem;
    line-height: 1;

    @media(min-width: 768px) {
        padding: 0.75em 2.5em;
    }
  `
}

function OutlineButton({
  text,
  children,
  onClick,
  color,
}) {
  return (
    <button 
      type="button" 
      css={[styles.btn, 
      color ? {color: color, borderColor: color} : null]} 
      onClick={onClick}>
      {text ?? children}
    </button>
  )
}

export default OutlineButton
