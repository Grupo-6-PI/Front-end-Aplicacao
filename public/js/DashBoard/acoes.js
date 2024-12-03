function modal(idModal,idAcao,idSpan){

    var modal = document.getElementById(idModal)

    // pega o botão que abre o modal
    var btns = document.getElementById(idAcao);

    // pega o elemento <span> que fecha o modal
    var span = document.getElementById(idSpan);
    
    // quando o usuário clicar em qualquer .inner-box abre o modal 
    
        btns.onclick = function () {
            modal.style.display = "block";
        }
    
    // quando o usuário clicar em <span> (x), fecha o modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // quando o usuário clicar em qualquer lugar fora do modal, fecha o modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

async function ListarAtividades() {

    var card = document.getElementById('card-atividades')
    card.innerHTML = "";

    try{

        let requisicao = await axios(`${window.BASE_URL}/atividade/lista-atividade`,{
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })
        
        let data = await requisicao.data

        data.map((atividade) => {
            card.innerHTML += `
            <div class="inner-box" id="acao${atividade.atividade.id}" onclick="modal('myModal${atividade.atividade.id}','acao${atividade.atividade.id}','close${atividade.atividade.id}')">
                <div class="container-inner-box">
                    <div class="elipse">
                        <img src="assets/imgs/icons8-voluntariado-30.png" alt="">
                    </div>
                    <p>${atividade.atividade.nome}</p>
                </div>
            </div>
            `
        })

        for(let i = 0;i<data.length; i++){

            let requi = data[i]

            let doacoes = document.getElementById(`acao${requi.id}`)

            doacoes.click()            
            doacoes.click()

            let span = document.getElementById(`close${requi.id}`);

            span.click()

        }


    }catch(error){
        console.log(error)
    }

}

async function CriarModaisAcoes() {

    var card = document.getElementById('modais')
    card.innerHTML = ""

    let requisicao = await axios(`${window.BASE_URL}/atividade/lista-atividade`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

    if(requisicao.status == 200){
          
        let dados = await requisicao.data;

        dados.map((atividade) => {
        
            card.innerHTML += `
                <div id="myModal${atividade.atividade.id}" class="modal">
                    <div class="modal-content">
                        <span class="close" id="close${atividade.atividade.id}"> X</span>
                        <h2>Ação ${atividade.atividade.id}</h2>
                        <i>${atividade.atividade.nome}</i>
                        <h3>Data prevista para acontecer: </h3> ${atividade.calendario.diaNomeacao}, ${atividade.calendario.diaNumeracao}/${atividade.calendario.mesNumeracao}/${atividade.calendario.ano}
                        <h3>Descrição: </h3>
                        ${atividade.atividade.descricao}    
                    </div>
                </div>
            `
        
        })

        
        
    }else{

        console.log("Deu ruim")

    }

}

