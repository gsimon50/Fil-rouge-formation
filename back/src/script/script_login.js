const NoLogin = document.getElementById('NoLogin');
console.log(NoLogin);

console.log(NoLogin.getAttribute('data-value'));

NoLogin.addEventListener("click", changeLoginRegister)

function changeLoginRegister(){
    const title = document.getElementById('title');
    const formulaire = document.getElementById('formulaire_connexion');
    
    if(NoLogin.getAttribute('data-value') == "GoToRegister") {
        title.innerHTML = "Inscription";
        formulaire.setAttribute("action", "/register");
        NoLogin.innerHTML = "Vous avez déjà un compte ?";
        NoLogin.setAttribute("data-value","GoToLogin");
    } else {
        title.innerHTML = "Connexion";
        formulaire.setAttribute("action", "/login");
        NoLogin.innerHTML = "Vous n'avez toujours pas de compte ?";
        NoLogin.setAttribute("data-value","GoToRegister");
    }



}

