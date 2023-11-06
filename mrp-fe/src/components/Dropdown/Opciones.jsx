import meses from "../../data/meses";
const mesActual = new Date().getMonth();

const opciones = [
    {
        id: 1, nombre: "Últimos 7 días"
    },
    {
        id: 2, nombre: "Últimos 28 días"
    },
    {
        id: 3, nombre: "Últimos 90 días"
    },
    {
        id: 4, nombre: "Últimos 365 días"
    },
    {
        id: 5, nombre: "Desde siempre"
    },
    {
        id: 6, nombre: "2023"
    },
    {
        id: 7, nombre: "2022"
    },
    {
        id: 8, nombre: meses[(mesActual + 12) % 12]
    },
    {
        id: 9, nombre: meses[(mesActual + 11) % 12]
    },
    {
        id: 10, nombre: meses[(mesActual + 10) % 12]
    },
    {
        id: 11, nombre: "Personalizado"
    },
]

export default opciones;