async function obterEntradaUltimos30Dias() {
    const valorTotal = document.getElementById('total-vendas'); 

    try {
        const resposta = await axios.get(`${window.BASE_URL}/vendas/kpi-ultimos-30-dias`, {
            headers: { 'ngrok-skip-browser-warning': 'true' },
        });

        console.log("Resposta da API:", resposta.data);

        if (resposta.data && typeof resposta.data.valor === "number") {
            const valor = resposta.data.valor;
            console.log("Valor recebido:", valor);

            valorTotal.innerHTML = `<strong>R$ ${valor.toFixed(2)}</strong>`;
        } else {
            console.warn("O campo 'valor' está faltando ou não é um número.");
            valorTotal.innerHTML = `<strong>R$ 0.00</strong>`;
        }
    } catch (error) {
        console.error("Erro ao buscar as vendas dos últimos 30 dias:", error);
        valorTotal.innerHTML = `<strong>Erro ao carregar dados</strong>`;
    }
}

async function obterRequisicoesNegadasUltimos30Dias() {
    const quantidadeNegadas = document.getElementById('quantidade-requisicoes-negadas');

    try {
        const resposta = await axios.get(`${window.BASE_URL}/requisicoes/negadas`, {
            headers: { 'ngrok-skip-browser-warning': 'true' }
        });

        quantidadeNegadas.innerHTML = `<strong>${resposta.data}</strong>`;
    } catch (error) {
        console.error("Erro ao buscar requisições negadas dos últimos 30 dias:", error);
    }
}
async function obterQuantidadeTotalRequisicoesUltimos30Dias() {
    const quantidadeTotal = document.getElementById('quantidade-requisicoes-totais');

    try {
        const resposta = await axios.get(`${window.BASE_URL}/requisicoes/totais`, {
            headers: { 'ngrok-skip-browser-warning': 'true' }
        });

        quantidadeTotal.innerHTML = `<strong>${resposta.data}</strong>`;
    } catch (error) {
        console.error("Erro ao buscar total de requisições dos últimos 30 dias:", error);
    }
}


