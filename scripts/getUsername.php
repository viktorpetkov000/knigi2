<?php
	session_start();
	include('db.php');
  $users = [];
  
  if (isset($_POST['uid']))
    $uid = $_POST['uid'];

	$query = "SELECT username,uid FROM `accounts` WHERE uid = '$uid';";
	$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
	if(mysqli_num_rows($result) > 0) {
		while($row = $result->fetch_assoc())
				$users[] = $row;
		echo json_encode(['users' => $users]);
	}
	else
		echo json_encode(false);
?>