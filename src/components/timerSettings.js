// Define state
import React from "react";

function Break(props) {
  return (
    <div className="break-container">
      <div className="session-label">Break Length (min)</div>
      <input
        className="break-input"
        defaultValue="5"
        style={{
          background: "none",
          border: "none",
          resize: "none",
          outline: "none",
        }}
      ></input>
    </div>
  );
}

function Session(props) {
  return (
    <div className="session-container">
      <div className="session-label">Session Length (min)</div>
      <input
        className="session-input"
        defaultValue="10"
        style={{
          background: "none",
          border: "none",
          resize: "none",
          outline: "none",
        }}
      ></input>
    </div>
  );
}

// Modal for settings
function Settings(props) {
  return (
    <div className="timer-modal" style={props.modalStyle} ref={props.modalRef}>
      <span class="close-modal">&times;</span>
      <div className="settings-container">
        <Break
          breakLength={props.breakLength}
          setBreakLength={props.setBreakLength}
        />
        <Session
          sessionLength={props.sessionLength}
          setSessionLength={props.setSessionLength}
        />
      </div>
      <button className="update-settings-button" onClick={props.updateTimer}>
        Update
      </button>
      <br />
    </div>
  );
}

export default Settings;
