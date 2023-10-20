import React, { Component, useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import 'chart.js/auto';

const dias = ['2023-10-13','2023-10-14','2023-10-15','2023-10-16','2023-10-17','2023-10-18','2023-10-19']
const sesiones = [420, 0, 0, 480, 400, 460, 395]
//const colores = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']

const GraficoGernal1 = ({title, tiempoSesiones}) =>{
    const chartRef = useRef();
    const myChartRef = useRef(null);

    //const dias = tiempoSesiones !== undefined ? tiempoSesiones.map((tiempo) => { return tiempo.fecha }) : [];
    //const sesiones = tiempoSesiones !== undefined ? tiempoSesiones.map((tiempo) => { return tiempo.tiempo }) : [];

    useEffect(() => {
        console.log(dias, sesiones)
        if (myChartRef.current) {
            myChartRef.current.destroy();
        }

        const myChart = new Chart(chartRef.current, {
            type: 'line',
            data: {
                labels: dias,
                datasets: [
                    {   
                        label: "Sesiones",
                        data: sesiones,
                        fill: false,
                        borderColor: 'lightBlue',
                        tension: 0.3,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Días de la semana', // Etiqueta para el eje x
                            color: '#1e3f43'
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Horas se sesión', // Etiqueta para el eje y
                            color: '#1e3f43'
                        },
                        grid: {
                            display: true,
                            color: 'lightGray'
                        },
                        beginAtZero: true
                    }
                }
            },

        });

        myChartRef.current = myChart;
    },[tiempoSesiones]);

        return (
            <>
            <div className="card">
                <div className="card-header"> 
                    <h4 className="card-title text-center" >{title}</h4>
                </div>
                <div className="card-body" >
                    <canvas
                        id="myChart"
                        ref={chartRef}
                    />
                </div>
            </div>
            </>
        );
    }

export default GraficoGernal1;
