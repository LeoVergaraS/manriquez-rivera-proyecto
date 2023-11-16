import "./table.scss";
import axios from "axios";
import Cookies from 'js-cookie';
import Alerta from "../Alerta/Alerta";
import { useEffect, useState } from "react";
import { VscAdd, VscCheck, VscChevronDown, VscChevronUp, VscClose, VscDebugRestart } from "react-icons/vsc";
import { Container, Form, Modal, Pagination, Placeholder, Table } from "react-bootstrap";
import Select from "react-select";
import FormAbogado from "../Forms/FormAbogado/FormAbogado";
import FormUsuario from "../Forms/FormUsuario/FormUsuario";
import FormChange from "../Forms/FormChange/FormChange";
import Swal from "sweetalert2";

const TablaUsuario = (props) => {
  const body = props.body;

  /////////////////////////////////////////////////
  //              Usuario logueado
  /////////////////////////////////////////////////
  const [abogadoLogueado, setAbogadoLogueado] = useState(null);

  const getUsuarioLogueado = async () => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        };
        let url = "http://localhost:8090/auth/getUserLogueado";
        const response = await axios.get(url, config);
        if (response.status === 200) {
            setAbogadoLogueado(response.data.id_abogado);
        }
    } catch (err) {
        console.log(err.message);
    }
};

  //////////////////////////////////////////////////
  //        Para los filtros de la tabla
  //////////////////////////////////////////////////
  const [filter, setFilter] = useState("#");
  const [order, setOrder] = useState("ASC");

  const handleFilterChange = (e) => {
    setFilter(e.value);
  }

  const handleOnClickFilter = (e) => {
    const element = e.target.closest(".table-paginated-filtro__ordenar-icon");
    setOrder(e.target.id);


    const elements = document.querySelectorAll(
      ".table-paginated-filtro__ordenar-icon"
    );

    elements.forEach((element) => {
      element.classList.remove("table-paginated-filtro__ordenar-icon--selected");
    });
    element.classList.add("table-paginated-filtro__ordenar-icon--selected");
  };

  const orderBy = (atribute, order) => {
    const atr = atribute === "#" ? "id" : atribute.toLowerCase();
    const sortOrder = order === "ASC" ? 1 : -1;

    data.sort((a, b) => {
      if (a[atr] > b[atr]) return 1 * sortOrder;
      if (a[atr] < b[atr]) return -1 * sortOrder;
      return 0;
    });
  };

  /////////////////////////////////////////////////
  //        Para la busqueda de la tabla
  /////////////////////////////////////////////////
  const [filterSearch, setFilterSearch] = useState("#");
  const [dataCopy, setDataCopy] = useState(null);

  const handleSearchChange = (e) => {
    setFilterSearch(e.value);
  };

  const busqueda = (articulo, busqueda) => {
    articulo = articulo.toUpperCase();
    busqueda = busqueda.toUpperCase();

    var filtros = busqueda.replace(' ', '|');
    var regex = new RegExp(filtros).test(articulo);
    return regex;
  }

  const handleOnChangeSearch = (e) => {
    const buscar = e.target.value;
    const atr = filterSearch === "#" ? "id" : filterSearch.toLowerCase();

    if (atr === "id") {
      const newData = dataCopy.filter((item) => busqueda(item.id.toString(), buscar));
      setData(newData);
    } else {
      const newData = dataCopy.filter((item) => busqueda(item[atr], buscar));
      setData(newData);
    }
  };

  //////////////////////////////////////////////////
  //              Para la paginación
  //////////////////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sliceData, setSliceData] = useState(null);
  const [pagesCount, setPagesCount] = useState(null);

  const paginatedData = (data) => {
    setSliceData(
      data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    );
  };

  const handleOnClick = (e) => {
    setPageSize(e.target.innerHTML);
    paginatedData(data);
    const index = e.target.id - 1;

    const elements = document.querySelectorAll(
      ".table-paginated-footer__size-item"
    );
    const element = elements[index];

    elements.forEach((element) => {
      element.classList.remove("table-paginated-footer__size-item--selected");
    });
    element.classList.add("table-paginated-footer__size-item--selected");
  };

  //////////////////////////////////////////////////
  //           Service del componente
  //////////////////////////////////////////////////
  const [data, setData] = useState(null);
  const [item, setItem] = useState(null);

  const get = async (content) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      };
      const mapping = content.toLowerCase();
      const url = `http://localhost:8090/${mapping}`;
      const response = await axios.get(url, config);
      if (response.status === 200) {
        setData(response.data);
        setDataCopy(response.data);
        paginatedData(response.data);
        setPagesCount(Math.ceil(response.data.length / pageSize));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const createItem = async (content, item) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      };
      const mapping = content.toLowerCase();
      const url = `http://localhost:8090/${mapping}`;
      const response = await axios.post(url, item, config);
      if (response.status === 200) {
        toggleCreate();
        Alerta.fire({
          icon: "success",
          title: "Creado correctamente",
        });
      }
    } catch (err) { 
      console.error(err);
      Alerta.fire({
        icon: "error",
        title: "Error al crear",
        text: "El nombre de usuario ya existe",
      });
    }
  };

  const editItem = async (content, item) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      };
      const mapping = content.toLowerCase();
      const url = `http://localhost:8090/${mapping}`;
      const response = await axios.post(url, item, config);
      if (response.status === 200) {
        toggleEdit();
        Alerta.fire({
          icon: "success",
          title: "Editado correctamente",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const changePassword = async (content, item) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      };
      const mapping = content.toLowerCase();
      const url = `http://localhost:8090/${mapping}`;
      const response = await axios.post(url, item, config);
      if (response.status === 200) {
        toggleChange();
        Alerta.fire({
          icon: "success",
          title: "Contraseña cambiada correctamente",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (content, item) => {
    console.log(content);
    try {
      const config = {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` }
      };
      const mapping = content.toLowerCase();
      const url = `http://localhost:8090/${mapping}/delete`;
      const response = await axios.post(url, item, config);
      if (response.status === 200) {
        toggleDeleted();
        Swal.fire({
          title: 'Usuario eliminado correctamente',
          text: abogadoLogueado.nombre === item.nombre ? 'Se cerrará la sesión' : '',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          if (abogadoLogueado.nombre === item.nombre) {
            Cookies.remove('token')
            let claveObjeto = "CasoSeleccionado";

            localStorage.removeItem(claveObjeto);
            claveObjeto = "tiempoCronometro";
            localStorage.removeItem(claveObjeto);
            window.location.href = '/login'
          }
        }) 
      }
    } catch (err) {
      console.error(err);
    }
  };

  //////////////////////////////////////////////////
  //           Para el footer de la tabla
  //////////////////////////////////////////////////
  const infoFooter = () => {
    if (pageSize * currentPage > data.length) {
      return `${1 + (pageSize * (currentPage - 1))}-${data.length} de ${data.length}`
    }
    return `${1 + (pageSize * (currentPage - 1))}-${pageSize * currentPage} de ${data.length}`
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > Math.ceil(data.length / pageSize)) return;
    setCurrentPage(page);
  };

  //////////////////////////////////////////////////
  //               Para los modals
  //////////////////////////////////////////////////
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [change, setChange] = useState(false);

  const toggleCreate = () => setCreate(!create);
  const toggleEdit = (element) => {
    item === null ? setItem(element) : setItem(null);
    setEdit(!edit);
  };
  const toggleDeleted = (element) => {
    item === null ? setItem(element) : setItem(null);
    setDeleted(!deleted)
  };
  const toggleChange = (element) => {
    item === null ? setItem(element) : setItem(null);
    setChange(!change)
  }

  //////////////////////////////////////////////////
  //               Efectos
  //////////////////////////////////////////////////
  useEffect(() => {
    getUsuarioLogueado();
  }, []);

  useEffect(() => {
    get(props.content);
  }, [props.content]);

  useEffect(() => {
    if (data !== null) {
      orderBy(filter, order);
      paginatedData(data);
      setPagesCount(Math.ceil(data.length / pageSize));
    };
  }, [data, filter, order, currentPage, pageSize]);

  return (
    <>
      <Container style={{ marginTop: 20 }}>
        <div className="table-paginated-filtro">
          <div className="table-paginated-filtro__ordenar">
            <p className="table-paginated-filtro__ordenar-text">Ordenar por:</p>
            <Select
              className="table-paginated-filtro__ordenar-select"
              classNamePrefix="ordenar-select"
              defaultValue={{ value: props.headers[0], label: props.headers[0] }}
              options={props.headers.slice(0, props.headers.length - 1).map((header) => ({ value: header, label: header }))}
              isClearable={false}
              isSearchable={false}
              onChange={handleFilterChange}
            />
            <VscChevronUp id="ASC" value="ASC" onClick={handleOnClickFilter} className="table-paginated-filtro__ordenar-icon table-paginated-filtro__ordenar-icon--selected" />
            <VscChevronDown id="DESC" value="ASC" onClick={handleOnClickFilter} className="table-paginated-filtro__ordenar-icon" />
          </div>
          <div className="table-paginated-filtro__buscar">
            <Select
              className="table-paginated-filtro__buscar-select"
              classNamePrefix="buscar-select"
              defaultValue={{ value: props.headers[0], label: props.headers[0] }}
              options={props.headers.slice(0, props.headers.length - 1).map((header) => ({ value: header, label: header }))}
              isClearable={false}
              isSearchable={false}
              onChange={handleSearchChange}
            />
            <Form.Control
              className="table-paginated-filtro__buscar-input"
              type="text"
              placeholder="Buscar..."
              onChange={handleOnChangeSearch}
            />
          </div>
        </div>
        <Table className="table-paginated" striped responsive="sm" hover>
          <thead className="table-paginated-head">
            <tr className="table-paginated-head__row">
              {props.headers.map((header, index) => (
                <th className="table-paginated-head__item" key={index}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table-paginated-body">
            {sliceData === null ?
              <tr className="table-paginated-body__row">
                {props.headers.map((_, index) => (
                  <th className="table-paginated-body__item" key={index}>
                    <Placeholder as="div" animation="glow">
                      <Placeholder xs={6} bg="warning" />
                    </Placeholder>
                  </th>
                ))
                }
              </tr>
              : sliceData.map((item) => body(item, toggleEdit, toggleDeleted, toggleChange))}
          </tbody>
        </Table>
        <div className="table-paginated-footer">
          <div className="table-paginated-footer__info">
            <p className="table-paginated-footer__info-text">
              {data !== null && infoFooter()}
            </p>
            <ul className="table-paginated-footer__page-size">
              <li
                id={1}
                className="table-paginated-footer__size-item table-paginated-footer__size-item--selected"
                onClick={handleOnClick}
              >
                10
              </li>
              <li
                id={2}
                className="table-paginated-footer__size-item"
                onClick={handleOnClick}
              >
                25
              </li>
              <li
                id={3}
                className="table-paginated-footer__size-item"
                onClick={handleOnClick}
              >
                50
              </li>
              <li
                id={4}
                className="table-paginated-footer__size-item"
                onClick={handleOnClick}
              >
                100
              </li>
            </ul>
          </div>
          <hr className="table-paginated-footer__divider" />
          <div className="table-paginated-footer__actions">
            <VscAdd
              className="table-paginated-footer__actions-item"
              onClick={toggleCreate}
            />
            <VscDebugRestart
              className="table-paginated-footer__actions-item"
              onClick={() => get(props.content)}
            />
          </div>
        </div>
        {pagesCount !== null && (
          <Pagination className="table-paginated__pagination">
            <Pagination.First
              onClick={() => handlePageChange(1)}
              className="table-paginated__pagination-first"
            />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} className="table-paginated__pagination-prev" />
            {[...Array(pagesCount).keys()].map((page) => {
              if (pagesCount <= 5) {
                return (
                  <Pagination.Item
                    key={page + 1}
                    active={page + 1 === currentPage}
                    onClick={() => handlePageChange(page + 1)}
                    className="table-paginated__pagination-item"
                  >
                    {page + 1}
                  </Pagination.Item>
                );
              } else {
                if (currentPage <= 3 && page <= 5) {
                  if (page === 5) return <Pagination.Ellipsis className="table-paginated__pagination-ellipsis" />
                  return (
                    <Pagination.Item
                      key={page + 1}
                      active={page + 1 === currentPage}
                      onClick={() => handlePageChange(page + 1)}
                      className="table-paginated__pagination-item"
                    >
                      {page + 1}
                    </Pagination.Item>
                  );
                } else if (currentPage >= pagesCount - 2 && page >= pagesCount - 6) {
                  if (page === pagesCount - 6) return <Pagination.Ellipsis className="table-paginated__pagination-ellipsis" />
                  return (
                    <Pagination.Item
                      key={page + 1}
                      active={page + 1 === currentPage}
                      onClick={() => handlePageChange(page + 1)}
                      className="table-paginated__pagination-item"
                    >
                      {page + 1}
                    </Pagination.Item>
                  )
                } else if (currentPage - 4 <= page && page <= currentPage + 2) {
                  if (currentPage - 4 === page || currentPage + 2 === page) return <Pagination.Ellipsis className="table-paginated__pagination-ellipsis" />
                  return (
                    <Pagination.Item
                      key={page + 1}
                      active={page + 1 === currentPage}
                      onClick={() => handlePageChange(page + 1)}
                      className="table-paginated__pagination-item"
                    >
                      {page + 1}
                    </Pagination.Item>
                  )
                }
              }
            })}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} className="table-paginated__pagination-next" />
            <Pagination.Last
              onClick={() => handlePageChange(Math.ceil(data.length / pageSize))}
              className="table-paginated__pagination-last"
            />
          </Pagination>
        )}
      </Container>

      {/* MODAL CREATE */}
      <Modal show={create} onHide={toggleCreate}>
        <Modal.Header closeButton>
          <h3>Crear abogado</h3>
        </Modal.Header>
        <Modal.Body>
          <FormUsuario item={null} close={toggleCreate} post={createItem} />
        </Modal.Body>
      </Modal>

      {/* MODAL EDIT */}
      <Modal show={edit} onHide={toggleEdit}>
        <Modal.Header closeButton>
          <h3>Editar nombre de usuario</h3>
        </Modal.Header>
        <Modal.Body>
          <FormAbogado item={item} close={toggleEdit} post={editItem} />
        </Modal.Body>
      </Modal>

      {/* MODAL CHANGE */}
      <Modal show={change} onHide={toggleChange}>
        <Modal.Header closeButton>
          <h3>Cambiar contraseña</h3>
        </Modal.Header>
        <Modal.Body>
          <FormChange item={item} close={toggleChange} post={changePassword} />
        </Modal.Body>
      </Modal>

      {/* MODAL DELETE */}
      <Modal show={deleted} onHide={toggleDeleted}>
        <Modal.Header closeButton>
          <h3>Eliminar abogado</h3>
        </Modal.Header>
        <Modal.Body>
          <h5>¿Está seguro que desea eliminar el item?</h5>
        </Modal.Body>
        <Modal.Footer>
          <VscClose onClick={toggleDeleted} style={{ cursor: "pointer", color: "rgb(172, 172, 172)", fontSize: 30 }} />
          <VscCheck onClick={() => deleteItem("usuarios", item)} style={{ cursor: "pointer", color: "rgb(223, 191, 104)", fontSize: 30 }} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TablaUsuario;
