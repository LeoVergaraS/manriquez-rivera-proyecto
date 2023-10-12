import { Form, Button, Row, Col } from 'react-bootstrap'
import * as yup from 'yup';
import * as formik from 'formik';

const FormSesion = ({ sesion, postSesion, handleClose, materias, subMaterias, clientes }) => {

    const { Formik } = formik;
    const formSchema = yup.object().shape({
        id_materia: yup.number().required('Ingrese una materia válida').min(1, "Seleccione una opción válida"),
        id_submateria: yup.number().required('Ingrese una submateria válida').min(1, "Seleccione una opción válida"),
        id_cliente: yup.number().required('Ingrese un cliente válido').min(1, "Seleccione una opción válida"),
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
                    objetoActualizado.id_cliente = { id: values.id_cliente }
                    objetoActualizado.id_materia = { id: values.id_materia }
                    objetoActualizado.id_submateria = { id: values.id_submateria }
                    objetoActualizado.fecha = formatDate(new Date())
                    objetoActualizado.tiempo = 0
                    //console.log("Posteando sesion");
                    postSesion(objetoActualizado);
                }}
                initialValues={{
                    id_materia: sesion.id_materia.id || '',
                    id_submateria: sesion.id_submateria.id || '',
                    id_cliente: sesion.cliente || '',
                    abogado: sesion.abogado || ''
                }}
            >
                {({ handleSubmit, handleChange, values, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>

                        <Row>

                            <Col>
                                <Form.Group className='mb-3' controlId='input-cliente'>
                                    <Form.Label>Nombre cliente</Form.Label>
                                    <Form.Select
                                        name="id_cliente"
                                        aria-label='select'
                                        onChange={handleChange}
                                        value={values.id_cliente}
                                        isInvalid={!!errors.id_cliente}
                                    >
                                        <option key={0} value={0}>Seleccione una opción</option>
                                        {clientes.map((item) => (<option key={item.id} value={item.id}>{item.nombre}</option>))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.id_cliente}
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
                                    <Form.Control
                                        name="abogado"
                                        type='text'
                                        value={values.abogado}
                                        onChange={handleChange}
                                        isInvalid={!!errors.abogado}
                                    />
                                    <span style={{ color: "#adb5bd" }}>{values.abogado.length + '/255'}</span>
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
                                        {subMaterias.map((item)=>(<option key={item.id} value={item.id}>{item.nombre}</option>))}
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