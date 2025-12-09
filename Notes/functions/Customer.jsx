// import react , { Component } from 'react'

// Props destructuring in class components
// class Customer extends Component {
//     constructor() {
//         super();
//         this.state = {
//             name : "Patil",
//             age : 89 
//         }
//     }
//     render(props) {
//         const {name, age} = this.state;
//         return (
//             <div>
//                 <h3>{name}</h3>
//                 <h3>{age}</h3>
//             </div>
//         )
//     }
// };

// export default Customer;

// import React from 'react'

// function Customer(props) {
//   return (
//     <div>
//         <h3>{props.name}</h3>
//         <h3>{props.age}</h3>
//     </div>
//   )
// }

// export default Customer


// Props destructuring in functional components
import React from 'react'

function Customer({name, age}) {
  return (
    <div>
        <h3>{name}</h3>
        <h3>{age}</h3>
    </div>
  )
}

export default Customer