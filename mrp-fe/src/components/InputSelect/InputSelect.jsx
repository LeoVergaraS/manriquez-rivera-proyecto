import formatDateShow from '../../utils/functions/formatDateShow';
import Select from 'react-select';
import './inputSelect.scss'

const InputSelect = ({casos, setCaso}) => {

  const handleSelect = (e) => {
    if(e === null){
      setCaso(null)
    }else{
      const caso = casos.find((caso) => caso.id === e.value);
      setCaso(caso);
    }
  }

  return (
    <div className="input-select">
      <Select 
        placeholder="¿Qué caso desea buscar?"
        options={casos.map((caso) => 
              ({label: `${caso.id_cliente.nombre} - ${caso.id_materia.nombre} - ${formatDateShow(caso.fecha)}`, 
                value: caso.id}))
                }
        onChange={handleSelect}
        defaultValue={null}
      />
    </div>
  );
};

export default InputSelect;

