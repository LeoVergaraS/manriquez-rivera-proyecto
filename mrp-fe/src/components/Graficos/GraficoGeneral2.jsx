import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import 'chart.js/auto';

const GraficoGernal1 = ({title, consultasM}) =>{

    const tiempos = consultasM !== undefined ? consultasM.map((consulta) => { return consulta.tiempo }) : [];
    const materia = consultasM !== undefined ? consultasM.map((consulta) => { return consulta.nombre }) : [];
    
    const chartRef = useRef();
    const myChartRef = useRef(null);

    useEffect(() => {
        if (myChartRef.current) {
            myChartRef.current.destroy();
        }

        const myChart = new Chart(chartRef.current, {
            type: 'line',
            data: {
                labels: materia,
                datasets: [
                    {   
                        label: "Tiempo dedicado a la materia",
                        data: tiempos,
                        fill: false,
                        borderColor: '#DFBF68',
                        tension: 0.3,
                        pointRadius: tiempos.map(valor => (valor === 0 ? 0 : 3)),
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
                            text: 'Materia', // Etiqueta para el eje x
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
    },[consultasM]);

        return (
            <>
            <div className="card"  style={{height: "100%"}}>
                <div className="card-header"> 
                    <h4 className="card-title text-center" >{title}</h4>
                </div>
                <div className="card-body"  style={{height: "100%"}} >
                    <canvas
                        id="myChart2"
                        ref={chartRef}
                    />
                </div>
            </div>
            </>
        );
    }

export default GraficoGernal1;
