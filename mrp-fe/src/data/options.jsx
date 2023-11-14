import formatDateShow from "../utils/functions/formatDateShow";


/////////////////////////////////////
//             General            
/////////////////////////////////////
const createOption = (value, label) => {
    return {
        value: value,
        label: label,
    };
}

/////////////////////////////////////
//           Especificos
/////////////////////////////////////
const createCasoOption = (caso) => {
    return {
        value: caso.id,
        label: `${caso.id_cliente.nombre} - ${caso.id_materia.nombre} - ${formatDateShow(caso.fecha)}`,
    };
}

export {createOption, createCasoOption};

