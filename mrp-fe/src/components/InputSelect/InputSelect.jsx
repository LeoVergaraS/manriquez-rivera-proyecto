import formatDateShow from '../../utils/functions/formatDateShow';
import Select from 'react-select';
import './inputSelect.scss'

const InputSelect = ({ objects, set, createOption, placeholder, home }) => {

  const handleSelect = (e) => {
    if (e === null) {
      set(null);
    } else {

      const object = objects.find((obj) => obj.id === e.value);
      set(object);
      if (home) {
        const objectJson = JSON.stringify(object)
        //console.log(objectJson);
        localStorage.setItem("CasoSeleccionado", objectJson);
        console.log("ENTRA");
      }
      //const XD = JSON.parse(localStorage.getItem("CasoSeleccionado"));

      // Imprime el objeto en la consola
      //console.log(XD);

    }
};
    return (
      <div className="input-select">
        <Select
          placeholder={placeholder}
          options={objects.map((obj) => createOption(obj))}
          onChange={handleSelect}
          defaultValue={null}
        />
      </div>
    );
  };

  export default InputSelect;

