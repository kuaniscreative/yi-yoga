import React, { useContext } from 'react';

// components
import Preview from './registerClasses_preview';
import Success from './registerClasses_success';
import Picker from './registerClasses_picker';
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';

// contexts
import { registerClassContext } from '../contexts/registerClassContext';
import CalendarContextProvider from '../contexts/calendarContext';

const RegisterClasses = () => {
  const { step, toNextStep } = useContext(registerClassContext);

  return (
    <div>
      <CalendarContextProvider>
        <TitleBlock title="報名課程" />
        <Block>
          {step === 'initial' ? <Picker toNextStep={toNextStep} /> : null}
          {step === 'preview' ? <Preview /> : null}
          {step === 'result' ? <Success /> : null}
        </Block>
      </CalendarContextProvider>
    </div>
  );
};

export default RegisterClasses;
