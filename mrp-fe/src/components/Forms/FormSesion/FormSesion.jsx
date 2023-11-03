import { Form, InputGroup } from "react-bootstrap";
import * as yup from "yup";
import * as formik from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {VscCheck, VscClose} from "react-icons/vsc";
import formatDateUpload from "../../../utils/functions/formatDateUpload";
import sumOneDayToDate from "../../../utils/functions/sumOneDayToDate";

const FormSesion = (props) => {
  const sesion = props.item;
  const close = props.close;
  const post = props.post;

  const { Formik } = formik;

  const [options, setOptions] = useState([]);

  const validations = yup.object().shape({
    horas: yup
      .number()
      .required("Ingrese una cantidad de horas válida")
      .min(0, "Mínimo 0 hora")
      .max(24, "Máximo 24 horas"),
    minutos: yup
      .number()
      .required("Ingrese una cantidad de minutos válida")
      .min(0, "Mínimo 0 minutos")
      .max(59, "Máximo 59 minutos"),
    segundos: yup
      .number()
      .required("Ingrese una cantidad de segundos válida")
      .min(0, "Mínimo 0 segundos")
      .max(59, "Máximo 59 segundos"),
    fecha: yup
      .date()
      .required("Ingrese una fecha válida")
      .max(formatDateUpload(new Date()), "La fecha no puede ser mayor a la actual"),
    id_caso: yup
      .number()
      .required("Ingrese un caso válido")
      .min(1, "Ingrese una opción válida"),
    id_abogado: yup
      .number()
      .required("Ingrese un abogado válido")
      .min(1, "Seleccione una opción válida"),
  });

  const getAbogados = async () => {
    try {
      let url = "http://localhost:8090/abogados";
      const response = await axios.get(url);
      if (response.status === 200) {
        const abogados = response.data;
        setOptions(
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

  useEffect(() => {
    getAbogados();
  }, []);

  const Formulario = () => {
    return (
      <Formik
        validationSchema={validations}
        onSubmit={(values) => {
          const object = {
            id: sesion !== null ? sesion.id : null,
            tiempo: values.horas * 3600 + values.minutos * 60 + values.segundos,
            fecha: sumOneDayToDate(values.fecha),
            id_caso: { id: values.id_caso },
            id_abogado: { id: values.id_abogado },
            borrado: sesion !== null ? sesion.borrado : false,
          };
          post("Sesiones",object);
        }}
        initialValues={{
          horas: sesion !== null ? Math.floor(sesion.tiempo / 3600) : 0,
          minutos:
            sesion !== null ? Math.floor((sesion.tiempo % 3600) / 60) : 0,
          segundos: sesion !== null ? sesion.tiempo % 60 : 0,
          fecha: sesion !== null ? sesion.fecha : "",
          id_caso: sesion !== null ? sesion.id_caso.id : 0,
          id_abogado: sesion !== null ? sesion.id_abogado.id : 0,
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
          handleBlur,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="input-tiempo">
              <Form.Label>Tiempo</Form.Label>
              <InputGroup>
                <Form.Control
                  name="horas"
                  type="number"
                  value={values.horas}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.horas && !errors.horas}
                  isInvalid={touched.horas && !!errors.horas}
                />
                <InputGroup.Text>hrs</InputGroup.Text>
                <Form.Control
                  name="minutos"
                  type="number"
                  value={values.minutos}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.minutos && !errors.minutos}
                  isInvalid={touched.minutos && !!errors.minutos}
                />
                <InputGroup.Text>min</InputGroup.Text>
                <Form.Control
                  name="segundos"
                  type="number"
                  value={values.segundos}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.segundos && !errors.segundos}
                  isInvalid={touched.segundos && !!errors.segundos}
                />
                <InputGroup.Text>seg</InputGroup.Text>
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {errors.horas}
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.minutos}
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.segundos}
              </Form.Control.Feedback>
            </Form.Group>
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
            <Form.Group className="mb-3" controlId="input-caso">
              <Form.Label>Caso</Form.Label>
              <Form.Control
                name="id_caso"
                type="number"
                value={values.id_caso}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.id_caso && !errors.id_caso}
                isInvalid={touched.id_caso && !!errors.id_caso}
              />
              <Form.Control.Feedback type="invalid">
                {errors.id_caso}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="input-abogado">
              <Form.Label>Abogado</Form.Label>
              <Form.Select
                name="id_abogado"
                aria-label="select"
                onChange={handleChange}
                value={values.id_abogado}
                onBlur={handleBlur}
                isValid={touched.id_abogado && !errors.id_abogado}
                isInvalid={touched.id_abogado && !!errors.id_abogado}
              >
                <option key={0} value={0}>
                  Seleccione una opción
                </option>
                {options.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.id_abogado}
              </Form.Control.Feedback>
            </Form.Group>
            <hr />
            <div className="d-flex justify-content-end">
              <VscClose
                onClick={close}
                style={{ cursor: "pointer", color: "red", fontSize: 30 }}
              />
              <VscCheck
                onClick={handleSubmit}
                style={{ cursor: "pointer", color: "green", fontSize: 30 }}
              />
            </div>
          </Form>
        )}
      </Formik>
    );
  };

  return <div>{options !== null && Formulario()}</div>;
};

export default FormSesion;
