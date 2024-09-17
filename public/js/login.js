async function Login() {

  let emailUser = document.getElementById("email").value;
  let senhaUser = document.getElementById("senha").value;

  if (validarEmail(emailUser) && validarSenha(senhaUser)) {

    try {

      console.log(window.BASE_URL)

      let requisicao = await axios.post(`${window.BASE_URL}/autenticacao/login`,{
        email: emailUser,
        senha: senhaUser
      })

      let dados = requisicao.data;

      sessionStorage.setItem('ID_USER',dados.id);
      sessionStorage.setItem('NOME_USER',dados.nome);
      sessionStorage.setItem('EMAIL_USER',dados.email);
                
      window.location.href = '/home'

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

  try {

    await axios.post(`${window.BASE_URL}/autenticacao/logoff/${id}`)
              
    window.location.href = '/'

  } catch (error) {
    console.log(error)
  }

}
