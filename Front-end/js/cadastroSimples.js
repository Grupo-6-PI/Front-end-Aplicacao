
  async function submitForm() {

    let nomeUser = document.getElementById("nome").value;
    let emailUser = document.getElementById("email").value;
    let senhaUser = document.getElementById("senha").value;
      
    if (validarEmail(emailUser) && validarSenha(senhaUser)) {

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
        window.location.href = './index.html'
      
      }else{
        console.log("Deu ruim")
      }
        
    }

  }


  function validarEmail(email) {
    
    if (email.indexOf("@") != -1 && email.indexOf(".") != -1) {
    
      return true;
    
    } else {
    
      return false;
    
    }
  
  }

  function validarSenha(senha) {
  
    if (senha.length < 8) {
  
      return false;
  
    } else {
  
      return true;
  
    }
  
  }