
async function submitForm() {

  var usuarioSimples = sessionStorage.getItem("USUARIO_SIMPLES")
      
  if (validateForm(nomeUser,emailUser,senhaUser)) {
      
    let requisicao = await fetch("http://localhost:8080/usuarios/cadastro",{
      
      method: 'POST',
      headers: {"Content-type":"application/json; charset=UTF-8"},
      body: JSON.stringify(usuario),
    
    });
      
    if(requisicao.ok){

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
