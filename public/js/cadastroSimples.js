
async function submitForm() {

  let nomeUser = document.getElementById("nome").value;
  let emailUser = document.getElementById("email").value;
  let senhaUser = document.getElementById("senha").value;
      
  if (validateForm(nomeUser,emailUser,senhaUser)) {
      
    let requisicao = await axios.post(`${window.BASE_URL}/usuarios/cadastro`,{
      nome:nomeUser.toString(),
      email:emailUser.toString(),
      senha:senhaUser.toString()
    })
      
    if(requisicao.status == 201){

      window.location.href = '/login'
      
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
