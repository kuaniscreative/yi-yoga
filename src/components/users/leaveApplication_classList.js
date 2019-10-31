import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// components
import DateSingle from './leaveApplication_classSingle';

// functions

class ClassList extends Component {

    state = {
        selected: {}
    }

    submit = () => {
        if (Object.keys(this.state.selected).length) {
            this.props.submit(this.state.selected);
        }
    }

    select = (date) => {
        this.setState({
            selected: date
        })
    }

    render() {
        return (
            <div className='centerList'>
                {
                    this.props.classes && this.props.classes.map((classInfo, i) => {
                        return <DateSingle classSingle={classInfo.date} key={i} select={this.select} canApply={classInfo.canApply} />
                    })
                }
                <div className="nextStepButtonsArea">
                    <button className="outlineButton" onClick={this.submit}>確認</button>
                    <Link to="/" className="cancelGray">
                        取消
                    </Link>
                </div>
            </div>
        )
    }
}

export default ClassList 