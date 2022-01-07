<?php
	session_start();
  include('db.php');
  
  if (isset($_POST['email']))
    $email = $_POST['email'];
  if (isset($_POST['code']))
    $code = $_POST['code'];

  $query = "UPDATE accounts SET isactivated = 1 WHERE email = '$email' AND code = '$code'";
  $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
  if(mysqli_num_rows($result) == 0)
    json_encode($result->fetch_assoc());
  else
    echo json_encode(false);
?>