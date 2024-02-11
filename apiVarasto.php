<?php

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
        $query          = "SELECT tuotenimi, varastopaikka, kpl, tuoteid FROM tuotteet";
        $result         = query($query);
        $info['data']   = $result;
    }

    if($_POST['data_type'] == 'plus'){

        $tuoteid        = $_POST['tuoteid'];
        $query          = "UPDATE tuotteet SET kpl = kpl + 1 WHERE tuoteid = '$tuoteid' LIMIT 1";
        $result         = query($query);      
    }

    if($_POST['data_type'] == 'minus'){
        $tuoteid        = $_POST['tuoteid'];
        $query          = "UPDATE tuotteet SET kpl = kpl - 1 WHERE tuoteid = '$tuoteid' LIMIT 1";
        $result         = query($query);
    }

    if($_POST['data_type'] == 'delete'){
        $tuoteid        = $_POST['tuoteid'];
        $query          = "DELETE FROM tuotteet WHERE tuoteid = '$tuoteid'";
        $result         = query($query);
    }

    if($_POST['data_type'] == 'save'){
        $tuotenimi       = $_POST['tuotenimi'];
        $varastopaikka   = $_POST['varastopaikka'];
        $kpl             = $_POST['kpl'];

        $query          = "INSERT INTO tuotteet (tuotenimi , varastopaikka, kpl) VALUES ('$tuotenimi', '$varastopaikka', '$kpl')";
        $result         = query($query);
        $info['data']   = "Tallennettu";
    }














    echo json_encode($info);

}










?>