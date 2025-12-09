import react , {Component} from 'react';

class Employee extends Component {
    // 1st way using constructor 
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         name : this.props.name,
    //         age : 56,
    //         G : "m"
    //     }
    // }

    // 2nd way without using constructor
    state = {
        name : "Rohan",
        age : 54,
        G : "trans"
    }
    
    changeName() {
        this.setState({
            name: "Rahul",
            age : 89,
            G : "f"
        })
    }
    render() {
        return (
            <div>
                <h3>{this.state.name}</h3>
                <h3>{this.state.G}</h3>
                <h3>{this.state.age}</h3>
                <button onClick = {()=> this.changeName()}>Change Name</button>
            </div>
        )
    }
};

export default Employee;


// import react , {Component} from 'react';

// class Employee extends Component {
//     constructor() {
//         super();
//         this.state = {
//             name : 1
//         }
//     }
//     changeName() {
//         this.setState({
//             name: this.state.name + 1
//         })
//     }
//     render() {
//         return (
//             <div>
//                 <h3>{this.state.name}</h3>
//                 <button onClick = {()=> this.changeName()}>Change Name</button>
//             </div>
//         )
//     }
// };

// export default Employee;