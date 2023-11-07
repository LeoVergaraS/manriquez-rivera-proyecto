import "./general.scss";
import { Card, Badge, Table, Container, Row, Col } from "react-bootstrap";
import castTime from "../../utils/functions/castTime";
import GraficoGernal1 from "../../components/Graficos/GraficoGernal1";
import GraficoGernal2 from "../../components/Graficos/GraficoGeneral2";
import { BiUser, BiClipboard, BiBookmark, BiBookmarks } from "react-icons/bi";

const General = ({ consultasS, estadisticas, consultasM }) => {
  const a = () => {
    return (
      <>
        <main className="layout-general">
          <h2 className="general__title">Resumen general</h2>
        </main>
      </>
    );
  };

  return (
    <Container fluid className="mt-3">
      <Row style={{ height: "calc(100vh - 175px)" }}>
        <Col>
          <Container style={{ height: "100%" }}>
						<Row className="mb-4" style={{ height: "49%" }}>
              <Col>
                <Card className="card-grafico-1">
                  <Card.Body style={{padding: 0}}>
                    <GraficoGernal1
                      tiempoSesiones={consultasS}
                      title={"Tiempo de sesiones por día"}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row style={{height: "48%"}} >
              <Col>
                <Card className="card-grafico-2">
                  <Card.Body style={{padding: 0}}>
                    <GraficoGernal2
                      consultasM={consultasM}
                      title={"Tiempo de materias por día"}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col>
          <Container style={{ height: "100%" }}>
            <Row className="mb-4" style={{ height: "49%" }}>
              <Col>
                <Card className="card-estadisticas">
                  <div className="card-estadisticas__header">
                    <h2 className="card-estadisticas__title">Sesiones</h2>
                    <span className="card-estadisticas-c__icon">
                      <BiClipboard />
                    </span>
                  </div>
                  <Table responsive="sm" style={{ textAlign: "center" }}>
                    <tbody>
                      <tr>
                        <td>Cantidad</td>
                        <td>{estadisticas.cantidad_sesiones}</td>
                      </tr>
                      <tr>
                        <td>Tiempo total</td>
                        <td>{castTime(estadisticas.cantidad_tiempo)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
              </Col>
              <Col>
                <Card className="card-estadisticas">
                  <div className="card-estadisticas__header">
                    <h2 className="card-estadisticas__title">Clientes</h2>
                    <span className="card-estadisticas-c__icon">
                      <BiUser />
                    </span>
                  </div>
                  <Table responsive="sm" style={{ textAlign: "center" }}>
                    <tbody>
                      <tr>
                        <td>Cantidad</td>
                        <td>{estadisticas.cantidad_clientes}</td>
                      </tr>
                      <tr>
                        <td>Más atendido</td>
                        <td>{estadisticas.nombre_cliente_max}</td>
                      </tr>
                      <tr>
                        <td>Tiempo</td>
                        <td>{castTime(estadisticas.tiempo_cliente_max)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
            <Row style={{ height: "49%" }}>
              <Col>
                <Card className="card-estadisticas">
                  <div className="card-estadisticas__header">
                    <h2 className="card-estadisticas__title">Materias</h2>
                    <span className="card-estadisticas-c__icon">
                      <BiBookmark />
                    </span>
                  </div>
                  <Table responsive="sm" style={{ textAlign: "center" }}>
                    <tbody>
                      <tr>
                        <td>Cantidad</td>
                        <td>{estadisticas.cantidad_materias}</td>
                      </tr>
                      <tr>
                        <td>Más atendida</td>
                        <td>{estadisticas.nombre_materia_max}</td>
                      </tr>
                      <tr>
                        <td>Tiempo</td>
                        <td>{castTime(estadisticas.tiempo_materia_max)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
              </Col>
              <Col>
                <Card className="card-estadisticas">
                  <div className="card-estadisticas__header">
                    <h2 className="card-estadisticas__title">Submaterias</h2>
                    <span className="card-estadisticas-c__icon">
                      <BiBookmarks />
                    </span>
                  </div>
                  <Table responsive="sm" style={{ textAlign: "center" }}>
                    <tbody>
                      <tr>
                        <td>Cantidad</td>
                        <td>{estadisticas.cantidad_submateria}</td>
                      </tr>
                      <tr>
                        <td>Más atendida</td>
                        <td>{estadisticas.nombre_submateria_max}</td>
                      </tr>
                      <tr>
                        <td>Tiempo</td>
                        <td>{castTime(estadisticas.tiempo_submateria_max)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default General;
