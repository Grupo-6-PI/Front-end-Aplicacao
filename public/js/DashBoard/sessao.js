function validarSessao() {
    var email = sessionStorage.EMAIL_USER;
    var nome = sessionStorage.NOME_USER;

    var b_usuario = document.getElementById("nameUser");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location.href = "/login";
    }
}