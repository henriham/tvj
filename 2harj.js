/* async_send_data funktio tässä alussa
tuo datan näkyville SQL kyselyn mukaisesti
PHP puolelta if lauseesta jossa "read" ehto
Sitä voi esim käyttää sivun alussa luomaan oletusnäkymän */

async_send_data({}, 'tableupdate')



async function async_send_data(obj, type) {
    const formData = new FormData();
    for(const key in obj) {
        formData.append(key, obj[key]);
    }
    formData.append('data_type', type);

    try {
        const response = await fetch('1harj.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('error');
        }

        const result = await response.text();
        console.log(result)
        handle_async_result(result);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function handle_async_result(result) {
    /* 
    obj.data_type on objektin informaatio joka suorittaa 1harj.php
    tiedoston if lausekkeen jossa on sama data_type.
    Tällä esim voi tehdä tietokantahakuja taulukkoon,
    siirtää formdataa tietokantaan ja varmasti muutakin
    */
    //console.log(result);
    
    //print.innerHTML += result
    const obj = JSON.parse(result);
    //eli koska sivun alussa funktiota kutsutaan,
    // PHP tiedostossa 'read' tapahtuu aina
    //  !! ELI TÄMÄ IF LAUSE TOTEUTUU MYÖS AINA
    if(obj.data_type === 'createBtn' ||obj.data_type === 'delBtn' || obj.data_type === 'tableupdate'){
        //console.log("datatyyppi on read123123")
        let tbody = document.querySelector("#table")
        let str = ""
        if(obj.data.length > 0){
            for(let key in obj.data){
           // for(let i=0; i< obj.data.length; i++){
                let row = obj.data[key]
                //console.log(row)
                str += `<tr>
                            <td>${row.text}</td>
                            
                        </tr>`
            }
        }   tbody.innerHTML = str

    }// tähän listäty kaikki datatyypit, jotta napit latautuvat näiden tapahtumien koittaessa
    if(obj.data_type === 'createBtn' ||obj.data_type === 'delBtn' || 'tableupdate' ){
        let buttonArea = document.querySelector('#buttonArea')
        let btn = ""
        if(obj.data.length > 0){
            for(let key in obj.data){
                let row = obj.data[key]
                btn += `<div class="col-sm pb-2"><button type="button" onclick="counterBtn(${row.id})" id="${row.id}" class="btn btn-primary">${row.text}</button></div>`
            }
        }   buttonArea.innerHTML = btn 
    }
}
/* Luodaan funktio joka toteutuessaan ottaa tekstit kentästä 
ja lähettää ne sql taulukkoon. PHP triggeroituu 'createBtn' datatyypistä */
function createBtn(){
    let text = document.querySelector('#btnText').value
    if(text.length < 1){
        alert("Lisää teksti !")
    }else{
        
        async_send_data({text:text},'createBtn')
        
        
    }
    
    document.querySelector('#btnText').value =""
    


}


function delBtn(){
    let delBtn = document.querySelector('#delBtn')
        async_send_data({}, 'delBtn')
}

function counterBtn(id){
    console.log("teksti funktion data: " + typeof(id))
    let texti = JSON.stringify(id)
    console.log("teksti funktion data: " + texti)
    
    

    async_send_data({id}, 'counterBtn')
}



