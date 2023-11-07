import "./admin.scss";
import { useState } from "react";
import headers from "../../data/headers";
import Tabla from "../../components/Table/Tabla";
import { bodyAbogado, bodyCaso, bodyCliente, bodyMateria, bodySesion, bodySubmateria } from "../../data/bodies";
import {FormAbogado, FormCasoAdmin, FormCliente, FormMateria, FormSesion, FormSubmateria} from "../../components/Forms";

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
        {selected === 1 ? (<Tabla content={"abogados"} name={"abogado"} headers={headers.abogados} body={bodyAbogado} form={FormAbogado} />) : null}
        {selected === 2 ? (<Tabla content={"casos"} name={"caso"} headers={headers.casos} body={bodyCaso} form={FormCasoAdmin} />) : null}
        {selected === 3 ? (<Tabla content={"clientes"} name={"cliente"} headers={headers.clientes} body={bodyCliente} form={FormCliente} />) : null}
        {selected === 4 ? (<Tabla content={"materias"} name={"materia"} headers={headers.materias} body={bodyMateria} form={FormMateria} />) : null}
        {selected === 5 ? (<Tabla content={"sesiones"} name={"sesión"} headers={headers.sesiones} body={bodySesion} form={FormSesion} />)  : null}
        {selected === 6 ? (<Tabla content={"submaterias"} name={"submateria"} headers={headers.submaterias} body={bodySubmateria} form={FormSubmateria} />) : null}
      </div>
    </main>
  );
};

export default Admin;
