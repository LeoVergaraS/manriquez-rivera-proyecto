import { useEffect, useState, useRef } from "react";
import "./cronometro.scss";
import { FaPlayCircle, FaRegPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { VscDebugRestart } from "react-icons/vsc";
import { GiSaveArrow } from "react-icons/gi";

function Cronometro() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tiempoInicial = parseInt(localStorage.getItem("tiempoCronometro")) || 0;
  const [tiempo, setTiempo] = useState(tiempoInicial);
  const intervalRef = useRef(null);

  // Función para formatear el tiempo en formato HH:mm:ss
  const formatearTiempo = (tiempo) => {
    const horas = String(Math.floor(tiempo / 3600)).padStart(2, "0");
    const minutos = String(Math.floor((tiempo % 3600) / 60)).padStart(2, "0");
    const segundos = String(tiempo % 60).padStart(2, "0");
    return `${horas}:${minutos}:${segundos}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setIsPaused(false);
  };

  const start = () => {
    if (!isPlaying) {
      togglePlay();

      intervalRef.current = setInterval(() => {
        setTiempo((prevTiempo) => {
          const nuevoTiempo = prevTiempo + 1;
          localStorage.setItem("tiempoCronometro", String(nuevoTiempo));
          return nuevoTiempo;
        });
      }, 1000);
    }
  };
  

  const pause = () => {
    if (isPlaying) {
      togglePlay();
      setIsPaused(true);
      clearInterval(intervalRef.current);
    }
  };

  const save = () => {
    console.log("save");
  };

  // Función para reiniciar el cronómetro
  const reset = () => {
    if(isPlaying) {
      togglePlay();
      setIsPaused(true);
    }
    setTiempo(0);
    localStorage.setItem("tiempoCronometro", "00:00:00");
  };


  // Actualizar el tiempo cada segundo
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTiempo((prevTiempo) => {
//         const nuevoTiempo = prevTiempo + 1;
//         localStorage.setItem("tiempoCronometro", String(nuevoTiempo));
//         return nuevoTiempo;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

  return (
    <div className="App">
      <h1 className="timer">{formatearTiempo(tiempo)}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <GiSaveArrow
          onClick={save}
          style={{ cursor: "pointer", color: "#DFBF68", fontSize: "40px" }}
        />
        {isPlaying ? (
          <FaCirclePause
            onClick={pause}
            style={{ cursor: "pointer", color: "#DFBF68", fontSize: "65px" }}
          />
        ) : (
          <FaPlayCircle
            onClick={start}
            style={{ cursor: "pointer", color: "#DFBF68", fontSize: "65px" }}
          />
        )}
        <VscDebugRestart
          onClick={reset}
          style={{ cursor: "pointer", color: "#DFBF68", fontSize: "40px" }}
        />
      </div>
    </div>
  );
}

export default Cronometro;
