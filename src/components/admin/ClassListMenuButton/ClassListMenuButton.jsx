/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import MenuButton from '../../ui/MenuButton';
import ClassListMenu from './ClassListMenu';
import theme from '../../../json/theme.json'

const styles = {
  container: css`
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 99;
  `,
  menuWrapper: css`
    display: flex;
    padding-right: 27px;
    position: absolute;
    top: 0;
    right: 0;
    background-color: ${theme.colors.gray0};
    box-shadow: 0 0 16px -12px;
  `,
};

function ClassListMenuButton() {
  const [menuIsShown, setMenuIsShown] = useState(false);

  return (
    <div css={styles.container}>
      {menuIsShown ? (
        <div css={styles.menuWrapper}>
          <ClassListMenu
            onClose={() => {
              setMenuIsShown(false);
            }}
          />
        </div>
      ) : null}
      <MenuButton
        customStyle={{ zIndex: 99 }}
        onClick={() => {
          setMenuIsShown(!menuIsShown);
        }}
      />
    </div>
  );
}

export default ClassListMenuButton;
