import React, { useState } from "react";
import "../css/selectionMenu.css";
function SelectionMenu(props) {
  const [isSelected, setIsSelected] = useState("All Calls");
  console.log(isSelected);
  return (
    <div className="menu_container">
      <div
        className="all_calls"
        id={isSelected === "All Calls" ? "selected" : null}
        onClick={() => setIsSelected("All Calls")}
      >
        All Calls
      </div>
      <div
        className="archived_calls"
        id={isSelected === "Archived Calls" ? "selected" : null}
        onClick={() => setIsSelected("Archived Calls")}
      >
        Archived Calls
      </div>
    </div>
  );
}

export default SelectionMenu;
