import * as yup from "yup";
import * as formik from "formik";
import { Form } from "react-bootstrap";
import {VscCheck, VscClose} from "react-icons/vsc";

const FormAbogado = (props) => {
  const abogado = props.item;
  const close = props.close;
  const post = props.post;

  const { Formik } = formik;

  const validations = yup.object().shape({
    nombre: yup
      .string()
      .required("Campo requerido")
      .min(1, "Mínimo 1 caracter")
      .max(255, "Máximo 255 caracteres"),
  });

  return (
    <Formik
      validationSchema={validations}
      onSubmit={(values) => {
        const object = {
          id: abogado !== null ? abogado.id : null,
          nombre: values.nombre,
          borrado: abogado !== null ? abogado.borrado : false,
        }
        
        post("Abogados", object);
      }}
      initialValues={{
        nombre: abogado !== null ? abogado.nombre : "",
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
          <hr />
          <div className="d-flex justify-content-end">
            <VscClose onClick={close} style={{cursor: "pointer", color: "red", fontSize: 30}} />
            <VscCheck onClick={handleSubmit} style={{cursor: "pointer", color: "green", fontSize: 30}} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormAbogado;
