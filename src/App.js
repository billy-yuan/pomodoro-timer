import React, { useState, useEffect, useRef } from "react";
import Settings from "./components/timerSettings";
import Timer from "./components/timer";

import "./App.css";

// Default values

const defaultSessionLength = 10;
const defaultBreakLength = 4;
const timeUpSound = new Audio(
  "https://soundclips1.s3-ap-northeast-1.amazonaws.com/Quiz-Buzzer01-1.mp3"
);
const modalStyleOptions = {
  visible: { display: "inline" },
  hidden: { display: "none" },
};

// Helper function to convert seconds to MM:SS
function convertToMMSS(sec) {
  let mm = Math.floor(sec / 60);
  let ss = sec % 60;

  return (mm < 10 ? "0" + mm : mm) + ":" + (ss < 10 ? "0" + ss : ss);
}

// App
function App() {
  const [breakLength, setBreakLength] = useState(defaultBreakLength);
  const [sessionLength, setSessionLength] = useState(defaultSessionLength);
  const [currentSessionLength, setCurrentSession] = useState(
    defaultSessionLength * 60
  );

  const [countDown, setCountDown] = useState(false); // if true, timer ticks
  const [isBreak, setIsBreak] = useState(false); // if true, the display timer is for a break
  const [showModal, setShowModal] = useState(false);
  const [modalStyle, setModalStyle] = useState(modalStyleOptions.visible);

  function UpdateTimers() {
    // running
    // affects next time
    // not running
    let sessionInput = document.getElementsByClassName("break-input")[0].value;
    let breakInput = document.getElementsByClassName("session-input")[0].value;

    // isBreak
    //   ? setCurrentSession(60 * sessionInput)
    //   : setCurrentSession(60 * breakInput);
  }
  // use Effect #1: Start / stop the setInterval function whenever countDown (boolean to signal whether timer should start) changes
  let id; // set interval id

  useEffect(() => {
    if (countDown) {
      id = window.setInterval(() => {
        setCurrentSession((currentSessionLength) =>
          Math.max(0, currentSessionLength - 1)
        );
      }, 1000);
    } else {
      window.clearInterval(id);
    }
    return () => {
      window.clearInterval(id);
    };
  }, [countDown]);

  // useEffect #2: Stop timer once 0 is reached and set to either break or work mode

  useEffect(() => {
    function UpdateBreak(isBreak) {
      console.log("Break");
      if (isBreak) {
        setCurrentSession(sessionLength * 60);
      } else {
        setCurrentSession(breakLength * 60);
      }
      return !isBreak;
    }
    if (currentSessionLength === 0) {
      // play sound quickly back to back
      timeUpSound.pause();
      timeUpSound.currentTime = 0;
      timeUpSound.play();

      setCountDown(false);
      setIsBreak(UpdateBreak);
      window.clearInterval(id);
    }
  }, [currentSessionLength]);

  // useEffect #3: Skip button : Toggle between work and break
  useEffect(() => {
    isBreak
      ? setCurrentSession(60 * breakLength)
      : setCurrentSession(60 * sessionLength);
  }, [isBreak]);

  // useEffect #4: Toggle settings modal
  useEffect(() => {
    showModal
      ? setModalStyle((modalStyle) => modalStyleOptions.visible)
      : setModalStyle((modalStyle) => modalStyleOptions.hidden);
  }, [showModal]);

  // useEffect #5: Close modal if user clicks outside
  const modalRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (
        !modalRef.current.contains(e.target) ||
        e.target.className === "close-modal"
      ) {
        UpdateTimers();
        setShowModal((showModal) => false);
      }
    });
    return () => {
      document.removeEventListener("mousedown", () => {});
    };
  }, [showModal]);

  // Render
  return (
    <div className="App">
      <div className="timerContainer">
        <div className="top-padding"></div>
        <Timer
          currentSessionLength={convertToMMSS(currentSessionLength)}
          isBreak={isBreak ? "Break" : "Work"}
          startStopText={countDown ? "Pause" : "Start"}
          skip={() => {
            setCurrentSession(sessionLength * 60);
            setCountDown(false);
            setIsBreak((isBreak) => !isBreak);
          }}
          countDown={() => setCountDown((countDown) => !countDown)}
          showModal={() => {
            setShowModal((showModal) => !showModal);
          }}
        />
      </div>

      <Settings
        breakLength={breakLength}
        sessionLength={sessionLength}
        modalStyle={modalStyle}
        modalRef={modalRef}
        updateTimer={UpdateTimers}
      />
    </div>
  );
}

export default App;
