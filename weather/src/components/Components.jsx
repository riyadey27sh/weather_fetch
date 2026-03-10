import React from "react";

import './comp.css';
function Component(props){
    return(
        <div className="parent">
         <props.icon sx={{ fontSize: 70 }} />
         <div className="name">
            <p>{props.value} {props.unit}</p>
            <p>{props.type}</p>
            
         </div>
        </div>
    )
}



export default Component;