const formatFechaMeses = (flag, setFechaI, setFechaF, setDropSelect) => {
    
    const anio = new Date().getFullYear();
    const mes = (new Date().getMonth() + flag) % 12 + 1;
    const ultimoDia = new Date(anio, mes, 0);
    const fechaIFormat = `${anio}-${mes}-01`;
    const fechaFFormat = `${anio}-${mes}-${ultimoDia.getDate()}`;
    setFechaI(fechaIFormat);
    setFechaF(fechaFFormat);
    setDropSelect(ultimoDia.getDate());

}

export default formatFechaMeses;
