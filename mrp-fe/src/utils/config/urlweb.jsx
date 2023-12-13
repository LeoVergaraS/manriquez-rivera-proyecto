
const verificarConexion = (hostname) => {
    if(hostname === "localhost"){
        return ":8090";
    }else{
        return "/api";
    }
}


const hostname = window.location.hostname;
const conect = verificarConexion(hostname);
const urlweb = `${hostname}${conect}`
export default urlweb;