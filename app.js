const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const http = require('http');
const ngrok = require('@ngrok/ngrok');

// Definindo qual configuração de ambiente vai ser usada
const ambiente_processo = 'desenvolvimento';  // troque o valor para 'desenvolvimento' caso precise
const caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

dotenv.config({ path: caminho_env });

const PORTA_APP = process.env.APP_PORT;
const HOST_APP = process.env.APP_HOST;
const BASE_URL = process.env.BASE_URL;
const NGROK_AUTH_TOKEN = process.env.NGROK_AUTH_TOKEN;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

function renderHTML(filePath) {
    try {
        let html = fs.readFileSync(filePath, 'utf8');
        return html.replace('{{BASE_URL}}', BASE_URL);
    } catch (err) {
        console.error(`Error reading HTML file: ${filePath}`, err);
        return null;
    }
}

// ROTAS PARA AS PÁGINAS

app.get('/', (req, res) => {
    const html = renderHTML(path.join(__dirname, 'index.html'));
    if (html) {
        res.send(html);
    } else {
        res.status(500).send('Error loading the homepage.');
    }
});

app.get('/login', (req, res) => {
    const html = renderHTML(path.join(__dirname, 'public', 'login.html'));
    if (html) {
        res.send(html);
    } else {
        res.status(500).send('Error loading the login page.');
    }
});

app.get('/cadastro', (req, res) => {
    const html = renderHTML(path.join(__dirname, 'public', 'cadastro.html'));
    if (html) {
        res.send(html);
    } else {
        res.status(500).send('Error loading the login page.');
    }
});

//CADASTRO COMPLEMENTAR 1
app.get('/cadastro/complementar/parte-1', (req, res) => {
    const html = renderHTML(path.join(__dirname, 'public', 'cadastro_complementar1.html'));
    if (html) {
        res.send(html);
    } else {
        res.status(500).send('Error loading the login page.');
    }
});

//CADASTRO COMPLEMENTAR 1
app.get('/cadastro/complementar/parte-2', (req, res) => {
    const html = renderHTML(path.join(__dirname, 'public', 'cadastro_complementar2.html'));
    if (html) {
        res.send(html);
    } else {
        res.status(500).send('Error loading the login page.');
    }
});

//DashBoard Inicial
app.get('/home', (req, res) => {
    const html = renderHTML(path.join(__dirname, 'public/dashboard', 'dash-requisicoes.html'));
    if (html) {
        res.send(html);
    } else {
        res.status(500).send('Error loading the login page.');
    }
});

//DashBoard Inicial
app.get('/calendario', (req, res) => {
    const html = renderHTML(path.join(__dirname, 'public/dashboard', 'calendario.html'));
    if (html) {
        res.send(html);
    } else {
        res.status(500).send('Error loading the login page.');
    }
});

//DashBoard Inicial
app.get('/financeiro', (req, res) => {
    const html = renderHTML(path.join(__dirname, 'public/dashboard', 'financeiro.html'));
    if (html) {
        res.send(html);
    } else {
        res.status(500).send('Error loading the login page.');
    }
});

//DashBoard Inicial
app.get('/doacoes', (req, res) => {
    const html = renderHTML(path.join(__dirname, 'public/dashboard', 'doacoes.html'));
    if (html) {
        res.send(html);
    } else {
        res.status(500).send('Error loading the login page.');
    }
});

//DashBoard Inicial
app.get('/relatorio', (req, res) => {
    const html = renderHTML(path.join(__dirname, 'public/dashboard', 'relatorio_export.html'));
    if (html) {
        res.send(html);
    } else {
        res.status(500).send('Error loading the login page.');
    }
});

//DashBoard Inicial
app.get('/home-beneficiado', (req, res) => {
    const html = renderHTML(path.join(__dirname, 'public', 'pedido_requisicao.html'));
    if (html) {
        res.send(html);
    } else {
        res.status(500).send('Error loading the login page.');
    }
});

//DashBoard Inicial
app.get('/pedidos', (req, res) => {
    const html = renderHTML(path.join(__dirname, 'public/dashboard', 'pedidos_acompanhar.html'));
    if (html) {
        res.send(html);
    } else {
        res.status(500).send('Error loading the login page.');
    }
});

//DashBoard Inicial
app.get('/historico', (req, res) => {
    const html = renderHTML(path.join(__dirname, 'public/dashboard', 'historico_doacoes.html'));
    if (html) {
        res.send(html);
    } else {
        res.status(500).send('Error loading the login page.');
    }
});

// Start the server using HTTP and integrate Ngrok
const server = http.createServer(app);

if(process.env.AMBIENTE_PROCESSO == 'producao'){

const NGROK_DOMAIN = process.env.NGROK_DOMAIN;

    server.listen(PORTA_APP, () => {
        console.log(`
        ---------------------------------------------------------
        Servidor do seu site já está rodando! Acesse: http://${HOST_APP}:${PORTA_APP}
        Ambiente: ${process.env.AMBIENTE_PROCESSO}
        Base URL: ${BASE_URL}
        ---------------------------------------------------------
        Para alterar o ambiente, comente ou descomente as linhas 7 ou 8 no arquivo 'app.js'.
        `);

        ngrok.connect({
            addr: PORTA_APP, 
            authtoken: NGROK_AUTH_TOKEN, // Utilizando o token da sua conta
            domain: NGROK_DOMAIN // O domínio estático que você reservou
        })
        .then((listener) => {
            console.log(`Ingress established at: ${listener.url()}`);
        })
        .catch(err => console.error('Ngrok error:', err));
    });
}else{
    server.listen(PORTA_APP, () => {
    console.log(`
    ---------------------------------------------------------
    Servidor do seu site já está rodando! Acesse: http://${HOST_APP}:${PORTA_APP}
    Ambiente: ${process.env.AMBIENTE_PROCESSO}
    Base URL: ${BASE_URL}
    ---------------------------------------------------------
    Para alterar o ambiente, comente ou descomente as linhas 7 ou 8 no arquivo 'app.js'.
    `);
    // Establish Ngrok connection
    ngrok.connect({ addr: PORTA_APP,  authtoken: NGROK_AUTH_TOKEN })
        .then((listener) => console.log(`Ingress established at: ${listener.url()}`))
        .catch(err => console.error('Ngrok error:', err));  
    });

}