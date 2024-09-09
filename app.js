
const caminho_env = require('./caminho_DotEnv')

require("dotenv").config({ path: caminho_env.caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.listen(PORTA_APP, function () {
    console.log(`                                                                                          
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar : http://${HOST_APP}:${PORTA_APP}\n
    Você está rodando sua aplicação em ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    Para alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n`);
});