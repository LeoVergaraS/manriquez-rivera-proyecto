import { useEffect, useState, useRef } from "react";
import "./cronometro.scss";
import { FaPlayCircle, FaRegPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { VscDebugRestart } from "react-icons/vsc";
import { GiSaveArrow } from "react-icons/gi";
import axios from "axios";
import formatDate from "../../utils/functions/formatearFecha";
import { AiOutlinePlusCircle, AiFillSave } from "react-icons/ai";
import Swal from "sweetalert2";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import Select from 'react-select'

function Cronometro({ id_caso, ts, setIsDisabled }) {
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

  const start = async () => {
    if (!isPlaying) {
      setRunningTime("running");
      setIsDisabled(true);
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
      setIsDisabled(false);
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

  const resetButton = () => {
    if (isPlaying) {
      pause();
    }
    Swal.fire({
      title: '¿Estás seguro de reiniciar el cronómetro?',
      text: "No podrá ser recuperado el tiempo transcurrido",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Reiniciar cronómetro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        reset();
      }
      else{
      }
    })    
  };

  // const getSesiones = async () => {
  //   try {
  //     let url = "http://localhost:8090/sesiones";
  //     const response = await axios.get(url);
  //     if (response.status === 200) {
  //       setSesiones(response.data);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const save = () => {
    let estaPausado=0;
    if(!isPlaying){
      estaPausado=1;
      
    }
    console.log(estaPausado);
    pause();
    Swal.fire({
      title: '¿Estás seguro de guardar la sesión?',
      text: "Esto no podrá ser modificado después",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Guardar la sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        sesion.tiempo = tiempo;
        sesion.fecha = formatDate(new Date());
        sesion.id_caso.id = id_caso;
        console.log(sesion);
        createSesion(sesion);
        reset();
      }
      else{
        if(estaPausado==0){
          start();
        }
      }
    })

  };

  const createSesion = async (sesion) => {
    try {
      let url = "http://localhost:8090/sesiones";
      const response = await axios.post(url, sesion);
      if (response.status === 200) {
        Swal.fire("Sesión guardada con exito!", "", "success");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if(tiempo % (ts * 60) === 0 && ts !== -1){
      pause();
    }
  }, [tiempo, ts]);

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
          data-tooltip-id={id_caso === 0 ? null : "tooltip-cronometro"}
          data-tooltip-content={id_caso === 0 ? null : "Guardar sesión"}
        />
        {isPlaying ? (
          <FaCirclePause
            className={
              id_caso === 0
                ? "cronometro__actions-pause-disabled"
                : "cronometro__actions-pause"
            }
            onClick={id_caso === 0 ? null : pause}
            data-tooltip-id={id_caso === 0 ? null : "tooltip-cronometro"}
            data-tooltip-content={id_caso === 0 ? null : "Pausar cronometro"}
          />
        ) : (
          <FaPlayCircle
            className={
              id_caso === 0
                ? "cronometro__actions-play-disabled"
                : "cronometro__actions-play"
            }
            onClick={id_caso === 0 ? null : start}
            data-tooltip-id={id_caso === 0 ? null : "tooltip-cronometro"}
            data-tooltip-content={id_caso === 0 ? null : "Iniciar cronometro"}
          />
        )}
        <VscDebugRestart
          onClick={id_caso === 0 ? null : resetButton}
          className={
            id_caso === 0
              ? "cronometro__actions-reset-disabled"
              : "cronometro__actions-reset"
          }
          data-tooltip-id={id_caso === 0 ? null : "tooltip-cronometro"}
          data-tooltip-content={id_caso === 0 ? null : "Resetear cronometro"}
        />
      </div>
      <Tooltip
        id="tooltip-cronometro"
        style={{ backgroundColor: "#DFBF68", fontSize: 20 }}
      />

    </div>

  );
}

export default Cronometro;
