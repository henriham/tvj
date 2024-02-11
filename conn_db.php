<?php
$host="localhost:3306";  #tietokannan osoite
$user="admin";      #tietokannan kt
$password="admin";  #tietokannan ss
$db="admin";        #tietokannan nimi
session_start();


$conn = new mysqli($host, $user, $password, $db);

if($conn-> connect_error){
    die("Yhteys epäonnistui: " . $conn->connect_error);
}
echo ""
?>