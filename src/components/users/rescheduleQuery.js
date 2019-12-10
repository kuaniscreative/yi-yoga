import React, { Component } from "react";
import { connect } from 'react-redux';

// actions
import { rescheduleQueryAccept, rescheduleQueryDecline } from '../../actions/userActions';
class RescheduleQuery extends Component {
    state = {};

    componentDidMount() {
        const params =  this.props.match.params;
        const result = params.result;
        const userId = params.userId;
        const classId = params.classId;
        const rescheduleQueryAccept = this.props.rescheduleQueryAccept;
        const rescheduleQueryDecline = this.props.rescheduleQueryDecline;

        if (result === 'accept') {
            rescheduleQueryAccept(userId, classId);
        } else if (result === 'decline') {
            rescheduleQueryDecline(userId, classId)
        }
    }

    render() {
        return (
            <div>
                <div className="layout_pageTitle">
                    <div className="wrapper">
                        <h1>
                            補課結果
                        </h1>
                    </div>
                </div>
                <div className='layout_contentBlock'></div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        rescheduleQueryAccept: (userId, classId) => {
            dispatch(rescheduleQueryAccept(userId, classId))
        },
        rescheduleQueryDecline: (userId, classId) => {
            dispatch(rescheduleQueryDecline(userId, classId))
        }
    }
}

export default connect(null, mapDispatchToProps)(RescheduleQuery);
