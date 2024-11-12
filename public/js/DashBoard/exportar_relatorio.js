function gerarRelatorioPDF() {

    var periodoStart = 'Janeiro'
    var periodoFinish = 'Dezembro'
    var periodoYear = '2024'

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFillColor(103, 6, 50); 
    doc.rect(0, 0, 210, 30, 'F');
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255); 
    doc.text("Relatório Financeiro | Mooca Solidária", 105, 20, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Período: ${periodoStart} - ${periodoFinish} ${periodoYear}`, 105, 26, { align: "center" });

    // Configurações da tabela
    const tableYStart = 40;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    // Título da seção de transações
    doc.text("Resumo das Transações", 10, tableYStart);

    // Cabeçalho da Tabela
    doc.setFillColor(230, 230, 230); // Cor cinza claro para o cabeçalho
    doc.rect(10, tableYStart + 10, 190, 10, 'F');
    doc.setTextColor(0, 0, 0);
    doc.text("Data", 15, tableYStart + 17);
    doc.text("Descrição", 50, tableYStart + 17);
    doc.text("Categoria", 110, tableYStart + 17);
    doc.text("Valor (R$)", 170, tableYStart + 17, { align: "right" });

    // Linhas da Tabela
    let y = tableYStart + 25;
    let total = 0;

    dados.forEach((item, index) => {
        doc.setFillColor(index % 2 === 0 ? 245 : 255); // Alternância de cores nas linhas
        doc.rect(10, y - 5, 190, 10, 'F'); // Linha de fundo

        // Preenchimento das células
        doc.setTextColor(0, 0, 0);
        doc.text(item.data, 15, y);
        doc.text(item.descricao, 50, y);
        doc.text(item.categoria, 110, y);
        doc.text(item.valor.toFixed(2), 170, y, { align: "right" });

        total += item.valor;
        y += 10;
    });

    // Linha do Total
    y += 5;
    doc.setFillColor(0, 102, 204);
    doc.rect(10, y - 5, 190, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text("Total Geral", 110, y);
    doc.text(total.toFixed(2), 170, y, { align: "right" });

    // Rodapé
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Este relatório foi gerado automaticamente pelo sistema.", 105, 285, { align: "center" });
    doc.text("Página 1 de 1", 200, 290, { align: "right" });

    // Salva o PDF
    doc.save("relatorio_financeiro.pdf");
}


// Dados de exemplo (substitua com os seus próprios dados)
const dados = [
    { data: "01/01/2024", descricao: "Venda de produto", categoria: "Receita", valor: 1500.00 },
    { data: "05/01/2024", descricao: "Compra de materiais", categoria: "Despesa", valor: -300.00 },
    { data: "15/02/2024", descricao: "Serviços prestados", categoria: "Receita", valor: 2000.00 },
    { data: "28/02/2024", descricao: "Aluguel", categoria: "Despesa", valor: -1200.00 },
    // Adicione mais dados conforme necessário
];

// Adiciona a função ao escopo global
window.gerarRelatorioPDF = gerarRelatorioPDF;

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
        link.setAttribute('download', `relatorio_financeiro${dataInicio}_${dataFim}.${tipo}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Erro ao exportar relatório:", error);
        alert("Erro ao exportar o relatório. Tente novamente.");
    }
}