<?php
include("conn_db.php");
include("functions.php");
function query($query){

    $res=false; # false sitä varten, että jos query ei anna tulosta
    if(!$con=mysqli_connect('localhost:3306', 'admin', 'admin', 'admin')){
        die("Ei yhteyttä tietokantaan!");
    }
    $result = mysqli_query($con, $query);           #suoritetaan haku
    if(!is_bool($result)){                          #jos haku ok 
        if(mysqli_num_rows($result)>0){             #jos rivejä on
        while($row= mysqli_fetch_assoc($result)){   #suoritetään tämä looppi
            
            $res[] = $row;                          #rivi tallennetaan res
        }                                           #muuttujaan ja returnataan
        }                                           #joka luupin päätteeksi
    }
    return $res;
};

//          Nappien logiikka
if(count($_POST) > 0){ // KUN POST MUUTTUJAAN TULEE LIIKETTÄ

    $info = [];
    $info['data_type'] = $_POST['data_type']; // lisätään datatyyppi info muuttujaan, jotta saadaan se info vietyä js puolelle

    if($_POST['data_type'] == 'read'){
        $Btnquery       = "SELECT * FROM menu ORDER BY category DESC";
        $result         = query($Btnquery);
        $info['data']   = $result;

        
        



    }

    if($_POST['data_type'] == 'order'){

        $id        = $_POST['id'];
        $query          = "INSERT INTO testi (text) VALUES ('$id');";
        $result         = query($query);      
    }

    
    if($_POST['data_type'] == 'order'){
        $id             = $_POST['id'];
        $query          = "SELECT name FROM menu WHERE ('$id') = id ";
        $result         = query($query);
        $info['data']   = $result;

    
    }














    echo json_encode($info);

}










?>