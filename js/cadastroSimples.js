
async function submitForm() {

  let nomeUser = document.getElementById("nome").value;
  let emailUser = document.getElementById("email").value;
  let senhaUser = document.getElementById("senha").value;
      
  if (validateForm(nomeUser,emailUser,senhaUser)) {

    let usuario = {
      "nome": nomeUser,
      "email": emailUser,
      "senha": senhaUser
    }
      
    let requisicao = await fetch("http://localhost:8080/usuarios/cadastro",{
      
      method: 'POST',
      headers: {"Content-type":"application/json; charset=UTF-8"},
      body: JSON.stringify(usuario),
    
    });
      
    if(requisicao.ok){

      window.location.href = './login.html'
      
    }else{
      
      console.log("Deu ruim")
    
    }
        
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
