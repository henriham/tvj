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

    ajax.open('post', 'apiTilaus.php', true); // ajax open metodi avaa post pyynnöt, sitten lisätään tiedosto jossa käsitellään, ilman true:a tämä setti ei toimi taustalla, eli ui voi jäätyä
    ajax.send(form); // form sisältää datan ja sen tyypin, nyt se lähetetään
};


async function async_send_data(obj, type) {
    const formData = new FormData();
    for (const key in obj) {
        formData.append(key, obj[key]);
    }
    formData.append('data_type', type);

    try {
        const response = await fetch('apiTilaus.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.text();
        handle_async_result(result);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function handle_async_result(result) {
    console.log(result);
    const obj = JSON.parse(result);
    // Handle the result as needed
}












function handle_result(result){
    
    console.log(result)
    const obj = JSON.parse(result);
    if(typeof obj === 'object'){//jos obj on objekti suoritetaan
        if(obj.data_type === 'read'){// jos obj datatyyppi on read suoritetaan
            
            let buttonstr = "";
            
            
            //data sisältää tietokannan tiedot
            if(typeof obj.data === 'object' && obj.data.length > 0){
                for(let i = 0; i < obj.data.length; i++){
                    let row = obj.data[i]; // rivi dataa
                    
                    buttonstr += `<div class="col-sm">
                    <button type="button" id=${row.id} onclick="orderItem(id=${row.id})" class="btn btn-primary btn-lg" style="width: 200px; height: 150px; margin-bottom:20px;" mt-3>${row.name}</button></div>`

                    

                    
                   // `<button onclick="minusProduct(${row.tuoteid})" class="btn btn-warning btn-sm">-</button>`
                }
            }else{
                buttonstr = "<tr><td>ei tietoja</td></tr>"
            }
            document.querySelector('#js-menu').innerHTML = buttonstr;
            
            

        /*      Tämä osa kontrolloi tablen päivitystä riippuen
                datatyypistä               */

            
        }
        
    }
    if(typeof obj === 'object'){
        if(obj.data_type === 'order'){
            
            console.log(tableinfo.value)
            let menustr = "";
            if(typeof obj.data === 'object' && obj.data.length > 0){
                for(let i = 0; i < obj.data.length; i++){
                    let row = obj.data[i]
                    menustr += `<h5>${row.name} x ${row.name_count}  <button  class="btn btn-danger btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg></button><h5>` // sql haun perusteella lätkästään nimi
                }
            document.querySelector('#js-text-area').innerHTML += menustr  
            }
            
        }// setti toimii, pitää vain tehdä oikeat tablet jne..
    }



}





/// nappi funktio(t)

function orderItem(id){
    const tableinfo = document.querySelector("#tableinfo").value // tableinfo inputin value
    send_data({id:id, tableinfo: tableinfo},'order')// tämä lisää nyt testi tableen infoa!
    //async_send_data({ id: id, tableinfo: tableinfo }, 'order');
    
}
