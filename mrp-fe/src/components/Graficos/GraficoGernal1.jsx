import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import 'chart.js/auto';
import castTime from '../../utils/functions/castTime';
import './graficoGeneral1.scss';

const GraficoGernal1 = ({ title, tiempoSesiones, className }) => {

    const tiempos = tiempoSesiones !== undefined ? tiempoSesiones.map((tiempo) => { return tiempo.tiempo/60 }) : [];
    const dias1 = tiempoSesiones !== undefined ? tiempoSesiones.map((tiempo) => { return tiempo.fecha }) : [];
    const cn = className !== undefined ? className : '';

    const chartRef = useRef();
    const myChartRef = useRef(null);

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
                            text: 'Minutos de sesión', // Etiqueta para el eje y
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
    }, [tiempoSesiones]);

    return (
        <div className={`card grafico-general-1 ${cn}`}>
            <div className="card-header grafico-general-1__header">
                <h4 className="card-title text-center" >{title}</h4>
            </div>
            <div className="card-body grafico-general-1__body">
                <canvas
                    id="myChart1"
                    ref={chartRef}
                />
            </div>
        </div>
    );
}

export default GraficoGernal1;
