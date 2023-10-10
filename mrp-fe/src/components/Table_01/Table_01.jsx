import "./table_01.scss";

const Table_01 = ({header,listObject}) => {
  const keys = () => {
    if(listObject === null || listObject === undefined) return [];
    const k = Object.keys(listObject[0]);
  }

  const getTotal = (consulta) => {
    let total = 0;
    consulta.forEach((item) => {
      total += item.tiempo;
    });
    return total;
  }

  return (
    <div className="tabla">
      <div className="tabla__row">
        <div className="tabla__cabecera">
          {header.map((item) => <p className="tabla__cabecera-item">{item}</p>)}
        </div>
      </div>
      {listObject.map((consulta) => {
        return (
          <div className="tabla__row">
            <div className="tabla__content">
              <div className="tabla__content-item">{consulta[keys[0]]}</div>
              <div className="tabla__content-item">{consulta[keys[1]]}</div>
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
