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
            console.log("logataanorder")
            let menustr = "";
            if(typeof obj.data === 'object' && obj.data.length > 0){
                for(let i = 0; i < obj.data.length; i++){
                    let row = obj.data[i]
                    menustr += `<h4>${row.name}</h4>` // sql haun perusteella lätkästään nimi
                }
            document.querySelector('#js-text-area').innerHTML = menustr  
            }
        }// setti toimii, pitää vain tehdä oikeat tablet jne..
    }



}
/// nappi funktio(t)

function orderItem(id){
    send_data({id:id},'order')// tämä lisää nyt testi tableen infoa!
    
}
