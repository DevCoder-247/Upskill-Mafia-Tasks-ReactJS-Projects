import React from 'react'

let name = "Avi";

function HelloMsg(props) {
  return (
    <div>
        HelloMsg my name is {props.name}, and my age is {props.age}
        {/* MY Name is {name} */}
        {props.children} 
        {/* above line is used to show the children in hte parent  */}
    </div>
  )
}

export default HelloMsg