import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { createCasoOption, createOption } from "../../../data/options";

const SelectCaso = (props) => {
    const id_abogado = props.abogado;

    const [options, setOptions] = useState([]);
    const [abogadoAnterior, setAbogadoAnterior] = useState(id_abogado);
    const [casoAnterior, setCasoAnterior] = useState(null);

    

    const handleChange = (value) => {
        props.onChange(props.name, value);
    };

    const handleBlur = () => {
        props.onBlur(props.name, true);
    };

    const getCasosByAbogado = async (id) => {
        try{
            const config = {
                headers: {Authorization: `Bearer ${Cookies.get("token")}`}
            }
            let url = `http://localhost:8090/casos/abogado/${id}`;
            const response = await axios.get(url, config);
            
            if(response.status === 200){
                const casos = response.data;
                setOptions(casos.map((caso) => createCasoOption(caso)));
            }
        }catch(err){
            console.error(err);
        }
    };

    useEffect(() => {
        if(id_abogado != 0){
            getCasosByAbogado(id_abogado);
        }else{
            setOptions([]);
        }

        if(id_abogado != abogadoAnterior){
            setCasoAnterior(props.value);
            props.onChange(props.name, null);
        }else{
            props.value == null && props.onChange(props.name, casoAnterior);
        }
    }, [id_abogado]);



    return (
        <div className="">
            <Select
                name={props.name}
                options={options}
                placeholder={id_abogado != 0 ? "Seleccione un caso" : "Seleccione un abogado"}
                isMulti={false}
                isDisabled={id_abogado == 0}
                isClearable={false}
                onChange={handleChange}
                onBlur={handleBlur}
                value={props.value}
            />
            {!!props.error && props.touched && (
                <div style={{ color: '#dc3545', marginTop: '.25rem', fontSize: '.875em' }}>{props.error}</div>
            )}
        </div>
    );

}

export default SelectCaso;