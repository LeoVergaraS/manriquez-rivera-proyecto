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
        isMulti
        isClearable={false}
        onChange={handleChange}
        onBlur={handleBlur}
        value={props.value}
      />
      {!!props.error && props.touched && (
        <div style={{ color: 'red', marginTop: '.5rem' }}>{props.error}</div>
      )}
    </div>
  )
};

export default MySelect;
