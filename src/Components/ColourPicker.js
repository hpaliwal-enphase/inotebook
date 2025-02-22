import React, {useState} from 'react';
import NoteColourMapper from '../Utils/NoteColourMapper';

export const ColourPicker = (props) => {
  let modes = ["Light", "Warning", "Success", "Primary", "Danger"];
  const [activeColour, setActiveColour] = useState("light");
  const displayMode = props.mode;
  const handleClick = (mode) =>{
    setActiveColour(mode);
    switch (mode) {
    case "light":
        props.updateColour("white");
        break;
    case "dark":
        props.updateColour("black");
        break;
    case "danger":
        props.updateColour("#ffcccc");
        break;
    case "success":
        props.updateColour("#ccffcc");
        break;
    case "primary":
        props.updateColour("#ccf5ff");
        break;
    case "warning":
        props.updateColour("#ffffb3");
        break;
    default:
        props.updateColour("blank");
        break;
    }
  }

  return (
    <div style={{width: '50vw'}} className='d-flex'>
        {modes.map((item, idx)=>{
            return(
                <div key={idx} style={{width: '1.6rem', height: '1.6rem', backgroundColor: NoteColourMapper(item.toLowerCase(), displayMode)}} className={`border border-${displayMode === "dark" ? "light" : "dark"} mx-2 rounded-circle ${activeColour === item.toLowerCase() ? `border-3`: 'border-1'}`} onClick={()=>{handleClick(item.toLowerCase())}} value={item.toLowerCase()}></div>
            )
        })}
    </div>
  );
}


