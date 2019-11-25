import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

// components
import StepIndicator from "../stepIndicator";
import NextStepButtonsArea from "../ui/nextStepButtonArea";
import DateSingle from "../ui/dateSingle";
import ItemBarWithAction from "../ui/itemBarWithAction";

// actions
import { registerToCourse } from '../../actions/userActions';

class Preview extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    returnPrice = (num) => {
        if (num >= 8) {
            return num * 250
        } else if (num >= 4) {
            return num * 300
        } else {
            return num * 350
        }
    }

    registerToCourse = () => {
        const classes = this.props.selection.map((info) => {
            return {
                date: info.date,
                id: info.id
            }
        });
        const userId = this.props.userId
        const amount = this.returnPrice(classes.length);
        const sessionName = this.props.session.name;
        const sessionId = this.props.session.id;

        this.props.registerToCourse(classes, userId, sessionName, sessionId, amount)
    }

    render() {
        const num = this.props.selection.length;
        const cost = this.returnPrice(num);

        return (
            <div id='registerClass_preview'>
                <StepIndicator indicator="step2. 確認表單" />
                <p id='registerClass_preview_summary'>{`選取了${num}堂課，共${cost}元`}</p>
                <div id='registerClass_previewOptions'>
                {this.props.selection.map((info, i) => {
                    return (
                        <ItemBarWithAction
                            message={<DateSingle date={info.date} />}
                            action={
                                <button
                                    className="cancelRed"
                                    onClick={() => {
                                        this.props.removeClass(info)
                                    }}
                                >
                                    取消
                                </button>
                            }
                            key={i}
                        />
                    );
                })}
                </div>
                <NextStepButtonsArea action={this.registerToCourse} cancel={this.props.cancelPreview} cancelName='上一步'/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.firebase.auth.uid,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeClass: (info) => {
            dispatch({type:'REMOVE_CLASS_WHEN_REGISTER_CLASS', info})
        },
        registerToCourse: (classes, userId, sessionName, sessionId, amount) => {
            dispatch(registerToCourse(classes, userId, sessionName, sessionId, amount))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
