

async function ListarAtividades() {

    var card = document.getElementById('card-atividades')
    card.innerHTML = "";

    let requisicao = await fetch("http://localhost:8080/atividade/lista-atividade",{
      method: 'GET',
      headers: {"Content-type":"application/json; charset=UTF-8"}
    });

    if(requisicao.ok){
          
        let dados = await requisicao.json();

        dados.map((atividade) => {
            card.innerHTML += `
            <div class="inner-box" id="acao${atividade.id}" onclick="modal('myModal${atividade.id}','acao${atividade.id}','close${atividade.id}')">
                <div class="container-inner-box">
                    <div class="elipse">
                        <img src="assets/imgs/icons8-voluntariado-30.png" alt="">
                    </div>
                    <p>${atividade.nome}</p>
                </div>
            </div>
            `
        })
        
    }else{

        console.log("Deu ruim")

    }

}

async function CriarModaisAcoes() {

    var card = document.getElementById('modais')
    card.innerHTML = ""

    let requisicao = await fetch("http://localhost:8080/atividade/lista-atividade",{
      method: 'GET',
      headers: {"Content-type":"application/json; charset=UTF-8"}
    });

    if(requisicao.ok){
          
        let dados = await requisicao.json();

        dados.map((atividade) => {
            card.innerHTML += `
<div id="myModal${atividade.id}" class="modal">
        <div class="modal-content">
            <span class="close" id="close${atividade.id}"> X</span>
            <h2>Ação ${atividade.id}</h2>
            <i>${atividade.nome}</i>
            <h3>Data prevista para acontecer: </h3> Terça-feira, 12/12/2000
            <h3>Descrição: </h3>
            ${atividade.descricao}
            
        </div>
    </div>
            `
        })
        
    }else{

        console.log("Deu ruim")

    }

}

