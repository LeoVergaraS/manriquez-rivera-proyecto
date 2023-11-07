/**
 * Esta funcion formatea un string del formato yyyy-mm-dd al formato dd/mm/yyyy para poder mostrarlo en las vistas
 * @param {string} date Fecha a formatear
 * @returns {string} Fecha formateada en el formato dd/mm/yyyy
 */
const formatDateShow = (date) => {
    if (date === null) return ""
    const fechaDate = date.split("-")
    let dd = fechaDate[2];
    let mm = fechaDate[1];
    let yyyy = fechaDate[0];
    return dd + "/" + mm + "/" + yyyy;
}

export default formatDateShow;

