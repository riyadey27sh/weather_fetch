import React from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import '../index.css';
function Input(props){

   return (
   <div className="input-box">
      <input
        type="text"
        placeholder="Enter Location"
        onChange={props.change}
        onKeyDown={(e)=>{
          if(e.key==='Enter') props.click();
        }}
      />
      <SearchOutlinedIcon className="search-icon" onClick={props.click} />
    </div>
    
     
   )
}






export default Input;