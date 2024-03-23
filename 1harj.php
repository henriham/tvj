<?php


function detectTableChanges($con, $tableName){

};

function query($query){

    $res=false; # false sitä varten, että jos query ei anna tulosta
    if(!$con=mysqli_connect('localhost', 'admin', 'admin', 'admin')){
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

if(count($_POST) > 0){ // KUN POST MUUTTUJAAN TULEE LIIKETTÄ

    $info = [];
    $info['data_type'] = $_POST['data_type']; // lisätään datatyyppi info muuttujaan, jotta saadaan se info vietyä js puolelle

    if($_POST['data_type'] == 'tableupdate'){
        $query          = "SELECT * FROM testi";
        $result         = query($query);
        $info['data']   = $result;


    }
    #############################################################################
    # 'createBtn' datatyyppi vastaa napintalletuksesta ja niiden tulostuksesta  #
    # sivulle html puolella.                                                    #
    if($_POST['data_type'] == 'createBtn'){
        $text            = $_POST['text'];
        $query           = "INSERT INTO testi(text) VALUES('$text') ";
        $result          = query($query);
        #$info['data']    = $result; -- resulttia ei tarvita, kun ei dataa mee takaisin
    }
    if($_POST['data_type'] == 'createBtn'){
        $query           = "SELECT DISTINCT text FROM testi";
        $result          = query($query);
        $info['data']   = $result;
    }
    #########################################################################
    # 'delBtn' datatype taas poistaa viimesimmän lisäyksen, sekä updeittaa  #
    # loopin kautta html puolen, sen triggeroi juuri datatyyppi             #
    
    if($_POST['data_type'] == 'delBtn'){
        $query          = "DELETE FROM testi ORDER BY id DESC LIMIT 1;";
        $result = query($query);
        
    }
    if($_POST['data_type'] == 'delBtn'){
        $query           = "SELECT DISTINCT text FROM testi";
        $result          = query($query);
        $info['data']   = $result;
    }
    ###########################################
    if($_POST['data_type'] == 'counterBtn'){
        $id             = $_POST['id'];
        $query          = "INSERT INTO nappi(text) VALUES ('$id')";
        $result         = query($query);
        $info['data']   = $result;
        

    }



    echo json_encode($info);



} 















?>