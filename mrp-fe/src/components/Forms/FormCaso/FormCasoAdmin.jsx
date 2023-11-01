import { Form, Button, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import * as formik from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MySelect from "../MySelect/MySelect";
import formatDateUpload from "../../../utils/functions/formatDateUpload";

const FormCasoAdmin = ({
  caso,
  postCaso,
  handleClose,
}) => {

  const caso = props.item;
  const close = props.close;
  const post = props.post;

  const { Formik } = formik;

  // Opciones de los selects
  const [optionsAbogados, setOptionsAbogados] = useState([]);
  const [optionsMaterias, setOptionsMaterias] = useState([]);
  const [optionsSubmaterias, setOptionsSubmaterias] = useState([]);

  // Abogados del caso, si se esta editando
  const [initialAbogados, setInitialAbogados] = useState(null);
  const [numbersAbogados, setNumbersAbogados] = useState(null);

  const validations = yup.object().shape({
    fecha: yup
      .date()
      .required("Ingrese una fecha válida")
      .max(formatDateUpload(new Date()), "La fecha no puede ser mayor a la actual"),
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
      .test("Abogados", "No puede eliminar un abogado del caso", function(value){return value.length >= numbersAbogados})
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
      let url = "http://localhost:8090/materias";
      const response = await axios.get(url);
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
      let url = "http://localhost:8090/submaterias";
      const response = await axios.get(url);
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
    getMaterias();
    getSubmaterias();
    caso.id === null ? null : getAbogadosByCaso(caso.id);
  }, [caso.id]);

  const Formulario = () => {
    return ( <Formik
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
          fecha: values.fecha,
          borrado: caso !== null ? caso.borrado : false,
        }
        const request = { caso: object, abogados: abogados };
        postCaso("Casos",request);
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
        handleBlur
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
                {errors.id_cliente && 
                  touched.id_cliente && (
                    <div style={{ color: "red", marginTop: ".5rem" }}>{errors.id_cliente}</div>
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
                  options={optionsAbogados}
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
    </Formik>)
  };

  return (
    <div>
      {caso.id === null ? Formulario() : initialAbogados !== null && Formulario()}
    </div>
  );
};

export default FormCasoAdmin;
