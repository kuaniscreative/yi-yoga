import React from 'react';
import styled from 'styled-components';

// data
import theme from '../../json/theme.json';

export const FormItemWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

const Form = styled.form`
  label {
    display: block;
    font-size: 0.75rem;
    margin-bottom: 0.5em;
  }
  input,
  select,
  textarea {
    display: block;
    border-bottom: 1px solid ${theme.colors.gray1};
    padding: 0.5em 0;
    margin-bottom: 2.5em;
    font-size: 1.5rem;
  }
  select {
    border: none;
    padding-top: 0.75em;
  }

  option:disabled {
    color: $ruby;
  }

  textarea {
    width: 100%;
    margin-top: 0.5em;
    padding: 1.5rem 1rem;
    border: 1px solid ${theme.colors.gray1};
  }

  ::placeholder {
    color: ${theme.colors.gray2};
  }

  input:valid {
    border: 1px solid transparent;
  }

  input:focus {
    border-bottom: 1px solid ${theme.colors.gray1};
  }
`;

const ComfyForm = (props) => {
  const { children, submitHandler } = props;
  return (
    <Form className="container-fluid px-0" onSubmit={submitHandler}>
      <div className="row">{children}</div>
    </Form>
  );
};

export default ComfyForm;
