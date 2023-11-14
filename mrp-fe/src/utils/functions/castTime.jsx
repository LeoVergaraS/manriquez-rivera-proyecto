const castTime = (time) => {
    if(time < 60){
      return `${time} seg`;
    } else if (time < 3600) {
      // Si es menor a una hora, muestra solo minutos
      const minutos = Math.floor(time / 60);
      return `${minutos} min`;
    } else {
      // Si es una hora o más, muestra horas y minutos
      const horas = Math.floor(time / 3600);
      const minutos = Math.floor((time % 3600) / 60);
      const horasStr = String(horas).padStart(2, '0');
      const minutosStr = String(minutos).padStart(2, '0');
      if(horasStr === "01"){
        return `${horasStr} hr ${minutosStr} min`;
      }else
      return `${horasStr} hrs ${minutosStr} min`;
    }
  }
  

  export default castTime;