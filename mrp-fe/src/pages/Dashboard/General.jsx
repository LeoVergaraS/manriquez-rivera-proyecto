import { Card, Row, Col } from "react-bootstrap";
import GraficoGernal1 from "../../components/Graficos/GraficoGernal1";
import List from "../../components/List/List";

const General = ({consultasS,estadisticas}) => {

	return (
		<>
			<Row>
				<Col xs={12} md={6}>
					<Card
						style={{
							marginLeft: "50px",
							marginTop: "50px",
							backgroundColor: "#235c62",
						}}
					>
						<Card.Body>
							<GraficoGernal1 tiempoSesiones={consultasS} title={"Tiempo de sesiones por día"} />
						</Card.Body>
					</Card>

					<Card
						style={{
							marginLeft: "50px",
							marginTop: "50px",
							backgroundColor: "#235c62",
						}}
					>
						<Card.Body>
							<GraficoGernal1 title={"Tiempo de materias por día"} />
						</Card.Body>
					</Card>
				</Col>
				<Col
					xs={6}
					md={6}
					className="d-flex justify-content-center align-items-center"
				>
					<Card
						style={{
							width: "50%",
							backgroundColor: "#1e464b",
							borderColor: "#1e464b",
							marginTop: "50px",
						}}
					>
						<List estadisticas={estadisticas}/>
					</Card>
				</Col>
			</Row>
		</>
	);
}

export default General;