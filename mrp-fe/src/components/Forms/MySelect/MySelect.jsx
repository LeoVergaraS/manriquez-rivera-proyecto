import React from 'react';
import Select from 'react-select';

const MySelect = (props) => {
  const handleChange = (value) => {
    props.onChange(props.name, value);
  };

  const handleBlur = () => {
    props.onBlur(props.name, true);
  };

  return (
    <div>
      <Select
        name={props.name}
        options={props.options}
        placeholder={props.placeholder}
        isMulti={props.multi}
        isClearable={false}
        onChange={handleChange}
        onBlur={handleBlur}
        value={props.value}
      />
      {!!props.error && props.touched && (
        <div style={{ color: '#dc3545', marginTop: '.25rem', fontSize: '.875em' }}>{props.error}</div>
      )}
    </div>
  )
};

export default MySelect;
