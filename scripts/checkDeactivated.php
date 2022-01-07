<?php
	session_start();
	include('./db.php');
  $uid = "";
  if(isset($_SESSION['uid']))
    $uid = $_SESSION['uid'];

	if ($uid) {
    $query = "SELECT banned FROM accounts WHERE uid = '$uid'";
    $result = mysqli_query($conn,$query) or die(mysqli_error($conn));
    if (mysqli_num_rows($result) > 0)
      echo false;
    else echo true;
	}
?>