import { useEffect, useState } from "react";
import "./admin.scss";
import Tabla from "../../components/Table/Tabla";
import headers from "../../data/headers";
import { bodyAbogado, bodyCaso, bodyCliente, bodyMateria, bodySesion, bodySubmateria } from "../../data/bodies";
import FormAbogado from "../../components/Forms/FormAbogado/FormAbogado";

const Admin = () => {
  const [selected, setSelected] = useState(1);
  const [content, setContent] = useState("Abogados");
  
  const handleOnClick = (e) => {
    setSelected(parseInt(e.target.id));
    setContent(e.target.innerHTML);

    const elements = document.querySelectorAll(".admin-nav__item");
    const index = e.target.id - 1;
    const element = elements[index];

    elements.forEach((element) => {
      element.classList.remove("admin-nav__item--selected");
    });
    element.classList.add("admin-nav__item--selected");
  };

  return (
    <main className="layout-admin">
      <aside className="admin-nav">
        <div className="admin-nav__column">
          <div
            id={1}
            className="admin-nav__item admin-nav__item--selected"
            onClick={handleOnClick}
          >
            Abogados
          </div>
          <div id={2} className="admin-nav__item" onClick={handleOnClick}>
            Casos
          </div>
          <div id={3} className="admin-nav__item" onClick={handleOnClick}>
            Clientes
          </div>
          <div id={4} className="admin-nav__item" onClick={handleOnClick}>
            Materias
          </div>
          <div id={5} className="admin-nav__item" onClick={handleOnClick}>
            Sesiones
          </div>
          <div id={6} className="admin-nav__item" onClick={handleOnClick}>
            Submaterias
          </div>
        </div>
      </aside>
      <div className="admin-content">
        <h1 className="admin-content__title">{content}</h1>
        {selected === 1 ? (<Tabla content={"abogados"} headers={headers.abogados} body={bodyAbogado} form={FormAbogado} />) : null}
        {selected === 2 ? (<Tabla content={"casos"} headers={headers.casos} body={bodyCaso} />) : null}
        {selected === 3 ? (<Tabla content={"clientes"} headers={headers.clientes} body={bodyCliente} />) : null}
        {selected === 4 ? (<Tabla content={"materias"} headers={headers.materias} body={bodyMateria} />) : null}
        {selected === 5 ? (<Tabla content={"sesiones"} headers={headers.sesiones} body={bodySesion} />) : null}
        {selected === 6 ? (<Tabla content={"submaterias"} headers={headers.submaterias} body={bodySubmateria} />) : null}
      </div>
    </main>
  );
};

export default Admin;
