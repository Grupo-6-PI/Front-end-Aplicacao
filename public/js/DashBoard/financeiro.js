async function listar_categoria() {
    const lista = document.getElementById('select-categoria');
    lista.innerHTML = "";

    try {
        const requisicao = await axios(`${window.BASE_URL}/vendas/listar-categorias`, {
            headers: { 'ngrok-skip-browser-warning': 'true' }
        });

        const data = requisicao.data;

        data.forEach((tipo) => {
            lista.innerHTML += `
               <option value="${tipo.id}">${tipo.nome}</option>
            `;
        });

    } catch (error) {
        console.log(error);
    }
}

// Função para listar as vendas
// Array para armazenar os produtos adicionados antes de finalizar a compra
let filaProdutos = [];

async function listar_vendas() {
    const email = sessionStorage.getItem('EMAIL_USER');
    if (!email) {
        console.error("Email do usuário não encontrado no sessionStorage.");
        return;
    }
    
    var lista = document.getElementById('cart-items');
    var itens = document.getElementById('total_itens');
    var valor = document.getElementById('cart-subtotal');
    lista.innerHTML = "";

    let totalItens = 0;
    let totalValor = 0;

    // Exibe os produtos na fila antes de finalizar
    filaProdutos.forEach((produto) => {
        totalValor += produto.valor * produto.quantidade;
        totalItens += produto.quantidade;

        lista.innerHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <span>${produto.quantidade}x ${produto.categoria.nome} - R$${produto.valor.toFixed(2)}</span>
                </div>
                <button class="remove-item" onclick="removerProduto('${produto.categoria.id}')">x</button>
            </div>
        `;
    });

    itens.innerText = `Total de itens: ${totalItens}`;
    valor.innerHTML = `<strong>Subtotal:</strong> R$ ${totalValor.toFixed(2)}`;
}

// Função para adicionar um produto ao extrato de compras e à fila
async function adicionar_produto_lista() {
    document.getElementById('addProduto').addEventListener('click', async () => {
        const categoriaSelect = document.getElementById('select-categoria');
        const categoriaId = categoriaSelect.value;
        const categoriaNome = categoriaSelect.options[categoriaSelect.selectedIndex].text; // Captura o nome da categoria
        const quantidade = document.getElementById('quantidade').value;
        const valor = document.querySelector('.container-preco input').value.replace(',', '.');

        const email = sessionStorage.getItem('EMAIL_USER');

        const produtoData = {
            quantidade: parseInt(quantidade),
            valor: parseFloat(valor),
            categoria: { id: parseInt(categoriaId), nome: categoriaNome }, // Inclui o nome da categoria
            emailModificador: email,
            calendario: null
        };

        // Adicionar o produto à fila e ao extrato visual
        filaProdutos.push(produtoData);
        atualizarExtrato();

        // Limpar campos do formulário
        document.getElementById('quantidade').value = '';
        document.querySelector('.container-preco input').value = '';
        document.getElementById('select-categoria').value = '';
    });
}


function atualizarExtrato() {
    const lista = document.getElementById('cart-items');
    const itens = document.getElementById('total_itens');
    const valor = document.getElementById('cart-subtotal');
    lista.innerHTML = "";

    let totalItens = 0;
    let totalValor = 0;

    filaProdutos.forEach((produto, index) => {
        // Calcular o valor total para o produto multiplicando quantidade pelo valor unitário
        totalItens += produto.quantidade;
        totalValor += produto.valor; // Multiplicando o valor pela quantidade

        lista.innerHTML += `
            <div class="cart-item" data-index="${index}">
                <div class="item-info">
                    <span>${produto.quantidade}x ${produto.categoria.nome} - R$${(produto.valor).toFixed(2)}</span>
                </div>
                <button class="remove-item" onclick="removerProduto(${index})">x</button>
            </div>
        `;
    });

    itens.innerText = `Total de itens: ${totalItens}`;
    valor.innerHTML = `<strong>Subtotal:</strong> R$ ${totalValor.toFixed(2)}`;
}


// Função para remover um produto da fila e atualizar o extrato
function removerProduto(index) {
    filaProdutos.splice(index, 1); // Remove o produto da fila
    atualizarExtrato(); // Atualiza o extrato visual
}

// Função de finalizar compra
async function finalizarCompra() {
    if (filaProdutos.length === 0) {
        alert("Nenhum produto na fila para finalizar.");
        return;
    }

    try {
        for (const produto of filaProdutos) {
            await axios.post(`${window.BASE_URL}/vendas/registrarVenda`, produto, {
                headers: { 'ngrok-skip-browser-warning': 'true' }
            });
        }
        alert("Compra finalizada com sucesso!");

        // Limpar a fila e atualizar o extrato de compras
        filaProdutos = [];
        atualizarExtrato();

    } catch (error) {
        console.error(error);
        alert("Erro ao finalizar a compra. Tente novamente.");
    }
}

// Event listener para o botão de finalizar
document.addEventListener("DOMContentLoaded", function () {
    const finalizarButton = document.getElementById('finalizar-vendas');
    
    if (finalizarButton) {
        finalizarButton.addEventListener('click', finalizarCompra);
    } else {
        console.error("Botão 'finalizar-vendas' não encontrado no DOM.");
    }
});