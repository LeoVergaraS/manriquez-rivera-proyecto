import Dropdown from "react-bootstrap/Dropdown";
import "./dropdownR.scss";

const DropdownAbogado = ({dropSelect, abogados, abogado}) => {
    return (
        <>
            <Dropdown onSelect={dropSelect}>
                <Dropdown.Toggle
                    variant="secondary"
                    id="dropdown-basic"
                    style={{
                        backgroundColor: "#235c62",
                        width: "161px",
                    }}
                >
                    {abogado.nombre}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ backgroundColor: "#235c62" }}>
                    {abogados.map((abogadoOpcion) => (
                        <Dropdown.Item key={abogadoOpcion.id} eventKey={abogadoOpcion.id}>
                            {abogadoOpcion.nombre}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default DropdownAbogado;