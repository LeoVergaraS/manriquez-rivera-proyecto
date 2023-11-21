import CreatableSelect from 'react-select/creatable';

const SelectCrear = (props) => {
    const handleChange = (value) => {
        props.onChange(props.name, value);
    };

    const handleBlur = () => {
        props.onBlur(props.name, true);
    };

    return (
        <div>
            <CreatableSelect 
                name = {props.name}
                options = {props.options}
                placeholder = {props.placeholder}
                isClearable
                onChange = {handleChange}
                onBlur = {handleBlur}
                value = {props.value}
                formatCreateLabel={(inputValue) => `Crear ${props.text} "${inputValue}"`}
            />
            {!!props.error && props.touched && (
                <div style={{ color: '#dc3545', marginTop: '.25rem', fontSize: '.875em' }}>{props.error}</div>
            )}
        </div>
    );
}

export default SelectCrear