import React, { Component } from "react";
import { Link } from 'react-router-dom';

// components
import ClassSingle from "./reschedule_preview_classSingle";

class ClassList extends Component {

    handleClick = () => {
        this.props.submit();
    }

    render() {
        return (
            <div className='nextStepButtonsArea_parent'>
                {this.props.classes.map((classSingle, i) => {
                    return (
                        <ClassSingle
                            classSingle={classSingle}
                            key={i}
                            select={this.props.select}
                        />
                    );
                })}
                <div className="nextStepButtonsArea">
                    <button
                        className="outlineButton"
                        onClick={this.handleClick}
                    >
                        確認
                    </button>
                    <Link to="/" className="cancelGray">
                        取消
                    </Link>
                </div>
            </div>
        );
    }
}

export default ClassList;
