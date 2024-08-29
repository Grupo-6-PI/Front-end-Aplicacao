
async function buscarDados(){

    let retorno = await axios.get('http://localhost:8080/requisicoes/dash_requisicao')

    if(retorno.status == 200){

        let dados = retorno.data

        console.log(dados)

        const data = {
            
            labels: ['T1', 'T2', 'T3', 'T4'],
            datasets: [
                {
                    
                    label: 'Cestas - Cumpridas',
                    data: dados.cesta_cum,
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                    stack: 'Cestas'

                },
                {
                    
                    label: 'Cestas - Requeridas',
                    data: dados.cesta_req,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    stack: 'Cestas'

                },
                {
                    
                    label: 'Vestuário - Cumpridas',
                    data: dados.vestuario_cum,
                    backgroundColor: 'rgba(54, 162, 235, 1)',
                    stack: 'Vestuário'

                },
                {
                    
                    label: 'Vestuário - Requeridas',
                    data: dados.vestuario_req,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    stack: 'Vestuário'

                },
                {
                    
                    label: 'Saúde e Bem-estar - Cumpridas',
                    data: dados.saude_cum,
                    backgroundColor: 'rgba(75, 192, 192, 1)',
                    stack: 'Saúde e Bem-estar'

                },
                {
                    
                    label: 'Saúde e Bem-estar - Requeridas',
                    data: dados.saude_req,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    stack: 'Saúde e Bem-estar'

                },
                {
                    
                    label: 'Outros - Cumpridas',
                    data: dados.outro_cum,
                    backgroundColor: 'rgba(153, 102, 255, 1)',
                    stack: 'Outros'

                },
                {
                    
                    label: 'Outros - Requeridas',
                    data: dados.outro_req,
                    backgroundColor: 'rgba(153, 102, 255, 0.5)',
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

    }else{
        
        console.log(retorno.status)
        console.log(retorno.statusText)
    
    }

}

