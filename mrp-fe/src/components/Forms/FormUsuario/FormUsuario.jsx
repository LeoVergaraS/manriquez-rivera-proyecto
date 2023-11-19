import * as yup from "yup";
import * as formik from "formik";
import { Form } from "react-bootstrap";
import { VscCheck, VscClose, VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";

const FormUsuario = ({ item, post, close }) => {
  const { Formik } = formik;

  const formSchema = yup.object().shape({
    //correo: yup.string().required('Campo requerido').email('Correo inválido'),
    username: yup
      .string()
      .required("Campo requerido")
      .min(3, "Mínimo 3 caracteres"),
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

  //////////////////////////////////////////
  //      Mostrar/ocultar contraseña
  //////////////////////////////////////////
  const [seePassword, setSeePassword] = useState(false);
  const [tipo, setTipo] = useState("password");
  const [message, setMessage] = useState("");

  const handleSee = () => {
    if (seePassword) {
      setSeePassword(false);
      setTipo("password");
    } else {
      setSeePassword(true);
      setTipo("text");
    }
  }

  return (
    <Formik
      validationSchema={formSchema}
      onSubmit={(values) => {
        const objetoActualizado = {
          id: null,
          //correo: values.correo,
          username: values.username,
          //usuario: values.usuario,
          password: values.password,
        };
        post("Usuarios", objetoActualizado);
      }}
      initialValues={{
        //usuario: usuario.usuario,
        //correo: usuario.correo,
        username: "",
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
          {/*<Form.Group className='mb-3' controlId='formUsuario'>
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              name="usuario"
              type='text'
              value={values.usuario}
              onChange={handleChange}
              isInvalid={!!errors.usuario}
            />
            <Form.Control.Feedback type="invalid">
              {errors.usuario}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formCorreo'>
            <Form.Label>Correo</Form.Label>
            <Form.Control
              name="correo"
              type='email'
              value={values.correo}
              onChange={handleChange}
              isInvalid={!!errors.correo}
            />
            <Form.Control.Feedback type="invalid">
              {errors.correo}
            </Form.Control.Feedback>
      </Form.Group>*/}
          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese un nombre de usuario"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.username && !errors.username}
              isInvalid={touched.username && !!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formContrasena">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              name="password"
              type={tipo}
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
              type={tipo}
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
          <div className="mostrar-contrasenia" style={{display: "flex", justifyContent: "left", alignItems: "center", gap: "5px"}}>
            {seePassword ?
              (<VscEyeClosed
                onClick={handleSee}
                onMouseEnter={() => setMessage("Ocultar contraseña")}
                onMouseLeave={() => setMessage("")}
                style={{ fontSize: "25px", cursor: "pointer" }} />) :
              (<VscEye
                onClick={handleSee}
                onMouseEnter={() => setMessage("Mostrar contraseña")}
                onMouseLeave={() => setMessage("")}
                style={{ fontSize: "25px", cursor: "pointer" }} />)
            }
            {message}
          </div>
          <hr />
          <div className="d-flex justify-content-end">
            <VscClose onClick={close} style={{ cursor: "pointer", color: "rgb(172, 172, 172)", fontSize: 30 }} />
            <VscCheck onClick={handleSubmit} style={{ cursor: "pointer", color: "rgb(223, 191, 104)", fontSize: 30 }} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormUsuario;
