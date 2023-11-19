import { Form, Button, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import * as formik from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MySelect from "../MySelect/MySelect";
import formatDateUpload from "../../../utils/functions/formatDateUpload";
import { VscCheck, VscClose } from "react-icons/vsc";
import sumOneDayToDate from "../../../utils/functions/sumOneDayToDate";
import Cookies from 'js-cookie';
import urlweb from "../../../utils/config/urlweb";

const FormCasoAdmin = (props) => {
  const caso = props.item;
  const close = props.close;
  const post = props.post;

  const { Formik } = formik;

  // Opciones de los selects
  const [optionsAbogados, setOptionsAbogados] = useState([]);
  const [optionsMaterias, setOptionsMaterias] = useState([]);
  const [optionsSubmaterias, setOptionsSubmaterias] = useState([]);
  const [optionsClientes, setOptionsClientes] = useState([]);

  // Abogados del caso, si se esta editando
  const [initialAbogados, setInitialAbogados] = useState(null);
  const [numbersAbogados, setNumbersAbogados] = useState(null);

  const validations = yup.object().shape({
    fecha: yup
      .date()
      .required("Ingrese una fecha válida")
      .max(
        formatDateUpload(new Date()),
        "La fecha no puede ser mayor a la actual"
      ),
    id_materia: yup
      .number()
      .required("Ingrese una materia válida")
      .min(1, "Seleccione una opción válida"),
    id_submateria: yup
      .number()
      .required("Ingrese una submateria válida")
      .min(1, "Seleccione una opción válida"),
    id_cliente: yup
      .string()
      .required("Ingrese un cliente válido")
      .min(1, "Mínimo 1 caracter")
      .max(255, "Máximo 255 caracteres"),
    abogado: yup
      .array()
      .min(1, "Seleccione al menos un abogado")
      .test(
        "Abogados",
        "No puede eliminar un abogado del caso",
        function (value) {
          return value.length >= numbersAbogados;
        }
      )
      .of(
        yup.object().shape({
          value: yup.string().required(),
          label: yup.string().required(),
        })
      ),
  });

  const getAbogados = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      };
      let url = `http://${urlweb}/abogados`;
      const response = await axios.get(url,config);
      if (response.status === 200) {
        const abogados = response.data;
        setOptionsAbogados(
          abogados.map((abogado) => ({
            value: abogado.id,
            label: abogado.nombre,
          }))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getMaterias = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      };
      let url = `http://${urlweb}/materias`;
      const response = await axios.get(url,config);
      if (response.status === 200) {
        const materias = response.data;
        setOptionsMaterias(
          materias.map((materia) => ({
            value: materia.id,
            label: materia.nombre,
          }))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getSubmaterias = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      };
      let url = `http://${urlweb}/submaterias`;
      const response = await axios.get(url,config);
      if (response.status === 200) {
        const submaterias = response.data;
        setOptionsSubmaterias(
          submaterias.map((submateria) => ({
            value: submateria.id,
            label: submateria.nombre,
          }))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getAbogadosByCaso = async (id) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      };
      let url = `http://${urlweb}/abogados/caso/${id}`;
      const response = await axios.get(url,config);
      if (response.status === 200) {
        setInitialAbogados(
          response.data.map((abogado) => ({
            value: abogado.id,
            label: abogado.nombre,
          }))
        );
        setNumbersAbogados(response.data.length);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getAbogados();
    getMaterias();
    getSubmaterias();
    caso === null ? null : getAbogadosByCaso(caso.id);
  }, [caso]);

  const Formulario = () => {
    return (
      <Formik
        validationSchema={validations}
        onSubmit={(values) => {
          const abogados = values.abogado.map((item) => {
            return item.value;
          });
          const object = {
            id: caso !== null ? caso.id : null,
            id_cliente: { nombre: values.id_cliente },
            id_materia: { id: values.id_materia },
            id_submateria: { id: values.id_submateria },
            fecha: sumOneDayToDate(values.fecha),
            borrado: caso !== null ? caso.borrado : false,
          };
          const request = { caso: object, abogados: abogados };
          post("Casos", request);
        }}
        initialValues={{
          id_materia: caso !== null ? caso.id_materia.id : 0,
          id_submateria: caso !== null ? caso.id_submateria.id : 0,
          id_cliente: caso !== null ? caso.id_cliente.nombre : "",
          fecha: caso !== null ? caso.fecha : "",
          abogado: caso === null ? [] : initialAbogados,
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
          handleBlur,
        }) => (
          <Form noValidate>
            <Form.Group className="mb-3" controlId="input-fecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                name="fecha"
                type="date"
                value={values.fecha}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.fecha && !errors.fecha}
                isInvalid={touched.fecha && !!errors.fecha}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fecha}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="input-materia">
              <Form.Label>Materia</Form.Label>
              <Form.Select
                name="id_materia"
                aria-label="select"
                value={values.id_materia}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.id_materia && !errors.id_materia}
                isInvalid={touched.id_materia && !!errors.id_materia}
              >
                <option key={0} value={0}>
                  Seleccione una opción
                </option>
                {optionsMaterias.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.id_materia}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="input-cliente">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                name="id_cliente"
                placeholder="Ingrese un cliente"
                type="text"
                value={values.id_cliente}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.id_cliente && !errors.id_cliente}
                isInvalid={touched.id_cliente && !!errors.id_cliente}
              />
              <Form.Control.Feedback type="invalid">
                {errors.id_cliente}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="input-submateria">
              <Form.Label>Submateria</Form.Label>
              <Form.Select
                aria-label="select"
                name="id_submateria"
                value={values.id_submateria}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.id_submateria && !errors.id_submateria}
                isInvalid={touched.id_submateria && !!errors.id_submateria}
              >
                <option key={0} value={0}>
                  Seleccione una opción
                </option>
                {optionsSubmaterias.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.id_submateria}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="input-abogado">
              <Form.Label>Abogados</Form.Label>
              <MySelect
                name="abogado"
                placeholder="Seleccione uno o más abogados"
                options={optionsAbogados}
                multi={true}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                value={values.abogado}
                error={errors.abogado}
                touched={touched.abogado}
              />
            </Form.Group>
            <hr />
            <div className="d-flex justify-content-end">
            <VscClose onClick={close} style={{cursor: "pointer", color: "rgb(172, 172, 172)", fontSize: 30}} />
            <VscCheck onClick={handleSubmit} style={{cursor: "pointer", color: "rgb(223, 191, 104)", fontSize: 30}} />
          </div>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <div>
      {caso === null
        ? Formulario()
        : initialAbogados !== null && Formulario()}
    </div>
  );
};

export default FormCasoAdmin;
