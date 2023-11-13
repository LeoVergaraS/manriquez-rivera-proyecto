/**
 * Esta funcion formatea una fecha en el formato yyyy-mm-dd para poder ser subida a la base de datos
 * @param {Date} date - Fecha a formatear
 * @returns {string} - Fecha formateada en el formato yyyy-mm-dd
 */
const formatDateUpload = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export default formatDateUpload;