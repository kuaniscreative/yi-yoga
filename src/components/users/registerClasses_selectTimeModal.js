import React, { Component } from "react";
import { connect } from "react-redux";

class SelectTimeModal extends Component {
    state = {
        selected: []// array of classIds (string)
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            selected: nextProps.selected
        })
    }

    closeModal = () => {
            this.props.closeSelectTimeModal();
            this.setState({
                ...this.state,
                selected: []
            })

    };

    closeModalWhenClickOutside = (e) => {
        if (e.target.classList.contains("selectTimeModal")) {
            this.closeModal()
        }
    }

    handleChange = e => {
        const classId = e.target.value;
        const selected = this.state.selected;
        if (selected.indexOf(classId) > -1) {
            this.setState({
                ...this.state,
                selected: selected.filter(item => {
                    return item !== classId;
                })
            });
        } else {
            this.setState({
                ...this.state,
                selected: [...selected, classId]
            });
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        const indexOfCalendarInfo = this.props.data.indexOfCalendarInfo;
        const calendar = this.props.data.calendar;
        const data = {
            index: indexOfCalendarInfo,
            key: calendar,
            selection: this.state.selected
        };

        this.props.classSelected(data);
        this.props.closeSelectTimeModal();
        this.setState({
            ...this.state,
            selected: []
        })
    };

    render() {
        const data = this.props.data; 
        return (
            <div
                className={
                    this.props.openSelectTimeModal
                        ? "selectTimeModal active"
                        : "selectTimeModal"
                }
                onClick={this.closeModalWhenClickOutside}
            >
                <form
                    className="selectTimeModal_form"
                    onSubmit={this.handleSubmit}
                >
                    {data &&
                        data.hasClass.map((classInfo, i) => {
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
                                            checked={this.state.selected.indexOf(classInfo.id) > -1 ? true : false}
                                        />
                                        <span className="checkmark"></span>
                                    </div>
                                </label>
                            );
                        })}
                    <div>
                        <button>確認</button>
                        <button onClick={(e) => {e.preventDefault(); this.closeModal()}}>取消</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const data = state.registerClass.openSelectTimeModal_data;
    const selected = data && data.hasClass.filter((item) => {
        return item.selected
    }).map((item) => {
        return item.id
    })
    return {
        openSelectTimeModal: state.registerClass.openSelectTimeModal,
        data: state.registerClass.openSelectTimeModal_data,
        selected: selected
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeSelectTimeModal: () => {
            dispatch({ type: "CLOSE_SELECT_TIME_MODAL" });
        },
        classSelected: data => {
            dispatch({ type: "CLASS_SELECTED", data });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectTimeModal);
