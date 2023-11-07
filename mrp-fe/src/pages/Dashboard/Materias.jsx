import "./materias.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Badge, Card, Col, Container, Row, Table } from "react-bootstrap";
import { BiUser, BiTime, BiClipboard } from "react-icons/bi";
import InputSelect from "../../components/InputSelect/InputSelect";
import GraficoGernal1 from "../../components/Graficos/GraficoGernal1";
import formatDateShow from "../../utils/functions/formatDateShow";
import castTime from "../../utils/functions/castTime";

const Materias = ({
  id_abogado,
  fechaInicio,
  fechaFin,
  dropSelect,
  dropSiempre,
  dropAnio,
  setDropSelect,
}) => {
  const [materias, setMaterias] = useState([]);
  const [materia, setMateria] = useState({ id: 0 });
  const [sesionesMateria, setSesionesMateria] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    cantidad_sesiones: 0,
    tiempo_total: 0,
    cantidad_clientes: 0,
  });

  const getMaterias = async () => {
    try {
      let url = "http://localhost:8090/materias";
      const response = await axios.get(url);
      if (response.status === 200) {
        setMaterias(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getSesionesByMateriaDesdeSiempre = async (
    id_abogado,
    fechaInicio,
    fechaFin,
    dropSelect,
    dropSiempre
  ) => {
    try {
      let url =
        "http://localhost:8090/consultas/materia/sesiones/" +
        materia.id +
        "/" +
        id_abogado;
      const response = await axios.get(url);
      if (response.status === 200) {
        setSesionesMateria(response.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getSesionesByMateria = async (
    id_abogado,
    fechaInicio,
    fechaFin,
    dropSelect,
    dropSiempre,
    dropAnio
  ) => {
    try {
      // si es que se selecciono desde siempre
      if (dropSiempre == 1) {
        console.log("ENTRE?");
        getSesionesByMateriaDesdeSiempre(
          id_abogado,
          fechaInicio,
          fechaFin,
          dropSelect,
          dropSiempre
        );
      } else {
        // esto calcula la diferencia de dias entre las fechas cuando se selecciona un año en el dropSelect
        if (dropAnio == 1) {
          const fechaInicioAux = new Date(fechaInicio);
          const fechaFinAux = new Date(fechaFin);

          const difMS = fechaFinAux - fechaInicioAux;
          const difDias = Math.trunc(difMS / (1000 * 60 * 60 * 24));
          setDropSelect(difDias + 1);
        }
        let url =
          "http://localhost:8090/consultas/materia/sesiones/" +
          materia.id +
          "/" +
          fechaInicio +
          "/" +
          fechaFin +
          "/" +
          dropSelect +
          "/" +
          id_abogado;
        const response = await axios.get(url);
        if (response.status === 200) {
          console.log(response.data);
          setSesionesMateria(response.data);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getEstadisticas = async (
    id_abogado,
    fechaInicio,
    fechaFin,
    dropSiempre
  ) => {
    try {
      let url =
        "http://localhost:8090/consultas/materia/estadisticas/" +
        id_abogado +
        "/" +
        materia.id +
        "/" +
        fechaInicio +
        "/" +
        fechaFin +
        "/" +
        dropSiempre;
      const response = await axios.get(url);
      if (response.status === 200) {
        setEstadisticas(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const createMateriaOption = (materia) => {
    return {
      value: materia.id,
      label: materia.nombre,
    };
  };

  useEffect(() => {
    getMaterias();
  }, []);

  useEffect(() => {
    /* if (materia.id !== undefined && props.abogado.id !== 0){
		   getEstadisticas(props.abogado.id, materia.id, props.fechaInicio, props.fechaFin);
		 };*/
    if (materia.id !== 0) {
      //console.log("ENTRE?");
      getSesionesByMateria(
        id_abogado,
        fechaInicio,
        fechaFin,
        dropSelect,
        dropSiempre,
        dropAnio
      );
      getEstadisticas(id_abogado, fechaInicio, fechaFin, dropSiempre);
    }
  }, [
    materia,
    id_abogado,
    fechaInicio,
    fechaFin,
    dropSelect,
    dropSiempre,
    dropAnio,
    setDropSelect,
  ]);

  return (
    <Container fluid className="mt-3">
      <Row style={{ height: "calc(100vh - 153px)" }}>
        <Col xs={6}>
          <Container>
            <Row>
              <fieldset className="materias__fieldset-select">
                <legend className="materias__legend"> Buscar materia</legend>
                <InputSelect
                  objects={materias}
                  placeholder={"Seleccione una materia"}
                  set={setMateria}
                  createOption={createMateriaOption}
                />
              </fieldset>
            </Row>
            <Row className="mb-3">
              <Col>
                <Card className="card-estadisticas">
                  <div className="card-estadisticas__header">
                    <h2 className="card-estadisticas__title">Sesiones</h2>
                    <span className="card-estadisticas__icon">
                      <BiClipboard />
                    </span>
                  </div>
                  <h1 className="card-estadisticas__estadistica">
                    {estadisticas.cantidad_sesiones}
                  </h1>
                  <p className="card-estadisticas__caption">
                    Sesiones realizadas
                  </p>
                </Card>
              </Col>
              <Col>
                <Card className="card-estadisticas">
                  <div className="card-estadisticas__header">
                    <h2 className="card-estadisticas__title">Tiempo</h2>
                    <span className="card-estadisticas-c__icon">
                      <BiTime />
                    </span>
                  </div>
                  <h1 className="card-estadisticas__estadistica">
                    {estadisticas.tiempo_total}
                  </h1>
                  <p className="card-estadisticas__caption">Hrs trabajadas</p>
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
                  <h1 className="card-estadisticas__estadistica">
                    {estadisticas.cantidad_clientes}
                  </h1>
                  <p className="card-estadisticas__caption">
                    Clientes atendidos
                  </p>
                </Card>
              </Col>
            </Row>
            <Row className="p-2" style={{ height: "450px" }}>
              <Card className="card-grafico">
                <GraficoGernal1
                  tiempoSesiones={sesionesMateria}
                  title={"Tiempo de sesiones por día"}
                />
              </Card>
            </Row>
          </Container>
        </Col>
        <Col xs={6} className="p-2">
          <Container>
            <Row style={{ height: "35px" }} />
            <Row style={{ height: "calc(100vh - 206px)" }}>
              <Card className="card-sesiones">
                <Card.Body>
                  <Card.Title>Sesiones registradas</Card.Title>
                  <Table className="table-sesiones">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Tiempo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sesionesMateria.map((sesion, index) => {
                        if (sesion.tiempo !== 0) {
                          return (
                            <tr key={index}>
                              <td>{formatDateShow(sesion.fecha)}</td>
                              <td>{castTime(sesion.tiempo)}</td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Materias;
