import "./table_01.scss";

const Table_01 = ({header,listObject}) => {
  const keys = () => {
    if(listObject === null || listObject === undefined || listObject.length === 0) return [];
    const k = Object.keys(listObject[0]);
    return k;
  }

  // time -> seg
  const castTime = (time) => {
    console.log(time)
    if (time < 3600) {
      // Si es menor a una hora, muestra solo minutos
      const minutos = Math.floor(time / 60);
      return `${minutos} min`;
    } else {
      // Si es una hora o más, muestra horas y minutos
      const horas = Math.floor(time / 3600);
      const minutos = Math.floor((time % 3600) / 60);
      const horasStr = String(horas).padStart(2, '0');
      const minutosStr = String(minutos).padStart(2, '0');
      return `${horasStr} hrs ${minutosStr} min`;
    }
  }

  const getter = keys();

  const getTotal = (consulta) => {
    let total = 0;
    consulta.forEach((item) => {
      total += item.tiempo;
    });
    return castTime(total);
  }

  if(listObject === null || listObject === undefined || listObject.length === 0) return <div></div>;

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
