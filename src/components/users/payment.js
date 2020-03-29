import React, { useState, useContext } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import styled from 'styled-components';

// components
import TitleBlock from '../ui/titleBlock';
import Block from '../ui/block';
import ComfyForm, { FormItemWrapper } from '../ui/comfyForm';
import ArrowIconLink from '../ui/arrowIconLink';
import ProcessNav, {
  ItemWrapper,
  ItemWrapperRight,
  Hint,
  ActionButton
} from '../ui/processNav';

// contexts
import { userStatusContext } from '../contexts/userStatusContext';
import { loadingContext } from '../contexts/loadingContext';

// actions
import updatePaymentStatus from '../../actions/updatePaymentStatus';

const LinkWrapper = styled.div`
  margin-bottom: 2rem;
`;

const defaultPayment = {
  amount: '',
  method: null,
  date: null
};

const Payment = ({ history }) => {
  /** Get payment infos */
  const { paymentId } = useParams();
  const { payments } = useContext(userStatusContext);
  const payment =
    payments.find((current) => {
      return current.id === paymentId;
    }) || defaultPayment;
  console.log(payment);

  /** Toggle views */
  const [isResult, setIsResult] = useState(false);

  /** Method */
  const [method, setMethod] = useState(null);

  /** Date */
  const [date, setSate] = useState(null);

  /** Account */
  const [account, setAccount] = useState(null);

  /** Change handler */
  const pair = {
    method: setMethod,
    date: setSate,
    account: setAccount
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const changeMethod = pair[name];

    changeMethod(e.target.value);
  };

  /** handlerSubmit */
  const { setLoadingBarActive } = useContext(loadingContext);
  const submitHandler = () => {
    if (method === 'transaction' && !account) {
      alert('所有欄位為必填');
      return;
    }

    if (!method || !date) {
      alert('所有欄位為必填');
      return;
    }

    setLoadingBarActive(true);
    updatePaymentStatus(paymentId, method, account, date).then(() => {
      setLoadingBarActive(false);
      setIsResult(true);
    });
  };

  /** Go back function */
  const toUserStatus = () => {
    history.push('/userStatus');
  };

  if (isResult) {
    return (
      <div>
        <TitleBlock title="完成匯款通知" />
        <Block>
          <LinkWrapper>
            <ArrowIconLink to="/userStatus">返回課程狀態</ArrowIconLink>
          </LinkWrapper>
          <LinkWrapper>
            <ArrowIconLink to="/">回首頁</ArrowIconLink>
          </LinkWrapper>
        </Block>
      </div>
    );
  }

  return (
    <div>
      <TitleBlock title="填寫匯款資訊">{payment.sessionName}</TitleBlock>
      <Block>
        <ComfyForm submitHandler={submitHandler}>
          <FormItemWrapper className="col-12">
            <label>金額</label>
            <input
              name="amount"
              type="text"
              onChange={handleChange}
              value={payment && payment.amount}
              disabled
            />
          </FormItemWrapper>
          <FormItemWrapper className="col-12">
            <label>付款方式</label>
            <select name="method" onChange={handleChange}>
              <option value="default">選擇繳費方式</option>
              <option value="transaction">匯款</option>
              <option value="f2f">面交</option>
            </select>
          </FormItemWrapper>
          {method === 'transaction' ? (
            <FormItemWrapper className="col-12">
              <label>帳號末四碼</label>
              <input
                name="account"
                type="text"
                onChange={handleChange}
                placeholder="XXXX"
                maxLength="4"
              />
            </FormItemWrapper>
          ) : null}
          <FormItemWrapper className="col-12">
            <label>匯款日期</label>
            <input
              name="date"
              type="text"
              onChange={handleChange}
              placeholder="YYYY/MM/DD"
            />
          </FormItemWrapper>
        </ComfyForm>
      </Block>
      <Block>
        <ProcessNav>
          <ItemWrapper>
            <Hint>上一步</Hint>
            <ActionButton onClick={toUserStatus}>返回課程資訊</ActionButton>
          </ItemWrapper>
          <ItemWrapperRight>
            <Hint>下一步</Hint>
            <ActionButton onClick={submitHandler}>送出匯款資訊</ActionButton>
          </ItemWrapperRight>
        </ProcessNav>
      </Block>
    </div>
  );
};

export default withRouter(Payment);
