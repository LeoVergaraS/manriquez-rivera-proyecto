const calcularFechaInicio = (diasRestar) => {
    const fechaI = new Date();
    fechaI.setDate(fechaI.getDate() - diasRestar);
    return fechaI;
  };

  const formatearFecha = (fecha, flag, diasRestar) => {

    if (flag === 0) {
      const fechaI = calcularFechaInicio(diasRestar);
      const anio = fechaI.getFullYear();
      const mes = String(fechaI.getMonth() + 1).padStart(2, "0");
      const dia = String(fechaI.getDate()).padStart(2, "0");
      const fechaFormateada = `${anio}-${mes}-${dia}`;
      return fechaFormateada;
    } else {
      const anio = fecha.getFullYear();
      const mes = String(fecha.getMonth() + 1).padStart(2, "0");
      const dia = String(fecha.getDate()).padStart(2, "0");
      const fechaFormateada = `${anio}-${mes}-${dia}`;
      return fechaFormateada;
    }
  };

export default formatearFecha;