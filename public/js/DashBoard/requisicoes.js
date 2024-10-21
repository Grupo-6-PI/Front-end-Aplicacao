
async function buscarDados(){

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

async function listarRequisicoes(){

    var conteiner = document.getElementById("doacoes")
    conteiner.innerHTML=""

    try{

        var requisicao = await axios(`${window.BASE_URL}/requisicoes/listar-pedidos-adm`,{
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })

        var data = await requisicao.data

        for(let i = 0; i < data.length ; i++){

            let requisicao = data[i]

            conteiner.innerHTML+=`
                <div class="doacao" id="doacao${requisicao.numeracao}" onclick="funct_modal(${requisicao.numeracao})">
                    <div class="inside-doacao">
                        <div class="requisicao-info">
                            <p><strong>ID Requisição:</strong> ${requisicao.numeracao+1}</p>
                            <p><strong>Nome:</strong> ${requisicao.solicitante}</p>
                            <p><strong>CPF:</strong> ${requisicao.cpf}</p>
                        </div>
                        <div class="doacao-info">
                            <div class="doacao-tipo">
                                <img src="../assets/imgs/icone-pizza.png" alt="Ícone de Doação" class="doacao-icon">
                                <div id="label-doacao-tipo">
                                    <p><strong>Tipo de doação:</strong></p>
                                    <p>${requisicao.tipoRequisicao}</p>
                                </div>
                            </div>
                            <div class="doacao-mensagem">
                                <p>${requisicao.descricao}</p>
                            </div>
                        </div>
                    </div>
                    <div class="aceitar-negar">
                        <img src="../assets/imgs/aceitar.png" alt="">
                        <img src="../assets/imgs/negar.png" alt="">
                    </div>
                </div>
            `
                
        }

        criarModais(data)

        for(let i = 0; i < data.length ; i++){

            let requisicao = data[i]
        
            ativarModais(requisicao.numeracao)
        }


    }catch(error){

        console.log(error)

    }

}

function criarModais(data){

    var modais = document.getElementById("modais")
    modais.innerHTML=""

    data.map((requisicao) => {

        modais.innerHTML+=`
        <div id="myModal${requisicao.numeracao}" class="modal">
                    <div class="modal-content">
                      <span class="close" id="span_close${requisicao.numeracao}">&times;</span>
                      <h2 id="id-requisicao">Requisição #${requisicao.numeracao+1}</h2>
                      <div class="modal-body">
                        <div class="info-section">
                          <div class="solicitante">
                            <p>
                                <strong>Solicitante:</strong> 
                                <span id="nome_solicitante">${requisicao.solicitante}</span>
                            </p>
                            <p>
                                <strong>CPF:</strong> 
                                <span id="cpf_solicitante">${requisicao.cpf}</span>
                            </p>
                            <p>
                                <strong>Data de nasc.:</strong> 
                                <span id="dt_nasc">${requisicao.dataNasc}</span>
                            </p>
                            <p>
                                <strong>Endereço:</strong> 
                                <span id="endereco">${requisicao.endereco}</span>
                            </p>
                          </div>
                          <div class="familia">
                            <p>
                                <strong>Família de Origem:</strong> 
                                <span id="familia_origem">${requisicao.familiaOrigem}</span>
                            </p>
                            <p>
                                <strong>Qtd Pessoas:</strong> 
                                <span id="qtd_pessoas">${requisicao.quantidadePessoas}</span>
                            </p>
                            <p>
                                <strong>Possui crianças?</strong> 
                                <span id="boolean_criancas">${requisicao.possuiCrianca ? "Sim" : "Não"}</span>
                            </p>
                            <p>
                                <strong>Possui PCD?</strong> 
                                <span id="boolean_pcd">${requisicao.possuiPCD ? "Sim" : "Não"}</span>
                            </p>
                            <p>
                                <strong>Renda Familiar:</strong> 
                                <span id="renda_familia">${requisicao.rendaFamiliar} R$ / mês</span>
                            </p>
                          </div>
                        </div>
                        <div class="doacao-section">
                          <p>
                            <strong>Tipo de doação:</strong> 
                            <span id="tipo_doacao">${requisicao.tipoRequisicao}</span>
                        </p>
                          <p>
                            <strong>Requisição:</strong> 
                            <span id="msg_requisicao">"${requisicao.descricao}"</span> 
                        </p>
                        </div>
                        <div class="modal-footer">
                          <button class="accept-btn" onclick="aceitarReq(${requisicao.id})">&#10004;</button>
                          <button class="decline-btn" onclick="recusarReq(${requisicao.id})">&#10008;</button>
                        </div>
                      </div>
                    </div>
                </div>
        `

    })


}

function ativarModais(numeracao) {

    const doacoes = document.getElementById(`doacao${numeracao}`)
    doacoes.click();
    doacoes.click();

    let span = document.getElementById(`span_close${numeracao}`);

    span.click()

}

async function aceitarReq(id){


    try{
        
        var requisicao = await axios.put(`${window.BASE_URL}/requisicoes/${id}/aceitar`)
    
        if(requisicao.status == 200){

            window.location.reload()

        }else{

            console.log(requisicao.status)

        }
    
    }catch(error){

        console.log(error)
    
    }

}

async function recusarReq(id){

    try{
        
        var requisicao = await axios.put(`${window.BASE_URL}/requisicoes/${id}/recusar`)
    
        if(requisicao.status == 200){

            window.location.reload()

        }else{

            console.log(requisicao.status)

        }
    
    }catch(error){

        console.log(error)
    
    }

}

async function listarRequisicoesAceitas(){

    var conteiner = document.getElementById("lista_aceitas")
    conteiner.innerHTML=""

    try{

        var requisicao = await axios(`${window.BASE_URL}/requisicoes/lista-requisicoes/cumpridas`,{
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })

        var data = await requisicao.data

        for(let i = 0; i < data.length ; i++){

            let requisicao = data[i]

            conteiner.innerHTML+=`
                <div class="negadas-item">
                    <p class="negadas-id">ID #${requisicao.numeracao+1}</p>
                    <p class="negadas-nome">${requisicao.solicitante}</p>
                </div>
            `
                
        }


    }catch(error){

        console.log(error)

    }

}

async function listarRequisicoesRecusadas(){

    var conteiner = document.getElementById("lista_negadas")
    conteiner.innerHTML=""

    try{

        var requisicao = await axios(`${window.BASE_URL}/requisicoes/lista-requisicoes/canceladas`,{
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })

        var data = await requisicao.data

        console.log(data)

        for(let i = 0; i < data.length ; i++){

            let requisicao = data[i]

            conteiner.innerHTML+=`
                <div class="negadas-item">
                    <p class="negadas-id">ID #${requisicao.numeracao+1}</p>
                    <p class="negadas-nome">${requisicao.solicitante}</p>
                    <button class="negadas-botao" onclick="resetarReq(${requisicao.id})">
                        <span>&#8634;</span>
                    </button>
                </div>
            `
                
        }

    }catch(error){

        console.log(error)

    }

}


async function resetarReq(id){

    try{
        
        var requisicao = await axios.put(`${window.BASE_URL}/requisicoes/${id}/resetar`)
    
        if(requisicao.status == 200){

            window.location.reload()

        }else{

            console.log(requisicao.status)

        }
    
    }catch(error){

        console.log(error)
    
    }

}

