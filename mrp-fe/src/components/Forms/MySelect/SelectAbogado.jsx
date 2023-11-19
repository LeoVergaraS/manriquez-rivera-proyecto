import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { createOption } from "../../../data/options";
import { Form } from "react-bootstrap";
import urlweb from "../../../utils/config/urlweb";

const SelectAbogado = (props) => {
    const id_caso = props.caso;

    const [options, setOptions] = useState([]);
    const [casoAnterior, setCasoAnterior] = useState(id_caso);
    const [abogadoAnterior, setAbogadoAnterior] = useState(0);

    const handleChange = (e) => {
        console.log(e.target.value);
        props.onChange("id_abogado", e.target.value);
    };

    const handleBlur = () => {
        props.onBlur("id_abogado", true);
    };

    const getAbogadosByIdCaso = async (id) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` },
            };
            let url = `http://${urlweb}/abogados/caso/${id}`;
            const response = await axios.get(url, config);
            if (response.status === 200) {
                const abogados = response.data;
                setOptions(abogados.map((abogado) => createOption(abogado.id, abogado.nombre)));
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        id_caso != null ? getAbogadosByIdCaso(id_caso) : setOptions([]);

        if (casoAnterior != id_caso) {
            setAbogadoAnterior(props.value);
            props.onChange("id_abogado", 0);
        }else{
            props.value == 0 && props.onChange("id_abogado", abogadoAnterior);
        }
    }, [id_caso]);



    return (
        <Form.Select
            name="id_abogado"
            aria-label="select"
            onChange={handleChange}
            onBlur={handleBlur}
            options={options}
            value={props.value}
            disabled={id_caso == null}
            isValid={props.touched && !props.error}
            isInvalid={props.touched && !!props.error}
        >
            <option value={0} key={0}>{id_caso == null ? "Seleccione un caso" : "Seleccione un abogado"}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Form.Select>
    );

}

export default SelectAbogado;