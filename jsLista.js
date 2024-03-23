//  TÄMÄ TIEDOSTO VASTAA tilaus sivun generoituvasta tuotelistasta


// funktio hakee SQL taulukon JSON muodossa
async function menuTable(){
    async function fetchTableData(){
        const resp = await fetch('apiLista.php', {
            method: 'POST',
        })
        const data = await resp.json()
        return data
    }

    let oldData = null;

    // funktio vertaa vanhaa ja uutta taulukkodataa
    function hasTableChanged(newData){
        if(!oldData || JSON.stringify(oldData) !== JSON.stringify(newData)){
            oldData = newData
            return true
        }
        return false
    }  
    
    function printMenu(data){
        const menu = document.getElementById('js-text-area')
        if(!menu) return
        let html = ""

        data.forEach(row =>{
            html += '<tr>'
            Object.values(row).forEach(value => {
                html += `<td>${value}</td>`
            })
            html += '</tr>'
        })
        html += '</table>'
        menu.innerHTML = html
    }

    function handleBtn(event){
        fetchTableData().then(newData =>{
            if(hasTableChanged(newData)){
                console.log("data muuttunut")
            }
        }).catch(error => {
            console.error("virheellistä dataa", error)
        })
    }
    
    const buttons = document.querySelectorAll('button[name="btnstr"]');
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick)
    })

}

menuTable()