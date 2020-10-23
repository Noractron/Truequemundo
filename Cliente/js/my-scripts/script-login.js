function hideShowLogin(){
    document.getElementById("formSignup").classList.remove("d-flex");
    document.getElementById("formSignup").classList.add("d-none");
    document.getElementById("formLogin").classList.remove("d-none");
    document.getElementById("formLogin").classList.add("d-flex");
}

function hideShowSignUp(){
    document.getElementById("formSignup").classList.add("d-flex");
    document.getElementById("formLogin").classList.remove("d-flex");
    document.getElementById("formLogin").classList.add("d-none");
}

