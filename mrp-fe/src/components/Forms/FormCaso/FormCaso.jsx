import { Form, Button, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import * as formik from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MySelect from "../MySelect/MySelect";
import formatDateUpload from "../../../utils/functions/formatDateUpload";
import Cookies from 'js-cookie';
import urlweb from "../../../utils/config/urlweb";
import sumOneDayToDate from "../../../utils/functions/sumOneDayToDate";
import SelectCrear from "../MySelect/SelectCrear";
import { createOption } from "../../../data/options";

const FormCaso = ({ caso, postCaso, handleClose, materias }) => {
  const { Formik } = formik;
  const [options, setOptions] = useState([]);
  const [initialAbogados, setInitialAbogados] = useState(null);
  const [numbersAbogados, setNumbersAbogados] = useState(null);

  const [optionsClientes, setOptionsClientes] = useState([]);
  const [optionsSubmaterias, setOptionsSubmaterias] = useState([]);

  const validations = yup.object().shape({
    id_materia: yup
      .number()
      .required("Ingrese una materia válida")
      .min(1, "Seleccione una opción válida"),
    id_submateria: yup
      .object().shape({
        value: yup.string().required("Ingrese una submateria válida"),
        label: yup.string().required("Ingrese una submateria válida"),
      }).required("Ingrese una submateria válida"),
    id_cliente: yup
      .object().shape({
        value: yup.string().required("Ingrese un cliente válido"),
        label: yup.string().required("Ingrese un cliente válido"),
      }).required("Ingrese un cliente válido"),
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
      let url = `${urlweb}/abogados`;
      const response = await axios.get(url,config);
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
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      };
      let url = `${urlweb}/abogados/caso/${id}`;
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

  const getClientes = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      };
      let url = `${urlweb}/clientes`;
      const response = await axios.get(url,config);
      if (response.status === 200) {
        const clientes = response.data;
        setOptionsClientes(clientes.map((cliente) => createOption(cliente.id, cliente.nombre)));
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
      let url = `${urlweb}/submaterias`;
      const response = await axios.get(url,config);
      if (response.status === 200) {
        const submaterias = response.data;
        setOptionsSubmaterias(submaterias.map((submateria) => createOption(submateria.id, submateria.nombre)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAbogados();
    getClientes();
    getSubmaterias();
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
          item.id_cliente = { nombre: values.id_cliente.label };
          item.id_materia = { id: values.id_materia };
          item.id_submateria = { nombre: values.id_submateria.label };
          item.fecha = formatDateUpload(
            new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate())
          );
          const request = { caso: item, abogados: abogados };
          postCaso(request);
        }}
        initialValues={{
          id_materia: caso.id_materia.id,
          id_submateria: caso.id === null ? null : createOption(caso.id_submateria.id, caso.id_submateria.nombre),
          id_cliente: caso.id === null ? null : createOption(caso.id_cliente.id, caso.id_cliente.nombre),
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
                  <SelectCrear 
                    name="id_cliente"
                    placeholder="Seleccione un cliente"
                    options={optionsClientes}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    value={values.id_cliente}
                    error={errors.id_cliente}
                    touched={touched.id_cliente}
                    text="el cliente"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="input-materia">
                  <Form.Label>Materia</Form.Label>
                  <Form.Select
                    name="id_materia"
                    aria-label="select"
                    onChange={handleChange}
                    value={values.id_materia}
                    onBlur={handleBlur}
                    isValid={touched.id_materia && !errors.id_materia}
                    isInvalid={touched.id_materia && !!errors.id_materia}
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
                  <Form.Control.Feedback type="invalid">
                    {errors.id_materia}
                  </Form.Control.Feedback>
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
                    multi={true}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="input-submateria">
                  <Form.Label>Submateria</Form.Label>
                  <SelectCrear 
                    name="id_submateria"
                    placeholder="Seleccione una submateria"
                    text="la submateria"
                    options={optionsSubmaterias}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    value={values.id_submateria}
                    error={errors.id_submateria}
                    touched={touched.id_submateria}
                  />
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
