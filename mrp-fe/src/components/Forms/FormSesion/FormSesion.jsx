import { Form, Button, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import * as formik from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import MySelect from "../MySelect/MySelect";

const formatDate = (date) => {
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return yyyy + "-" + mm + "-" + dd;
};

const FormSesion = ({
  sesion,
  abogados,
  postSesion,
  handleClose,
  materias,
  subMaterias,
}) => {
  const { Formik } = formik;
  const [options, setOptions] = useState([]);
  const validations = yup.object().shape({
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
      .min(1, "Seleccione una opción válida")
      .max(255, "Máximo 255 caracteres"),
    abogado: yup
      .array()
      .min(1, "Seleccione al menos un abogado")
      .of(
        yup.object().shape({
          value: yup.string().required(),
          label: yup.string().required(),
        })
      ),
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

  return (
    <div>
      <Formik
        validationSchema={validations}
        onSubmit={(values) => {
          const abogados = values.abogado.map((item) => {
            return item.value;
          });
          const caso = { ...sesion };
          caso.id_cliente = { nombre: values.id_cliente };
          caso.id_materia = { id: values.id_materia };
          caso.id_submateria = { id: values.id_submateria };
          caso.fecha = formatDate(new Date());
          const request = {caso: caso, abogados: abogados};
          postSesion(request);
        }}
        initialValues={{
          id_materia: sesion.id_materia.id,
          id_submateria: sesion.id_submateria.id,
          id_cliente: sesion.id_cliente.nombre,
          abogado: abogados,
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
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="input-cliente">
                  <Form.Label>Cliente</Form.Label>
                  <Form.Control
                    name="id_cliente"
                    type="text"
                    value={values.id_cliente}
                    onChange={handleChange}
                  />
                  {errors.id_cliente && touched.id_cliente && (
                    <div style={{ color: "red", marginTop: ".5rem" }}>
                      {errors.id_materia}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="input-materia">
                  <Form.Label>Materia</Form.Label>
                  <Form.Select
                    name="id_materia"
                    aria-label="select"
                    onChange={handleChange}
                    value={values.id_materia}
                  >
                    <option key={0} value={0}>
                      Seleccione una opción
                    </option>
                    {materias.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nombre}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.id_materia && touched.id_materia && (
                    <div style={{ color: "red", marginTop: ".5rem" }}>
                      {errors.id_materia}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="input-abogado">
                  <Form.Label>Abogado</Form.Label>
                  <MySelect
                    name="abogado"
                    placeholder="Seleccione uno o más abogados"
                    options={options}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    value={values.abogado}
                    error={errors.abogado}
                    touched={touched.abogado}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="input-submateria">
                  <Form.Label>Submateria</Form.Label>
                  <Form.Select
                    aria-label="select"
                    name="id_submateria"
                    onChange={handleChange}
                    value={values.id_submateria}
                  >
                    <option key={0} value={0}>
                      Seleccione una opción
                    </option>
                    {subMaterias.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nombre}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.id_submateria && touched.id_submateria && (
                    <div style={{ color: "red", marginTop: ".5rem" }}>
                      {errors.id_submateria}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <div>
              <hr></hr>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Button
                  variant="secondary"
                  style={{ marginRight: 2 }}
                  onClick={handleClose}
                >
                  Cerrar
                </Button>
                <Button variant="primary" type="submit">
                  Guardar
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormSesion;
