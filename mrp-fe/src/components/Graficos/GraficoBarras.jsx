import React from 'react';
import { Bar } from 'react-chartjs-2';

const GradicoBarras = ({consultasM, tittle }) => {

    const tiempos = consultasM !== undefined ? consultasM.map((tiempo) => { return tiempo.tiempo }) : [];
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
                            label += context.parsed.y;
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
        <>
            <div className="card" style={{ height: "100%" }}>
                <div className="card-header">
                    <h4 className="card-title text-center" >{tittle}</h4>
                </div>
                <div className="card-body" style={{ height: "100%" }}>
                    <Bar
                        data={data}
                        options={options}
                    />
                </div>
            </div>

        </>
    );
};

export default GradicoBarras;

