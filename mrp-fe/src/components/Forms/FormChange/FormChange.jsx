import * as yup from "yup";
import * as formik from "formik";
import { Form } from "react-bootstrap";
import { VscCheck, VscClose } from "react-icons/vsc";

const FormUsuario = ({ item, post, close }) => {
  const { Formik } = formik;

  const formSchema = yup.object().shape({
    //usuario: yup.string().required('Campo requerido').min(3, 'Mínimo 3 caracteres'),
    password: yup
      .string()
      .required("Campo requerido")
      .min(6, "Mínimo 6 caracteres")
      .max(16, "Máximo 16 caracteres"),
    repetirPassword: yup
      .string()
      .required("Campo requerido")
      .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
      .min(6, "Mínimo 6 caracteres")
      .max(16, "Máximo 16 caracteres"),
  });

  return (
    <Formik
      validationSchema={formSchema}
      onSubmit={(values) => {
        const objetoActualizado = {
          id: item.id,
          //correo: values.correo,
          username: item.nombre,
          //usuario: values.usuario,
          password: values.password,
        };
        post("Usuarios/change",objetoActualizado);
      }}
      initialValues={{
        //usuario: usuario.usuario,
        //correo: usuario.correo,
        password: "",
        repetirPassword: "",
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
          <Form.Group className="mb-3" controlId="formContrasena">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Ingrese una contraseña"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.password && !errors.password}
              isInvalid={touched.password && !!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRepetirContrasena">
            <Form.Label>Repetir contraseña</Form.Label>
            <Form.Control
              name="repetirPassword"
              type="password"
              placeholder="Repita la contraseña"
              value={values.repetirPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.repetirPassword && !errors.repetirPassword}
              isInvalid={touched.repetirPassword && !!errors.repetirPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.repetirPassword}
            </Form.Control.Feedback>
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

export default FormUsuario;
