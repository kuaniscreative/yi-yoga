import React, { Component } from "react";
import { connect } from "react-redux";

// actions
import {
    rescheduleQueryAccept,
    rescheduleQueryDecline
} from "../../actions/userActions";
class RescheduleQuery extends Component {
    state = {};

    componentDidMount() {
        const params = this.props.match.params;
        const result = params.result;
        const userId = params.userId;
        const classId = params.classId;
        const rescheduleQueryAccept = this.props.rescheduleQueryAccept;
        const rescheduleQueryDecline = this.props.rescheduleQueryDecline;

        if (result === "accept") {
            rescheduleQueryAccept(userId, classId);
        } else if (result === "decline") {
            rescheduleQueryDecline(userId, classId);
        }
    }

    render() {
        const params = this.props.match.params;
        const result = params.result;
        const title = result === "accept" ? "補課成功" : "已取消候補";
        return (
            <div>
                {this.props.rescheduleQueryProcessed ? (
                    <div className="layout_pageTitle">
                        <div className="wrapper">
                            <h1>{title}</h1>
                        </div>
                    </div>
                ) : null}
                {this.props.rescheduleQueryProcessed ? (
                    <div className="layout_contentBlock">
                        {result === "accept" ? (
                            <ul className="comfyList">
                                <li>親愛的，我們晚點見</li>
                            </ul>
                        ) : (
                            <ul className="comfyList">
                                <li>補課的機會已經退還給你</li>
                                <li>記得要在兩個月內補課唷</li>
                            </ul>
                        )}
                    </div>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        rescheduleQueryProcessed: state.user.rescheduleQueryProcessed
    };
};

const mapDispatchToProps = dispatch => {
    return {
        rescheduleQueryAccept: (userId, classId) => {
            dispatch(rescheduleQueryAccept(userId, classId));
        },
        rescheduleQueryDecline: (userId, classId) => {
            dispatch(rescheduleQueryDecline(userId, classId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RescheduleQuery);
