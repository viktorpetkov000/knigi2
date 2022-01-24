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
		<div class="modal fade" id="window" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h4 id="windowTitle"></h4>
					</div>
					<div class="modal-body" id="windowForm"></div>
				</div>
			</div>
		</div>
		<div class="main-container">
			<div class="category-container">
				<div class="category-menu">
					<div class="cat-item">
						<span class="cat-transition"></span>
						<img src="./files/cat-1.png" class="cat-icon cat-1">
						<img src="./files/line.png" class="cat-line">
						<span class="cat-name">Художествена литература</span>
					</div>
					<div class="cat-item">
						<img src="./files/cat-2.png" class="cat-icon cat-2">
						<img src="./files/line.png" class="cat-line">
						<span class="cat-name">Географски, военни и други</span>
					</div>
					<div class="cat-item">
						<img src="./files/cat-3.png" class="cat-icon cat-3">
						<img src="./files/line.png" class="cat-line">
						<span class="cat-name">Картички, пликове за писма, марки</span>
					</div>
					<div class="cat-item">
						<img src="./files/cat-4.png" class="cat-icon cat-4">
						<img src="./files/line.png" class="cat-line">
						<span class="cat-name">Стари снимки и портрети</span>
					</div>
					<div class="cat-item">
						<img src="./files/cat-5.png" class="cat-icon cat-5">
						<img src="./files/line.png" class="cat-line">
						<span class="cat-name">Книжни пари, стари лични и банкови документи</span>
					</div>
					<div class="cat-item">
						<img src="./files/cat-6.png" class="cat-icon cat-6">
						<img src="./files/line.png" class="cat-line">
						<span class="cat-name">Грамофонни плочи, касети, дискове</span>
					</div>
				</div>
			</div>
			<div class="latest-items-container-outer">
				<span class="latest-items-header">Последно добавени</span>
				<div class="latest-items-container-inner">
					<div class="carousel">
					</div>
				</div>
			</div>
			<div class="main-info-container">
				<div class="main-info">
					<h1 class="main-info-header">Ние сме възможно най-добрите!</h1>
					<br>
					<span class="main-info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
						Arcu sed sed orci, tempor, praesent. Tellus integer volutpat et dolor, porta imperdiet. 
						Ipsum phasellus lorem eu tincidunt duis sagittis, adipiscing a fermentum. Vel orci, velit dictumst at ligula.
						<br><br>
						Leo ut libero urna nullam sed tortor, cursus. Commodo gravida quis pellentesque tempus. Penatibus nullam integer 
						donec habitasse pellentesque. Malesuada tincidunt dignissim in sit ullamcorper massa ullamcorper. 
						Proin enim at commodo at donec quisque commodo vel.
					</span>
				</div>
				<img class="main-info-picture" src="files/books4.png">
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="footer-info">
				<div class="footer-logo">
					<img src="files/logo2.png"/>
				</div>
				<div class="footer-info2">
					<div class="footer-sitename">knigiknigi.knig</div>
					<div class="footer-copyright">Copyright © 2021 Всички права запазени</div>
				</div>
				<div class="footer-slogan">Най-добрия слоган на света!</div>
			</div>
			<div class="footer-menu">
				<a class="footer-menu-item" href="#">Контакт</a>
				<a class="footer-menu-item" href="#">Услуги</a>
				<a class="footer-menu-item" href="#">Лични данни</a>
				<a class="footer-menu-item" href="#">Политика за използване на бисквитки</a>
			</div>
		</div>
		<div class="container-fluid" id="middle-container">
			<div class="row">
				<div class="col-md-3">
					<form id="search" style="margin:auto;max-width:300px">
						<input type="text" placeholder="Търсене..." id="search-input">
						<button type="button" id="search-button" onclick="searchItems(0)"><i class="fa fa-search"></i></button>
						<div id="searchCategories">
							<h5 id="catTitle"><i class="fas fa-border-none"></i>Категории</h5>
							<ul id="catList"><ul>
						</div>
					</form>
				</div>
				<div class="col-md">
					<div id="items-center" page="0" pagem="0" cat="0" subcat="0" subcat2="0"></div>
				</div>
			</div>
		</div>
	</body>
</html>