import React, { Component } from 'react';

class AllClasses extends Component {

    

    render() {

        const tbc_data = {
            classesSortedByMonth: [{
                year: 2019,
                month: 0,
                classes: []
            }, {}, {}]
        }
        
        
        
        return (
            <div>
                <div>
                    <div>title</div>
                    <div>classes date</div>
                    <div>classes date</div>
                </div>

                <div>
                    <div>title</div>
                    <div>classes date</div>
                    <div>classes date</div>
                </div>

            </div>
        )
    }
}

export default AllClasses;