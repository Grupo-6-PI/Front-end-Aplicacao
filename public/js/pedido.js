
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

    var modal = document.getElementById("myModal");
    
    if(true){
        modal.style.display = "flex"
    }else{
        modal.style.display = "block"
    }

}

