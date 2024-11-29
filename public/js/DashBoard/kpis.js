async function obterEntradaUltimos30Dias() {
    const valorTotal = document.getElementById('total-vendas');

    try {
        const resposta = await axios.get(`${window.BASE_URL}/vendas/kpi-ultimos-30-dias`, {
            headers: { 'ngrok-skip-browser-warning': 'true' }
        });

        valorTotal.innerHTML = `<strong>R$ ${resposta.valorTotal}</strong>`;
    } catch (error) {
        console.error("Erro ao buscar as vendas dos últimos 30 dias:", error);
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


