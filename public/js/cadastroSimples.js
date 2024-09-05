
const ambiente_processo = require('../../ambiente');

async function submitForm() {

  let nomeUser = document.getElementById("nome").value;
  let emailUser = document.getElementById("email").value;
  let senhaUser = document.getElementById("senha").value;
      
  if (validateForm(nomeUser,emailUser,senhaUser)) {

    let baseURL = ambiente_processo.ambiente_processo === 'producao' 
    ? 'https://daring-bat-mostly.ngrok-free.app/'
    : 'http://localhost:8080';
      
    let requisicao = await axios.post(`${baseURL}/usuarios/cadastro`,{
      nome:nomeUser.toString(),
      email:emailUser.toString(),
      senha:senhaUser.toString()
    })
      
    if(requisicao.status == 201){

      var new_user = await requisicao.data

      window.location.href = './login.html'
      
    }else{
      
      console.log("Codigo Erro:" + requisicao.status + "Mensagem de Erro"  + requisicao.statusText)
    
    }
        
  }else{

    console.log("Codigo Erro:" + 400 + "Mensagem de Erro: informação erra/insuficiente")

  }

}

function validateForm(nome,email,senha) {

  if (nome === "" || email === "" || senha === "") {
    
    alert("Todos os campos devem ser preenchidos!");
    return false;
  
  }

  if (email.indexOf('@') === -1) {
    
    alert("Por favor, insira um email válido!");
    return false;
  
  }

  if (senha.length <= 5) {
    
    alert("A senha deve ter mais que 5 caracteres!");
    return false;
  
  }

  return true;

}
