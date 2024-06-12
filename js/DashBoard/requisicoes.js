

const data = {
    labels: ['T1', 'T2', 'T3', 'T4'],
    datasets: [
        {
            label: 'Cestas - Requeridas',
            data: [50, 70, 80, 90],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            stack: 'Cestas'
        },
        {
            label: 'Cestas - Cumpridas',
            data: [45, 60, 75, 85],
            backgroundColor: 'rgba(255, 99, 132, 1)',
            stack: 'Cestas'
        },
        {
            label: 'Vestuário - Requeridas',
            data: [30, 40, 50, 60],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            stack: 'Vestuário'
        },
        {
            label: 'Vestuário - Cumpridas',
            data: [25, 35, 45, 55],
            backgroundColor: 'rgba(54, 162, 235, 1)',
            stack: 'Vestuário'
        },
        {
            label: 'Saúde e Bem-estar - Requeridas',
            data: [20, 30, 40, 50],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            stack: 'Saúde e Bem-estar'
        },
        {
            label: 'Saúde e Bem-estar - Cumpridas',
            data: [15, 25, 35, 45],
            backgroundColor: 'rgba(75, 192, 192, 1)',
            stack: 'Saúde e Bem-estar'
        },
        {
            label: 'Outros - Requeridas',
            data: [10, 20, 30, 40],
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            stack: 'Outros'
        },
        {
            label: 'Outros - Cumpridas',
            data: [8, 12, 28, 38],
            backgroundColor: 'rgba(153, 102, 255, 1)',
            stack: 'Outros'
        }
    ]
};

// Configuração do gráfico
const config = {
    type: 'bar',
    data: data,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Quantidade de Doações por Trimestre'
            },
            tooltip: {
                mode: 'index',
                intersect: true
            },
            legend: {
                display: false
            },
            responsive: true
        },
        scales: {
            xAxes: [{
                stacked: false
            }],
            yAxes: [{
                stacked: true
            }],
            x: {
                stacked: true,
                categoryPercentage: 1.0,
                barPercentage: 0.9 // Ajuste o espaçamento entre as barras

            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Quantidade de Doações'

                }
            }
        }
    }
};

// renderizando o gráfico
const stackedBarChart = new Chart(
    document.getElementById('stackedBarChart'),
    config
);

