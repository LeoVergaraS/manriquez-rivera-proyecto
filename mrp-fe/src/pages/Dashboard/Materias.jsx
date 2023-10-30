import InputSelect from "../../components/InputSelect/InputSelect";
import axios from "axios";
import "./materias.scss";
import { useEffect, useState } from "react";
import { Badge, Card } from "react-bootstrap";
import { BiUser, BiTime, BiClipboard } from "react-icons/bi";
import GraficoGernal1 from "../../components/Graficos/GraficoGernal1";

const Materias = ( props ) => {
  const [materias, setMaterias] = useState([]);
  const [materia, setMateria] = useState({});

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

  const getSesionesByMateria = async (id) => {
    try {
      let url = "http://localhost:8090/consultas/sesiones/id_materia/" + id;
      const response = await axios.get(url);
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

	const getEstadisticas = async (abogado, id_materia, fi, ff) => {
		try {
			let url = `http://localhost:8090/consultas/materia/estadisticas/${abogado}/${id_materia}/${fi}/${ff}`;
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
    if (materia.id !== undefined && props.abogado.id !== 0){
			getEstadisticas(props.abogado.id, materia.id, props.fechaInicio, props.fechaFin);
		};
		console.log(materia.id);
    console.log(props.abogado, props.abogado.id)
    console.log(props.fechaInicio, props.fechaFin)
  }, [materia, props.abogado, props.fechaInicio, props.fechaFin]);

  return (
    <main className="layout-materias">
      <h2 className="materias__title">Resumen</h2>
      <fieldset className="materias__fieldset-select">
        <legend className="materias__legend"> Buscar materia</legend>
        <InputSelect
          objects={materias}
          placeholder={"Seleccione una materia"}
          set={setMateria}
          createOption={createMateriaOption}
        />
      </fieldset>
			<Card className="card-grafico">
				<GraficoGernal1 tiempoSesiones={[]} title={"Tiempo de sesiones por día"} />
			</Card>
      <Card className="card-estadisticas">
        <div className="card-estadisticas__header">
          <h2 className="card-estadisticas__title">Sesiones</h2>
          <Badge className="card-estadisticas__icon"><BiClipboard/></Badge>
        </div>
				<h1 className="card-estadisticas__estadistica">{estadisticas.cantidad_sesiones}</h1>
				<p className="card-estadisticas__caption">Sesiones realizadas</p>
      </Card>
      <Card className="card-estadisticas">
        <div className="card-estadisticas__header">
          <h2 className="card-estadisticas__title">Tiempo</h2>
          <Badge className="card-estadisticas__icon"><BiTime/></Badge>
        </div>
				<h1 className="card-estadisticas__estadistica">{estadisticas.tiempo_total}</h1>
				<p className="card-estadisticas__caption">Hrs trabajadas</p>
      </Card>
      <Card className="card-estadisticas">
        <div className="card-estadisticas__header">
          <h2 className="card-estadisticas__title">Clientes</h2>
          <Badge className="card-estadisticas__icon"><BiUser/></Badge>
        </div>
				<h1 className="card-estadisticas__estadistica">{estadisticas.cantidad_clientes}</h1>
				<p className="card-estadisticas__caption">Clientes atendidos</p>
      </Card>
    </main>
  );
};

export default Materias;
