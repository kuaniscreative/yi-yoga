import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { withRouter } from "react-router-dom";

// components
import NextStepButtonsArea from "../ui/nextStepButtonArea";
import PaymentSuccess from "./payment_success";

// actions
import { updatePaymentStatus } from "../../actions/userActions";

class Payment extends Component {
    state = {
        amount: "",
        account: 'N/A'
    };

    handleSubmit = e => {
        e.preventDefault();
        const paymentId = this.props.payment.id;
        const method = this.state.method;
        const account = this.state.account;
        const date = this.state.date;
        if (date && method && account) {
            this.props.updatePaymentStatus(paymentId, method, account, date);
        } else {
            alert("每項欄位都必須輸入");
        }
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
            return <PaymentSuccess />;
        } else {
            return (
                <div className="layout_contentBlock">
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
                            {this.state.method === "transaction" ? (
                                <div>
                                    <label>帳號末四碼</label>
                                    <input
                                        name="account"
                                        type="text"
                                        onChange={this.handleChange}
                                        placeholder="XXXX"
                                    />
                                </div>
                            ) : null}

                            <label>匯款日期</label>
                            <input
                                name="date"
                                type="text"
                                onChange={this.handleChange}
                                placeholder="2019/10/20"
                            />
                            <NextStepButtonsArea
                                cancel={e => {
                                    e.preventDefault();
                                    this.props.history.goBack();
                                }}
                            />
                        </form>
                    ) : null}
                </div>
            );
        }
    };

    indicator = () => {
        if (this.props.updatePaymentSuccess) {
            return "付款結果";
        } else {
            return "輸入付款資訊";
        }
    };

    render() {
        return (
            <div id="payment">
                <div className="layout_pageTitle">
                    <div className="wrapper">
                        <h1>填寫繳費資訊</h1>
                        <p>
                            {this.props.payment &&
                                this.props.payment.sessionName}
                        </p>
                    </div>
                </div>
                {this.conditionalComponent()}
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

export default withRouter(
    compose(
        connect(mapStateToProps, mapDispatchToProps),
        firestoreConnect([
            { collection: "paymentStatus" },
            { collection: "user" }
        ])
    )(Payment)
);
