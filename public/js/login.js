

async function Login() {

  let emailUser = document.getElementById("email").value;
  let senhaUser = document.getElementById("senha").value;

  if (validarEmail(emailUser) && validarSenha(senhaUser)) {

    try {

      let requisicao = await axios.post('http://localhost:8080/autenticacao/login',{
        email: emailUser,
        senha: senhaUser
      })

      let dados = requisicao.data;

      sessionStorage.setItem('ID_USER',dados.id);
      sessionStorage.setItem('NOME_USER',dados.nome);
      sessionStorage.setItem('EMAIL_USER',dados.email);
                
      window.location.href = './dash-requisicoes.html'

    } catch (error) {
      console.log(error)
    }

  }

}

function validarEmail(email) {
  
  if (email.indexOf("@") != -1 && email.indexOf(".") != -1){
    
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

async function Logout(id) {

  if (id != null) {

    let requisicao = await fetch(`http://localhost:8080/autenticacao/logoff/${id}`,{
      method: 'POST',
      headers: {"Content-type":"application/json; charset=UTF-8"}
    });

    if(requisicao.status == 204){
                
      window.location.href = './index.html'
        
    }else{

      console.log("Codigo Erro:" + requisicao.status + "Mensagem de Erro"  + requisicao.statusText)

    }
    
  }

}
