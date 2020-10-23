const cantItems = 15;
let cont = 0;
let HTMLString = [];
let cTot = 0;
let cPar = 0;

const searcher = document.getElementById('btnSearcher');

btnSearcher.addEventListener('click', searcherGet);

async function searcherGet(){
    const texto = document.getElementById('txtSearcher');
    const country = document.getElementById('countrySearcher');
    const city = document.getElementById('citySearcher');
    const sectPrincipal = document.getElementById('sectionPrincipal');
    sectPrincipal.innerHTML = "";
    cont = 0;
    cTot = 0, cPar=0;

    const urlBase = 'https://truequeprueba.herokuapp.com/';
    const url = urlBase + 'events/all';
    
    const dataDetails = {
        method: 'POST',
        body: JSON.stringify({
        "pais": country.value,
        "ciudad": city.value,
        "nombreProducto": texto.value
        }),
        headers:{
            'Content-Type': 'application/json'
          }
    }

    // console.log(dataDetails.body)

    const response = await fetch(url, dataDetails);
    // console.log(response);
        
    const data = await response.json();
    console.log(data);

    function itemTemplate(it){
        const urlFotos = 'https://localhost:3000/Public/uploads/';
        cont++;
        return (`<article class="card">
        <div class="card-body">
            <h5 class="card-title">${it.nombreProducto}</h5>
            <p class="card-text" style="height: 100px;">${it.descripcion}</p>
            <div class="d-flex flex-row justify-content-center mb-3">
                <a href="#modalProduct${cont}" class="btn btn-primary btn-bkg" data-toggle="modal">Contact to truequer</a>
                <!--START modalProduct-->
                <div class="modal fade" tabindex="-1" role="dialog" id="modalProduct${cont}">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">${it.nombreProducto}</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body d-flex flex-column align-items-center">
                            <img src="${urlFotos}${it.fotos[0]}" alt="" class="mb-3" width=400>
                            <p>${it.descripcion}</p>
                        </div>
                        <div class="modal-footer">
                            <!-- <div><h3 class="text-primary">Contactar</h3></div> -->
                            <div class="anchor d-flex flex-row justify-content-center">
                                <a href="mailto:${it.email}" class="btn btn-info mr-1 btn-contact">Email</a>
                                <a href="https://wa.me/51${it.celular}?text=Me%20gustar%C3%ADa%20obtener%20tu%20servicio" target="_blank" class="btn btn-success ml-1 btn-contact">Whatsapp</a>        
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
                <!--modalProduct-->
            </div>
        </div>
    </article>`)
    }

    data.forEach((item) => {
        HTMLString[cTot] = itemTemplate(item);
        if(cTot<cantItems){
            sectPrincipal.innerHTML = sectPrincipal.innerHTML + HTMLString[cTot];
            cPar = cTot;
        }
        
        cTot++;
    })
}

const btnMore = document.getElementById('btnWatchMore');

btnMore.addEventListener('click', loadMoreProducts);

function loadMoreProducts(){
    const sectPrincipal = document.getElementById('sectionPrincipal');
    let i=0;

    if(cTot - 1 == cPar)
        cTot--;

    if(cPar == cTot){
        alert("No more items!!!");
    }   
    else{
        while(cPar<cTot){
            if(i<cantItems){
                sectPrincipal.innerHTML = sectPrincipal.innerHTML + HTMLString[cPar+i];
                i++;
                cPar++;
            }
        }
    }
}