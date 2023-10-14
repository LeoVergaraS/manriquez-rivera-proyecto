import './inputSelect.scss'
const InputSelect = ({casos}) => {
  return (
    <div className="input-select">
      <input
        className="input-select__search"
        placeholder="¿Qué caso desea buscar?"
        type="text"
        list="casos"
        name="category"
      />
      <datalist style={{fontSize: "50px"}} id="casos">
        <option name="table1" value="1" selected="true" disabled="disabled">
          ¿Qué caso desea buscar?
        </option>
        {casos.map((caso, id) => (
          <option  name={"caso" + id} value={caso.id_cliente.nombre + " - " + caso.id_materia.nombre}>
            {caso.fecha}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default InputSelect;
