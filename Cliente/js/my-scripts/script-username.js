//START Obtain values email and name
let paramstr = window.location.search.substr(1);
let paramarr = paramstr.split("&");
let values = {};

for (let i = 0; i < paramarr.length; i++) {
    let tmparr = paramarr[i].split("=");
    values[tmparr[0]] = tmparr[1];
}

const dataEmail = values['email'];
let dataName = values['name'].split ("%20");
dataName = dataName[0];
//END Obtain values

const ddUsername = document.getElementById('userDropdown');

ddUsername.innerHTML = `${dataName} <i class="fas fa-user-circle"></i>`;