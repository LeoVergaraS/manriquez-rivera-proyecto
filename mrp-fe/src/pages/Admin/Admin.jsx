import './admin.scss'

const Admin = () => {
  return (
    <main className="layout-admin">
      <aside className="admin-nav">
            <div className="admin-nav__column">
              <div className="admin-nav__item">
                Casos
              </div>
              <div className="admin-nav__item">
                Clientes
              </div>
              <div className="admin-nav__item">
                Materias
              </div>
              <div className="admin-nav__item">
                Submaterias
              </div>
              <div className="admin-nav__item">
                Sesiones
              </div>
              <div className="admin-nav__item">
                Submaterias
              </div>
              <div className="admin-nav__item">
                Abogados
              </div>
            </div>
          </aside>
          <div className="admin-content"></div>
    </main>
  );
}

export default Admin;