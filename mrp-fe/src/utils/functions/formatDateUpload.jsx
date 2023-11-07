/**
 * Esta funcion formatea una fecha en el formato yyyy-mm-dd para poder ser subida a la base de datos
 * @param {Date} date - Fecha a formatear
 * @returns {string} - Fecha formateada en el formato yyyy-mm-dd
 */
const formatDateUpload = (date) => {
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return yyyy + "-" + mm + "-" + dd;
};

export default formatDateUpload;