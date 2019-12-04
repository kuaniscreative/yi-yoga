import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// comopnent
import StepIndicator from "../stepIndicator";
class RegisterClassSuccess extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const id = this.props.paymentId;
        return (
            <div id='registerClass_success' className="layout_contentBlock">
                <div id="selectClassPanel_instruction">
                    <StepIndicator indicator="報名結果" />
                </div>
                <p className="resultMessage_title">報名成功</p>
                <ul className="comfyList">
                    <li>
                        這個程式沒有線上付款服務，請在繳交學費後填寫繳費資料並等候芝伊確認款項
                    </li>
                    <li>
                            <Link to={`/payment/${id}`}>
                                如果你已經付款，
                                <span className="underline">
                                    點此通知芝伊 &rarr;
                                </span>
                            </Link>
                    </li>
                    <li>
                            你也可以在 「選單 > 課程狀態」 填寫付款資料
                    </li>
                </ul>
                <div className="nextStepButtonsArea--notFixed">
                    <Link to="/" className="outlineButton" onClick={this.props.clearSuccessMessage}>
                        回首頁
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        paymentId: state.user.paymentId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearSuccessMessage: () => {
            dispatch({type: 'CLEAR_SUCCESS_MESSAGE_REGISTER_CLASS'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterClassSuccess);
