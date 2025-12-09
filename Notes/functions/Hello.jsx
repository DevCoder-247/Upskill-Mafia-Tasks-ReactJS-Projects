import React from 'react'
let name="Abhay";
const car_obj = {name:"Lambo", color:"blue"};

function Hello() {
  return (
    <>
    <h1>{name}</h1>
    <h1>5+5</h1>  {/* output :- 5+5*/}
    <h1>{5+ 5}</h1>
    <h1>{car_obj.name}</h1>
    <h1>{car_obj.color}</h1>
    </>
  )
}

export default Hello