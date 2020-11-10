import React, { useState } from "react";

function Timer(props) {
  const [hoverButton, setHoverButton] = useState(false);

  const buttonStyle = {
    hover: { "background-color": "black", "font-color": "white" },
    noHover: { "background-color": "grey", "font-color": "white" },
  };
  // change style of color on mouseover
  const [playButtonColor, setPlayButtonColor] = useState(buttonStyle.noHover);
  const [skipButtonColor, setSkipButtonColor] = useState(buttonStyle.noHover);

  return (
    <>
      <div className="time-left">{props.currentSessionLength}</div>
      <button
        className="start-stop-button"
        type="image"
        onClick={props.countDown}
        style={playButtonColor}
        onMouseEnter={() => {
          setPlayButtonColor(buttonStyle.hover);
        }}
        onMouseLeave={() => {
          setPlayButtonColor(buttonStyle.noHover);
        }}
      >
        {props.startStopText}
      </button>
      <button
        className="skip-button"
        onClick={props.skip}
        style={skipButtonColor}
        onMouseEnter={() => {
          setSkipButtonColor(buttonStyle.hover);
        }}
        onMouseLeave={() => {
          setSkipButtonColor(buttonStyle.noHover);
        }}
      >
        Skip
      </button>

      <div className="time-label">{props.isBreak}</div>
      <button className="modal-button" onClick={props.showModal}>
        &#9881;
      </button>
    </>
  );
}

export default Timer;
