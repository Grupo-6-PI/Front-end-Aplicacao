
const dadosConst = {}

async function ListarCalendario() {

    let domingo = document.getElementById('Domingo')
    domingo.innerHTML=""
    
    let segunda = document.getElementById('Segunda')
    segunda.innerHTML=""
    
    let terca = document.getElementById('Terca')
    terca.innerHTML=""
    
    let quarta = document.getElementById('Quarta')
    quarta.innerHTML=""
    
    let quinta = document.getElementById('Quinta')
    quinta.innerHTML=""
    
    let sexta = document.getElementById('Sexta')
    sexta.innerHTML=""
    
    let sabado = document.getElementById('Sabado')
    sabado.innerHTML=""

    let requisicao = await axios(`${window.BASE_URL}/calendarios`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    });

    if(requisicao.status == 200 ){

        let dados = await requisicao.data;

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

        ativarModais()
        
    }else{

        console.log("Deu ruim")

    }

}

async function ListarTipos(){

    let retorno = await axios(`${window.BASE_URL}/atividade/tipos`,{
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

    if(retorno.status == 200){

        let lista = await retorno.data

        let select = document.getElementById("tipoDoacao_add")
        select.innerHTML=""

        let selectEdit = document.getElementById("tipoDoacao_edit")
        selectEdit.innerHTML=""

        lista.map((tipo) => {

            select.innerHTML+= `<option value="${tipo.id}">${tipo.tipo}</option>`
            selectEdit.innerHTML+= `<option value="${tipo.id}">${tipo.tipo}</option>`

        })

    }else{

        console.log(retorno.status)
    
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
                    <h2>Número identificador: ${atividade.atividade.id}</h2>
                    <i>${atividade.atividade.nome}</i>
                    <h3>Data prevista para acontecer: </h3> ${atividade.calendario.diaNomeacao}, ${atividade.calendario.diaNumeracao}/${atividade.calendario.mesNumeracao}/${atividade.calendario.ano}
                    <h3>Descrição: </h3>
                    ${atividade.atividade.descricao}
                    <div class="modal-acoes">
                        <div class="modal-acao">
                            <img src="./assets/imgs/icons8-lápis-24.png" alt="">
                            <span onclick="BuscarAtividade(${atividade.id})"> Editar
                        </div>
                        <div class="modal-acao">
                            <img src="./assets/imgs/icons8-lixo-24.png" alt="">
                            <span onclick="deletaCalendario(${atividade.id})">Excluir</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

    })

}

async function BuscarAtividade(id){

    let retorno = await axios(`${window.BASE_URL}/calendarios/${id}`, {
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })
    
    if(retorno.status == 200){
    
        var acao = await retorno.data
    
        var modal = document.getElementById("myModal_edit");

        sessionStorage.setItem("id_acao",acao.atividade.id)
    
        var tipoDoacao = document.getElementById('tipoDoacao_edit')
        
        tipoDoacao.value = acao.atividade.tipoAtividade.id
    
        var nome = document.getElementById('nomeAcao_edit')
        
        nome.value = acao.atividade.nome
    
        var dataInicio = document.getElementById('dataHoraInicio_edit')
        

        
        let mes = acao.calendario.mesNumeracao.toString().padStart(2, '0')
        
        let dia = acao.calendario.diaNumeracao.toString().padStart(2, '0')
    
        let horaInicio = acao.atividade.horaComeco[0].toString().padStart(2, '0')
        
        let minutosInicio = acao.atividade.horaComeco[1].toString().padStart(2, '0')
    
        dataInicio.value = `${acao.calendario.ano}-${mes}-${dia}T${horaInicio}:${minutosInicio}`
        
        var dataFim = document.getElementById('dataHoraFim_edit')
    
        let horaFim = acao.atividade.horaFinal[0].toString().padStart(2, '0')
        
        let minutosFim = acao.atividade.horaFinal[1].toString().padStart(2, '0')
    
        dataFim.value = `${acao.calendario.ano}-${mes}-${dia}T${horaFim}:${minutosFim}`
    
        var descricao = document.getElementById('descricaoAcao_edit')
        
        descricao.innerHTML = acao.atividade.descricao

        sessionStorage.setItem("alteracoes_acao",JSON.stringify(acao))
    
        modal.style.display = "block";

        var modal = document.getElementById(`myModal${acao.id}-view`);

        modal.style.display = "none";

        // Encontra o elemento para fechar o modal
        var span = document.getElementsByClassName("close")[0];
    
        // Fecha o modal quando clicado no botão de fechar
        span.onclick = function () {

            var modal = document.getElementById("myModal_edit");
            
            modal.style.display = "none";

        };
    
        // Fecha o modal se o usuário clicar fora dele
        window.onclick = function (event) {
        
            var modal = document.getElementById("myModal_edit");

            if (event.target == modal) {

                modal.style.display = "none";

            }

        };
    
    }
    
}

function salvarAlteracoes(){

    let acao = JSON.parse(sessionStorage.getItem('alteracoes_acao'))

    var tipoDoacao = document.getElementById('tipoDoacao_edit')
    
    acao.atividade.tipoAtividade.id = tipoDoacao.value

    acao.atividade.nome = document.getElementById('nomeAcao_edit').value

    acao.atividade.descricao = document.getElementById('descricaoAcao_edit').value

    let dataInicio = document.getElementById('dataHoraInicio_edit')

    let timeInicio = dataInicio.value.slice(11)

    acao.atividade.horaComeco[0] = parseInt(timeInicio.slice(0,2))
    acao.atividade.horaComeco[1] = parseInt(timeInicio.slice(3))

    let data = dataInicio.value.slice(0,10)

    acao.calendario.ano = data.slice(0,4)
    acao.calendario.mesNumeracao = data.slice(5,7)
    acao.calendario.diaNumeracao = data.slice(8)

    let dataFim = document.getElementById('dataHoraFim_edit')

    let timeFim = dataFim.value.slice(11)

    acao.atividade.horaFinal[0] = parseInt(timeFim.slice(0,2))
    acao.atividade.horaFinal[1] = parseInt(timeFim.slice(3))

    sessionStorage.setItem('alteracoes_acao',JSON.stringify(acao))

}

async function editarCalendario(){

    salvarAlteracoes()
    
    let acao = JSON.parse(sessionStorage.getItem('alteracoes_acao'))

    let retorno = await axios.put(`${window.BASE_URL}/calendarios/atualizacao`,{
        "id":acao.id,
        "atividade":acao.atividade,
        "dataCriacao":acao.dataCriacao,
        "dataUltimaAtualizacao":acao.dataUltimaAtualizacao,
        "emailModificador":acao.emailModificador,
        "calendario":acao.calendario
    })

    if(retorno.status == 200){
        
        var modalView = document.getElementById(`myModal${id}-view`);
        modalView.style.display = "none";

        var modal = document.getElementById(`myModal_edit`);
        modal.style.display = "none";
        
        ListarCalendario()

    }else{

        alert(retorno.status)
    
    }

}
    
async function deletaCalendario(id) {

    let retorno = await axios.delete(`${window.BASE_URL}/calendarios/${id}`)

    if(retorno.status == 200){

        var modal = document.getElementById(`myModal${id}-view`);
        modal.style.display = "none";
        ListarCalendario()

    }else{
        
        console.log(retorno.status)
        console.log(retorno.text)
    
    }

}

async function salvarCalendario(){

    var tipoDoacao = parseFloat(document.getElementById('tipoDoacao_add').value)
    var nomeInsert = document.getElementById('nomeAcao_add').value
    var descricao = document.getElementById('descricaoAcao_add').value
    
    var emailMod = sessionStorage.getItem('EMAIL_USER')

    let dataInicio = document.getElementById('dataHoraInicio_add')
    let dataFim = document.getElementById('dataHoraFim_add')

    let timeInicio = dataInicio.value.slice(11)

    let horaComeco = parseInt(timeInicio.slice(0,2))
    let minutosComeco = parseInt(timeInicio.slice(3))

    let timeFim = dataFim.value.slice(11)

    let horaFim = parseInt(timeFim.slice(0,2))
    let minutosFim = parseInt(timeFim.slice(3))

    let data = dataInicio.value.slice(0,10)

    let ano = parseInt(data.slice(0,4))
    let mes = parseInt(data.slice(5,7))
    let dia = parseInt(data.slice(8))

    // const atividade = {
    //     "nome":nomeInsert,
    //     "horaComeco":[horaComeco,minutosComeco],
    //     "horaFinal":[horaFim,minutosFim],
    //     "descricao":descricao,
    //     "tipoAtividadeId":tipoDoacao,
    //     "emailModificador":emailMod,
    //     "filtrodto":{
    //         ano:ano,
    //         mesNumeracao:mes,
    //         diaNumeracao:dia,
    //         diaNomeacao:null
    //     }
    // }

    let retorno = await axios.post(`${window.BASE_URL}/calendarios`,{
        "nome":nomeInsert,
        "horaComeco":[horaComeco,minutosComeco],
        "horaFinal":[horaFim,minutosFim],
        "descricao":descricao,
        "tipoAtividadeId":tipoDoacao,
        "emailModificador":emailMod,
        "filtrodto":{
            ano:ano,
            mesNumeracao:mes,
            diaNumeracao:dia,
            diaNomeacao:null
        }
    })

    if(retorno.status != 201){

        console.log(retorno.status)
        console.log(retorno.statusText)        

    }

}

