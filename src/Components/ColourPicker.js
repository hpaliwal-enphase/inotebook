import React, {useState} from 'react';

export const ColourPicker = (props) => {
  let modes = ["Light", "Warning", "Success", "Primary", "Danger"];
  const [activeColour, setActiveColour] = useState("Light");
  // console.log(props);
  const handleClick = (mode) =>{
    setActiveColour(mode);
    // console.log(mode)
    switch (mode) {
    case "light":
        props.updateColour("white");
        break;
    case "dark":
        props.updateColour("black");
        break;
    case "danger":
        props.updateColour("red");
        break;
    case "success":
        props.updateColour("green");
        break;
    case "primary":
        props.updateColour("blue");
        break;
    case "warning":
        props.updateColour("yellow");
        break;
    default:
        props.updateColour("blank");
        break;
    }
  }

  return (
    <div className='w-50 pe-5 d-flex d-flex justify-content-between'>
        {modes.map((item, idx)=>{
            return(
                <div id={idx} style={{width: '25px', height: '25px'}} className={`border border-dark rounded-circle bg-${item.toLowerCase()} opacity-50 ${activeColour === item.toLowerCase() ? `border-3`: 'border-1'}`} onClick={()=>{handleClick(item.toLowerCase())}} value={item.toLowerCase()}></div>
            )
        })}
    </div>
  );
}


