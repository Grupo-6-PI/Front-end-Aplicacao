
//Função para chamada dos gáficos certos

function recreateCanvas() {
    const oldCanvas = document.getElementById('stackedBarChart');
    const parent = oldCanvas.parentNode;
  
    // Remove old canvas and create a new one
    parent.removeChild(oldCanvas);
    const newCanvas = document.createElement('canvas');
    newCanvas.id = 'stackedBarChart';
    parent.appendChild(newCanvas);
  }

async function escolhaGrafico(categoria,periodo){

    recreateCanvas()

    if(periodo == 1){

        if(categoria == 0){
            buscarDadosGráficoGeral()
        }else if (categoria == 1){
            buscarDadosGráficoCestas()
        }else if (categoria == 2){
            buscarDadosGráficoVestuario()
        }else if (categoria == 3){
            buscarDadosGráficoSaude()
        }else if (categoria == 4){
            buscarDadosGráficoOutros()
        }

    }else if(periodo == 2){

        if(categoria == 0){
            buscarDadosGráficoGeralSemanal()
        }else if (categoria == 1){
            buscarDadosGráficoCestasSemanal()
        }else if (categoria == 2){
            buscarDadosGráficoVestuarioSemanal()
        }else if (categoria == 3){
            buscarDadosGráficoSaudeSemanal()
        }else if (categoria == 4){
            buscarDadosGráficoOutrosSemanal()
        }


    }else if (periodo == 3){

        if(categoria == 0){
            buscarDadosGráficoGeralDiario()
        }else if (categoria == 1){
            buscarDadosGráficoCestasDiario()
        }else if (categoria == 2){
            buscarDadosGráficoVestuarioDiario()
        }else if (categoria == 3){
            buscarDadosGráficoSaudeDiario()
        }else if (categoria == 4){
            buscarDadosGráficoOutrosDiario()
        }

    }

}


//Geral

async function buscarDadosGráficoGeral(){

    let retorno = await axios(`${window.BASE_URL}/requisicoes/dash_requisicao`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

    if(retorno.status == 200){

        let dados = await retorno.data

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
                        text: 'Relação de Dações requeridas e cumpridas'
                    
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

async function buscarDadosGráficoGeralSemanal(){

    let retorno = await axios(`${window.BASE_URL}/requisicoes/dash_requisicao/semanal`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

        let dados = await retorno.data

        console.log(dados)

        let cestas_pedidas = [dados.cestas_S1_pedidas,dados.cestas_S2_pedidas,dados.cestas_S3_pedidas,dados.cestas_S4_pedidas,dados.cestas_S5_pedidas]
        let cestas_cumpridas = [dados.cestas_S1_cumpridas,dados.cestas_S2_cumpridas,dados.cestas_S3_cumpridas,dados.cestas_S4_cumpridas,dados.cestas_S5_cumpridas]
        let vestuario_pedidas = [dados.vestuario_S1_pedidas,dados.vestuario_S2_pedidas,dados.vestuario_S3_pedidas,dados.vestuario_S4_pedidas,dados.vestuario_S5_pedidas]
        let vestuario_cumpridas = [dados.vestuario_S1_cumpridas,dados.vestuario_S2_cumpridas,dados.vestuario_S3_cumpridas,dados.vestuario_S4_cumpridas,dados.vestuario_S5_cumpridas]
        let saude_pedidas = [dados.saude_S1_pedidas,dados.saude_S2_pedidas,dados.saude_S3_pedidas,dados.saude_S4_pedidas,dados.saude_S5_pedidas]
        let saude_cumpridas = [dados.saude_S1_cumpridas,dados.saude_S2_cumpridas,dados.saude_S3_cumpridas,dados.saude_S4_cumpridas,dados.saude_S5_cumpridas]
        let outros_pedidas = [dados.outros_S1_pedidas,dados.outros_S2_pedidas,dados.outros_S3_pedidas,dados.outros_S4_pedidas,dados.outros_S5_pedidas]
        let outros_cumpridas = [dados.outros_S1_cumpridas,dados.outros_S2_cumpridas,dados.outros_S3_cumpridas,dados.outros_S4_cumpridas,dados.outros_S5_cumpridas]

        const data = {
            
            labels: ['Semana 1','Semana 2','Semana 3','Semana 4','Semana 5'],
            datasets: [
                {
                    
                    label: 'Cestas - Cumpridas',
                    data: cestas_cumpridas,
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                    stack: 'Cestas'

                },
                {
                    
                    label: 'Cestas - Requeridas',
                    data: cestas_pedidas,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    stack: 'Cestas'

                },
                {
                    
                    label: 'Vestuário - Cumpridas',
                    data: vestuario_cumpridas,
                    backgroundColor: 'rgba(54, 162, 235, 1)',
                    stack: 'Vestuário'

                },
                {
                    
                    label: 'Vestuário - Requeridas',
                    data: vestuario_pedidas,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    stack: 'Vestuário'

                },
                {
                    
                    label: 'Saúde e Bem-estar - Cumpridas',
                    data: saude_cumpridas,
                    backgroundColor: 'rgba(75, 192, 192, 1)',
                    stack: 'Saúde e Bem-estar'

                },
                {
                    
                    label: 'Saúde e Bem-estar - Requeridas',
                    data: saude_pedidas,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    stack: 'Saúde e Bem-estar'

                },
                {
                    
                    label: 'Outros - Cumpridas',
                    data: outros_cumpridas,
                    backgroundColor: 'rgba(153, 102, 255, 1)',
                    stack: 'Outros'

                },
                {
                    
                    label: 'Outros - Requeridas',
                    data: outros_pedidas,
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
                        text: 'Relação de Dações requeridas e cumpridas'
                    
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

}

async function buscarDadosGráficoGeralDiario(){

    let retorno = await axios(`${window.BASE_URL}/requisicoes/dash_requisicao/diario`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

        let dados = await retorno.data

        console.log(dados)

        cestas_pedidas = []
        cestas_cumpridas = []
        vestuario_pedidas = []
        vestuario_cumpridas = []
        saude_pedidas = []
        saude_cumpridas = []
        outros_pedidas = []
        outros_cumpridas = []

        for(let i =0;i<dados.length;i++){

            let dado_atual = dados[i]

            cestas_cumpridas.push(dado_atual.cestasCumpridas)
            cestas_pedidas.push(dado_atual.cestasPedidas)

            vestuario_pedidas.push(dado_atual.vestuarioPedidas)
            vestuario_cumpridas.push(dado_atual.vestuarioCumpridas)

            saude_pedidas.push(dado_atual.saudePedidas)
            saude_cumpridas.push(dado_atual.saudeCumpridas)

            outros_pedidas.push(dado_atual.outrosPedidas)
            outros_cumpridas.push(dado_atual.outrosCumpridas)

        }

        const data = {
            
            labels: [dados[0].diaNomeacao,dados[1].diaNomeacao,dados[2].diaNomeacao,dados[3].diaNomeacao,dados[4].diaNomeacao,dados[5].diaNomeacao,dados[6].diaNomeacao],
            datasets: [
                {
                    
                    label: 'Cestas - Cumpridas',
                    data: cestas_cumpridas,
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                    stack: 'Cestas'

                },
                {
                    
                    label: 'Cestas - Requeridas',
                    data: cestas_pedidas,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    stack: 'Cestas'

                },
                {
                    
                    label: 'Vestuário - Cumpridas',
                    data: vestuario_cumpridas,
                    backgroundColor: 'rgba(54, 162, 235, 1)',
                    stack: 'Vestuário'

                },
                {
                    
                    label: 'Vestuário - Requeridas',
                    data: vestuario_pedidas,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    stack: 'Vestuário'

                },
                {
                    
                    label: 'Saúde e Bem-estar - Cumpridas',
                    data: saude_cumpridas,
                    backgroundColor: 'rgba(75, 192, 192, 1)',
                    stack: 'Saúde e Bem-estar'

                },
                {
                    
                    label: 'Saúde e Bem-estar - Requeridas',
                    data: saude_pedidas,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    stack: 'Saúde e Bem-estar'

                },
                {
                    
                    label: 'Outros - Cumpridas',
                    data: outros_cumpridas,
                    backgroundColor: 'rgba(153, 102, 255, 1)',
                    stack: 'Outros'

                },
                {
                    
                    label: 'Outros - Requeridas',
                    data: outros_pedidas,
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
                        text: 'Relação de Dações requeridas e cumpridas'
                    
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

}

//Cestas

async function buscarDadosGráficoCestas(){

    let retorno = await axios(`${window.BASE_URL}/requisicoes/dash_requisicao`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

    if(retorno.status == 200){

        let dados = await retorno.data

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

                }
                // {
                    
                //     label: 'Vestuário - Cumpridas',
                //     data: dados.vestuario_cum,
                //     backgroundColor: 'rgba(54, 162, 235, 1)',
                //     stack: 'Vestuário'

                // },
                // {
                    
                //     label: 'Vestuário - Requeridas',
                //     data: dados.vestuario_req,
                //     backgroundColor: 'rgba(54, 162, 235, 0.5)',
                //     stack: 'Vestuário'

                // },
                // {
                    
                //     label: 'Saúde e Bem-estar - Cumpridas',
                //     data: dados.saude_cum,
                //     backgroundColor: 'rgba(75, 192, 192, 1)',
                //     stack: 'Saúde e Bem-estar'

                // },
                // {
                    
                //     label: 'Saúde e Bem-estar - Requeridas',
                //     data: dados.saude_req,
                //     backgroundColor: 'rgba(75, 192, 192, 0.5)',
                //     stack: 'Saúde e Bem-estar'

                // },
                // {
                    
                //     label: 'Outros - Cumpridas',
                //     data: dados.outro_cum,
                //     backgroundColor: 'rgba(153, 102, 255, 1)',
                //     stack: 'Outros'

                // },
                // {
                    
                //     label: 'Outros - Requeridas',
                //     data: dados.outro_req,
                //     backgroundColor: 'rgba(153, 102, 255, 0.5)',
                //     stack: 'Outros'

                // }

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
                        text: 'Relação de Dações requeridas e cumpridas'
                    
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

async function buscarDadosGráficoCestasSemanal(){

    let retorno = await axios(`${window.BASE_URL}/requisicoes/dash_requisicao/semanal`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

        let dados = await retorno.data

        console.log(dados)

        let cestas_pedidas = [dados.cestas_S1_pedidas,dados.cestas_S2_pedidas,dados.cestas_S3_pedidas,dados.cestas_S4_pedidas,dados.cestas_S5_pedidas]
        let cestas_cumpridas = [dados.cestas_S1_cumpridas,dados.cestas_S2_cumpridas,dados.cestas_S3_cumpridas,dados.cestas_S4_cumpridas,dados.cestas_S5_cumpridas]
        // let vestuario_pedidas = [dados.vestuario_S1_pedidas,dados.vestuario_S2_pedidas,dados.vestuario_S3_pedidas,dados.vestuario_S4_pedidas,dados.vestuario_S5_pedidas]
        // let vestuario_cumpridas = [dados.vestuario_S1_cumpridas,dados.vestuario_S2_cumpridas,dados.vestuario_S3_cumpridas,dados.vestuario_S4_cumpridas,dados.vestuario_S5_cumpridas]
        // let saude_pedidas = [dados.saude_S1_pedidas,dados.saude_S2_pedidas,dados.saude_S3_pedidas,dados.saude_S4_pedidas,dados.saude_S5_pedidas]
        // let saude_cumpridas = [dados.saude_S1_cumpridas,dados.saude_S2_cumpridas,dados.saude_S3_cumpridas,dados.saude_S4_cumpridas,dados.saude_S5_cumpridas]
        // let outros_pedidas = [dados.outros_S1_pedidas,dados.outros_S2_pedidas,dados.outros_S3_pedidas,dados.outros_S4_pedidas,dados.outros_S5_pedidas]
        // let outros_cumpridas = [dados.outros_S1_cumpridas,dados.outros_S2_cumpridas,dados.outros_S3_cumpridas,dados.outros_S4_cumpridas,dados.outros_S5_cumpridas]

        const data = {
            
            labels: ['Semana 1','Semana 2','Semana 3','Semana 4','Semana 5'],
            datasets: [
                {
                    
                    label: 'Cestas - Cumpridas',
                    data: cestas_cumpridas,
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                    stack: 'Cestas'

                },
                {
                    
                    label: 'Cestas - Requeridas',
                    data: cestas_pedidas,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    stack: 'Cestas'

                }
                // {
                    
                //     label: 'Vestuário - Cumpridas',
                //     data: vestuario_cumpridas,
                //     backgroundColor: 'rgba(54, 162, 235, 1)',
                //     stack: 'Vestuário'

                // },
                // {
                    
                //     label: 'Vestuário - Requeridas',
                //     data: vestuario_pedidas,
                //     backgroundColor: 'rgba(54, 162, 235, 0.5)',
                //     stack: 'Vestuário'

                // },
                // {
                    
                //     label: 'Saúde e Bem-estar - Cumpridas',
                //     data: saude_cumpridas,
                //     backgroundColor: 'rgba(75, 192, 192, 1)',
                //     stack: 'Saúde e Bem-estar'

                // },
                // {
                    
                //     label: 'Saúde e Bem-estar - Requeridas',
                //     data: saude_pedidas,
                //     backgroundColor: 'rgba(75, 192, 192, 0.5)',
                //     stack: 'Saúde e Bem-estar'

                // },
                // {
                    
                //     label: 'Outros - Cumpridas',
                //     data: outros_cumpridas,
                //     backgroundColor: 'rgba(153, 102, 255, 1)',
                //     stack: 'Outros'

                // },
                // {
                    
                //     label: 'Outros - Requeridas',
                //     data: outros_pedidas,
                //     backgroundColor: 'rgba(153, 102, 255, 0.5)',
                //     stack: 'Outros'

                // }

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
                        text: 'Relação de Dações requeridas e cumpridas'
                    
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

}

async function buscarDadosGráficoCestasDiario(){

    let retorno = await axios(`${window.BASE_URL}/requisicoes/dash_requisicao/diario`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

        let dados = await retorno.data

        console.log(dados)

        cestas_pedidas = []
        cestas_cumpridas = []
        // vestuario_pedidas = []
        // vestuario_cumpridas = []
        // saude_pedidas = []
        // saude_cumpridas = []
        // outros_pedidas = []
        // outros_cumpridas = []

        for(let i =0;i<dados.length;i++){

            let dado_atual = dados[i]

            cestas_cumpridas.push(dado_atual.cestasCumpridas)
            cestas_pedidas.push(dado_atual.cestasPedidas)

            // vestuario_pedidas.push(dado_atual.vestuarioPedidas)
            // vestuario_cumpridas.push(dado_atual.vestuarioCumpridas)

            // saude_pedidas.push(dado_atual.saudePedidas)
            // saude_cumpridas.push(dado_atual.saudeCumpridas)

            // outros_pedidas.push(dado_atual.outrosPedidas)
            // outros_cumpridas.push(dado_atual.outrosCumpridas)

        }

        const data = {
            
            labels: [dados[0].diaNomeacao,dados[1].diaNomeacao,dados[2].diaNomeacao,dados[3].diaNomeacao,dados[4].diaNomeacao,dados[5].diaNomeacao,dados[6].diaNomeacao],
            datasets: [
                {
                    
                    label: 'Cestas - Cumpridas',
                    data: cestas_cumpridas,
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                    stack: 'Cestas'

                },
                {
                    
                    label: 'Cestas - Requeridas',
                    data: cestas_pedidas,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    stack: 'Cestas'

                }
                // {
                    
                //     label: 'Vestuário - Cumpridas',
                //     data: vestuario_cumpridas,
                //     backgroundColor: 'rgba(54, 162, 235, 1)',
                //     stack: 'Vestuário'

                // },
                // {
                    
                //     label: 'Vestuário - Requeridas',
                //     data: vestuario_pedidas,
                //     backgroundColor: 'rgba(54, 162, 235, 0.5)',
                //     stack: 'Vestuário'

                // },
                // {
                    
                //     label: 'Saúde e Bem-estar - Cumpridas',
                //     data: saude_cumpridas,
                //     backgroundColor: 'rgba(75, 192, 192, 1)',
                //     stack: 'Saúde e Bem-estar'

                // },
                // {
                    
                //     label: 'Saúde e Bem-estar - Requeridas',
                //     data: saude_pedidas,
                //     backgroundColor: 'rgba(75, 192, 192, 0.5)',
                //     stack: 'Saúde e Bem-estar'

                // },
                // {
                    
                //     label: 'Outros - Cumpridas',
                //     data: outros_cumpridas,
                //     backgroundColor: 'rgba(153, 102, 255, 1)',
                //     stack: 'Outros'

                // },
                // {
                    
                //     label: 'Outros - Requeridas',
                //     data: outros_pedidas,
                //     backgroundColor: 'rgba(153, 102, 255, 0.5)',
                //     stack: 'Outros'

                // }

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
                        text: 'Relação de Dações requeridas e cumpridas'
                    
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

}


//Vestuario

async function buscarDadosGráficoVestuario(){

    let retorno = await axios(`${window.BASE_URL}/requisicoes/dash_requisicao`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

    if(retorno.status == 200){

        let dados = await retorno.data

        console.log(dados)

        const data = {
            
            labels: ['T1', 'T2', 'T3', 'T4'],
            datasets: [
                // {
                    
                //     label: 'Cestas - Cumpridas',
                //     data: dados.cesta_cum,
                //     backgroundColor: 'rgba(255, 99, 132, 1)',
                //     stack: 'Cestas'

                // },
                // {
                    
                //     label: 'Cestas - Requeridas',
                //     data: dados.cesta_req,
                //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
                //     stack: 'Cestas'

                // }
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

                }
                // {
                    
                //     label: 'Saúde e Bem-estar - Cumpridas',
                //     data: dados.saude_cum,
                //     backgroundColor: 'rgba(75, 192, 192, 1)',
                //     stack: 'Saúde e Bem-estar'

                // },
                // {
                    
                //     label: 'Saúde e Bem-estar - Requeridas',
                //     data: dados.saude_req,
                //     backgroundColor: 'rgba(75, 192, 192, 0.5)',
                //     stack: 'Saúde e Bem-estar'

                // },
                // {
                    
                //     label: 'Outros - Cumpridas',
                //     data: dados.outro_cum,
                //     backgroundColor: 'rgba(153, 102, 255, 1)',
                //     stack: 'Outros'

                // },
                // {
                    
                //     label: 'Outros - Requeridas',
                //     data: dados.outro_req,
                //     backgroundColor: 'rgba(153, 102, 255, 0.5)',
                //     stack: 'Outros'

                // }

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
                        text: 'Relação de Dações requeridas e cumpridas'
                    
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

async function buscarDadosGráficoVestuarioSemanal(){

    let retorno = await axios(`${window.BASE_URL}/requisicoes/dash_requisicao/semanal`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

        let dados = await retorno.data

        console.log(dados)

        // let cestas_pedidas = [dados.cestas_S1_pedidas,dados.cestas_S2_pedidas,dados.cestas_S3_pedidas,dados.cestas_S4_pedidas,dados.cestas_S5_pedidas]
        // let cestas_cumpridas = [dados.cestas_S1_cumpridas,dados.cestas_S2_cumpridas,dados.cestas_S3_cumpridas,dados.cestas_S4_cumpridas,dados.cestas_S5_cumpridas]
        let vestuario_pedidas = [dados.vestuario_S1_pedidas,dados.vestuario_S2_pedidas,dados.vestuario_S3_pedidas,dados.vestuario_S4_pedidas,dados.vestuario_S5_pedidas]
        let vestuario_cumpridas = [dados.vestuario_S1_cumpridas,dados.vestuario_S2_cumpridas,dados.vestuario_S3_cumpridas,dados.vestuario_S4_cumpridas,dados.vestuario_S5_cumpridas]
        // let saude_pedidas = [dados.saude_S1_pedidas,dados.saude_S2_pedidas,dados.saude_S3_pedidas,dados.saude_S4_pedidas,dados.saude_S5_pedidas]
        // let saude_cumpridas = [dados.saude_S1_cumpridas,dados.saude_S2_cumpridas,dados.saude_S3_cumpridas,dados.saude_S4_cumpridas,dados.saude_S5_cumpridas]
        // let outros_pedidas = [dados.outros_S1_pedidas,dados.outros_S2_pedidas,dados.outros_S3_pedidas,dados.outros_S4_pedidas,dados.outros_S5_pedidas]
        // let outros_cumpridas = [dados.outros_S1_cumpridas,dados.outros_S2_cumpridas,dados.outros_S3_cumpridas,dados.outros_S4_cumpridas,dados.outros_S5_cumpridas]

        const data = {
            
            labels: ['Semana 1','Semana 2','Semana 3','Semana 4','Semana 5'],
            datasets: [
                // {
                    
                //     label: 'Cestas - Cumpridas',
                //     data: cestas_cumpridas,
                //     backgroundColor: 'rgba(255, 99, 132, 1)',
                //     stack: 'Cestas'

                // },
                // {
                    
                //     label: 'Cestas - Requeridas',
                //     data: cestas_pedidas,
                //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
                //     stack: 'Cestas'

                // }
                {
                    
                    label: 'Vestuário - Cumpridas',
                    data: vestuario_cumpridas,
                    backgroundColor: 'rgba(54, 162, 235, 1)',
                    stack: 'Vestuário'

                },
                {
                    
                    label: 'Vestuário - Requeridas',
                    data: vestuario_pedidas,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    stack: 'Vestuário'

                }
                // {
                    
                //     label: 'Saúde e Bem-estar - Cumpridas',
                //     data: saude_cumpridas,
                //     backgroundColor: 'rgba(75, 192, 192, 1)',
                //     stack: 'Saúde e Bem-estar'

                // },
                // {
                    
                //     label: 'Saúde e Bem-estar - Requeridas',
                //     data: saude_pedidas,
                //     backgroundColor: 'rgba(75, 192, 192, 0.5)',
                //     stack: 'Saúde e Bem-estar'

                // },
                // {
                    
                //     label: 'Outros - Cumpridas',
                //     data: outros_cumpridas,
                //     backgroundColor: 'rgba(153, 102, 255, 1)',
                //     stack: 'Outros'

                // },
                // {
                    
                //     label: 'Outros - Requeridas',
                //     data: outros_pedidas,
                //     backgroundColor: 'rgba(153, 102, 255, 0.5)',
                //     stack: 'Outros'

                // }

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
                        text: 'Relação de Dações requeridas e cumpridas'
                    
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

}

async function buscarDadosGráficoVestuarioDiario(){

    let retorno = await axios(`${window.BASE_URL}/requisicoes/dash_requisicao/diario`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

        let dados = await retorno.data

        console.log(dados)

        // cestas_pedidas = []
        // cestas_cumpridas = []
        vestuario_pedidas = []
        vestuario_cumpridas = []
        // saude_pedidas = []
        // saude_cumpridas = []
        // outros_pedidas = []
        // outros_cumpridas = []

        for(let i =0;i<dados.length;i++){

            let dado_atual = dados[i]

            // cestas_cumpridas.push(dado_atual.cestasCumpridas)
            // cestas_pedidas.push(dado_atual.cestasPedidas)

            vestuario_pedidas.push(dado_atual.vestuarioPedidas)
            vestuario_cumpridas.push(dado_atual.vestuarioCumpridas)

            // saude_pedidas.push(dado_atual.saudePedidas)
            // saude_cumpridas.push(dado_atual.saudeCumpridas)

            // outros_pedidas.push(dado_atual.outrosPedidas)
            // outros_cumpridas.push(dado_atual.outrosCumpridas)

        }

        const data = {
            
            labels: [dados[0].diaNomeacao,dados[1].diaNomeacao,dados[2].diaNomeacao,dados[3].diaNomeacao,dados[4].diaNomeacao,dados[5].diaNomeacao,dados[6].diaNomeacao],
            datasets: [
                // {
                    
                //     label: 'Cestas - Cumpridas',
                //     data: cestas_cumpridas,
                //     backgroundColor: 'rgba(255, 99, 132, 1)',
                //     stack: 'Cestas'

                // },
                // {
                    
                //     label: 'Cestas - Requeridas',
                //     data: cestas_pedidas,
                //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
                //     stack: 'Cestas'

                // }
                {
                    
                    label: 'Vestuário - Cumpridas',
                    data: vestuario_cumpridas,
                    backgroundColor: 'rgba(54, 162, 235, 1)',
                    stack: 'Vestuário'

                },
                {
                    
                    label: 'Vestuário - Requeridas',
                    data: vestuario_pedidas,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    stack: 'Vestuário'

                }
                // {
                    
                //     label: 'Saúde e Bem-estar - Cumpridas',
                //     data: saude_cumpridas,
                //     backgroundColor: 'rgba(75, 192, 192, 1)',
                //     stack: 'Saúde e Bem-estar'

                // },
                // {
                    
                //     label: 'Saúde e Bem-estar - Requeridas',
                //     data: saude_pedidas,
                //     backgroundColor: 'rgba(75, 192, 192, 0.5)',
                //     stack: 'Saúde e Bem-estar'

                // },
                // {
                    
                //     label: 'Outros - Cumpridas',
                //     data: outros_cumpridas,
                //     backgroundColor: 'rgba(153, 102, 255, 1)',
                //     stack: 'Outros'

                // },
                // {
                    
                //     label: 'Outros - Requeridas',
                //     data: outros_pedidas,
                //     backgroundColor: 'rgba(153, 102, 255, 0.5)',
                //     stack: 'Outros'

                // }

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
                        text: 'Relação de Dações requeridas e cumpridas'
                    
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

}

//Saude

async function buscarDadosGráficoSaude(){

    let retorno = await axios(`${window.BASE_URL}/requisicoes/dash_requisicao`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

    if(retorno.status == 200){

        let dados = await retorno.data

        console.log(dados)

        const data = {
            
            labels: ['T1', 'T2', 'T3', 'T4'],
            datasets: [
                // {
                    
                //     label: 'Cestas - Cumpridas',
                //     data: dados.cesta_cum,
                //     backgroundColor: 'rgba(255, 99, 132, 1)',
                //     stack: 'Cestas'

                // },
                // {
                    
                //     label: 'Cestas - Requeridas',
                //     data: dados.cesta_req,
                //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
                //     stack: 'Cestas'

                // }
                // {
                    
                //     label: 'Vestuário - Cumpridas',
                //     data: dados.vestuario_cum,
                //     backgroundColor: 'rgba(54, 162, 235, 1)',
                //     stack: 'Vestuário'

                // },
                // {
                    
                //     label: 'Vestuário - Requeridas',
                //     data: dados.vestuario_req,
                //     backgroundColor: 'rgba(54, 162, 235, 0.5)',
                //     stack: 'Vestuário'

                // }
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

                }
                // {
                    
                //     label: 'Outros - Cumpridas',
                //     data: dados.outro_cum,
                //     backgroundColor: 'rgba(153, 102, 255, 1)',
                //     stack: 'Outros'

                // },
                // {
                    
                //     label: 'Outros - Requeridas',
                //     data: dados.outro_req,
                //     backgroundColor: 'rgba(153, 102, 255, 0.5)',
                //     stack: 'Outros'

                // }

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
                        text: 'Relação de Dações requeridas e cumpridas'
                    
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

async function buscarDadosGráficoSaudeSemanal(){

    let retorno = await axios(`${window.BASE_URL}/requisicoes/dash_requisicao/semanal`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

        let dados = await retorno.data

        console.log(dados)

        // let cestas_pedidas = [dados.cestas_S1_pedidas,dados.cestas_S2_pedidas,dados.cestas_S3_pedidas,dados.cestas_S4_pedidas,dados.cestas_S5_pedidas]
        // let cestas_cumpridas = [dados.cestas_S1_cumpridas,dados.cestas_S2_cumpridas,dados.cestas_S3_cumpridas,dados.cestas_S4_cumpridas,dados.cestas_S5_cumpridas]
        // let vestuario_pedidas = [dados.vestuario_S1_pedidas,dados.vestuario_S2_pedidas,dados.vestuario_S3_pedidas,dados.vestuario_S4_pedidas,dados.vestuario_S5_pedidas]
        // let vestuario_cumpridas = [dados.vestuario_S1_cumpridas,dados.vestuario_S2_cumpridas,dados.vestuario_S3_cumpridas,dados.vestuario_S4_cumpridas,dados.vestuario_S5_cumpridas]
        let saude_pedidas = [dados.saude_S1_pedidas,dados.saude_S2_pedidas,dados.saude_S3_pedidas,dados.saude_S4_pedidas,dados.saude_S5_pedidas]
        let saude_cumpridas = [dados.saude_S1_cumpridas,dados.saude_S2_cumpridas,dados.saude_S3_cumpridas,dados.saude_S4_cumpridas,dados.saude_S5_cumpridas]
        // let outros_pedidas = [dados.outros_S1_pedidas,dados.outros_S2_pedidas,dados.outros_S3_pedidas,dados.outros_S4_pedidas,dados.outros_S5_pedidas]
        // let outros_cumpridas = [dados.outros_S1_cumpridas,dados.outros_S2_cumpridas,dados.outros_S3_cumpridas,dados.outros_S4_cumpridas,dados.outros_S5_cumpridas]

        const data = {
            
            labels: ['Semana 1','Semana 2','Semana 3','Semana 4','Semana 5'],
            datasets: [
                // {
                    
                //     label: 'Cestas - Cumpridas',
                //     data: cestas_cumpridas,
                //     backgroundColor: 'rgba(255, 99, 132, 1)',
                //     stack: 'Cestas'

                // },
                // {
                    
                //     label: 'Cestas - Requeridas',
                //     data: cestas_pedidas,
                //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
                //     stack: 'Cestas'

                // }
                // {
                    
                //     label: 'Vestuário - Cumpridas',
                //     data: vestuario_cumpridas,
                //     backgroundColor: 'rgba(54, 162, 235, 1)',
                //     stack: 'Vestuário'

                // },
                // {
                    
                //     label: 'Vestuário - Requeridas',
                //     data: vestuario_pedidas,
                //     backgroundColor: 'rgba(54, 162, 235, 0.5)',
                //     stack: 'Vestuário'

                // }
                {
                    
                    label: 'Saúde e Bem-estar - Cumpridas',
                    data: saude_cumpridas,
                    backgroundColor: 'rgba(75, 192, 192, 1)',
                    stack: 'Saúde e Bem-estar'

                },
                {
                    
                    label: 'Saúde e Bem-estar - Requeridas',
                    data: saude_pedidas,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    stack: 'Saúde e Bem-estar'

                }
                // {
                    
                //     label: 'Outros - Cumpridas',
                //     data: outros_cumpridas,
                //     backgroundColor: 'rgba(153, 102, 255, 1)',
                //     stack: 'Outros'

                // },
                // {
                    
                //     label: 'Outros - Requeridas',
                //     data: outros_pedidas,
                //     backgroundColor: 'rgba(153, 102, 255, 0.5)',
                //     stack: 'Outros'

                // }

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
                        text: 'Relação de Dações requeridas e cumpridas'
                    
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

}

async function buscarDadosGráficoSaudeDiario(){

    let retorno = await axios(`${window.BASE_URL}/requisicoes/dash_requisicao/diario`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

        let dados = await retorno.data

        console.log(dados)

        // cestas_pedidas = []
        // cestas_cumpridas = []
        // vestuario_pedidas = []
        // vestuario_cumpridas = []
        saude_pedidas = []
        saude_cumpridas = []
        // outros_pedidas = []
        // outros_cumpridas = []

        for(let i =0;i<dados.length;i++){

            let dado_atual = dados[i]

            // cestas_cumpridas.push(dado_atual.cestasCumpridas)
            // cestas_pedidas.push(dado_atual.cestasPedidas)

            // vestuario_pedidas.push(dado_atual.vestuarioPedidas)
            // vestuario_cumpridas.push(dado_atual.vestuarioCumpridas)

            saude_pedidas.push(dado_atual.saudePedidas)
            saude_cumpridas.push(dado_atual.saudeCumpridas)

            // outros_pedidas.push(dado_atual.outrosPedidas)
            // outros_cumpridas.push(dado_atual.outrosCumpridas)

        }

        const data = {
            
            labels: [dados[0].diaNomeacao,dados[1].diaNomeacao,dados[2].diaNomeacao,dados[3].diaNomeacao,dados[4].diaNomeacao,dados[5].diaNomeacao,dados[6].diaNomeacao],
            datasets: [
                // {
                    
                //     label: 'Cestas - Cumpridas',
                //     data: cestas_cumpridas,
                //     backgroundColor: 'rgba(255, 99, 132, 1)',
                //     stack: 'Cestas'

                // },
                // {
                    
                //     label: 'Cestas - Requeridas',
                //     data: cestas_pedidas,
                //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
                //     stack: 'Cestas'

                // }
                // {
                    
                //     label: 'Vestuário - Cumpridas',
                //     data: vestuario_cumpridas,
                //     backgroundColor: 'rgba(54, 162, 235, 1)',
                //     stack: 'Vestuário'

                // },
                // {
                    
                //     label: 'Vestuário - Requeridas',
                //     data: vestuario_pedidas,
                //     backgroundColor: 'rgba(54, 162, 235, 0.5)',
                //     stack: 'Vestuário'

                // },
                {
                    
                    label: 'Saúde e Bem-estar - Cumpridas',
                    data: saude_cumpridas,
                    backgroundColor: 'rgba(75, 192, 192, 1)',
                    stack: 'Saúde e Bem-estar'

                },
                {
                    
                    label: 'Saúde e Bem-estar - Requeridas',
                    data: saude_pedidas,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    stack: 'Saúde e Bem-estar'

                }
                // {
                    
                //     label: 'Outros - Cumpridas',
                //     data: outros_cumpridas,
                //     backgroundColor: 'rgba(153, 102, 255, 1)',
                //     stack: 'Outros'

                // },
                // {
                    
                //     label: 'Outros - Requeridas',
                //     data: outros_pedidas,
                //     backgroundColor: 'rgba(153, 102, 255, 0.5)',
                //     stack: 'Outros'

                // }

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
                        text: 'Relação de Dações requeridas e cumpridas'
                    
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

}

//Outros

async function buscarDadosGráficoOutros(){

    let retorno = await axios(`${window.BASE_URL}/requisicoes/dash_requisicao`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

    if(retorno.status == 200){

        let dados = await retorno.data

        console.log(dados)

        const data = {
            
            labels: ['T1', 'T2', 'T3', 'T4'],
            datasets: [
                // {
                    
                //     label: 'Cestas - Cumpridas',
                //     data: dados.cesta_cum,
                //     backgroundColor: 'rgba(255, 99, 132, 1)',
                //     stack: 'Cestas'

                // },
                // {
                    
                //     label: 'Cestas - Requeridas',
                //     data: dados.cesta_req,
                //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
                //     stack: 'Cestas'

                // }
                // {
                    
                //     label: 'Vestuário - Cumpridas',
                //     data: dados.vestuario_cum,
                //     backgroundColor: 'rgba(54, 162, 235, 1)',
                //     stack: 'Vestuário'

                // },
                // {
                    
                //     label: 'Vestuário - Requeridas',
                //     data: dados.vestuario_req,
                //     backgroundColor: 'rgba(54, 162, 235, 0.5)',
                //     stack: 'Vestuário'

                // }
                // {
                    
                //     label: 'Saúde e Bem-estar - Cumpridas',
                //     data: dados.saude_cum,
                //     backgroundColor: 'rgba(75, 192, 192, 1)',
                //     stack: 'Saúde e Bem-estar'

                // },
                // {
                    
                //     label: 'Saúde e Bem-estar - Requeridas',
                //     data: dados.saude_req,
                //     backgroundColor: 'rgba(75, 192, 192, 0.5)',
                //     stack: 'Saúde e Bem-estar'

                // },
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
                        text: 'Relação de Dações requeridas e cumpridas'
                    
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

async function buscarDadosGráficoOutrosSemanal(){

    let retorno = await axios(`${window.BASE_URL}/requisicoes/dash_requisicao/semanal`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

        let dados = await retorno.data

        console.log(dados)

        // let cestas_pedidas = [dados.cestas_S1_pedidas,dados.cestas_S2_pedidas,dados.cestas_S3_pedidas,dados.cestas_S4_pedidas,dados.cestas_S5_pedidas]
        // let cestas_cumpridas = [dados.cestas_S1_cumpridas,dados.cestas_S2_cumpridas,dados.cestas_S3_cumpridas,dados.cestas_S4_cumpridas,dados.cestas_S5_cumpridas]
        // let vestuario_pedidas = [dados.vestuario_S1_pedidas,dados.vestuario_S2_pedidas,dados.vestuario_S3_pedidas,dados.vestuario_S4_pedidas,dados.vestuario_S5_pedidas]
        // let vestuario_cumpridas = [dados.vestuario_S1_cumpridas,dados.vestuario_S2_cumpridas,dados.vestuario_S3_cumpridas,dados.vestuario_S4_cumpridas,dados.vestuario_S5_cumpridas]
        // let saude_pedidas = [dados.saude_S1_pedidas,dados.saude_S2_pedidas,dados.saude_S3_pedidas,dados.saude_S4_pedidas,dados.saude_S5_pedidas]
        // let saude_cumpridas = [dados.saude_S1_cumpridas,dados.saude_S2_cumpridas,dados.saude_S3_cumpridas,dados.saude_S4_cumpridas,dados.saude_S5_cumpridas]
        let outros_pedidas = [dados.outros_S1_pedidas,dados.outros_S2_pedidas,dados.outros_S3_pedidas,dados.outros_S4_pedidas,dados.outros_S5_pedidas]
        let outros_cumpridas = [dados.outros_S1_cumpridas,dados.outros_S2_cumpridas,dados.outros_S3_cumpridas,dados.outros_S4_cumpridas,dados.outros_S5_cumpridas]

        const data = {
            
            labels: ['Semana 1','Semana 2','Semana 3','Semana 4','Semana 5'],
            datasets: [
                // {
                    
                //     label: 'Cestas - Cumpridas',
                //     data: cestas_cumpridas,
                //     backgroundColor: 'rgba(255, 99, 132, 1)',
                //     stack: 'Cestas'

                // },
                // {
                    
                //     label: 'Cestas - Requeridas',
                //     data: cestas_pedidas,
                //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
                //     stack: 'Cestas'

                // }
                // {
                    
                //     label: 'Vestuário - Cumpridas',
                //     data: vestuario_cumpridas,
                //     backgroundColor: 'rgba(54, 162, 235, 1)',
                //     stack: 'Vestuário'

                // },
                // {
                    
                //     label: 'Vestuário - Requeridas',
                //     data: vestuario_pedidas,
                //     backgroundColor: 'rgba(54, 162, 235, 0.5)',
                //     stack: 'Vestuário'

                // }
                // {
                    
                //     label: 'Saúde e Bem-estar - Cumpridas',
                //     data: saude_cumpridas,
                //     backgroundColor: 'rgba(75, 192, 192, 1)',
                //     stack: 'Saúde e Bem-estar'

                // },
                // {
                    
                //     label: 'Saúde e Bem-estar - Requeridas',
                //     data: saude_pedidas,
                //     backgroundColor: 'rgba(75, 192, 192, 0.5)',
                //     stack: 'Saúde e Bem-estar'

                // },
                {
                    
                    label: 'Outros - Cumpridas',
                    data: outros_cumpridas,
                    backgroundColor: 'rgba(153, 102, 255, 1)',
                    stack: 'Outros'

                },
                {
                    
                    label: 'Outros - Requeridas',
                    data: outros_pedidas,
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
                        text: 'Relação de Dações requeridas e cumpridas'
                    
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

}

async function buscarDadosGráficoOutrosDiario(){

    let retorno = await axios(`${window.BASE_URL}/requisicoes/dash_requisicao/diario`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

        let dados = await retorno.data

        console.log(dados)

        // cestas_pedidas = []
        // cestas_cumpridas = []
        // vestuario_pedidas = []
        // vestuario_cumpridas = []
        // saude_pedidas = []
        // saude_cumpridas = []
        outros_pedidas = []
        outros_cumpridas = []

        for(let i =0;i<dados.length;i++){

            let dado_atual = dados[i]

            // cestas_cumpridas.push(dado_atual.cestasCumpridas)
            // cestas_pedidas.push(dado_atual.cestasPedidas)

            // vestuario_pedidas.push(dado_atual.vestuarioPedidas)
            // vestuario_cumpridas.push(dado_atual.vestuarioCumpridas)

            // saude_pedidas.push(dado_atual.saudePedidas)
            // saude_cumpridas.push(dado_atual.saudeCumpridas)

            outros_pedidas.push(dado_atual.outrosPedidas)
            outros_cumpridas.push(dado_atual.outrosCumpridas)

        }

        const data = {
            
            labels: [dados[0].diaNomeacao,dados[1].diaNomeacao,dados[2].diaNomeacao,dados[3].diaNomeacao,dados[4].diaNomeacao,dados[5].diaNomeacao,dados[6].diaNomeacao],
            datasets: [
                // {
                    
                //     label: 'Cestas - Cumpridas',
                //     data: cestas_cumpridas,
                //     backgroundColor: 'rgba(255, 99, 132, 1)',
                //     stack: 'Cestas'

                // },
                // {
                    
                //     label: 'Cestas - Requeridas',
                //     data: cestas_pedidas,
                //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
                //     stack: 'Cestas'

                // }
                // {
                    
                //     label: 'Vestuário - Cumpridas',
                //     data: vestuario_cumpridas,
                //     backgroundColor: 'rgba(54, 162, 235, 1)',
                //     stack: 'Vestuário'

                // },
                // {
                    
                //     label: 'Vestuário - Requeridas',
                //     data: vestuario_pedidas,
                //     backgroundColor: 'rgba(54, 162, 235, 0.5)',
                //     stack: 'Vestuário'

                // },
                // {
                    
                //     label: 'Saúde e Bem-estar - Cumpridas',
                //     data: saude_cumpridas,
                //     backgroundColor: 'rgba(75, 192, 192, 1)',
                //     stack: 'Saúde e Bem-estar'

                // },
                // {
                    
                //     label: 'Saúde e Bem-estar - Requeridas',
                //     data: saude_pedidas,
                //     backgroundColor: 'rgba(75, 192, 192, 0.5)',
                //     stack: 'Saúde e Bem-estar'

                // },
                {
                    
                    label: 'Outros - Cumpridas',
                    data: outros_cumpridas,
                    backgroundColor: 'rgba(153, 102, 255, 1)',
                    stack: 'Outros'

                },
                {
                    
                    label: 'Outros - Requeridas',
                    data: outros_pedidas,
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
                        text: 'Relação de Dações requeridas e cumpridas'
                    
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

}