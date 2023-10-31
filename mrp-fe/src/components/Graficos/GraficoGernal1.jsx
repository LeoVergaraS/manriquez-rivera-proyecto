import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import 'chart.js/auto';
import castTime from '../../utils/functions/castTime';

const GraficoGernal1 = ({title, tiempoSesiones}) =>{


    const tiempos = tiempoSesiones !== undefined ? tiempoSesiones.map((tiempo) => { return tiempo.tiempo}) : [];
    const dias1 = tiempoSesiones !== undefined ? tiempoSesiones.map((tiempo) => { return tiempo.fecha }) : [];

    const chartRef = useRef();
    const myChartRef = useRef(null);

    //const dias = tiempoSesiones !== undefined ? tiempoSesiones.map((tiempo) => { return tiempo.fecha }) : [];
    //const sesiones = tiempoSesiones !== undefined ? tiempoSesiones.map((tiempo) => { return tiempo.tiempo }) : [];

    useEffect(() => {
        if (myChartRef.current) {
            myChartRef.current.destroy();
        }

        const myChart = new Chart(chartRef.current, {
            type: 'line',
            data: {
                labels: dias1,
                datasets: [
                    {   
                        label: "Sesiones",
                        data: tiempos,
                        fill: false,
                        borderColor: 'lightBlue',
                        tension: 0.3,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                var label = ' ';
                                if (context.parsed.y !== null) {
                                    label += castTime(context.parsed.y);
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
                <div className="card-body" style={{height:"100%"}}>
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
