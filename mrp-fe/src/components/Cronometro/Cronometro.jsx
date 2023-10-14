import { useEffect, useState, useRef } from "react";
import "./cronometro.scss";
import { FaPlayCircle, FaRegPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { VscDebugRestart } from "react-icons/vsc";
import { GiSaveArrow } from "react-icons/gi";
import axios from "axios";
import formatDate from "../../utils/functions/fomatDate";
import { AiOutlinePlusCircle, AiFillSave } from "react-icons/ai";
import Swal from "sweetalert2";

function Cronometro({ id_caso }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tiempoInicial = parseInt(localStorage.getItem("tiempoCronometro")) || 0;
  const [tiempo, setTiempo] = useState(tiempoInicial);
  const intervalRef = useRef(null);
  const [runningTime, setRunningTime] = useState("");

  const [sesion, setSesion] = useState({
    id: null,
    fecha: null,
    tiempo: null,
    id_caso: {
      id: 0,
    },
  });

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
      let url = "http://localhost:8090/sesiones";
      const response = await axios.get(url);
      if (response.status === 200) {
        setSesiones(response.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

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
      let url = "http://localhost:8090/sesiones";
      const response = await axios.post(url, sesion);
      if (response.status === 200) {
        console.log("Sesion creada");
        Swal.fire("Good job!", "You clicked the button!", "success");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getSesiones();
    if (id_caso !== 0) {
      setDisabled("");
    }
  }, []);

  return (
    <div className="cronometro">
      <h1 className={"cronometro__timer " + runningTime}>
        {formatearTiempo(tiempo)}
      </h1>
      <div className="cronometro__actions">
        <AiFillSave
          className={
            id_caso === 0
              ? "cronometro__actions-save-disabled"
              : "cronometro__actions-save"
          }
          onClick={id_caso === 0 ? null : save}
        />
        {isPlaying ? (
          <FaCirclePause
            className={
              id_caso === 0
                ? "cronometro__actions-pause-disabled"
                : "cronometro__actions-pause"
            }
            onClick={id_caso === 0 ? null : pause}
          />
        ) : (
          <FaPlayCircle
            className={
              id_caso === 0
                ? "cronometro__actions-play-disabled"
                : "cronometro__actions-play"
            }
            onClick={id_caso === 0 ? null : start}
          />
        )}
        <VscDebugRestart
          onClick={id_caso === 0 ? null : reset}
          className={
            id_caso === 0
              ? "cronometro__actions-reset-disabled"
              : "cronometro__actions-reset"
          }
          style={{ cursor: "pointer", color: "#DFBF68", fontSize: "40px" }}
        />
      </div>
    </div>
  );
}

export default Cronometro;
