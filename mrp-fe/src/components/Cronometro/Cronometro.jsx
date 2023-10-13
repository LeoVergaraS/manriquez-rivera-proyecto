import { useEffect, useState, useRef } from "react";
import "./cronometro.scss";
import { FaPlayCircle, FaRegPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { VscDebugRestart } from "react-icons/vsc";
import { GiSaveArrow } from "react-icons/gi";
import axios from 'axios';
import formatDate from "../../utils/functions/fomatDate";
import { AiOutlinePlusCircle, AiFillSave } from 'react-icons/ai';
import Swal from 'sweetalert2';

function Cronometro({id_caso}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [sesiones, setSesiones] = useState([]);

  const [segundosTotales, setSegundosTotales] = useState(0);

  const tiempoInicial = parseInt(localStorage.getItem("tiempoCronometro")) || 0;
  const [tiempo, setTiempo] = useState(tiempoInicial);
  const intervalRef = useRef(null);
  const [runningTime, setRunningTime] = useState("");

  const [sesion, setSesion] = useState({
    id: null,
    fecha: null,
    tiempo: null,
    id_caso: {
        id: 0
    }
})

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
      setRunningTime("running");
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
      setRunningTime("");
      togglePlay();
      setIsPaused(true);
      clearInterval(intervalRef.current);
    }
  };

  const reset = () => {
    if (isPlaying) {
      pause();
    }
    setTiempo(0);
    localStorage.setItem("tiempoCronometro", "00:00:00");
  };

  const getSesiones = async () => {
    try {
      let url = 'http://localhost:8090/sesiones';
      const response = await axios.get(url);
      if (response.status === 200) {
        setSesiones(response.data);
      }
    }
    catch (err) {
      console.log(err.message);
    }
  }

  const save = () => {
    togglePlay();
    sesion.tiempo = tiempo;
    sesion.fecha = formatDate(new Date());
    sesion.id_caso.id = id_caso;
    console.log(sesion);
    createSesion(sesion);
  };


  const createSesion = async (sesion) => {
    try {
      let url = 'http://localhost:8090/sesiones';
      const response = await axios.post(url,sesion);
      if (response.status === 200) {
        console.log("Sesion creada");
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        )

      }
    }
    catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getSesiones();
}, [])

  return (
    <div className="App">
      <h1 className={"timer " + runningTime}>{formatearTiempo(tiempo)}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <AiFillSave
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
