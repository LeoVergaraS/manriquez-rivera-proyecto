import { Form, Button, Row, Col } from 'react-bootstrap'
import * as yup from 'yup';
import * as formik from 'formik';

const FormSesion = ({ sesion, postSesion, handleClose, materias, subMaterias, clientes }) => {

    const { Formik } = formik;
    const formSchema = yup.object().shape({
        id_materia: yup.number().required('Ingrese una materia válida').min(1, "Seleccione una opción válida"),
        id_submateria: yup.number().required('Ingrese una submateria válida').min(1, "Seleccione una opción válida"),
        id_cliente: yup.string().required('Ingrese un cliente válido').min(1, "Seleccione una opción válida").max(255,'Máximo 255 caracteres'),
        abogado: yup.string().required('Ingrese un nombre válido').min(1, 'Mínimo 1 carácter').max(255, 'Máximo 255 caracteres'),
    });

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

    return (
        <div>
            <Formik
                validationSchema={formSchema}
                onSubmit={(values) => {
                    //console.log("submit");
                    const objetoActualizado = { ...sesion, ...values };
                    objetoActualizado.id_cliente = { nombre: values.id_cliente }
                    objetoActualizado.id_materia = { id: values.id_materia }
                    objetoActualizado.id_submateria = { id: values.id_submateria }
                    objetoActualizado.fecha = formatDate(new Date())
                    //console.log("Posteando sesion");
                    postSesion(objetoActualizado);
                }}
                initialValues={{
                    id_materia: sesion.id_materia.id || '',
                    id_submateria: sesion.id_submateria.id || '',
                    id_cliente: sesion.id_cliente.nombre || '',
                    abogado: sesion.abogado || ''
                }}
            >
                {({ handleSubmit, handleChange, values, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>

                        <Row>

                            <Col>
                                <Form.Group className='mb-3' controlId='input-cliente'>
                                    <Form.Label>Cliente</Form.Label>
                                    <Form.Control
                                        name="id_cliente"
                                        type='text'
                                        value={values.id_cliente}
                                        onChange={handleChange}     
                                        isInvalid={!!errors.cliente}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.cliente}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className='mb-3' controlId='input-materia'>
                                    <Form.Label>Materia</Form.Label>
                                    <Form.Select
                                        name="id_materia"
                                        aria-label="select"
                                        onChange={handleChange}
                                        value={values.id_materia}
                                        isInvalid={!!errors.id_materia}
                                    >
                                        <option key={0} value={0}>Seleccione una opción</option>
                                        {materias.map((item) => (<option key={item.id} value={item.id}>{item.nombre}</option>))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.id_materia}
                                    </Form.Control.Feedback>
                                </Form.Group>


                            </Col>
                            <Col>
                                <Form.Group className='mb-3' controlId='input-abogado'>
                                    <Form.Label>Abogado</Form.Label>
                                    <Form.Select
                                        name="abogado"
                                        aria-label="select"
                                        onChange={handleChange}
                                        value={values.abogado}
                                        isInvalid={!!errors.abogado}
                                    >
                                        <option key={0} value={0}>Seleccione una opción</option>
                                        <option key={1} value={"Daniel Manriquez"}>Daniel Manriquez</option>
                                        <option key={2} value={"Pablo Rivera"}>Pablo Rivera</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.abogado}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className='mb-3' controlId='input-submateria'>
                                    <Form.Label>Submateria</Form.Label>
                                    <Form.Select
                                        aria-label="select"
                                        name="id_submateria"
                                        onChange={handleChange}
                                        value={values.id_submateria}
                                        isInvalid={!!errors.id_submateria}
                                    >
                                        <option key={0} value={0}>Seleccione una opción</option>
                                        {subMaterias.map((item) => (<option key={item.id} value={item.id}>{item.nombre}</option>))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.id_submateria}
                                    </Form.Control.Feedback>
                                </Form.Group>


                            </Col>

                        </Row>

                        <div>
                            <hr></hr>
                            <div style={{ display: "flex", justifyContent: "end" }}>
                                <Button variant='secondary' style={{ marginRight: 2 }} onClick={handleClose}>Cerrar</Button>
                                <Button variant='primary' type='submit'>Guardar</Button>
                            </div>
                        </div>

                    </Form>
                )}
            </Formik >
        </div >
    );
}

export default FormSesion;