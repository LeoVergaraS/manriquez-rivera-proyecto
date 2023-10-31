import { Container, Table } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { VscAdd, VscDebugRestart } from "react-icons/vsc";
import "./table.scss";

const Tabla = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState(null);
  const [sliceData, setSliceData] = useState(null);

  const body = props.body;

  const paginatedData = (data) => {
    setSliceData(data.slice((currentPage - 1) * pageSize, currentPage * pageSize));
    
  };


  const handleOnClick = (e) => {
    setPageSize(e.target.innerHTML);
    paginatedData(data);
    const index = e.target.id - 1;

    const elements = document.querySelectorAll(".table-paginated-footer__size-item");
    const element = elements[index];

    elements.forEach((element) => {
      element.classList.remove("table-paginated-footer__size-item--selected");
    });
    element.classList.add("table-paginated-footer__size-item--selected");
  };

  const get = async (content) => {
    try {
      const mapping = content.toLowerCase();
      const url = `http://localhost:8090/${mapping}`;
      const response = await axios.get(url);
      if (response.status === 200) {
        setData(response.data);
        paginatedData(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > Math.ceil(data / pageSize)) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    get(props.content);
  }, [props.content]);

  return (
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
          {sliceData !== null && sliceData.map((item) => body(item))}
        </tbody>
      </Table>
      <div className="table-paginated-footer">
        <ul className="table-paginated-footer__page-size">
          <li id={1} className="table-paginated-footer__size-item table-paginated-footer__size-item--selected" onClick={handleOnClick}>10</li>
          <li id={2} className="table-paginated-footer__size-item" onClick={handleOnClick}>25</li>
          <li id={3} className="table-paginated-footer__size-item" onClick={handleOnClick}>50</li>
          <li id={4} className="table-paginated-footer__size-item" onClick={handleOnClick}>100</li>
        </ul>
        <hr className="table-paginated-footer__divider" />
        <div className="table-paginated-footer__actions">
          <VscAdd className="table-paginated-footer__actions-item" />
          <VscDebugRestart className="table-paginated-footer__actions-item" onClick={() => get(props.content)}/>
        </div>
      </div>
    </Container>
  );
};

export default Tabla;
