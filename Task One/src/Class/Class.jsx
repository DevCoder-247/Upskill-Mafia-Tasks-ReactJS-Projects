import react , {Compnent, Component} from 'react'

class Class extends Component {
// with constructor
    // constructor() {
    //     super();
    //     this.state = {
    //         val : 0
    //     }
    // }

// without constructor
    state = {
        val : 1
    }

    incrementVal() {
        this.setState({
            val : this.state.val + 1
        })
    }

    decrementVal(){
        this.setState({
            val : this.state.val - 1
        })
    }
    
    render() {
        return (
            <div>
                <button onClick={() => this.incrementVal()}>INC</button>
                <h1>{this.state.val}</h1>
                <button onClick={() => this.decrementVal()}>DEC</button>
            </div>
        )
    }
}

export default Class;