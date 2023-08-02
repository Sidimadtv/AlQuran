import React from "react";
import "./TheWarning.css";
import WarningIcon from "@mui/icons-material/Warning";
import ClearIcon from '@mui/icons-material/Clear';

function TheWarning() {
  return (
    <div className="TheWarning" id="theWarning">
      <button type="button" onClick={() => document.getElementById("theWarning").style.display = "none"}><ClearIcon/></button>
      <WarningIcon />
      <span>Please wait for the data to load !!</span>
    </div>
  );
}

export default TheWarning;
