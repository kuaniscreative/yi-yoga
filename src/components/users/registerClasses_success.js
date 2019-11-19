import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class RegisterClassSuccess extends Component {
    render() {
        const id = this.props.paymentId;
        return (
            <div className="innerContent success">
                <p className="resultMessage_title">報名成功</p>
                <ul className="comfyList">
                    <li>
                        <p className="resultMessage_action">
                            <Link to={`/payment/${id}`}>
                                如果你已經付款，
                                <span className="underline">
                                    點此通知芝伊 &rarr;
                                </span>
                            </Link>
                        </p>
                    </li>
                    <li>
                        <p className="resultMessage_text">
                            之後你也可以在 選單>課程狀態 執行此動作
                        </p>
                    </li>
                </ul>
                <div className="nextStepButtonsArea--notFixed">
                    <Link to="/" className="outlineButton">
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

export default connect(mapStateToProps)(RegisterClassSuccess);
