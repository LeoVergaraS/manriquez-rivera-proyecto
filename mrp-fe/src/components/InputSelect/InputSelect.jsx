import Select from 'react-select';
import './inputSelect.scss'

const InputSelect = ({ objects, set, options, placeholder, home, className }) => {


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
      }
      //const XD = JSON.parse(localStorage.getItem("CasoSeleccionado"));

      // Imprime el objeto en la consola
      //console.log(XD);

    }
};
    return (
      <div className={`input-select ${className}`}>
        <Select
          placeholder={placeholder}
          options={options}
          onChange={handleSelect}
          defaultValue={null}
        />
      </div>
    );
  };

  export default InputSelect;

