import "./table_01.scss";
import castTime from "../../utils/functions/castTime";

const Table_01 = ({ header, listObject }) => {
  const keys = () => {
    if (listObject === null || listObject === undefined || listObject.length === 0) return [];
    const k = Object.keys(listObject[0]);
    return k;
  }

  const getter = keys();

  const getTotal = (consulta) => {
    let total = 0;
    consulta.forEach((item) => {
      total += item.tiempo;
    });
    return castTime(total);
  }

  if (listObject === null || listObject === undefined || listObject.length === 0) return <div></div>;

  return (
    <div className="tabla">
      <div className="tabla__row">
        <div className="tabla__cabecera">
          {header.map((item, index) => (
            <p key={`header_${index}`} className="tabla__cabecera-item">
              {item}
            </p>
          ))}
        </div>
      </div>
      {listObject.map((consulta) => {
        return (
          <div className="tabla__row">
            <div className="tabla__content">
              <div className="tabla__content-item">{consulta[getter[0]]}</div>
              <div className="tabla__content-item">{castTime(consulta[getter[1]])}</div>
            </div>
          </div>
        );
      })}

      <div className="tabla__row">
        <div className="tabla__footer">
          <div className="tabla__footer-item">Total</div>
          <div className="tabla__footer-item">{getTotal(listObject)}</div>
        </div>
      </div>
    </div>
  );
};

export default Table_01;
