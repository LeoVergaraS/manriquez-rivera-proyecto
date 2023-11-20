import { Col, Form, InputGroup, Row } from "react-bootstrap";
import * as yup from "yup";
import * as formik from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { VscCheck, VscClose } from "react-icons/vsc";
import formatDateUpload from "../../../utils/functions/formatDateUpload";
import sumOneDayToDate from "../../../utils/functions/sumOneDayToDate";
import Cookies from "js-cookie";
import { createCasoOption } from "../../../data/options";
import Select from "react-select";
import SelectAbogado from "../MySelect/SelectAbogado";
import urlweb from "../../../utils/config/urlweb";

const FormSesion = (props) => {
  const sesion = props.item;
  const close = props.close;
  const post = props.post;

  const { Formik } = formik;

  const [options, setOptions] = useState([]);

  const validations = yup.object().shape({
    horas: yup
      .number()
      .required("Campo requerido")
      .min(0, "Mínimo 0 hora")
      .max(24, "Máximo 24 horas"),
    minutos: yup
      .number()
      .required("Campo requerido")
      .min(0, "Mínimo 0 minutos")
      .max(59, "Máximo 59 minutos"),
    segundos: yup
      .number()
      .required("Campo requerido")
      .min(0, "Mínimo 0 segundos")
      .max(59, "Máximo 59 segundos"),
    fecha: yup
      .date()
      .required("Campo requerido")
      .max(
        formatDateUpload(new Date()),
        "La fecha no puede ser mayor a la actual"
      ),
    hora_inicio: yup.string().required("Campo requerido"),
    id_caso: yup.object().shape({
      value: yup.number().required("Campo requerido"),
      label: yup.string().required("Campo requerido"),
    }).required("Campo requerido"),
    id_abogado: yup
      .number()
      .required("Campo requerido")
      .min(1, "Seleccione una opción válida"),
    actividad: yup
      .string()
      .required("Campo requerido")
      .max(255, "Máximo 255 caracteres"),
  });

  const getCasos = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      };
      let url = `http://${urlweb}/casos`;
      const response = await axios.get(url, config);
      if (response.status === 200) {
        const casos = response.data;
        setOptions(casos.map((caso) => createCasoOption(caso)));
      }
    } catch (err) {
      console.error(err);
    }
  };



  useEffect(() => {
    getCasos();
    console.log(sesion);
  }, []);

  const Formulario = () => {
    return (
      <Formik
        validationSchema={validations}
        onSubmit={(values) => {
          const object = {
            id: sesion !== null ? sesion.id : null,
            tiempo: values.horas * 3600 + values.minutos * 60 + values.segundos,
            fecha: values.fecha,
            id_caso: { id: values.id_caso.value },
            id_abogado: { id: values.id_abogado },
            actividad: values.actividad,
            hora_inicio: values.hora_inicio,
            borrado: sesion !== null ? sesion.borrado : false,
          };
          post("Sesiones", object);
        }}
        initialValues={{
          horas: sesion !== null ? Math.floor(sesion.tiempo / 3600) : 0,
          minutos: sesion !== null ? Math.floor((sesion.tiempo % 3600) / 60) : 0,
          segundos: sesion !== null ? sesion.tiempo % 60 : 0,
          fecha: sesion !== null ? sesion.fecha : "",
          hora_inicio: sesion !== null ? sesion.hora_inicio : "",
          id_caso: sesion !== null ? createCasoOption(sesion.id_caso) : null,
          id_abogado: sesion !== null ? sesion.id_abogado.id : 0,
          actividad: sesion !== null ? sesion.actividad : "",
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
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="input-tiempo">
              <Form.Label>Tiempo de la sesión</Form.Label>
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
            <Row>
              <Col>
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
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="input-hora-inicio">
                  <Form.Label>Hora inicio</Form.Label>
                  <Form.Control
                    name="hora_inicio"
                    type="time"
                    step={1}
                    value={values.hora_inicio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.hora_inicio && !errors.hora_inicio}
                    isInvalid={touched.hora_inicio && !!errors.hora_inicio}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.hora_inicio}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>


            <Form.Group className="mb-3" controlId="input-caso">
              <Form.Label>Caso</Form.Label>
              <Select
                name="id_caso"
                options={options}
                placeholder="Seleccione un caso"
                isMulti={false}
                isClearable={false}
                onChange={(value) => setFieldValue("id_caso", value)}
                onBlur={() => setFieldTouched("id_caso", true)}
                value={values.id_caso}
              />
              {!!errors.id_caso && touched.id_caso && (
                <div style={{ color: '#dc3545', marginTop: '.25rem', fontSize: '.875em' }}>{errors.id_caso}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="input-abogado">
              <Form.Label>Abogado</Form.Label>
              <SelectAbogado
                caso={values.id_caso !== null ? values.id_caso.value : null}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                value={values.id_abogado}
                touched={touched.id_abogado}
                error={errors.id_abogado}
              />
              <Form.Control.Feedback type="invalid">
                {errors.id_abogado}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="input-actividad">
              <Form.Label>Actividad</Form.Label>
              <Form.Control
                placeholder="Ingrese una actividad"
                name="actividad"
                type="textarea"
                value={values.actividad}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.actividad && !errors.actividad}
                isInvalid={touched.actividad && !!errors.actividad}
              />
              <Form.Control.Feedback type="invalid">
                {errors.actividad}
              </Form.Control.Feedback>
            </Form.Group>
            <hr />
            <div className="d-flex justify-content-end">
              <VscClose
                onClick={close}
                style={{
                  cursor: "pointer",
                  color: "rgb(172, 172, 172)",
                  fontSize: 30,
                }}
              />
              <VscCheck
                onClick={handleSubmit}
                style={{
                  cursor: "pointer",
                  color: "rgb(223, 191, 104)",
                  fontSize: 30,
                }}
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
