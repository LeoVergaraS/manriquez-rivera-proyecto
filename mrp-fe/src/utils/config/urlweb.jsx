
const getUrl = (hostname) => {
    if(hostname === "localhost"){
        return `http://${hostname}:8090/api`;
    }else{
        return `https://${hostname}/api`;
    }
}


const hostname = window.location.hostname;
const urlweb = getUrl(hostname);
export default urlweb;