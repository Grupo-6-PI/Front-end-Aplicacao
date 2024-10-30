function gerarRelatorioPDF() {
    const PDFDocument = window.PDFDocument;  // Use a versão standalone do PDFKit

    // Criar novo documento PDF
    const doc = new PDFDocument();

    // Criar um array para armazenar o PDF gerado como bytes
    const stream = doc.pipe(new pdfkit.Stream());

    // Configurações e texto inicial no PDF
    doc.font('Helvetica-Bold')
        .fontSize(25)
        .text('Relatório Financeiro', 100, 100);

    // Adicionar uma imagem (certifique-se de que o caminho esteja correto)
    doc.image('./assets/imgs/logo-mooca.png', {
        fit: [250, 300],
        align: 'center',
        valign: 'center'
    });

    // Adicionar mais texto e uma página extra
    doc.addPage()
        .fontSize(25)
        .text('Aqui está um gráfico...', 100, 100);

    // Adicionar exemplo de forma vetorial
    doc.save()
        .moveTo(100, 150)
        .lineTo(100, 250)
        .lineTo(200, 250)
        .fill('#FF3300');

    doc.scale(0.6)
        .translate(470, -380)
        .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
        .fill('red', 'even-odd')
        .restore();

    // Adicionar link
    doc.addPage()
        .fillColor('blue')
        .text('Aqui está um link!', 100, 100)
        .underline(100, 100, 160, 27, { color: '#0000FF' })
        .link(100, 100, 160, 27, 'http://google.com/');

    // Finalizar a criação do PDF
    doc.end();

    // Aguardar a conclusão do stream de dados
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    
    stream.on('end', function() {
        const blob = new Blob(chunks, { type: 'application/pdf' });
        
        // Cria uma URL a partir do blob
        const url = URL.createObjectURL(blob);
        
        // Exibir o PDF em um iframe ou abrir o download
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.width = '100%';
        iframe.style.height = '500px';
        
        // Adicionar o iframe ao corpo da página para visualização
        document.body.appendChild(iframe);
        
        // Alternativamente, para forçar o download do PDF
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio.pdf';
        a.textContent = 'Baixar PDF';
        document.body.appendChild(a);
    });
}
