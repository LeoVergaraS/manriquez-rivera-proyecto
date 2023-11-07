import { Form, Button, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import * as formik from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MySelect from "../MySelect/MySelect";
import formatDateUpload from "../../../utils/functions/formatDateUpload";

const FormCaso = ({ caso, postCaso, handleClose, materias, subMaterias }) => {
  const { Formik } = formik;
  const [options, setOptions] = useState([]);
  const [initialAbogados, setInitialAbogados] = useState(null);
  const [numbersAbogados, setNumbersAbogados] = useState(null);

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

  const getAbogadosByCaso = async (id) => {
    try {
      let url = "http://localhost:8090/abogados/caso/" + id;
      const response = await axios.get(url);
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
    caso.id === null ? null : getAbogadosByCaso(caso.id);
  }, [caso.id]);

  const Formulario = () => {
    return (
      <Formik
        validationSchema={validations}
        onSubmit={(values) => {
          const abogados = values.abogado.map((item) => {
            return item.value;
          });
          const fecha = new Date();
          const item = { ...caso };
          item.id_cliente = { nombre: values.id_cliente };
          item.id_materia = { id: values.id_materia };
          item.id_submateria = { id: values.id_submateria };
          item.fecha = formatDateUpload(
            new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + 1)
          );
          const request = { caso: item, abogados: abogados };
          postCaso(request);
        }}
        initialValues={{
          id_materia: caso.id_materia.id,
          id_submateria: caso.id_submateria.id,
          id_cliente: caso.id_cliente.nombre,
          abogado: caso.id === null ? [] : initialAbogados,
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
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="input-cliente">
                  <Form.Label>Cliente</Form.Label>
                  <Form.Control
                    name="id_cliente"
                    placeholder="Ingrese un cliente"
                    type="text"
                    value={values.id_cliente}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.id_cliente && touched.id_cliente && (
                    <div style={{ color: "red", marginTop: ".5rem" }}>
                      {errors.id_cliente}
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
                    onBlur={handleBlur}
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
                    onBlur={handleBlur}
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
                  style={{ marginRight: 2, backgroundColor: "#ACACAC", border: "none"  }}
                  onClick={handleClose}
                >
                  Cerrar
                </Button>
                <Button variant="primary" type="submit" style={{backgroundColor: "#DFBF68", border:"none" }}>
                  Guardar
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <div>
      {caso.id === null
        ? Formulario()
        : initialAbogados !== null && Formulario()}
    </div>
  );
};

export default FormCaso;
