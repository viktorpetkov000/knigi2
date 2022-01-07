<?php
	session_start();
	include('db.php');
	$users = [];
	$items = [];
	$page = 0;
	if (isset($_POST['page']))
		$page = intval($_POST['page']);
	$limithigh = 12;
	$limitlow = 12*$page;

	if ($page >= 0) {
		$query = "SELECT * FROM `accounts` ORDER BY uid DESC LIMIT $limitlow, $limithigh;";
		$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
		if(mysqli_num_rows($result) > 0) {
			while($row = $result->fetch_assoc())
					$users[] = $row;
			echo json_encode(['users' => $users, 'page' => $page, 'limithigh' => $limithigh, 'limitlow' => $limitlow]);
		}
		else
			echo json_encode(false);
	}
?>