import { VscTrash, VscEdit } from "react-icons/vsc";
import castTime from "../utils/functions/castTime";
import formatDateShow from "../utils/functions/formatDateShow";

const bodyAbogado = (abogado) => {
  return (
    <tr key={abogado.id} className="table-paginated-body__row">
      <td>{abogado.id}</td>
      <td>{abogado.nombre}</td>
      <td className="table-paginated-body__actions">
        <VscEdit className="table-paginated-body__actions-item table-paginated-body__actions-item--edit" />
        <VscTrash className="table-paginated-body__actions-item table-paginated-body__actions-item--delete" />
      </td>
    </tr>
  );
};

const bodyCaso = (caso) => {
  return (
    <tr key={caso.id} className="table-paginated-body__row">
      <td>{caso.id}</td>
      <td>{formatDateShow(caso.fecha)}</td>
      <td>{caso.id_materia.nombre}</td>
      <td>{caso.id_submateria.nombre}</td>
      <td>{caso.id_cliente.nombre}</td>
      <td className="table-paginated-body__actions">
        <VscEdit className="table-paginated-body__actions-item table-paginated-body__actions-item--edit" />
        <VscTrash className="table-paginated-body__actions-item table-paginated-body__actions-item--delete" />
      </td>
    </tr>
  );
};

const bodyCliente = (cliente) => {
  return (
    <tr key={cliente.id} className="table-paginated-body__row">
      <td>{cliente.id}</td>
      <td>{cliente.nombre}</td>
      <td className="table-paginated-body__actions">
        <VscEdit className="table-paginated-body__actions-item table-paginated-body__actions-item--edit" />
        <VscTrash className="table-paginated-body__actions-item table-paginated-body__actions-item--delete" />
      </td>
    </tr>
  );
};

const bodyMateria = (materia) => {
  return (
    <tr key={materia.id} className="table-paginated-body__row">
      <td>{materia.id}</td>
      <td>{materia.nombre}</td>
      <td className="table-paginated-body__actions">
        <VscEdit className="table-paginated-body__actions-item table-paginated-body__actions-item--edit" />
        <VscTrash className="table-paginated-body__actions-item table-paginated-body__actions-item--delete" />
      </td>
    </tr>
  );
};

const bodySesion = (sesion) => {
  return (
    <tr key={sesion.id} className="table-paginated-body__row">
      <td>{sesion.id}</td>
      <td>{castTime(sesion.tiempo)}</td>
      <td>{formatDateShow(sesion.fecha)}</td>
      <td>{sesion.id_caso.id}</td>
      <td>{sesion.id_abogado.nombre}</td>
      <td className="table-paginated-body__actions">
        <VscEdit className="table-paginated-body__actions-item table-paginated-body__actions-item--edit" />
        <VscTrash className="table-paginated-body__actions-item table-paginated-body__actions-item--delete" />
      </td>
    </tr>
  );
};

const bodySubmateria = (submateria) => {
  return (
    <tr key={submateria.id} className="table-paginated-body__row">
      <td>{submateria.id}</td>
      <td>{submateria.nombre}</td>
      <td>{submateria.id_materia.nombre}</td>
      <td className="table-paginated-body__actions">
        <VscEdit className="table-paginated-body__actions-item table-paginated-body__actions-item--edit" />
        <VscTrash className="table-paginated-body__actions-item table-paginated-body__actions-item--delete" />
      </td>
    </tr>
  );
};

export {
  bodyAbogado,
  bodyCaso,
  bodyCliente,
  bodyMateria,
  bodySesion,
  bodySubmateria,
};
