<?php
	session_start();
	include('scripts/db.php');
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Книги</title>
		<meta charset="UTF-8">
		<meta name="description" content="Купувай и продавай - онлайн">
		<meta name="keywords" content="Книги, knigi, books">
		<meta name="author" content="Viktor Petkov">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Yanone+Kaffeesatz:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<link rel="stylesheet" href="css/snackbar.css">
		<link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css">
		<link rel="stylesheet" href="css/style.css">		
		<script src="https://code.iconify.design/2/2.0.4/iconify.min.js"></script>
		<script src="js/jquery.js"></script>
		<script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.5.3/umd/popper.min.js" integrity="sha512-53CQcu9ciJDlqhK7UD8dZZ+TF2PFGZrOngEYM/8qucuQba+a+BXOIRsp9PoMNJI3ZeLMVNIxIfZLbG/CdHI5PA==" crossorigin="anonymous"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/showMessage.js"></script>
		<script src="js/menu.js"></script>
		<script src="js/main.js"></script>
		<script src="js/message.js"></script>
		<script src="js/loadMain.js"></script>
		<script src="js/redesign.js"></script>
	</head>
  <body>
    <div id="snackbar"></div>
		<nav class="navbar navbar-expand-md navbar-dark">
			<a class="navbar-brand" href="/knigi2"></a>
			<button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#menuLogin" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="menuLogin"></div>
		</nav>
    <div class="main-container">
      <div class="about-header-container">
        <span class="about-header">За платформата</span>
        <div class="about-header-border"></div>
      </div>
    </div>
  </body>
</html>