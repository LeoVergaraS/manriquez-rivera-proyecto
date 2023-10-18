import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import './list.scss'
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const List = () => {

    return (
            <ListGroup as="ol">
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">32</div>
                        Sesiones realizadas
                    </div>
                </ListGroup.Item>

                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"

                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">8h 27m</div>
                        Tiempo trabajado
                    </div>
                </ListGroup.Item>

                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">11</div>
                        Clientes atendidos
                    </div>
                </ListGroup.Item>

                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Juan iturbe</div>
                        Cliente con más tiempo dedicado
                    </div>
                </ListGroup.Item>

                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">9</div>
                        Materias atendidas
                    </div>
                </ListGroup.Item>

                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Drecho Laboral</div>
                        Materia con más tiempo dedicado
                    </div>
                </ListGroup.Item>

                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">7</div>
                        Submaterias atendidas
                    </div>
                </ListGroup.Item>

                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Familia</div>
                        Submateria con más tiempo dedicado
                    </div>
                </ListGroup.Item>

            </ListGroup>
    );
}

export default List;