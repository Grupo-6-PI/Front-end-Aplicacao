async function listar_categoria() {
    var lista = document.getElementById('select-categoria');
    lista.innerHTML = "";

    try {
        var requisicao = await axios(`${window.BASE_URL}/vendas/listar-categorias`, {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });

        var data = requisicao.data;

        data.map((tipo) => {
            lista.innerHTML += `
               <option value="${tipo.id}">${tipo.nome}</option>
            `;
        });

    } catch (error) {
        console.log(error);
    }
}

async function listar_vendas() {
    var lista = document.getElementById('cart-items');
    var itens = document.getElementById('total_itens');
    var valor = document.getElementById('cart-subtotal');
    lista.innerHTML = "";

    let totalItens = 0;
    let totalValor = 0;

    try {
        var requisicao = await axios(`${window.BASE_URL}/vendas/listar-vendas`, {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });

        var data = requisicao.data;

        data.map((venda) => {
            totalValor += venda.valor;
            totalItens += venda.quantidade;

            lista.innerHTML += `
               <div class="cart-item">
                    <div class="item-info">
                        <span>${venda.quantidade}x ${venda.categoria.nome} - R$${venda.valor.toFixed(2)}</span>
                    </div>
                    <button class="remove-item">x</button>
                </div>
            `;
        });

        itens.innerText = `Total de itens: ${totalItens}`;
        valor.innerHTML = `<strong>Subtotal:</strong> R$ ${totalValor.toFixed(2)}`;

    } catch (error) {
        console.log(error);
    }
}

document.querySelector('addProduto').addEventListener('click', async () => {
    const categoriaId = document.getElementById('select-categoria').value;
    const quantidade = document.getElementById('quantidade').value;
    const valor = document.querySelector('.container-preco input').value.replace(',', '.');

    
    const emailModificador = localStorage.getItem('EMAIL_USER'); // Certifique-se de que o email está salvo no local storage

    
    const produtoData = {
        quantidade: parseInt(quantidade),
        valor: parseFloat(valor),
        categoria: {
            id: parseInt(categoriaId)
        },
        emailModificador: emailModificador,
        calendario: null 
    };

    try {
        const response = await axios.post(`${window.BASE_URL}/vendas/registrarVenda`, produtoData, {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });

        console.log(response.data);
        alert('Produto adicionado com sucesso!');

        
        document.getElementById('quantidade').value = '';
        document.querySelector('.container-preco input').value = '';
        document.getElementById('select-categoria').value = '';

        
        listar_vendas();

    } catch (error) {
        console.error(error);
        alert('Erro ao adicionar o produto. Tente novamente.');
    }
});
