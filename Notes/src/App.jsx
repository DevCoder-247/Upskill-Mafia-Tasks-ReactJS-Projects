import { useState } from 'react'
import Greet from '../functions/Greet'
import Welcome from '../functions/Welcome'
import Hello from '../functions/Hello'
import HelloMsg from '../functions/HelloMsg'
import Class from '../functions/Class'
import Students  from '../functions/Students'
import Employee  from '../functions/Employee'
import Customer from '../functions/Customer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='Container'>

    {/* COMPONETS WITHOUTH PROPS */}
    {/* <Greet />
    <Welcome />
    <Hello /> */}

    
    {/* FUNCTIONAL COMPONETS WITH PROPS USE props.name */}
    {/* <HelloMsg name="Ravi" age="))"/> */}
    {/* <HelloMsg name="Rohan" age="89">
      <p>Child Component One</p>
    </HelloMsg>
    <HelloMsg name="Ranvijay" age="78"> 
      <button>Click me oh yeah ...</button>
    </HelloMsg>
    <HelloMsg name="Randin" age="56" > 
      <p>Child Component Two</p>
    </HelloMsg> */}

    {/* CLASS COMPONENTS WITH PROPS USE this.props.name */}
    {/* <Class name="Ravi" />
    <Class name="Bhai" />
    <Class name="Padre" /> */}

    {/* <Students name="ABhay" /> */}
    {/* <Employee name="VIrat"/> */}
    <Customer name="Sonu" age={90}/>

    </div>
  )
}

export default App
