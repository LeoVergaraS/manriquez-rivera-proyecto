import mesesAbreviados from '../../data/mesesAbreviados'

const formatDateBarraFiltro = (fechaInicio, fechaFin) => {
    
    const fechaIn = new Date (fechaInicio);
    const fechaFi = new Date (fechaFin);

    let d1 = "";
    let m1 = "";
    let anio1 = "";
    let d2 = "";
    let m2 = "";
    let anio2 = "";

    if(fechaIn.getFullYear() == fechaFi.getFullYear()){
        if(fechaIn.getMonth() == fechaFi.getMonth()){
            d1 = fechaIn.getDate();
            m1 = mesesAbreviados[fechaIn.getMonth()];
            anio1 = fechaIn.getFullYear();
            d2 = fechaFi.getDate();
            m2 = mesesAbreviados[fechaFi.getMonth()];
            anio2 = fechaFi.getFullYear();
            return `${d1} - ${d2} ${m2} ${anio2}`;
        }else{
            d1 = fechaIn.getDate();
            m1 = mesesAbreviados[fechaIn.getMonth()];
            anio1 = fechaIn.getFullYear();
            d2 = fechaFi.getDate();
            m2 = mesesAbreviados[fechaFi.getMonth()];
            anio2 = fechaFi.getFullYear();
            return `${d1} ${m1} - ${d2} ${m2} ${anio2}`;
        }
    }else{
        d1 = fechaIn.getDate();
        m1 = mesesAbreviados[fechaIn.getMonth()];
        anio1 = fechaIn.getFullYear();
        d2 = fechaFi.getDate();
        m2 = mesesAbreviados[fechaFi.getMonth()];
        anio2 = fechaFi.getFullYear();
        return `${d1} ${m1} ${anio1} - ${d2} ${m2} ${anio2}`;
    }
}

export default formatDateBarraFiltro;