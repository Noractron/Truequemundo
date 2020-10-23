const btnSignup = document.getElementById('btnSubmitSignup');

btnSignup.addEventListener('click', submitDataSignup);

async function submitDataSignup(){
    const firstName = document.getElementById('frmFirstName');
    const lastName = document.getElementById('frmLastName');
    const email = document.getElementById('frmEmail');
    const password = document.getElementById('frmPassword');

    const validation = validateFields(firstName.value, lastName.value, email.value, password.value);

    if(validation == 'ok'){
        const url = 'https://localhost:3000/events/new_usuario';

        const dataDetails = {
            method: 'POST',
            body: JSON.stringify({
            "nombre": firstName.value,
            "apellido": lastName.value,
            "email": email.value,
            "password": password.value
            }),
            headers:{
                'Content-Type': 'application/json',
            }
            };     

            console.log(dataDetails);

            const response = await fetch(url, dataDetails);
            console.log(response);
            
            const data = await response.text();
            console.log(data);

            alert("El usuario ha sido creado");
            setTimeout(10000);
            window.location.href = "./index.html";
    }
    else{
        alert('Los espacios no pueden estar en blanco');
    }
}

function validateFields(fName, lName, email, pass){
    if(fName=='' || lName=='' || email=='' || pass=='')
        return 'error';
    else
        return 'ok';
}
