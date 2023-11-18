import mesesAbreviados from '../../data/mesesAbreviados'

const formatDateBarraFiltro = (fechaInicio, fechaFin) => {

    const fechaInicioSplit = fechaInicio.split('-');
    const fechaFinSplit = fechaFin.split('-');
    
    let d1 = fechaInicioSplit[2];
    let m1 = mesesAbreviados[fechaInicioSplit[1] - 1];
    let anio1 = fechaInicioSplit[0];
    let d2 = fechaFinSplit[2];
    let m2 = mesesAbreviados[fechaFinSplit[1] - 1];
    let anio2 = fechaFinSplit[0];

    if(fechaInicioSplit[0] == fechaFinSplit[0]){
        if(fechaInicioSplit[1] == fechaFinSplit[1]){
            return `${d1} - ${d2} ${m2} ${anio2}`;
        }else{
            return `${d1} ${m1} - ${d2} ${m2} ${anio2}`;
        }
    }
    return `${d1} ${m1} ${anio1} - ${d2} ${m2} ${anio2}`;
}

export default formatDateBarraFiltro;