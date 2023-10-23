import formatDateShow from '../../utils/functions/formatDateShow';
import Select from 'react-select';
import './inputSelect.scss'

const InputSelect = ({objects, set, createOption, placeholder}) => {

  const handleSelect = (e) => {
    if(e === null){
      set(null);
    }else{
      const object = objects.find((obj) => obj.id === e.value);
      set(object);
    }
  }

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

