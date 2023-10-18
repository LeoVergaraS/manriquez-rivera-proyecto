import React, { Component } from 'react';
import { Chart } from 'chart.js';
import 'chart.js/auto';

const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
const sesiones = [100, 200, 150, 432, 312, 645, 231]
//const colores = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']

class GraficoGernal1 extends Component {
    chartRef = React.createRef();
    myChart = null;

    async componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        if (this.myChart) {
            this.myChart.destroy();
        }

        this.myChart = new Chart(myChartRef, {
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
                            text: 'Tiempo total de sesión (Hrs.)', // Etiqueta para el eje y
                            color: '#1e3f43'
                        },
                        grid: {
                            display: true,
                            color: 'lightGray'
                        },
                        beginAtZero: true
                    }
                }
            }

        });
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Tiempo de sesiones por día</h4>
                </div>
                <div className="card-body" >
                    <canvas
                        id="myChart"
                        ref={this.chartRef}
                    />
                </div>
            </div>
        )
    }

}

export default GraficoGernal1;
