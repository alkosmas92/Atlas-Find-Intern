import { useState } from "react";

export default function Checkbox(props) {
  const min = 1;
  const max = 4;
  // if(props.mycount>2){
  //      props.SetRandCheck(props.CheckRand+1);
  // }

  const handleOnChange = () => {
    if (props.Allcheck[props.index] === true) {
      props.setvalue("");
      props.setUserdata({});
      props.getalldata();
    }
    props.Allcheck[props.index] = !props.Allcheck[props.index];
    console.log(props.Allcheck);
    let ArrayCopy = [...props.Allcheck];
    props.setChecked(ArrayCopy);
  };

  const hello = () => {};
  let lot = props.Allcheck[props.index];

  return (
    <div className="checkbox-style">
      <div className="topping-all">
        <input
          className="radio-style"
          type="checkbox"
          id="topping-inside"
          name="topping"
          value="Panner"
          checked={props.Allcheck[props.index]}
          onChange={handleOnChange}
        />
        {props.name}
      </div>
    </div>
  );
}
