<?php
	session_start();
	include('./db.php');
  $id = "";
	$admin = false;
  if (isset($_POST['id']))
    $id = $_POST['id'];
	if (isset($_SESSION['admin']))
		$admin = $_SESSION['admin'];
	

	if ($admin) {
		if ($id) {
			$query = "UPDATE accounts SET banned = 0 WHERE uid = '$id'";
			$result = mysqli_query($conn,$query) or die(mysqli_error($conn));
			if (mysqli_affected_rows($conn))
				echo "Успешно активиране.";
			else echo "Грешка.";
		} else echo "Невалиден профил.";
	} else echo "Не сте администратор.";
?>