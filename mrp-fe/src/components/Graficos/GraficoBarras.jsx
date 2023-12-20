import React from 'react';
import { Bar } from 'react-chartjs-2';
import './graficoBarras.scss';
import castTime from '../../utils/functions/castTime';

const GradicoBarras = ({ consultasM, tittle }) => {

    const tiempos = consultasM !== undefined ? consultasM.map((tiempo) => { return (tiempo.tiempo/60) }) : [];
    const materias = consultasM !== undefined ? consultasM.map((tiempo) => { return tiempo.nombre }) : [];

    const data = {
        labels: materias,
        datasets: [
            {
                label: 'Ingresos',
                backgroundColor: "#DFBF68",
                borderColor: "#DFBF68",
                borderWidth: 1,
                hoverBackgroundColor: "#DFBF68",
                hoverBorderColor: "#DFBF68",
                barPercentage: 0.3,
                data: tiempos
            },
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        var label = ' ';
                        if (context.parsed.y !== null) {
                            label += castTime(context.parsed.y * 60);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Materias', // Etiqueta para el eje x
                    color: '#1e3f43'
                },
                ticks: {
                    color: '#1e3f43'
                },
                grid: {
                    display: false
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Tiempo (minutos)', // Etiqueta para el eje y
                    color: '#1e3f43'
                },
                ticks: {
                    color: '#1e3f43'
                },
                grid: {
                    display: true,
                    color: 'lightGray'
                },
                beginAtZero: true
            }
        }
    };

    return (
        <div className="card grafico-barras">
            <div className="card-header grafico-barras__header">
                <h4 className="card-title text-center" >{tittle}</h4>
            </div>
            <div className="card-body grafico-barras__body">
                <Bar
                    data={data}
                    options={options}
                />
            </div>
        </div>
    );
};

export default GradicoBarras;

