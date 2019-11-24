import React, { Component } from "react";
import { connect } from "react-redux";

class SelectTimeModal extends Component {

    handleClick = (e) => {
        if (e.target.classList.contains('selectTimeModal')) {
            this.props.closeSelectTimeModal()
        }
    }
    render() {
        const modalOptions = this.props.modalOptions;
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
                    { modalOptions && modalOptions.map((classInfo, i)=> {
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
        modalOptions: state.registerClass.openSelectTimeModal_options
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
