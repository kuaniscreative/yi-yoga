import React, { useContext } from 'react';

// components
import Setter from './newSession_setter';
import Preview from './newSession_preview';
import Success from './newSession_success';
import TitleBlock from '../ui/titleBlock';

// contexts
import { newSessionContext } from '../contexts/newSessionContext';

const NewSession = () => {
  const { step } = useContext(newSessionContext);

  return (
    <div id="newSession">
      <TitleBlock title="開放報名">
        開放新一期的課程。設定完成後同學即可開始報名。
      </TitleBlock>
      {/* {step === 'setter' ? <Setter /> : null}
      {step === 'preview' ? <Preview /> : null} */}
      {step === 'success' || true ? <Success /> : null}
    </div>
  );
};

export default NewSession;
