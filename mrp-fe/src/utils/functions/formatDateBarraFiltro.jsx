import mesesAbreviados from '../../data/mesesAbreviados'

const formatDateBarraFiltro = (fechaInicio, fechaFin) => {

    const fechaIn = new Date (fechaInicio); 
    const fechaFi = new Date (fechaFin);

    fechaIn.setDate(fechaIn.getDate() + 1);
    fechaFi.setDate(fechaFi.getDate() + 1);

    let d1 = fechaIn.getDate();;
    let m1 = mesesAbreviados[fechaIn.getMonth()];
    let anio1 = fechaIn.getFullYear();
    let d2 = fechaFi.getDate();
    let m2 = mesesAbreviados[fechaFi.getMonth()];
    let anio2 = fechaFi.getFullYear();

    if(fechaIn.getFullYear() == fechaFi.getFullYear()){
        if(fechaIn.getMonth() == fechaFi.getMonth()){
            return `${d1} - ${d2} ${m2} ${anio2}`;
        }else{
            return `${d1} ${m1} - ${d2} ${m2} ${anio2}`;
        }
    }else{
        return `${d1} ${m1} ${anio1} - ${d2} ${m2} ${anio2}`;
    }
}

export default formatDateBarraFiltro;