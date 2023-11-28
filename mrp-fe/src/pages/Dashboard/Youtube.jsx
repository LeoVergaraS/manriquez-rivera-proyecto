import "./youtube.scss";
import axios from "axios";
import Cookies from 'js-cookie';
import General from "./General";
import Clientes from "./Clientes";
import Materias from "./Materias";

import { useEffect, useState } from "react";
import DropdownR from "../../components/Dropdown/DropdownR";
import formatearFecha from "../../utils/functions/formatearFecha";
import DropdownAbogado from "../../components/Dropdown/DropdownAbogado";
import formatDateBarraFiltro from "../../utils/functions/formatDateBarraFiltro";
import { VscChevronLeft, VscGlobe, VscPerson, VscLayers } from "react-icons/vsc";

import urlweb from "../../utils/config/urlweb";

const Youtube = () => {

	const [fechaFiltroInicio, setFechaFiltroInicio] = useState("2023-01-01");
	const [fechaFiltroFin, setFechaFiltroFin] = useState("2023-01-01");
	

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


	const [fechaFin, setFechaFin] = useState(formatearFecha(new Date(), 1, 0));
	const [fechaInicio, setFechaInicio] = useState(formatearFecha(new Date(), 0, 6));

	const [abogado, setAbogado] = useState({
		nombre: "Todos",
		id: -1,
	});

	const [abogados, setAbogados] = useState([]);


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

	const handleSearch = (fechas) => {
		setFechaFiltroInicio(fechas.fechaInicio)
		setFechaFiltroFin(fechas.fechaFin)
		setFechaInicio(fechas.fechaInicio);
		setFechaFin(fechas.fechaFin);

		const difMS = new Date(fechas.fechaFin) - new Date(fechas.fechaInicio);
		
		const difDias = Math.trunc(difMS / (1000 * 60 * 60 * 24));
		console.log(difDias)
		setDropSelect(difDias + 1);
		setDropSiempre(0);
		setDropAnio(0);
	};

	const getAbogados = async () => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` }
			};
			let url = `http://${urlweb}/abogados`;
			const response = await axios.get(url, config);
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
		getAbogados();
	}, []);

	return (
		<>
			<div className="filtro">
				<div className={`filtro__button-collapse ${isCollapsed ? "filtro__button-collapse--collapse" : ""}`}>
					<VscChevronLeft size={30} onClick={toggleCollapse} />
				</div>
				<h4 className="filtro__text">Filtrar por</h4>
				<div className="filtro__opciones">
					<fieldset>
						<label>Abogado </label>
						<DropdownAbogado
							set={setAbogado}
							abogados={abogados}
							abogado={abogado}
						/>
					</fieldset>
					<fieldset>
						<label>Fecha </label>
						<DropdownR
							className="filtro__tiempo"
							fi={fechaInicio}
							ff={fechaFin}
							handleSearch={handleSearch}
							setFI={setFechaInicio}
							setFF={setFechaFin}
							setDropSelect={setDropSelect}
							setDropSiempre={setDropSiempre}
							setDropAnio={setDropAnio}
							setFlag={setFlag}
						/>
					</fieldset>


				</div>
				<h6 className="filtro__tiempo-text" style={{ color: "#1E464B" }}>{formatDateBarraFiltro(fechaFiltroInicio, fechaFiltroFin)}</h6>
			</div>
			<main className="dashboard-layout">
				<aside
					className={`dashboard-navegador ${isCollapsed ? "dashboard-navegador--collapse" : ""}`}
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
							dropSiempre={dropSiempre}
							dropAnio={dropAnio}
							setFechaInicio={setFechaInicio}
							fechaInicio={fechaInicio}
							fechaFin={fechaFin}
							dropSelect={dropSelect}
							abogado={abogado}
							setDropSelect={setDropSelect}
							setFechaFiltroInicio={setFechaFiltroInicio}
							setFechaFiltroFin={setFechaFiltroFin}
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
							setFechaInicio={setFechaInicio}
							setFechaFiltroInicio={setFechaFiltroInicio}
							setFechaFiltroFin={setFechaFiltroFin}
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
							setFechaInicio={setFechaInicio}
							setFechaFiltroInicio={setFechaFiltroInicio}
							setFechaFiltroFin={setFechaFiltroFin}
						/>
					) : null}
				</div>
			</main>
		</>
	);
};

export default Youtube;
