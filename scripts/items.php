<?php
	session_start();
	include('db.php');
	$items = [];
	$page = 0;
	if (isset($_POST['page']))
		$page = intval($_POST['page']);
	$limithigh = 12;
	$limitlow = 12*$page;

	if ($page >= 0) {
		$getItems = "SELECT * FROM `items` WHERE ended = 0 ORDER BY id DESC LIMIT $limitlow, $limithigh;";
		$result = mysqli_query($conn,$getItems) or die(mysqli_error($conn));
		if(mysqli_num_rows($result) > 0) {
			while($row = $result->fetch_assoc())
				if (!$row['ended'])
					$items[] = $row;
			echo json_encode(['items' => $items, 'page' => $page, 'limithigh' => $limithigh, 'limitlow' => $limitlow]);
		}
		else
			echo json_encode(false);
	}
?>