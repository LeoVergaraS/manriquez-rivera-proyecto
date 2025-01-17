import { VscTrash, VscEdit, VscLock } from "react-icons/vsc";
import castTime from "../utils/functions/castTime";
import formatDateShow from "../utils/functions/formatDateShow";

const bodyAbogado = (abogado, edit, deleted, change) => {
  return (
    <tr key={abogado.id} className="table-paginated-body__row">
      <td>{abogado.id}</td>
      <td>{abogado.nombre}</td>
      <td className="table-paginated-body__actions">
        <VscLock
          onClick={() => change(abogado)}
          className="table-paginated-body__actions-item table-paginated-body__actions-item--change"
        />
        <VscEdit
          onClick={() => edit(abogado)}
          className="table-paginated-body__actions-item table-paginated-body__actions-item--edit"
        />
        <VscTrash
          onClick={() => deleted(abogado)}
          className="table-paginated-body__actions-item table-paginated-body__actions-item--delete"
        />
      </td>
    </tr>
  );
};

const bodyCaso = (caso, edit, deleted) => {
  return (
    <tr key={caso.id} className="table-paginated-body__row">
      <td>{caso.id}</td>
      <td>{formatDateShow(caso.fecha)}</td>
      <td>{caso.id_materia.nombre}</td>
      <td>{caso.id_submateria.nombre}</td>
      <td>{caso.id_cliente.nombre}</td>
      <td className="table-paginated-body__actions">
        <VscEdit
          onClick={() => edit(caso)}
          className="table-paginated-body__actions-item table-paginated-body__actions-item--edit"
        />
        <VscTrash
          onClick={() => deleted(caso)}
          className="table-paginated-body__actions-item table-paginated-body__actions-item--delete"
        />
      </td>
    </tr>
  );
};

const bodyCliente = (cliente, edit, deleted) => {
  return (
    <tr key={cliente.id} className="table-paginated-body__row">
      <td>{cliente.id}</td>
      <td>{cliente.nombre}</td>
      <td className="table-paginated-body__actions">
        <VscEdit
          onClick={() => edit(cliente)}
          className="table-paginated-body__actions-item table-paginated-body__actions-item--edit"
        />
        <VscTrash
          onClick={() => deleted(cliente)}
          className="table-paginated-body__actions-item table-paginated-body__actions-item--delete"
        />
      </td>
    </tr>
  );
};

const bodyMateria = (materia, edit, deleted) => {
  return (
    <tr key={materia.id} className="table-paginated-body__row">
      <td>{materia.id}</td>
      <td>{materia.nombre}</td>
      <td className="table-paginated-body__actions">
        <VscEdit
          onClick={() => edit(materia)}
          className="table-paginated-body__actions-item table-paginated-body__actions-item--edit"
        />
        <VscTrash
          onClick={() => deleted(materia)}
          className="table-paginated-body__actions-item table-paginated-body__actions-item--delete"
        />
      </td>
    </tr>
  );
};

const bodySesion = (sesion, edit, deleted) => {
  return (
    <tr key={sesion.id} className="table-paginated-body__row">
      <td>{sesion.id}</td>
      <td>{castTime(sesion.tiempo)}</td>
      <td>{formatDateShow(sesion.fecha)}</td>
      <td>{sesion.hora_inicio}</td>
      <td>{sesion.id_caso.id}</td>
      <td>{sesion.id_abogado.nombre}</td>
      <td
        data-tooltip-id="tooltip-actividad"
        data-tooltip-content={sesion.actividad}
      >
        {sesion.actividad.length <= 20
          ? sesion.actividad
          : (sesion.actividad.substring(0, 17)).trim() + "..."}
      </td>

      <td className="table-paginated-body__actions">
        <VscEdit
          onClick={() => edit(sesion)}
          className="table-paginated-body__actions-item table-paginated-body__actions-item--edit"
        />
        <VscTrash
          onClick={() => deleted(sesion)}
          className="table-paginated-body__actions-item table-paginated-body__actions-item--delete"
        />
      </td>
    </tr>
  );
};

const bodySubmateria = (submateria, edit, deleted) => {
  return (
    <tr key={submateria.id} className="table-paginated-body__row">
      <td>{submateria.id}</td>
      <td>{submateria.nombre}</td>
      <td className="table-paginated-body__actions">
        <VscEdit
          onClick={() => edit(submateria)}
          className="table-paginated-body__actions-item table-paginated-body__actions-item--edit"
        />
        <VscTrash
          onClick={() => deleted(submateria)}
          className="table-paginated-body__actions-item table-paginated-body__actions-item--delete"
        />
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
