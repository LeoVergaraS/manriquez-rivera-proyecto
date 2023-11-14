import React, { useEffect, useState, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Card } from 'react-bootstrap';


const GradicoBarras = ({ }) => {

    useEffect(() => {

    },);

    const data = {
        labels: ["Derecho Civil", "Loleros", "Cristiano ROn", "Derecho Civil", "Loleros", "Cristiano ROn"],
        datasets: [
            {
                label: 'Ingresos',
                backgroundColor: "#DFBF68",
                borderColor: "#DFBF68",
                borderWidth: 1,
                hoverBackgroundColor: "#DFBF68",
                hoverBorderColor: "#DFBF68",
                barPercentage: 0.3,
                data: [65, 59, 80, 81, 56, 55]
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
            <div className="card">
                <div className="card-header" style={{ height: "100%" }}>
                    <h4 className="card-title text-center" >Tiempo de materias por día</h4>
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

