import * as yup from 'yup';
import * as formik from 'formik';
import { Button, Form } from 'react-bootstrap';

const FormUsuario = ({ usuario, postUsuario, handleClose }) => {
    const { Formik } = formik;

    const formSchema = yup.object().shape({
        //correo: yup.string().required('Campo requerido').email('Correo inválido'),
        username: yup.string().required('Campo requerido').min(3, 'Mínimo 3 caracteres'),
        //usuario: yup.string().required('Campo requerido').min(3, 'Mínimo 3 caracteres'),
        password: yup.string().required('Campo requerido')
            .min(6, 'Mínimo 6 caracteres')
            .max(16, 'Máximo 16 caracteres'),
        repetirPassword: yup.string().required('Campo requerido')
            .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
            .min(6, 'Mínimo 6 caracteres')
            .max(16, 'Máximo 16 caracteres'),
    });

    return (
        <Formik
            validationSchema={formSchema}
            onSubmit={(values) => {
                const objetoActualizado = {
                    id: usuario.id,
                    //correo: values.correo,
                    username: values.username,
                    //usuario: values.usuario,
                    password: values.password,
                };
                postUsuario(objetoActualizado);
            }}
            initialValues={{
                //usuario: usuario.usuario,
                //correo: usuario.correo,
                username: usuario.username,
                password: "",
                repetirPassword: "",
            }}
        >
            {({ handleSubmit, handleChange, values, errors }) => (

                <Form noValidate onSubmit={handleSubmit}>
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
                    <Form.Group className='mb-3' controlId='formNombre'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            name="username"
                            type='text'
                            value={values.username}
                            onChange={handleChange}
                            isInvalid={!!errors.username}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formContrasena'>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            name="password"
                            type='password'
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formRepetirContrasena'>
                        <Form.Label>Repetir contraseña</Form.Label>
                        <Form.Control
                            name="repetirPassword"
                            type='password'
                            value={values.repetirPassword}
                            onChange={handleChange}
                            isInvalid={!!errors.repetirPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.repetirPassword}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div>
                        <hr></hr>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <Button variant='secondary' style={{ marginRight: 2 }} onClick={handleClose}>Cerrar</Button>
                            <Button variant='primary' type='submit'>Guardar</Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default FormUsuario;