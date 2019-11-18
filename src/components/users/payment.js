import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// components
import NextStepButtonsArea from "../ui/nextStepButtonArea";
import StepIndicator from "../stepIndicator";
import PaymentSuccess from './payment_success';

// actions
import { updatePaymentStatus } from "../../actions/userActions";

class Payment extends Component {
    state = {
        amount: ""
    };

    handleSubmit = e => {
        e.preventDefault();
        const paymentId = this.props.payment.id;
        const method = this.state.method;
        const account = this.state.account;
        const date = this.state.date;
        this.props.updatePaymentStatus(paymentId, method, account, date);
    };

    handleChange = e => {
        e.preventDefault();
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    };

    conditionalComponent = () => {
        if (this.props.updatePaymentSuccess) {
            return (
                <PaymentSuccess />
            )
        } else {
            return (
                <div>
                    {this.props.payment ? (
                        <form
                            className="comfyForm innerContent"
                            onSubmit={this.handleSubmit}
                        >
                            <label>金額</label>
                            <p className="amount">
                                {this.props.payment.amount}
                            </p>
                            <label>付款方式</label>
                            <select name="method" onChange={this.handleChange}>
                                <option value="default">選擇繳費方式</option>
                                <option value="transaction">匯款</option>
                                <option value="f2f">面交</option>
                            </select>
                            <label>帳號末四碼</label>
                            <input
                                name="account"
                                type="text"
                                onChange={this.handleChange}
                                placeholder="XXXX"
                            />
                            <label>匯款日期</label>
                            <input
                                name="date"
                                type="text"
                                onChange={this.handleChange}
                                placeholder="2019/10/20"
                            />
                            <NextStepButtonsArea />
                        </form>
                    ) : null}
                </div>
            );
        }
    };

    indicator = () => {
        if (this.props.updatePaymentSuccess) {
            return '付款結果'
        } else {
            return '輸入付款資訊'
        }
    }

    render() {
        return (
            <div id="payment">
                <StepIndicator indicator="通知結果" />
                {/* { this.conditionalComponent() } */}
                <PaymentSuccess />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const paymentId = ownProps.match.params.paymentId;
    const payment =
        state.firestore.ordered.paymentStatus &&
        state.firestore.ordered.paymentStatus.find(payment => {
            return (payment.id = paymentId);
        });
    const updatePaymentSuccess = state.user.updatePaymentSuccess;
    return {
        payment,
        updatePaymentSuccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updatePaymentStatus: (paymentId, method, account, date) => {
            dispatch(updatePaymentStatus(paymentId, method, account, date));
        }
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: "paymentStatus" }, { collection: "user" }])
)(Payment);
