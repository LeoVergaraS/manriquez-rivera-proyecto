import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import './list.scss'
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import castTime from '../../utils/functions/castTime';

const List = ({estadisticas}) => {

    console.log(estadisticas);

    return (
            <ListGroup as="ol">
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{estadisticas.cantidad_sesiones}</div>
                        Sesiones realizadas
                    </div>
                </ListGroup.Item>

                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"

                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{castTime(estadisticas.cantidad_tiempo)}</div>
                        Tiempo trabajado
                    </div>
                </ListGroup.Item>

                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{estadisticas.cantidad_clientes}</div>
                        Clientes atendidos
                    </div>
                </ListGroup.Item>

                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{estadisticas.nombre_cliente_max}</div>
                        Cliente con más tiempo dedicado
                    </div>
                </ListGroup.Item>

                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{estadisticas.cantidad_materias}</div>
                        Materias atendidas
                    </div>
                </ListGroup.Item>

                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{estadisticas.nombre_materia_max}</div>
                        Materia con más tiempo dedicado
                    </div>
                </ListGroup.Item>

                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{estadisticas.cantidad_submateria}</div>
                        Submaterias atendidas
                    </div>
                </ListGroup.Item>

                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{estadisticas.nombre_submateria_max}</div>
                        Submateria con más tiempo dedicado
                    </div>
                </ListGroup.Item>

            </ListGroup>
    );
}

export default List;