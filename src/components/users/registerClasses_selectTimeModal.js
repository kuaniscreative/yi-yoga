import React, { Component } from "react";
import { connect } from "react-redux";

class SelectTimeModal extends Component {

    state = {
        selected: [] // array of classIds (string)
    }

    handleClick = (e) => {
        if (e.target.classList.contains('selectTimeModal')) {
            this.props.closeSelectTimeModal()
        }
    }

    handleChange = (e) => {
        const classId = e.target.value;
        const selected = this.state.selected;
        if (selected.indexOf(classId) > -1) {
            this.setState({
                ...this.state,
                selected: selected.filter((item) => {
                    return item !== classId
                })
            })
        } else {
            this.setState({
                ...this.state,
                selected: [...selected, classId]
            })
        }
    }

    render() {
        const data = this.props.data;
        return (
            <div
                className={
                    this.props.openSelectTimeModal
                        ? "selectTimeModal active"
                        : "selectTimeModal"
                }
                onClick={this.handleClick}
            >
                <form className='selectTimeModal_form'>
                    { data && data.hasClass.map((classInfo, i)=> {
                        const hr = classInfo.date.getHours();
                        const min = classInfo.date.getMinutes();
                        const output = `${hr}:${min}`;
                        return (
                            <label key={i} className="checkboxContainer">
                                    <div className="dayHero checkboxContainer_message">
                                        <span className="dayHero_day">
                                            {output}
                                        </span>
                                    </div>

                                    <div className="checkboxContainer_checkbox">
                                        <input
                                            type="checkbox"
                                            value={classInfo.id}
                                            onChange={this.handleChange}
                                        />
                                        <span className="checkmark"></span>
                                    </div>
                                </label>
                        );
                    })}
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        openSelectTimeModal: state.registerClass.openSelectTimeModal,
        data: state.registerClass.openSelectTimeModal_data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeSelectTimeModal: () => {
            dispatch({type: 'CLOSE_SELECT_TIME_MODAL'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTimeModal);
