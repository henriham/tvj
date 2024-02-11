<?php 
# harjoitusvideo jonka perusteella: https://www.youtube.com/watch?v=1jTT0Yb8_zE



function query($query){

    $res=false;
    if(!$con=mysqli_connect('localhost:3306', 'admin', 'admin', 'admin')){
        die("unable to connect!");
    }
    $result = mysqli_query($con, $query);
    if(!is_bool($result)){
        if(mysqli_num_rows($result)>0){
        while($row= mysqli_fetch_assoc($result)){
            
            $res[] = $row;
        }
        }
    }
    return $res;

};


if(count($_POST) > 0){
    
    $info = [];
    $info['data_type'] = $_POST['data_type']; # tämä on js funktion handle_result tarkastus

    if($_POST['data_type'] == 'read'){
        $query          = "SELECT * FROM login ORDER by rooli DESC";
        $result         = query($query);
        $info['data']   = $result;
    }
    if($_POST['data_type'] == 'get-edit-row'){
        $id             = $_POST['id'];
        $query          = "SELECT * FROM login WHERE id = '$id' LIMIT 1";
        $result         = query($query);
        $info['data']   = false;

        if($result)
            $info['data']   = $result[0];
        
    }
    else 
    if($_POST['data_type'] == 'delete')
    {
        $id             = $_POST['id'];
        $query          = "DELETE FROM login WHERE id = '$id' LIMIT 1";
        $result         = query($query);
        $info['data']   = "record deleted";
    }
    else
    if($_POST['data_type'] == 'edit'){
        $id         = (int)$_POST['id'];
        $username   = $_POST['username'];
        $password   = $_POST['password'];
        $rooli      = $_POST['role'];

        $query          = "UPDATE login SET username = '$username', password ='$password', rooli='$rooli' WHERE id = '$id' LIMIT 1";
        $result         = query($query);
        $info['data']   = "Tallennettu";
    }

    else
    if($_POST['data_type'] == 'save'){
        $username   = $_POST['username'];
        $password   = $_POST['password'];
        $rooli      = $_POST['role'];

        $query          = "INSERT INTO login (username, password, rooli) VALUES ('$username', '$password', '$rooli')";
        $result         = query($query);
        $info['data']   = "Tallennettu";
    }

    echo json_encode($info); # encode muuttaa arrayn stringiksi
}

?>