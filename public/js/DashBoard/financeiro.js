
async function listar_categoria(){

    var lista = document.getElementById('select-categoria')
    lista.innerHTML=""

    try {

        var requisicao = await axios(`${window.BASE_URL}/vendas/listar-categorias`,{
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })

        var data = await requisicao.data

        data.map((tipo) => {

            lista.innerHTML+=`
               <option value="${tipo.id}">${tipo.nome}</option>
            `

         })


        

    }catch (error) {
        console.log(error)
    }

} 