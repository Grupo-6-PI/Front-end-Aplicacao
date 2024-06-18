
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

async function ListarTipos(){

    let retorno = await fetch(`http://localhost:8080/atividade/tipos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(retorno.status == 200){

        let lista = await retorno.json()

        let select = document.getElementById("tipoDoacao")
        select.innerHTML=""

        lista.map((tipo) => {

            let opt = document.createElement("option")
            opt.value = `${tipo.tipo}`
            opt.innerHTML = `${tipo.tipo}`
            select.appendChild(opt)
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
                    <h2>${atividade.atividade.id}</h2>
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
        `
    })

}

async function BuscarAtividade(id){

    let retorno = await fetch(`http://localhost:8080/calendarios/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    if(retorno.status == 200){
    
        var acao = await retorno.json()
    
        console.log(acao)
    
        var modal = document.getElementById("myModal");
    
        var tipoDoacao = document.getElementById('tipoDoacao')
        tipoDoacao.value = acao.atividade.tipoAtividade.tipo
    
        var nome = document.getElementById('nomeAcao')
        nome.value = acao.atividade.nome
    
        var dataInicio = document.getElementById('dataHoraInicio')
        
        let mes = acao.calendario.mesNumeracao.toString().padStart(2, '0')
        let dia = acao.calendario.diaNumeracao.toString().padStart(2, '0')
    
        let horaInicio = acao.atividade.horaComeco[0].toString().padStart(2, '0')
        let minutosInicio = acao.atividade.horaComeco[1].toString().padStart(2, '0')
    
        dataInicio.value = `${acao.calendario.ano}-${mes}-${dia}T${horaInicio}:${minutosInicio}`
        
        var dataFim = document.getElementById('dataHoraFim')
    
        let horaFim = acao.atividade.horaFinal[0].toString().padStart(2, '0')
        let minutosFim = acao.atividade.horaFinal[1].toString().padStart(2, '0')
    
        dataFim.value = `${acao.calendario.ano}-${mes}-${dia}T${horaFim}:${minutosFim}`
    
        var descricao = document.getElementById('descricaoAcao')
        descricao.innerHTML = acao.atividade.descricao
    
        modal.style.display = "block";
    
        // Encontra o elemento para fechar o modal
        var span = document.getElementsByClassName("close")[0];
    
        // Fecha o modal quando clicado no botão de fechar
        span.onclick = function () {
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
        };
    
        // Fecha o modal se o usuário clicar fora dele
        window.onclick = function (event) {
        
            var modal = document.getElementById("myModal");
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    
    }
    
    
    }
    
        function carregarInformacoes(){
    
            ListarCalendario()
            ListarTipos()
    
            var nomeUser = document.getElementById('nameUser');
            nomeUser.innerHTML = sessionStorage.getItem('NOME_USER')
    
        }
    
        function teste(){
    
            let dataCriacao = document.getElementById('dataHoraInicio')
    
            let datetime = dataCriacao.value
    
            console.log(datetime)
    
            let time = dataCriacao.value.slice(11)
    
            let hora = parseInt(time.slice(0,2))
            let minutos = parseInt(time.slice(3))
    
            let data = dataCriacao.value.slice(0,10)
    
            let ano = data.slice(0,4)
            let mes = data.slice(5,7)
            let dia = data.slice(8)
    
            console.log(data)
            console.log(ano)
            console.log(mes)
            console.log(dia)
    
        }
    
        // menu hamburger responsividade
        document.addEventListener('DOMContentLoaded', (event) => {
            const hamburgerMenu = document.getElementById('hamburger-menu');
            const sidebar = document.querySelector('.sidebar');
            const content = document.querySelector('.content');
    
            hamburgerMenu.addEventListener('click', () => {
                sidebar.classList.toggle('active');
                content.classList.toggle('shift');
            });
    
            window.addEventListener('click', (event) => {
                if (!sidebar.contains(event.target) && !hamburgerMenu.contains(event.target)) {
                    sidebar.classList.remove('active');
                    content.classList.remove('shift');
                }
            });
        });

async function deletaCalendario(id) {

    let retorno = await fetch(`http://localhost:8080/calendarios/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(retorno.status == 200){


        var modal = document.getElementById(`myModal${id}-view`);
        modal.style.display = "none";
        ListarCalendario()

    }else{
        console.log(retorno.status)
        console.log(retorno.text)
    }
}



