import { useState } from 'react';
import formatDateShow from '../../utils/functions/formatDateShow';
import './inputSelect.scss'
const InputSelect = ({casos, setCaso, ObjDefault}) => {

  const [caso, setOption] = useState({});

  const handleSelect = (e) => {
    const index = e.target.value.split(".")[0] - 1;
    if (index !== -1) {
      const casoSeleccionado = casos[index];
      setCaso(casoSeleccionado);
      console.log(casoSeleccionado);
    }else{
      setCaso(ObjDefault);
    }
  }

  return (
    <div className="input-select">
      <input
        className="input-select__search"
        placeholder="¿Qué caso desea buscar?"
        type="text"
        list="casos"
        name="category"
        onSelect={handleSelect}
      />
      <datalist  id="casos">
        <option name="table1" value="1" selected="true" disabled="disabled">
          ¿Qué caso desea buscar?
        </option>
        {casos.map((caso, index) => (
          <option  key={caso.id} name={"caso" + index} value={(index + 1) + ".- " + caso.id_cliente.nombre + " - " + caso.id_materia.nombre}>
            {formatDateShow(caso.fecha)}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default InputSelect;
