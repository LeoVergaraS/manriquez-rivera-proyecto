import Dropdown from "react-bootstrap/Dropdown";
import './dropdownR.scss'

const DropdownR = () => {
    return (
        <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{backgroundColor:"#235c62"}}>
          lucho sexo
        </Dropdown.Toggle>

        <Dropdown.Menu style={{backgroundColor:"#235c62"}}>
          <Dropdown.Item href="#/action-1">Ultimos 7 días</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Ultimos 28 días</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Ultimos 90 días</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Ultimos 365 días</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Desde siempre</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-3">2023</Dropdown.Item>
          <Dropdown.Item href="#/action-3">2022</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-3">Octubre</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Septiembre</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Agosto</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-3">Personalizado</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
};

export default DropdownR;
