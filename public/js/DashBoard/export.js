// Função para exportar o relatório financeiro
async function exportarRelatorio(tipo) {
    const dataInicio = document.getElementById('datetime1').value;
    const dataFim = document.getElementById('datetime2').value;
    // const categoria = document.getElementById('categoria').value;
    const emailUsuario = sessionStorage.getItem('EMAIL_USER');

    if (!dataInicio || !dataFim) {
        alert("Por favor, selecione as datas de início e fim.");
        return;
    }

    try {
        const response = await axios.get(`${window.BASE_URL}/vendas/exportar`, {
            params: {
                dataInicio,
                dataFim,
                // categoria,
                emailUsuario,
                tipo
            },
            responseType: 'blob',
            headers: { 'ngrok-skip-browser-warning': 'true' }
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `relatorio_financeiro.${tipo}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Erro ao exportar relatório:", error);
        alert("Erro ao exportar o relatório. Tente novamente.");
    }
}