    // AVAA MODALIN NAPISTA "add new user"
    
    const addModal = new bootstrap.Modal('#add-new-modal', {});
    const editModal = new bootstrap.Modal('#edit-new-modal', {});
    

    




    send_data({},"read");

    function send_data(obj, type){
    
    var form = new FormData();
    for(key in obj){
        form.append(key, obj[key]);        
    }
    form.append('data_type', type);
    var ajax = new XMLHttpRequest();
    
    //readystatechange kuuntelee XMLHttpRequestiä, sillä 4 stagea.(4 = kaikkivalmista)
    ajax.addEventListener('readystatechange', function(){
        
        if(ajax.readyState == 4){
            // 200 tarkoittaa serverin vastausta
            if(ajax.status == 200){
                handle_result(ajax.responseText); 
            }else{
                alert("error");
            }
        }
    });
    // true lisätään loppuun, koska jos false, ui jää odottamaan
    ajax.open('post','apiKayttajat.php', true);
    ajax.send(form);
    
}

function handle_result(result){
    console.log(result);
    
    var obj = JSON.parse(result);
    if(typeof obj == 'object'){
        if(obj.data_type == 'read'){
            let tbody = document.querySelector(".js-table-body");
            let str = "";

            if(typeof obj.data == 'object'){
                for(var i = 0; i < obj.data.length; i++){
                    let row = obj.data[i];
                    str += `<tr><td>${row.username}</td><td>${row.password}</td><td>${row.rooli}</td>
                    <td>
                        <button onclick="get_edit_row(${row.id}); editModal.show()" class="btn btn-primary btn-sm">Muokkaa</button>
                        <button onclick="delete_row(${row.id}, '${row.username}')" class="btn btn-danger btn-sm">Poista</button>
                    </td>    
                    </tr>`;
                }

                

            }else{
                str = "<tr><td>no records found!</td></tr>";
            }

            tbody.innerHTML = str;
        }else
        if(obj.data_type == 'save')
        {
            //alert(obj.data);
            send_data({},"read");
        }
        else
        if(obj.data_type == 'edit')
        {
            //alert(obj.data);
            send_data({},"read");
        }

        else
        if(obj.data_type == 'delete')
        {
            //alert(obj.data);
            send_data({},"read");
        }
        else
        if(obj.data_type == 'get-edit-row')
        {
            let row = obj.data;

            if(typeof row == 'object')
            {

            
            let myModal = document.querySelector("#edit-new-modal");
                for(key in row)
                {
                    let input = myModal.querySelector("#"+key);
                    if(input != null)
                    {
                        input.value = row[key];
                    }
                }
            }
        }
    }
}



// funktio add new user ja modaalin sulku, se kerää formin areat.
function add_new(e){
        e.preventDefault();
        let obj = {};
        let inputs = e.currentTarget.querySelectorAll("input,select,textarea");

        for (let i=0; i < inputs.length; i++){

            obj[inputs[i].id] = inputs[i].value;
            inputs[i].value = "";// puhdistaa pois vanha value
        }

        send_data(obj,'save');
        
        addModal.hide();
    }

    function edit_row(e){
        e.preventDefault();
        let obj = {};
        let inputs = e.currentTarget.querySelectorAll("input,select,textarea");

        for (let i=0; i < inputs.length; i++){

            obj[inputs[i].id] = inputs[i].value;
            //inputs[i].value = "";// puhdistaa pois vanha value
        }

        send_data(obj,'edit');
        
        editModal.hide();
    }





    function delete_row(id, username)
    {

        if(!confirm("Poistetaanko käyttäjä "+username+"?"))
        {
            return;
        }
        send_data({id:id},'delete');
    }


    function get_edit_row(id)
    {
        send_data({id:id},'get-edit-row');
    }