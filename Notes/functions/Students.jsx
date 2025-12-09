import React, {Component} from 'react'

class Students extends Component {
    constructor(props) {
        super(props);
        console.log("WE are in Students Constructor");
    }
    render() {
        return (
            <div>
                <h3>we are in students class {this.props.name}</h3>
            </div>
        )
    }
};

export default Students;