import React, { useState } from 'react'

function Trial() {
    const [val, setVal] = useState(0);

    const incrementVal = () => {
        setVal(val + 1);
    }

    const decrementVal = () => {
        setVal(val - 1);
    }
 
  return (
    <div>
        <button onClick={()=>incrementVal()}>INC</button>
        <h1>{val}</h1>
        <button onClick={()=>decrementVal()}>DEC</button>
    </div>
  )
}

export default Trial