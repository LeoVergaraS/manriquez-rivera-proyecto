import { Card, Badge, Table } from "react-bootstrap";
import GraficoGernal1 from "../../components/Graficos/GraficoGernal1";
import GraficoGernal2 from "../../components/Graficos/GraficoGeneral2";
import "./general.scss";
import { BiUser, BiTime, BiClipboard, BiBookmark, BiBookmarks } from "react-icons/bi";
import castTime from "../../utils/functions/castTime";

const General = ({ consultasS, estadisticas, consultasM }) => {

	console.log(estadisticas);

	return (
		<>

			<main className="layout-general">
				<h2 className="general__title">Resumen general</h2>
				<Card
					className="card-grafico-1"
				>
					<Card.Body>
						<GraficoGernal1 tiempoSesiones={consultasS} title={"Tiempo de sesiones por día"} />
					</Card.Body>
				</Card>

				<Card
					className="card-grafico-2"
				>
					<Card.Body>
						<GraficoGernal2 consultasM={consultasM} title={"Tiempo de materias por día"} />
					</Card.Body>
				</Card>

				<Card className="card-estadisticas">
					<div className="card-estadisticas__header">
						<h2 className="card-estadisticas__title">Sesiones</h2>
						<Badge className="card-estadisticas__icon"><BiClipboard /></Badge>
					</div>
					<Table responsive="sm"  style={{ textAlign: "center" }}>
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

				<Card className="card-estadisticas">
					<div className="card-estadisticas__header">
						<h2 className="card-estadisticas__title">Clientes</h2>
						<Badge className="card-estadisticas__icon"><BiUser /></Badge>
					</div>
					<Table responsive="sm"  style={{ textAlign: "center" }}>
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

				<Card className="card-estadisticas">
					<div className="card-estadisticas__header">
						<h2 className="card-estadisticas__title">Materias</h2>
						<Badge className="card-estadisticas__icon"><BiBookmark /></Badge>
					</div>
					<Table responsive="sm"  style={{ textAlign: "center" }}>
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

				<Card className="card-estadisticas">
					<div className="card-estadisticas__header">
						<h2 className="card-estadisticas__title">Submaterias</h2>
						<Badge className="card-estadisticas__icon"><BiBookmarks /></Badge>
					</div>
					<Table responsive="sm"  style={{ textAlign: "center" }}>
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

			</main>

		</>
	);
}

export default General;