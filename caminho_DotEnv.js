var ambiente_processo = require('./ambiente')

var caminho_env = ambiente_processo.ambiente_processo === 'producao' ? '.env' : '.env.dev';

exports.caminho_env = caminho_env
