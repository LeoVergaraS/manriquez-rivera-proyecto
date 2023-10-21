const formatFechaMeses = (flag,setFechaI,setFechaF,setDropSelect) => {
    const anio = new Date().getFullYear();
    if(flag === 1){
        const mes = (new Date().getMonth() + 12) % 12 + 1;
        const ultimoDia = new Date(anio, mes, 0);
        const fechaIFormat = `${anio}-${mes}-01`;
        const fechaFFormat = `${anio}-${mes}-${ultimoDia.getDate()}`;
        setFechaI(fechaIFormat);
        setFechaF(fechaFFormat);
        setDropSelect(ultimoDia.getDate());
    }

    if(flag === 2){
        const mes = (new Date().getMonth() + 11) % 12 + 1;
        const ultimoDia = new Date(anio, mes, 0);
        const fechaIFormat = `${anio}-${mes}-01`;
        const fechaFFormat = `${anio}-${mes}-${ultimoDia.getDate()}`;
        setFechaI(fechaIFormat);
        setFechaF(fechaFFormat);
        setDropSelect(ultimoDia.getDate());
    }

    if(flag === 3){
        const mes = (new Date().getMonth() + 10) % 12 + 1;
        const ultimoDia = new Date(anio, mes, 0);
        const fechaIFormat = `${anio}-${mes}-01`;
        const fechaFFormat = `${anio}-${mes}-${ultimoDia.getDate()}`;
        setFechaI(fechaIFormat);
        setFechaF(fechaFFormat);
        setDropSelect(ultimoDia.getDate());
    }

}

export default formatFechaMeses;
