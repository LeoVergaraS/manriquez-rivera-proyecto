import * as yup from "yup";
import * as formik from "formik";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const FormPersonalizado = (props) => {
    const fechaInicio = props.fi;
    const fechaFin = props.ff;
    const close = props.close;
    const post = props.post;

    const { Formik } = formik;

    const validations = yup.object().shape({
        fechaInicio: yup
            .date()
            .required("Campo requerido")
            .max(new Date(), "La fecha no puede ser mayor a la actual")
            .test("fechaInicio",
                "La fecha no puede ser mayor a la fecha fin",
                function (value) {
                    return new Date(value) < new Date(this.parent.fechaFin);
                }),
        fechaFin: yup
            .date()
            .required("Campo requerido")
            .max(new Date(), "La fecha no puede ser mayor a la actual")
            .test("fechaFin",
                "La fecha no puede ser menor a la fecha inicio",
                function (value) {
                    return new Date(value) > new Date(this.parent.fechaInicio);
                }),
    });

    return (
        <Formik
            validationSchema={validations}
            onSubmit={(values) => {
                const object = {
                    fechaInicio: values.fechaInicio,
                    fechaFin: values.fechaFin,
                }
                //console.log(object);
                post(object);
            }}
            initialValues={{
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
            }}
        >
            {({ handleSubmit, handleChange, values, errors, touched, handleBlur }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col xs={6}>
                            <Form.Group controlId="fechaInicio">
                                <Form.Label>Fecha inicio</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="fechaInicio"
                                    value={values.fechaInicio}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.fechaInicio && !errors.fechaInicio}
                                    isInvalid={touched.fechaInicio && !!errors.fechaInicio}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.fechaInicio}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="fechaFin">
                                <Form.Label>Fecha fin</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="fechaFin"
                                    value={values.fechaFin}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.fechaFin && !errors.fechaFin}
                                    isInvalid={touched.fechaFin && !!errors.fechaFin}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.fechaFin}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div style={{display: "flex", justifyContent: "right", gap: 5}}>
                            <Button
                                style={{ backgroundColor: "rgb(172, 172, 172)", border: 0}}
                                size="sm"
                                onClick={close}>
                                Cerrar
                            </Button>
                            <Button style={{ backgroundColor: "rgb(223, 191, 104)", border: 0 }} type="submit" size="sm">
                                Buscar
                            </Button>
                    </div>
                </Form>
            )}

        </Formik>
    );
}

export default FormPersonalizado;