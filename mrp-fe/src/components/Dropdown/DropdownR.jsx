import Dropdown from "react-bootstrap/Dropdown";
import "./dropdownR.scss";
import { useEffect, useState } from "react";
import opciones from "./Opciones";
import meses from "../../data/meses";
import formatearFecha from "../../utils/functions/formatearFecha";
import formatFechaAnios from "../../utils/functions/formatFechaAnios";
import formatFechaMeses from "../../utils/functions/formatFechaMeses";
import { Toast } from "react-bootstrap";
import FormPersonalizado from "../Forms/FormPersonalizado/FormPersonalizado";

const DropdownR = ({fi, ff, setFI, setFF, setDropSelect, setDropSiempre, setDropAnio, setFlag, handleSearch }) => {
	const mesActual = new Date().getMonth();

	const anioActual = new Date().getFullYear();
	const anioAnterior = anioActual - 1;

	// primer dia del año. Opciones 2023 - 2022
	const primerDia = new Date(anioActual, 0, 1);
	const ultimoDia = new Date(anioActual, 11, 31);
	const primerDiaAnterior = new Date(anioAnterior, 0, 1);
	const ultimoDiaAnterior = new Date(anioAnterior, 11, 31);

	const [selectedValue, setSelectedValue] = useState(opciones[0].nombre);

	const handleDropDownSelect = (eventKey) => {
		toggleOpen();
		setSelectedValue(opciones[eventKey - 1].nombre);

		if (eventKey == 1 || eventKey == 2 || eventKey == 3 || eventKey == 4) {
			setFF(formatearFecha(new Date(), 1, 0));
			if (eventKey == 1) {
				setFI(formatearFecha(new Date(), 0, 6));
				setDropSelect(7);
				setDropSiempre(0);
				setDropAnio(0);
				setFlag(0);
			}
			if (eventKey == 2) {
				setFI(formatearFecha(new Date(), 0, 27));
				setDropSelect(28);
				setDropSiempre(0);
				setDropAnio(0);
				setFlag(0);
			}
			if (eventKey == 3) {
				setFI(formatearFecha(new Date(), 0, 89));
				setDropSelect(90);
				setDropSiempre(0);
				setDropAnio(0);
				setFlag(0);
			}
			if (eventKey == 4) {
				setFI(formatearFecha(new Date(), 0, 364));
				setDropSelect(365);
				setDropSiempre(0);
				setDropAnio(0);
				setFlag(0);
			}
		}

		if (eventKey == 5) {
			setFF(formatearFecha(new Date(), 1, 0));
			setDropSiempre(1);
			setDropAnio(0);
			setFlag(1);
		}

		if (eventKey == 6) {
			setFF(formatFechaAnios(ultimoDia));
			setFI(formatFechaAnios(primerDia));
			setDropSiempre(0);
			setDropAnio(1);
			setFlag(0);
		}

		if (eventKey == 7) {
			setFF(formatFechaAnios(ultimoDiaAnterior));
			setFI(formatFechaAnios(primerDiaAnterior));
			setDropSiempre(0);
			setDropAnio(1);
			setFlag(0);
		}

		if (eventKey == 8) {
			formatFechaMeses(12, setFI, setFF, setDropSelect);
			setDropSiempre(0);
			setDropAnio(0);
			setFlag(0);
		}

		if (eventKey == 9) {
			formatFechaMeses(11, setFI, setFF, setDropSelect);
			setDropSiempre(0);
			setDropAnio(0);
			setFlag(0);
		}

		if (eventKey == 10) {
			formatFechaMeses(10, setFI, setFF, setDropSelect);
			setDropSiempre(0);
			setDropAnio(0);
			setFlag(0);
		}

		if (eventKey == 11) {
			toggleToast();
			setDropSiempre(0);
			setDropAnio(0);
			setFlag(0);
		}

	};

	//////////////////////////////////////////////////////
	// 				  Para el toast
	//////////////////////////////////////////////////////
	const [show, setShow] = useState(false);
	const toggleToast = () => setShow(!show);

	const handleSearchToast = (object) => {
		handleSearch(object);
		toggleToast();
	}

	//////////////////////////////////////////////////////
	// 			Para el collapse del dropdown
	//////////////////////////////////////////////////////
	const [open, setOpen] = useState(false);
	const toggleOpen = () => {
		if(show) toggleToast();
		setOpen(!open);
	}

	return (
		<>
			<Dropdown show={open} onSelect={handleDropDownSelect}>
				<Dropdown.Toggle
					onClick={toggleOpen}
					variant="secondary"
					id="dropdown-basic"
					style={{
						backgroundColor: "rgb(223,191,104,0.9)",
						width: "161px",
						borderColor: "transparent",
						boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.5)",
					}}
				>
					{selectedValue}
				</Dropdown.Toggle>
				<Dropdown.Menu style={{ backgroundColor: "rgb(223,191,104,0.95)" }}>
					{opciones.slice(0, 5).map((opcion) => (
						<Dropdown.Item key={opcion.id} eventKey={opcion.id}>
							{opcion.nombre}
						</Dropdown.Item>
					))}
					<Dropdown.Divider />
					<Dropdown.Item key={6} eventKey={6}>
						{anioActual}
					</Dropdown.Item>
					<Dropdown.Item key={7} eventKey={7}>
						{anioActual - 1}
					</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item key={8} eventKey={8}>
						{meses[(mesActual + 12) % 12]}
					</Dropdown.Item>
					<Dropdown.Item key={9} eventKey={9}>
						{meses[(mesActual + 11) % 12]}
					</Dropdown.Item>
					<Dropdown.Item key={10} eventKey={10}>
						{meses[(mesActual + 10) % 12]}
					</Dropdown.Item>
					<Dropdown.Divider />
					{opciones.slice(10, 11).map((opcion) => (
						<Dropdown.Item key={opcion.id} eventKey={opcion.id}>
							{opcion.nombre}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
			<Toast show={show} onClose={toggleToast} style={{ position: "absolute", zIndex: 1, backgroundColor: "white" }}>
				<Toast.Header style={{ borderBottom: "1px solid #9e9e9e" }}>
					<strong className="me-auto">Ingrese las fechas</strong>
				</Toast.Header>
				<Toast.Body style={{ backgroundColor: "white", borderRadius: "0 0 5px 5px" }}>
					<FormPersonalizado
						fi={fi}
						ff={ff}
						close={toggleToast}
						post={handleSearchToast}
						/>
				</Toast.Body>
			</Toast>
		</>
	);
};

export default DropdownR;
