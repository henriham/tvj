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
            throw new Error('error');
        }

        const result = await response.text();
        handle_async_result(result);
    } catch (error) {
        console.error('Ongelma haussa:', error);
    }
}

function handle_async_result(result) {
    console.log("tämä on funktio async_handle_result"+ result);
    const obj = JSON.parse(result);
    // Handle the result as needed
    if(obj.data_type === 'order' ||obj.data_type === 'minus'){
        let buttonArea = document.querySelector('#js-text-area')
        let btn = ""
        
        if(obj.data.length > 0){
            for(let key in obj.data){
                let row = obj.data[key]
                btn += `<tr id ="${row.name}">
                <td>${row.name}</td>
                <td>x</td>
                <td id="td_${row.name}">${row.name_count}</td>
                <td><button type="button"  onclick="deleteRow(${row.id}, 'td_${row.name}' )" class="btn btn-danger btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg></button></td>
                <tr>` 
            }
        }buttonArea.innerHTML += btn 
    }
    if(obj.data_type == 'receipt'){
        let newTab = window.open()
        console.log("logataan kuitti if sisältä1:"+ result)
        
        let tuotestr =""
        
        kuitti = JSON.parse(result)
        if(kuitti.data.length > 0){
            const numberOfArr = kuitti.data.length
            //console.log(`there are ${numberOfArr}`)
        }       for(let key in kuitti.data){
            //console.log(key + " : " + JSON.stringify(kuitti['data'][key]))
            
            //console.log(kuitti.data)
                    console.log(kuitti.data[key].name +" x "+ kuitti.data[key].name_count )
                    
                    var nameKuitti = kuitti.data[key].name
                    var nameCountKuitti = kuitti.data[key].name_count
                    var pvmKuitti = kuitti.data[key].pvm
                    var nameNimiKuitti = kuitti.data[key].nimi
                    var asinfoKuitti = kuitti.data[key].asinfo

                    tuotestr += `${kuitti.data[key].name} x ${kuitti.data[key].name_count} <br>`
                    

                }
        
                newTab.document.write(`
                <div style="text-align: center;">
                    <div style="display: inline-block; padding: 20px; ; ">
                        
                    <div style="font-family: monospace;
                        white-space: pre; text-align:end">             
                [[[[[[]]]]]]  (((       )))      {}|
                    [[]]       (((     )))       {}|
                    [[]]        ((     ))        {}|
                    [[]]         ((   ))     {}  {}|
                    [[]]          ((_))      {}{}{}|
                        <div>
                    <h2>Tilaustiedot: ${asinfoKuitti}</h2>
                    <h2>Teitä palveli: ${nameNimiKuitti}</h2>
                    <h2>PVM: ${pvmKuitti}</h2>
                    <h2>Tilatut tuotteet:</h2>
                    <h1>${tuotestr}</h1>


                    
                        
                    </div>
                    
                </div>














                `)
        
                console.log("CONSOLECONSOSEF"+nameKuitti,nameCountKuitti, pvmKuitti, nameNimiKuitti,  asinfoKuitti)
        
        
        
        let receiptStr = "";
        /* newTab.document.write(`<div align="center">
        <div id="receipt" class="container mx-auto" style="width:400px;" align="center">
        <h1>alibaba</h1>
        </div></div>
        `) */
        
        
        
    }   
}












function handle_result(result){
    
    console.log("tämä on funktio handle_result"+ result)
    
    
    const obj = JSON.parse(result);
    
        if(obj.data_type === 'read'){// jos obj datatyyppi on read suoritetaan
            
            let buttonstr = "";
            
            
            //data sisältää tietokannan tiedot
            if(typeof obj.data === 'object' && obj.data.length > 0){
                for(let i = 0; i < obj.data.length; i++){
                    let row = obj.data[i]; // rivi dataa
                    
                    buttonstr += `<div class="col-sm">
                    <button name="btnstr" type="button" id="${row.id}" onclick="orderItem(id=${row.id})" class="btn btn-primary btn-lg" style="width: 200px; height: 150px; margin-bottom:20px;" mt-3>${row.name}</button></div>`

                    

                    
                   // `<button onclick="minusProduct(${row.tuoteid})" class="btn btn-warning btn-sm">-</button>`
                }
            }else{
                buttonstr = "<tr><td>ei tietoja</td></tr>"
            }
            document.querySelector('#js-menu').innerHTML = buttonstr;
            
            

        

        /*      Tämä osa kontrolloi tablen päivitystä riippuen
                datatyypistä               */

            
        }
        /*"ei vaikuta toimintaan"  if(obj.data_type == 'minus'){
            send_data({},"read")
        } */
        
    
    



    
   /*  if(obj.data_type === 'order' || obj.data_type === 'minus'){            
        //console.log(tableinfo.value)
        
        
    
        let mbody = document.querySelector('#js-text-area')
        let menustr = "";
        for(let i = 0; i < obj.data.length; i++){
            
            let row = obj.data[i]
            
            menustr += `<tr id ="${row.name}">
            <td>${row.name}</td>
            <td>x</td>
            <td>${row.name_count}</td>
            <td><button type="button" onclick="deleteRow(${row.id})" class="btn btn-danger btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg></button></td>
            <tr>` 
            
        }
    
        mbody.innerHTML += menustr 
    
        
    }*/

    /* if(obj.data_type === 'order' ||obj.data_type === 'minus'){
        let buttonArea = document.querySelector('#js-text-area')
        let btn = ""
        if(obj.data.length > 0){
            for(let key in obj.data){
                let row = obj.data[key]
                btn += `<tr id ="${row.name}">
                <td>${row.name}</td>
                <td>x</td>
                <td>${row.name_count}</td>
                <td><button type="button" onclick="deleteRow(${row.id})" class="btn btn-danger btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg></button></td>
                <tr>` 
            }buttonArea.innerHTML = btn 
        }   
    } */
        
    
        
        
        
    
    
    /* if(obj.data_type === 'minus'){            
        //console.log(tableinfo.value)
        
        var menustr = "";
        if(typeof obj.data === 'object' && obj.data.length > 0){
            let mbody = document.querySelector('#js-text-area')
            for(let i = 0; i < obj.data.length; i++){
                
                let row = obj.data[i]
                
                menustr += `<tr id ="${row.name}">
                <td>${row.name}</td>
                <td>x</td>
                <td>${row.name_count}</td>
                <td><button type="button" onclick="deleteRow(${row.id})" class="btn btn-danger btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg></button></td>
                <tr>`
            }
        
            

            
            mbody.innerHTML += menustr

        }
        
    } */
        
    
        
        
        
    
    



}





/// nappi funktio(t)

//tämä nappi - tilaa - 
function getReceipt(){
    button = document.querySelector('#receiptBtn')
    let tableinfo = document.querySelector("#tableinfo").value;

    //window.open('apiTilaus.php', '_blank')

    async_send_data({tableinfo: tableinfo}, 'receipt')
}







function orderItem(id) {
    let tableinfo = document.querySelector("#tableinfo").value; // Get the value of tableinfo input

    // Check if tableinfo is empty
    if (tableinfo.length === 0) {
        alert("Lisää asiakasinfo!");
    } else {
        //send_data({ id: id, tableinfo: tableinfo }, 'order');
        async_send_data({ id: id, tableinfo: tableinfo }, 'order');
    }
}



    

function deleteRow(id,name){
    let tableinfo = document.querySelector("#tableinfo").value;
    let row = document.getElementById(name).textContent;
    let numba = Number(row)-1
    if(numba > 0){
        document.getElementById(name).innerHTML = numba
    }else{
        document.getElementById(name).parentElement.remove() 
    }
    
    
    async_send_data({id:id, tableinfo: tableinfo},'minus')

    //alert("tämä on"+id)
    
}





