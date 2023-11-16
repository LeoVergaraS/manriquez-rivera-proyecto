import Swal from "sweetalert2";
import "./alerta.scss";
const Alerta = Swal.mixin({
  toast: true,
  width: '450px',
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    popup: 'alerta-popup',
  },
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

export default Alerta;