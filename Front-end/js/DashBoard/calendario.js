
async function ListarCalendario() {

    let domingo = document.getElementById('Domingo')
    let segunda = document.getElementById('Segunda')
    let terca = document.getElementById('Terca')
    let quarta = document.getElementById('Quarta')
    let quinta = document.getElementById('Quinta')
    let sexta = document.getElementById('Sexta')
    let sabado = document.getElementById('Sabado')

    let requisicao = await fetch("http://localhost:8080/calendarios",{
        method: 'GET',
        headers: {"Content-type":"application/json; charset=UTF-8"}
    });

    if(requisicao.ok){
          
        let dados = await requisicao.json();

        preencherKanban(dados.domingo,domingo)
        preencherKanban(dados.segunda,segunda)
        preencherKanban(dados.terca,terca)
        preencherKanban(dados.quarta,quarta)
        preencherKanban(dados.quinta,quinta)
        preencherKanban(dados.sexta,sexta)
        preencherKanban(dados.sabado,sabado)

        if(dados.domingo != []){
            CriarModaisCalendario(dados.domingo)
        }

        if(dados.segunda != []){
            CriarModaisCalendario(dados.segunda)
        }

        if(dados.terca != []){
            CriarModaisCalendario(dados.terca)
        }

        if(dados.quarta != []){
            CriarModaisCalendario(dados.quarta)
        }

        if(dados.quinta != []){
            CriarModaisCalendario(dados.quinta)
        }

        if(dados.sexta != []){
            CriarModaisCalendario(dados.sexta)
        }

        if(dados.sabado != []){
            CriarModaisCalendario(dados.sabado)
        }

        
    }else{

        console.log("Deu ruim")

    }

}

function preencherKanban(dto,div){

    if(dto == []){
        div.innerHTML+= `
            <div class="adicionar-acao" onclick="adicionarAcao()">
                +
            </div>
        `
    }else{

        dto.map((atividade) => {
            div.innerHTML+= `
                <div class="acao-kanban" id="acao${atividade.atividade.id}" onclick="modal('myModal${atividade.atividade.id}-view','acao${atividade.atividade.id}','span${atividade.atividade.id}')">
                    ${atividade.atividade.nome}
                </div>
            `
        })

        div.innerHTML+= `
            <div class="adicionar-acao" onclick="adicionarAcao()">
                +
            </div>
        `

    }

}

function CriarModaisCalendario(dados) {

    var card = document.getElementById('modais-view')
          
    dados.map((atividade) => {
        card.innerHTML += `
            <div id="myModal${atividade.atividade.id}-view" class="modal">
                <div class="modal-content">
                    <span id="span${atividade.atividade.id}" class="close-view" style="align-self: flex-end; font-size: 10vh; cursor: pointer; font-weight: bolder;"> X</span>
                    <h2>${atividade.atividade.id}</h2>
                    <i>${atividade.atividade.nome}</i>
                    <h3>Data prevista para acontecer: </h3> ${atividade.calendario.diaNomeacao}, ${atividade.calendario.diaNumeracao}/${atividade.calendario.mesNumeracao}/${atividade.calendario.ano}
                    <h3>Descrição: </h3>
                    ${atividade.atividade.descricao}
                    <div class="modal-acoes">
                        <div class="modal-acao">
                            <img src="./assets/imgs/icons8-lápis-24.png" alt="">
                            Editar
                        </div>
                        <div class="modal-acao">
                            <img src="./assets/imgs/icons8-lixo-24.png" alt="">
                            Excluir
                        </div>
                    </div>
                </div>
            </div>
        `
    })

}

