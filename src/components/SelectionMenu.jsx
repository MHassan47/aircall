import React, { useState } from "react";
import "../css/selectionMenu.css";
function SelectionMenu({ archive, setArchive }) {
  return (
    <div className="menu_container">
      <div
        className="all_calls"
        id={!archive ? "selected" : null}
        onClick={() => {
          setArchive(false);
        }}
      >
        All Calls
      </div>

      <div
        className="archived_calls"
        id={archive ? "selected" : null}
        onClick={() => {
          setArchive(true);
        }}
      >
        Archived Calls
      </div>
    </div>
  );
}

export default SelectionMenu;
