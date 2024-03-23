<?php

#  TÄMÄ TIEDOSTO VASTAA tilaus sivun generoituvasta tuotelistasta

include("conn_db.php");
include("functions.php");

        $asinfo         = $_POST['tableinfo'];
        $id             = $_POST['id'];
        $query          = "SELECT menu.name, COUNT(CASE WHEN '$asinfo' = metatilaus.asinfo THEN metatilaus.menu_id END) AS name_count, menu.id  FROM menu
        LEFT JOIN metatilaus ON menu.id = metatilaus.menu_id
        WHERE menu.id = '$id' AND '$asinfo' = metatilaus.asinfo GROUP BY name";
        $result = mysqli_query($conn, $query);

        $data = array();
        while ($row = mysqli_fetch_assoc($result)){
            $data[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($data);







?>