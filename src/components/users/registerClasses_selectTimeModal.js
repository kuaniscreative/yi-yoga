import React, { Component } from "react";
import { connect } from "react-redux";

// Cconponents
import NextStepButtonsArea from "../ui/nextStepButtonArea";
class SelectTimeModal extends Component {
    state = {
        selected: [], // array of classIds (string)
        originSelection: []
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            selected: nextProps.selected,
            originSelection: nextProps.selected
        });
    }

    closeModal = () => {
        this.props.closeSelectTimeModal();
        this.setState({
            ...this.state,
            selected: []
        });
    };

    closeModalWhenClickOutside = e => {
        if (e.target.classList.contains("selectTimeModal")) {
            this.closeModal();
        }
    };

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
        const origin = this.state.originSelection;
        const selected = this.state.selected.map(id => {
            const classInfo = this.props.data.hasClass.find(classInfo => {
                return id === classInfo.id;
            });
            classInfo.index = indexOfCalendarInfo;
            classInfo.key = calendar;
            return classInfo;
        });
        const deletion = origin.filter(classId => {
            return (
                origin.indexOf(classId) > -1 && selected.indexOf(classId) < 0
            );
        });
        const data = {
            index: indexOfCalendarInfo,
            key: calendar,
            selection: selected,
            deletion: deletion
        };

        this.props.classSelected(data);
        this.props.closeSelectTimeModal();
        this.setState({
            ...this.state,
            selected: []
        });
    };

    render() {
        const data = this.props.data;
        const createTitle = date => {
            const dateStrings = date.toLocaleDateString("zh").split("/");
            const dd = dateStrings[2];
            const mm = dateStrings[1];
            const yyyy = dateStrings[0];

            return `${yyyy}年${mm}月${dd}日`;
        };
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
                    <div className="selectTimeModal_title">
                        {this.props.data
                            ? createTitle(this.props.data.hasClass[0].date)
                            : null}
                    </div>
                    {data &&
                        data.hasClass.map((classInfo, i) => {
                            const hr = classInfo.date.getHours();
                            const min = classInfo.date.getMinutes();
                            const output = `${hr}:${min}`;
                            return (
                                <label
                                    key={i}
                                    className="checkboxContainer selectTimeModal_option"
                                >
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
                                            checked={
                                                this.state.selected.indexOf(
                                                    classInfo.id
                                                ) > -1
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <span className="checkmark"></span>
                                    </div>
                                </label>
                            );
                        })}
                    <div>
                        <NextStepButtonsArea
                            cancel={e => {
                                e.preventDefault();
                                this.closeModal();
                            }}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const data = state.registerClass.openSelectTimeModal_data;
    const selected =
        data &&
        data.hasClass
            .filter(item => {
                return item.selected;
            })
            .map(item => {
                return item.id;
            });
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
