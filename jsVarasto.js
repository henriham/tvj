
const addModal = new bootstrap.Modal('#add-new-modal', {});

//       -- DATAN KÄSITTELY JA LÄHETYS --  //
//https://www.youtube.com/watch?v=1jTT0Yb8_zE 1:07:00

send_data({}, 'read')

function send_data(obj, type){ //obj=itse data, type=datatyyppi esim.del,edit jne

    const form = new FormData(); // tämä vastaa html form:ia
    // obj sisältö lisätään form:iin for loopilla
    for(key in obj){
        form.append(key, obj[key]); //key - on inputin name, obj - sisältö
    }
    form.append('data_type', type);
    const ajax = new XMLHttpRequest();

    ajax.addEventListener('readystatechange', function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                handle_result(ajax.responseText);// tulos
            }else{
                alert("error tapahtui");
            }
        }
    }) // tämä kuuntelee readystatea joka on XMLHTTPRequestin tila, niitä on 4 kappaletta readystate: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState , ELI KUN readyState on 4 = DONE, tehdään vielä tarkastus ajax.status, joka katsoo tuleeko servupuolelta vastausta 200=ok

    ajax.open('post', 'apiVarasto.php', true); // ajax open metodi avaa post pyynnöt, sitten lisätään tiedosto jossa käsitellään, ilman true:a tämä setti ei toimi taustalla, eli ui voi jäätyä
    ajax.send(form); // form sisältää datan ja sen tyypin, nyt se lähetetään
};


//        ---  FUNKTIO JOKA VASTAA POSTIEN PÄIVITYKSESTÄ SIVULLE START  ---

function handle_result(result){
    
    console.log(result)
    const obj = JSON.parse(result);
    if(typeof obj === 'object'){//jos obj on objekti suoritetaan
        if(obj.data_type === 'read'){// jos obj datatyyppi on read suoritetaan
            let tbody = document.querySelector('.js-table-body');
            let str = "";
            //data sisältää tietokannan tiedot
            if(typeof obj.data === 'object' && obj.data.length > 0){
                for(let i = 0; i < obj.data.length; i++){
                    let row = obj.data[i]; // rivi dataa
                    
                    str += `<tr>
                    <td id="tn">${row.tuotenimi}</td>
                    <td>${row.varastopaikka}</td>
                    <td>${row.kpl}</td>
                    <td>
                        <button onclick="plusProduct(${row.tuoteid});" class="btn btn-primary btn-sm">+</button>

                        <button onclick="minusProduct(${row.tuoteid})" class="btn btn-warning btn-sm">-</button>

                        <button onclick="deleteProduct(${row.tuoteid}, '${row.tuotenimi}')" class="btn btn-danger btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg></button>
                    
                    </td>
                    </tr>`
                }
            }else{
                str = "<tr><td>ei tietoja</td></tr>"
            }
            tbody.innerHTML = str;

        /*      Tämä osa kontrolloi tablen päivitystä riippuen
                datatyypistä               */

        }else
            if(obj.data_type === 'plus' || obj.data_type === 'minus'){
                send_data({},"read")
            }

        else
            if(obj.data_type === 'delete'){
                send_data({},"read")
            }    
        
        else
            if(obj.data_type === 'save'){
                send_data({}, "read")
            }
        
        

        

        
    }
};
















//        ---  FUNKTIO JOKA VASTAA POSTIEN PÄIVITYKSESTÄ SIVULLE END TJSP  ---






//rivien muokkaus napit, toiminnot

function plusProduct(tuoteid){
    send_data({tuoteid:tuoteid},'plus')
    
}

function minusProduct(tuoteid){
    send_data({tuoteid:tuoteid},'minus')
}

function deleteProduct(tuoteid, tuotenimi){
    if(confirm(`Poistetaanko tuote: ${tuotenimi} ?`))
    send_data({tuoteid:tuoteid},'delete')
}
//rivien muokkaus napit, toiminnot

// modal ja form

function addProduct(event){
    event.preventDefault();
    let obj = {};
    let inputs = event.currentTarget.querySelectorAll("input,select,textarea");

    for (let i=0; i < inputs.length; i++){

        obj[inputs[i].id] = inputs[i].value;
        inputs[i].value = "";// puhdistaa pois vanha value
    }

    send_data(obj,'save');
    
    addModal.hide();
}
