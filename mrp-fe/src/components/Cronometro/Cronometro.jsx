import { useEffect, useState, useRef } from "react";
import "./cronometro.scss";
import { FaPlayCircle, FaRegPlayCircle } from 'react-icons/fa';
import { FaCirclePause } from 'react-icons/fa6';
import { VscDebugRestart } from 'react-icons/vsc';
import { GiSaveArrow } from 'react-icons/gi'

function Cronometro() {
    const [diff, setDiff] = useState(0)
    const [initial, setInitial] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false);

    const animationRef = useRef(null);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const tick = () => {
        setDiff(new Date().getTime() - initial);
        animationRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
        if(!isPlaying){
          togglePlay();
          setInitial(new Date().getTime() - diff);
          animationRef.current = requestAnimationFrame(tick);
        }
    }

    const pause = () => {
        if(isPlaying){
          togglePlay();
          cancelAnimationFrame(animationRef.current);
        }
    }

    const save = () => {
        console.log("save");
    }

    const restart = () => {
      if(isPlaying){
        pause();
      }
      setInitial(0)
      setDiff(0)
    }

    useEffect(() => {
        return () => {
          cancelAnimationFrame(animationRef.current);
        }
    }, []);

    return (
        <div className="App">
            <h1 className="timer">{timeFormat(diff)}</h1>
            <div style={{ display: "flex", justifyContent: "center", alignItems:"center", marginTop: "20px", gap: "10px" }}>
                <GiSaveArrow onClick={save} style={{ cursor: "pointer", color: "#DFBF68", fontSize:"40px" }} />
                {isPlaying ? (
                    <FaCirclePause onClick={pause} style={{ cursor: "pointer", color: "#DFBF68", fontSize: "65px" }} />
                ) : (
                    <FaPlayCircle onClick={start} style={{ cursor: "pointer", color: "#DFBF68", fontSize: "65px" }} />
                )}
                <VscDebugRestart onClick={restart} style={{ cursor: "pointer", color: "#DFBF68", fontSize:"40px"}}/>
            </div>
        </div>
    );
}

const timeFormat = (milliseconds) => {
    console.log(milliseconds)
    if (!milliseconds) return "00:00:00";

    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const hh = hours < 10 ? "0" + hours : hours;
    const mm = minutes < 10 ? "0" + minutes : minutes;
    const ss = seconds < 10 ? "0" + seconds : seconds;

    return `${hh}:${mm}:${ss}`;
};


export default Cronometro;