function cadastroComplementar2() {
  
  let json = JSON.parse(sessionStorage.getItem("JSON"))

  let cpf = document.getElementById("cpf").value

  json.usuario.informacoesAdicionais.cpf = cpf.replace(/[.-]/g, '')

  let data = document.getElementById("date").value
  
  json.usuario.informacoesAdicionais.dataNascimento = data

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  console.log(today)

  json.usuario.informacoesAdicionais.dataCriacao = today.toISOString();
  json.usuario.informacoesAdicionais.dataUltimaAtualizacao = today.toISOString();

  json.usuario.informacoesAdicionais.familia.dataCriacao = today.toISOString();
  json.usuario.informacoesAdicionais.familia.dataUltimaAtualizacao = today.toISOString();

  json.usuario.contato.dataCriacao = today.toISOString();
  json.usuario.contato.dataUltimaAtualizacao = today.toISOString();

  let cep = document.getElementById("cep").value
  let logradouro = document.getElementById("logradouro").value
  let numero = document.getElementById("numero").value
  
  json.usuario.informacoesAdicionais.endereco.cep = cep.replace(/[.-]/g, '')
  json.usuario.informacoesAdicionais.endereco.numero = numero
  json.usuario.informacoesAdicionais.endereco.logradouro = logradouro

  let cidade = parseInt(document.getElementById("Cidade").value)
  let bairro = parseInt(document.getElementById("Bairro").value)

  json.usuario.informacoesAdicionais.endereco.bairro.id = bairro
  json.usuario.informacoesAdicionais.endereco.bairro.cidade.id = cidade

  var JSONNOVO = JSON.stringify(json)

  sessionStorage.setItem("JSON",JSONNOVO)

  window.location.href = '/cadastro-complementar-parte-2'

}

function cadastroComplementar3(){

  let json = JSON.parse(sessionStorage.getItem("JSON"))

  var numero = document.getElementById("telefone").value

  json.usuario.contato.informacoesContato = numero

  let dependentes = document.querySelectorAll(".dependente");

  dependentes.forEach((dependente) => {

    let dataNascimento = dependente.querySelector("input[name='dataNascimento[]']").value;
    let deficiencia = dependente.querySelector("select[name='deficiencia[]']").value;
    let tamanhoCalcado = dependente.querySelector("input[name='tamanhoCalçado[]']").value;
    let tamanhoRoupa = dependente.querySelector("input[name='tamanhoRoupa[]']").value;
    
    json.dependentes.push({
      "dataNascimento": dataNascimento,
      "deficiente": deficiencia,
      "tamanhoRoupa": {
        "tamanho": tamanhoRoupa
      },
      "tamanhoCalcado": {
        "tamanho": tamanhoCalcado
      },
      "situacao": {
        "id": 1
      }
    });

  });

  var JSONNOVO = JSON.stringify(json)

  sessionStorage.setItem("JSON",JSONNOVO)

  cadastrar()
  
}

async function cadastrar() {
  try{

    let json = JSON.parse(sessionStorage.getItem("JSON"))
  
    console.log(JSON.stringify(json.dependentes))
  
    let requisicao = await axios.post(`${window.BASE_URL}/usuarios/completo/cadastro`,{
      "usuario": {
        "nome": json.usuario.nome,
        "email": json.usuario.email,
        "senha": json.usuario.senha,
        "informacoesAdicionais": {
            "cpf": json.usuario.informacoesAdicionais.cpf,
            "dataNascimento": json.usuario.informacoesAdicionais.dataNascimento,
            "endereco": {
                "logradouro": json.usuario.informacoesAdicionais.endereco.logradouro,
                "numero": json.usuario.informacoesAdicionais.endereco.numero,
                "cep": json.usuario.informacoesAdicionais.endereco.cep,
                "bairro": {
                  "id": json.usuario.informacoesAdicionais.endereco.bairro.id,
                  "cidade": {
                    "id": json.usuario.informacoesAdicionais.endereco.bairro.cidade.id
                  }
                },
                "situacao": {
                  "id":json.usuario.informacoesAdicionais.endereco.situacao.id
                }
            },
            "familia": {
                "apelido": `Familia de ${json.usuario.nome}`,
                "quantidadePessoas": json.usuario.informacoesAdicionais.familia.quantidadePessoas,
                "rendaFamiliar": {
                    "renda": json.usuario.informacoesAdicionais.familia.rendaFamiliar.renda
                },
                "situacao": {
                    "id": json.usuario.informacoesAdicionais.familia.situacao.id
                },
                "dataCriacao": json.usuario.informacoesAdicionais.familia.dataCriacao,
                "dataUltimaAtualizacao": json.usuario.informacoesAdicionais.familia.dataUltimaAtualizacao,
                "emailModificador": json.usuario.informacoesAdicionais.familia.emailModificador
            },
            "identificador": null,
            "situacao": {
                "id": json.usuario.informacoesAdicionais.situacao.id
            },
            "dataCriacao": json.usuario.informacoesAdicionais.dataCriacao,
            "dataUltimaAtualizacao": json.usuario.informacoesAdicionais.dataUltimaAtualizacao,
            "emailModificador": json.usuario.informacoesAdicionais.emailModificador
        },
        "situacao": {
            "id": json.usuario.situacao.id
        },
        "nivelAcesso": {
            "id": json.usuario.nivelAcesso.id
        },
        "contato":{
            "informacoesContato":json.usuario.contato.informacoesContato,
            "dataCriacao":json.usuario.contato.dataCriacao,
            "dataUltimaAtualizacao":json.usuario.contato.dataUltimaAtualizacao,
            "emailModificador":json.usuario.contato.emailModificador,
            "tipoContato":{
              "id":json.usuario.contato.tipoContato.id
            }
        }
      },
      "dependentes": json.dependentes
    })
  
    if(requisicao.status == 201){
  
      sessionStorage.removeItem("JSON")
  
      window.location.href = '/login'
  
    }else{
  
      console.log(`Status: ${requisicao.status}`)
  
    }
  }catch (error){

      console.log(error)
  }

}

async function getBairros(){

    let cidades = document.getElementById("Bairro")

    let requisicao = await axios(`${window.BASE_URL}/usuarios/bairro`,{
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })

    let dado = await requisicao.data

    dado.map((bairro) => {

      cidades.innerHTML+=`<option value="${bairro.id}">${bairro.nome}</option>`

    })

}

async function getCidades(){

  let cidades = document.getElementById("Cidade")

  let requisicao = await axios(`${window.BASE_URL}/usuarios/cidades`,{
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
  })

  let dado = await requisicao.data

  dado.map((cidade) => {

    cidades.innerHTML+=`<option value="${cidade.id}">${cidade.nome}</option>`

  })

}

