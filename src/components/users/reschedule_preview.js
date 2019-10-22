import React, { Component } from 'react';

class Preview extends Component {

    handleClick = (e) => {
        e.preventDefault();
        console.log('date selected')
        console.log('if there are seats, the student will be registered as rescheduled');
        console.log('if not, it will be pending');
    }
    render() {
        console.log(this.props.classes)
        return (
            <div>
                <p>2019/11/01 19:00-20:00 <button onClick={this.handleClick}>候補</button></p> 
            </div>
        )
    }
}

export default Preview;