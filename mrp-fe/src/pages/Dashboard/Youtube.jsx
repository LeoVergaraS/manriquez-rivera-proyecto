import "./youtube.scss";
import axios from "axios";
import Cookies from 'js-cookie';
import General from "./General";
import Clientes from "./Clientes";
import Materias from "./Materias";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DropdownR from "../../components/Dropdown/DropdownR";
import formatearFecha from "../../utils/functions/formatearFecha";
import formatDateUpload from "../../utils/functions/formatDateUpload";
import DropdownAbogado from "../../components/Dropdown/DropdownAbogado";
import { VscChevronLeft, VscGlobe, VscPerson, VscLayers } from "react-icons/vsc";

const Youtube = () => {

	const [selectedCliente, setSelectedCliente] = useState("");
	const [selectedGeneral, setSelectedGeneral] = useState("selected");
	const [selectedMateria, setSelectedMateria] = useState("");
	const [personalizado, setPersonalizado] = useState({
		fechaInicio: new Date(),
		fechaFin: new Date(),
	});

	const [dropSelect, setDropSelect] = useState(7);
	const [dropSiempre, setDropSiempre] = useState(0);
	const [dropAnio, setDropAnio] = useState(0);

	const [flag, setFlag] = useState(0);

	const [estadisticas, setEstadisticas] = useState([]);

	const [showModal, setShowModal] = useState(false);

	const [fechaFin, setFechaFin] = useState(formatearFecha(new Date(), 1, 0));
	const [fechaInicio, setFechaInicio] = useState(
		formatearFecha(new Date(), 0, 6)
		
	);
	// Variable que almacena las consultas de vista GENERAL
	// se les aplica todos los filtros
	const [consultasS, setConsultasS] = useState([]);
	const [consultasM, setConsultasM] = useState([]);

	const [abogado, setAbogado] = useState({
		nombre: "Todos",
		id: -1,
	});

	const [abogados, setAbogados] = useState([]);

	const handleModal = () => setShowModal(!showModal);

	const handleSelected = (type) => {
		if (type === "cliente") {
			setSelectedCliente("selected");
			setSelectedMateria("");
			setSelectedGeneral("");
		} else if (type === "materia") {
			setSelectedMateria("selected");
			setSelectedCliente("");
			setSelectedGeneral("");
		} else {
			setSelectedGeneral("selected");
			setSelectedCliente("");
			setSelectedMateria("");
		}
	};

	const getConsultasMaterias = async () => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` }
			};
			let url = "http://localhost:8090/consultas/materia/" + fechaInicio + "/" + fechaFin + "/" + dropSelect + "/" + dropSiempre + "/" +
				abogado.id;
			const response = await axios.get(url,config);
			if (response.status === 200) {
				setConsultasM(response.data);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const handleSearch = () => {
		setFechaInicio(formatDateUpload(personalizado.fechaInicio));
		setFechaFin(formatDateUpload(personalizado.fechaFin));
		const difMS = personalizado.fechaFin - personalizado.fechaInicio;
		const difDias = Math.trunc(difMS / (1000 * 60 * 60 * 24));
		setDropSelect(difDias + 1);
		setDropSiempre(0);
		setDropAnio(0);
		handleModal();
	};

	// aqui se obtienen las consultas de sesiones
	const getConsultasSesiones = async () => {
		try {
			// si es que se selecciono desde siempre
			if (dropSiempre == 1) {
				getConsultasSesionesDesdeSiempre();
			} else {
				// esto calcula la diferencia de dias entre las fechas cuando se selecciona un año en el dropSelect
				if (dropAnio == 1) {
					const fechaInicioAux = new Date(fechaInicio);
					const fechaFinAux = new Date(fechaFin);

					const difMS = fechaFinAux - fechaInicioAux;
					const difDias = Math.trunc(difMS / (1000 * 60 * 60 * 24));
					setDropSelect(difDias + 1);
				}

				const config = {
					headers: { Authorization: `Bearer ${Cookies.get("token")}` }
				};

				let url = "http://localhost:8090/consultas/sesiones/" + fechaInicio + "/" + fechaFin + "/" + dropSelect + "/" + abogado.id;
				const response = await axios.get(url,config);

				if (response.status === 200) {
					setConsultasS(response.data);
				}
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const getConsultasSesionesDesdeSiempre = async () => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` }
			};
			let url = "http://localhost:8090/consultas/sesiones/" + abogado.id;
			const response = await axios.get(url,config);
			if (response.status === 200) {
				setConsultasS(response.data);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const getEstadisticas = async () => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` }
			};
			let url = "http://localhost:8090/consultas/prueba/" + fechaInicio + "/" + fechaFin + "/" + dropSiempre + "/" + abogado.id;
			const response = await axios.get(url,config);
			if (response.status === 200) {
				setEstadisticas(response.data);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const getAbogados = async () => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` }
			};
			let url = "http://localhost:8090/abogados";
			const response = await axios.get(url,config);
			if (response.status === 200) {
				setAbogados(response.data);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const [isCollapsed, setIsCollapsed] = useState(false);

	const toggleCollapse = () => setIsCollapsed(!isCollapsed);

	useEffect(() => {
		getConsultasMaterias();
		getConsultasSesiones();
		getEstadisticas();
		getAbogados();
	}, [fechaFin,fechaInicio,dropSelect,dropSiempre,dropAnio,abogado,flag,abogado]);

	return (
		<>
			<div className="filtro">
				<div className={`filtro__button-collapse ${isCollapsed ? "filtro__button-collapse--collapse" : ""}`}>
					<VscChevronLeft size={30} onClick={toggleCollapse} />
				</div>
				<h4 className="filtro__text">Filtrar por</h4>
				<div className="filtro__opciones">
					<fieldset>
						<label>Abogado: </label>
						<DropdownAbogado
							set={setAbogado}
							abogados={abogados}
							abogado={abogado}
						/>
					</fieldset>
					<fieldset>
						<label>Fecha: </label>
						<DropdownR
							className="filtro__tiempo"
							setFI={setFechaInicio}
							setFF={setFechaFin}
							setDropSelect={setDropSelect}
							setDropSiempre={setDropSiempre}
							setDropAnio={setDropAnio}
							setShowModal={setShowModal}
							setFlag={setFlag}
						/>
					</fieldset>


				</div>
			</div>
			<main className="dashboard-layout">
				<aside
					className={`dashboard-navegador ${isCollapsed ? "dashboard-navegador--collapse" : ""
						}`}
				>
					<div className={`dashboard-navegador-content ${isCollapsed ? "dashboard-navegador-content--collapse" : ""}`}>
						<ul className="dashboard-navegador-content__tabs">
							<div className={"dashboard-navegador-content__tabs-item " + selectedGeneral} onClick={() => handleSelected("general")}>
								<VscGlobe size={40} className="dashboard-navegador-content__tabs-icon" />
								<p className="dashboard-navegador-content__tabs-text">General</p>
							</div>
							<div className={"dashboard-navegador-content__tabs-item " + selectedCliente} onClick={() => handleSelected("cliente")}>
								<VscPerson size={40} className="dashboard-navegador-content__tabs-icon" />
								<p className="dashboard-navegador-content__tabs-text">Cliente</p>
							</div>
							<div className={"dashboard-navegador-content__tabs-item " + selectedMateria} onClick={() => handleSelected("materia")}>
								<VscLayers size={40} className="dashboard-navegador-content__tabs-icon" />
								<p className="dashboard-navegador-content__tabs-text">Materia</p>
							</div>

						</ul>
					</div>
				</aside>
				<div className="dashboard-content">
					{selectedGeneral === "selected" ? (
						<General
							consultasS={consultasS}
							estadisticas={estadisticas}
							consultasM={consultasM}
						/>
					) : null}

					{selectedCliente === "selected" ? (
						<Clientes
							fechaInicio={fechaInicio}
							fechaFin={fechaFin}
							dropSiempre={dropSiempre}
							id_abo={abogado.id}
							dropSelect={dropSelect}
							dropAnio={dropAnio}
							setDropSelect={setDropSelect}
						/>
					) : null}

					{selectedMateria === "selected" ? (
						<Materias
							id_abogado={abogado.id}
							fechaInicio={fechaInicio}
							fechaFin={fechaFin}
							dropSelect={dropSelect}
							dropSiempre={dropSiempre}
							dropAnio={dropAnio}
							setDropSelect={setDropSelect}
						/>
					) : null}
				</div>
			</main>

			<Modal show={showModal} onHide={handleModal}>
				<Modal.Header closeButton>
					<Modal.Title>Rango de tiempo</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Fecha inicio</Form.Label>
							<Form.Control
								type="date"
								value={formatDateUpload(personalizado.fechaInicio)}
								onChange={(e) =>
									setPersonalizado({
										...personalizado,
										fechaInicio: new Date(e.target.value),
									})
								}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Fecha fin</Form.Label>
							<Form.Control
								type="date"
								value={formatDateUpload(personalizado.fechaFin)}
								onChange={(e) =>
									setPersonalizado({
										...personalizado,
										fechaFin: new Date(e.target.value),
									})
								}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleModal}>
						Cancelar
					</Button>
					<Button variant="success" onClick={handleSearch}>
						Buscar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Youtube;
