import "./table.scss";
import axios from "axios";
import Cookies from 'js-cookie';
import Alerta from "../Alerta/Alerta";
import { useEffect, useState } from "react";
import { VscAdd, VscCheck, VscClose, VscDebugRestart } from "react-icons/vsc";
import { Container, Modal, Pagination, Placeholder, Table } from "react-bootstrap";

const Tabla = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState(null);
  const [sliceData, setSliceData] = useState(null);
  const [item, setItem] = useState(null);
  const [pagesCount, setPagesCount] = useState(null);


  const pagesToShow = 5;
  const name = props.name;
  const body = props.body;

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

  const get = async (content) => {
    try {
      const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` }
			};
      const mapping = content.toLowerCase();
      const url = `http://localhost:8090/${mapping}`;
      const response = await axios.get(url,config);
      if (response.status === 200) {
        setData(response.data);
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

  const deleteItem = async (content, item) => {
    try {
      const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` }
			};
      const mapping = content.toLowerCase();
      const url = `http://localhost:8090/${mapping}/delete`;
      const response = await axios.post(url, item, config);
      if (response.status === 200) {
        toggleDeleted();
        Alerta.fire({
          icon: "success",
          title: "Eliminado correctamente",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const infoFooter = () => {
    if(pageSize*currentPage > data.length){
      return `${1 + (pageSize*(currentPage - 1))}-${data.length} de ${data.length}`
    }
    return `${1 + (pageSize*(currentPage - 1))}-${pageSize*currentPage} de ${data.length}`
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > Math.ceil(data.length / pageSize)) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    get(props.content);
  }, [props.content]);

  useEffect(() => {
    if (data !== null){ 
      paginatedData(data);
      setPagesCount(Math.ceil(data.length / pageSize));
    };
  }, [currentPage, pageSize]);


  // Para los modals
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const toggleCreate = () => setCreate(!create);
  const toggleEdit = (element) => {
    item === null ? setItem(element) : setItem(null);
    setEdit(!edit);
  };
  const toggleDeleted = (element) => {
    item === null ? setItem(element) : setItem(null);
    setDeleted(!deleted)
  };

  return (
    <>
    <Container style={{ marginTop: 20 }}>
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
            {props.headers.map(( _, index) => (
              <th className="table-paginated-body__item" key={index}>
                <Placeholder as="div" animation="glow">
                  <Placeholder xs={6} bg="warning"/>
                </Placeholder>
              </th>
            ))
            }
          </tr>
          : sliceData.map((item) => body(item, toggleEdit, toggleDeleted))}
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
            if(pagesCount <= 5){
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
            }else{
              if(currentPage <= 3 && page <= 5){
                if(page === 5) return <Pagination.Ellipsis className="table-paginated__pagination-ellipsis" />
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
              }else if(currentPage >= pagesCount - 2 && page >= pagesCount - 6){
                if(page === pagesCount - 6) return <Pagination.Ellipsis className="table-paginated__pagination-ellipsis" />
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
              }else  if(currentPage - 4 <= page && page <= currentPage + 2){
                if(currentPage - 4 === page || currentPage + 2 === page) return <Pagination.Ellipsis className="table-paginated__pagination-ellipsis" />
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
            }})}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} className="table-paginated__pagination-next"/>
          <Pagination.Last
            onClick={() => handlePageChange(Math.ceil(data.length / pageSize)) }
            className="table-paginated__pagination-last"
          />
        </Pagination>
      )}
    </Container>

    {/* MODAL CREATE */}
    <Modal show={create} onHide={toggleCreate}>
      <Modal.Header closeButton>
        <h3>{"Crear " + name}</h3>
      </Modal.Header>
      <Modal.Body>
        <props.form item={null} close={toggleCreate} post={createItem}/>
      </Modal.Body>
    </Modal>

    {/* MODAL EDIT */}
    <Modal show={edit} onHide={toggleEdit}>
      <Modal.Header closeButton>
        <h3>{"Editar " + name}</h3>
      </Modal.Header>
      <Modal.Body>
        <props.form item={item} close={toggleEdit} post={editItem}/>
      </Modal.Body>
    </Modal>

    {/* MODAL DELETE */}
    <Modal show={deleted} onHide={toggleDeleted}>
      <Modal.Header closeButton>
        <h3>{"Eliminar " + name}</h3>
      </Modal.Header>
      <Modal.Body>
        <h5>¿Está seguro que desea eliminar el item?</h5>
      </Modal.Body>
      <Modal.Footer>
        <VscClose onClick={toggleDeleted} style={{cursor: "pointer", color: "red", fontSize: 30}} />
        <VscCheck onClick={() => deleteItem(props.content,item)} style={{cursor: "pointer", color: "green", fontSize: 30}} />
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default Tabla;
