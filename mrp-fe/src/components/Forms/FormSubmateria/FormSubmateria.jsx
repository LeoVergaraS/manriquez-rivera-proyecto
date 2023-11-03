import * as yup from "yup";
import * as formik from "formik";
import { Form } from "react-bootstrap";
import { VscCheck, VscClose } from "react-icons/vsc";
import Select from "react-select";
import { useEffect, useState } from "react";
import axios from "axios";

const FormSubmateria = (props) => {
  const submateria = props.item;
  const close = props.close;
  const post = props.post;

  const { Formik } = formik;
  const [options, setOptions] = useState(null);

  const validations = yup.object().shape({
    nombre: yup
      .string()
      .required("Campo requerido")
      .min(1, "Mínimo 1 caracter")
      .max(255, "Máximo 255 caracteres"),
    id_materia: yup
      .number()
      .required("Ingrese una materia válida")
      .min(1, "Seleccione una opción válida"),
  });

  const getMaterias = async () => {
    try {
      let url = "http://localhost:8090/materias";
      const response = await axios.get(url);
      if (response.status === 200) {
        const materias = response.data;
        setOptions(
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

  useEffect(() => {
    getMaterias();
  }, []);

  useEffect(() => {
    console.log(options);
  }, [options]);

  const Formulario = () => {
    return(
      <Formik
      validationSchema={validations}
      onSubmit={(values) => {
        const object = {
          id: submateria !== null ? submateria.id : null,
          nombre: values.nombre,
          id_materia: { id: values.id_materia },
          borrado: submateria !== null ? submateria.borrado : false,
        };

        post("Submaterias", object);
      }}
      initialValues={{
        nombre: submateria !== null ? submateria.nombre : "",
        id_materia: submateria !== null ? submateria.id_materia.id : 0,
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
        <Form noValidate>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese un nombre"
              name="nombre"
              value={values.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.nombre && !errors.nombre}
              isInvalid={touched.nombre && !!errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="id_materia">
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
              <option value={0}>Seleccione una opción</option>
              {options !== null &&
                options.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.id_materia}
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

  return (
    <div>
      {options !== null && Formulario()}
    </div>
  );
};

export default FormSubmateria;
