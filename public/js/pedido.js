
async function listar_tipo(){

    var lista = document.getElementById('categorias-pedido')
    lista.innerHTML=""

    try {

        var requisicao = await axios(`${window.BASE_URL}/requisicoes/listar-tipo-requisicao`,{
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })

        var data = await requisicao.data

        data.map((tipo) => {

            lista.innerHTML+=`
                <option value="${tipo.id}">${tipo.assunto}</option>
            `

        })

    }catch (error) {
        console.log(error)
    }

}

async function salvar_requisicao(){

    var modalAcerto = document.getElementById("myModal");
    var modalErro = document.getElementById("myModal");
    
    var assunto = parseInt(document.getElementById("categorias-pedido").value); 
    var descricao = document.getElementById("mensagem-pedido").value;

    var requisicao = await axios.post(`${window.BASE_URL}/requisicoes`,{
        assuntoId:assunto,
        descricao:descricao,
        usuarioId:sessionStorage.getItem('ID_USER'),
        emailModificador:sessionStorage.getItem('EMAIL_USER'),
        data:null
    })

    if(requisicao.status == 201){

        modalAcerto.style.display ='flex'

    }else{

        modalErro.style.display = 'flex'

    }

}

async function listar_pedidos(){

    var cards = document.getElementById('cards');
    cards.innerHTML=""

    var requisicao = await axios(`${window.BASE_URL}/requisicoes/lista-requisicoes/${parseFloat(sessionStorage.getItem('ID_USER'))}`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

    if(requisicao.status == 200){

        var response = await requisicao.data

        console.log(response)

        response.map((pedido) => {

            if(pedido.situacao.situacao == "Cumprida"){

                cards.innerHTML+=`
                    <div class="card">
                        <h4>PEDIDO #${pedido.id}</h4>
                        <h3>${pedido.assuntoRequisicao.assunto}</h3>
                        <p>"${pedido.descricao}"</p>
                        <p id="footer-card"><strong>Status:</strong> <span class="status pronto">Pronto</span> <img src="./assets/imgs/aceito.png" alt=""></i></p>
                    </div>
                `
            }else if(pedido.situacao.situacao == "recusada"){
                cards.innerHTML+=`
                    <div class="card">
                        <h4>PEDIDO #${pedido.id}</h4>
                        <h3>${pedido.assuntoRequisicao.assunto}</h3>
                        <p>"${pedido.descricao}"</p>
                        <p id="footer-card"><strong>Status:</strong> <span class="status negado">Negado</span> <img src="./assets/imgs/negado.png" alt=""></i></p>
                    </div>
                `
            }else{
                cards.innerHTML+=`
                    <div class="card">
                        <h4>PEDIDO #${pedido.id}</h4>
                        <h3>${pedido.assuntoRequisicao.assunto}</h3>
                        <p>"${pedido.descricao}"</p>
                        <p id="footer-card"><strong>Status:</strong> <span class="status andamento">Produzindo</span></i></p>
                    </div>
                `
            }

        })

    }

}

