let oldMenu =
	`<ul class="navbar-nav mr-auto">
		<li class="nav-item">
			<a class="nav-link" href="#" onClick="">Контакти</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" href="./about.php" onClick="">За платформата</a>
		</li>
		<li class="nav-item">
			<a class="" href="./index.php"><img src="files/test.png" class="logo-main"></a>
			<img src="files/separator-menu.png" class="separator-menu">
		</li>
		<li class="nav-item">
			<a class="nav-link" href="#" onClick="loginForm()">Вход</a>
		</li>
		<li class="nav-item">
			<a class="nav-link register-button" href="#" onClick="registerForm()">Регистрация</a>
		</li>
	</ul>`

let newMenu = 
  `<ul class="navbar-nav mr-auto" id="newMenu">
			<li class="nav-item">
				<a class="nav-link" href="#" onClick="">Празно</a>
			</li>
      <div class="dropdown nav-link">
        <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Профил
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#" onclick="viewMessages()">Съобщения</a>
          <a class="dropdown-item" href="#" onclick="viewAccount()">Преглед на профила</a>
          <a class="dropdown-item" href="#">Забранени купувачи</a>
          <a class="dropdown-item" href="#" onclick="getUserItems(0)">Активни продажби</a>
          <a class="dropdown-item" href="#" onclick="getUserItems(1)">Приключени продажби</a>
          <a class="dropdown-item" href="#" onclick="viewPurchases()">Направени поръчки</a>
        </div>
      </div>
			<li class="nav-item">
				<a class="" href="./index.php" onClick=""><img src="files/test.png" class="logo-main"></a>
				<img src="files/separator-menu.png" class="separator-menu">
			</li>
      <li class="nav-item">
        <a class="nav-link" href="#" onClick="createItemForm()">Създай продажба</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" onClick="logoutAccount()">Изход</a>
      </li>
  </ul>`
    
function loginForm() {
	$("#windowTitle").html("Вход");
	$("#windowForm").html(
			`<div class="d-flex flex-column text-center">
				<form id="loginForm">
					<div class="form-group">
						<input type="email" class="form-control input-1" id="logEmail" placeholder="Имейл адрес..." required>
					</div>
					<div class="form-group">
						<input type="password" class="form-control input-1" id="logPassword" placeholder="Парола..." required>
					</div>
					<button type="button" id="logButton" class="btn btn-info btn-block btn-round button-red" onClick="loginAccount()">Вход</button>
					<button type="button" class="btn btn-info btn-block btn-round button-gray" onClick="$('#window').modal('hide');">Назад</button>
				</form>
			</div>`
	);
	$('#loginForm').trigger("reset");
	$('#window').modal('show');
}

function loginAccount() {
	let formData = new FormData();
	formData.append('email', $('#logEmail').val())
	formData.append('password', $('#logPassword').val())
	$.ajax({
		type: "POST",
		url: 'scripts/login.php',
		cache: false,
		contentType: false,
		processData: false,
		data: formData,
		success: function(result) {
			showMessage(result);
			if (result == "Успешен вход.")
				loadAccount();
		},
	});
}

function registerForm() {
	$("#windowTitle").html("Регистрация на профил");
	$("#windowForm").html(
		`<div class="d-flex flex-column text-center">
				<form id="registrationForm">
					<div class="form-group">
						<input type="text" class="form-control input-1" id="regUsername"placeholder="Потребителско име..." required>
					</div>
					<div class="form-group">
						<input type="email" class="form-control input-1" id="regEmail"placeholder="Имейл адрес..." required>
					</div>
					<div class="form-group">
						<input type="password" class="form-control input-1" id="regPassword" placeholder="Парола..." required>
					</div>
					<div class="form-group">
						<input type="password" class="form-control input-1" id="regPasswordC" placeholder="Повторете паролата..." required>
					</div>
					<div class="form-group terms">
						<label for="termsConfirm" id="termsText">Съгласен съм с<a href="terms.php" id="terms-link" target="_blank">общите условия за ползване</a></label>
						<label class="b-contain"><input type="checkbox" id="termsConfirm" name="termsConfirm" required><div class="b-input"></div></label>
					</div>
					<button type="button" id="regButton" class="btn btn-info btn-block btn-round button-red" onClick="registerAccount()">Регистрация</button>
					<button type="button" class="btn btn-info btn-block btn-round button-gray" onClick="$('#window').modal('hide');">Назад</button>
				</form>
			</div>`
	);
	$('#registrationForm').trigger("reset");
	$('#window').modal('show');
}

function registerAccount() {
	let formData = new FormData();
	formData.append('username', $('#regUsername').val());
	formData.append('email', $('#regEmail').val());
	formData.append('password', $('#regPassword').val());
	formData.append('cpassword', $('#regPasswordC').val());
	if ($("#termsConfirm").is(":checked"))
		formData.append('terms', true);
	else
		formData.append('terms', false);
	$.ajax({
		type: "POST",
		url: 'scripts/register.php',
		cache: false,
		contentType: false,
		processData: false,
		data: formData,
		success: function(result) {
			showMessage(result);
			if (result == "Успешна регистрация.")
				$('#window').modal('hide');
		},
	});
}

let categories = {
  main: ["Книги","Географски, военни и други карти и афиши","Картички, пликове за писма, марки",
	"Стари Снимки и портрети","Книжни пари, стари лични и банкови документи", "Грамофонни плочи, аудиокасети, видеокасети, CD и DVD"],
	sub: [
		["Антикварни книги", "Книги с автограф", "Наука и образование", "Справочна литература", "Хуманитарни и социални науки",
		"Езикова подготовка", "Общество и право", "Изкуство", "Религия и религиозни учения", "За семейството", "Хоби",
		"Домашен бит и техника", "Българска художествена литература", "Чужда художествена литература", "Детско-юнушеска литература",
		"Старинна литература","Хумор и сатира"],
		["Географски карти", "Военни и топографски карти", "Морски навигационни карти", "Афиши и програми на спектакли"],
		["Картички", "Пликове за писма", "Марки"],
		["Стари снимки и портрети"],
		["Книжни пари", "Стари лични документи", "Стари банкови документи"],
		["Български грамофонни плочи", "Руски грамофонни плочи", "Чуждестранни грамофонни плочи"]
	],
	sub2: [
		[
			["Антикварни книги до 1945г.", "Антикварни книги от 1945 до 1990 г.", "Антикварни книги след 1990 г."],
			["Книги с автограф"],
			["Научно-популярна литература", "Педагогика", "Дидактика", "Учебна литературa начално обучение(от 1-4 кл.)",
			"Учебна литература прогимназиално обучение (от  5-8 кл.)", "Учебна литература гимназиално обучение(от 9-12 кл.)",
			"Учебници висше образование", "Учебна библиотека", "Астрономия", "Биология", "География", "Екология", "Икономика",
			"Финанси и борси", "Информатика", "Математика", "Медицина", "Физика", "Химия"],
			["Речници и енциклопедии", "Ръководства и самоучители", "Друга справочна литература"],
			["Археология", "Антропология", "Етнография", "История", "Културология", "Литературни анализи", "Топономия и роден край",
			"Политология", "Психология", "Социология", "Философия"],
			["По български език и бълг. граматика", "Чуждоезиково обучение"],
			["Бизнес", "Журналистика", "Култура", "Политика", "Публицистика", "Спорт", "Правна литература", "Справочници по право", "Правна периодика"],
			["Живопис", "Музика", "Театър", "Опера и балет", "Драма", "Кино"],
			["Религия", "Религиознание", "Езотерика", "Източна мъдрост", "Йога"],
			["Здраве", "Книги за бебето и детето", "Детска психология", "Приложна психология", "Семейна психология", "Сексуално възпитание"],
			["Дървообработване", "Плетачество", "Шивачество", "Везба", "Готварски книги", "Изработка на бижута и украшения", "Градина", "Цветарство"],
			["Електротехника", "Механика", "Ремонт на битова техника", "Мебели и вътрешен интериор"],
			["Проза", "Документалистика", "Есеистика", "Романи и повести", "Поезия", "Разкази", "Криминална проза", "Фантастика и фентъзи",
			"Старобългарска литература", "Съвременна българска проза", "Съвременна поезия"],
			["Проза", "Поезия", "Романи и повести", "Разкази", "Криминална проза", "Фантастика и фентъзи", "Еротика", "Любовно изкуство"],
			["За най-малките", "Детски приказки", "Детски стихове", "Разкази за деца", "Разкази в картинки (Комикси)", "Романи за деца и юнуши"],
			["Антична литература", "Европейска литература", "Митове и легенди на народите"],
			["Хумор", "Сатира"]
		],
		[
			["Стари географски карти - оригинал", "Стари географски карти - копие"],
			["Военни и топографски карти - оригинал", "Военни и топографски карти - копие"],
			["Морски навигационни карти - оригинал", "Морски навигационни карти - копие"],
			["Театрални", "Концертни", "Опера и балет", "Кино"]
		],
		[
			["Стари пътували (с марка)", "Стари без марка", "Съвременни"],
			["Пътували с печат и марка", "Непътували"],
			["Пощенски марки", "Фондови марки", "Каталози с марки"]
		],
		[
			["Кабинопортрет - малки и средни", "Кабинопортрет - големи"]
		],
		[
			["Български стари до 1945г.", "Български стари от 1945 до 2000г.", "Чужди стари до 1945г.", "Чужди стари от 1945 до 2000г."],
			["Паспорти", "Удостоверения", "Дипломи", "Други"],
			["Чекове", "Записни заповеди и менителници", "Акции", "Облигации"]
		],
		[
			["Класика", "Естрада", "Диско", "Детски приказки"],
			["Класика", "Естрада", "Диско", "Детски приказки"],
			["Класика", "Опера и балет", "Рок и естрада", "Джаз", "Детски приказки"]
		]
	]
}

function createItemForm() {
	let catList = ``
	for (let i = 0; i < categories.main.length; i++)
		catList += `<option value="` + i + `">` + categories.main[i] + `</option>`;
	$("#windowTitle").html("Създаване на продажба");
	$("#windowForm").html(
		`<div class="d-flex flex-column text-center">
				<form id="itemForm">
					<div class="form-group">
						<input type="text" class="form-control input-1" id="itemTitle"placeholder="Заглавие..." required>
					</div>
					<div class="form-group">
						<input type="text" class="form-control input-1" id="itemAuthor"placeholder="Автор...">
					</div>
					<div class="form-group">
						<textarea class="form-control input-1" id="itemDescr" placeholder="Описание..."></textarea>
					</div>
					<div class="form-group">
						<div class="row" id="groupCurr">
							<input type="number" min="0" class="form-control input-1" id="itemPrice" placeholder="Цена..." required>
							<span id="itemCurr">лв</span>
						</div>
					</div>
					<div class="form-group" id="conditionGroup">
						<select class="form-control input-1" id="itemCondition" onChange="">
							<option selected disabled>Състояние</option>
							<option value="1">Ново</option>
							<option value="2">Отлично</option>
							<option value="3">Много Добро</option>
							<option value="4">Добро</option>
							<option value="5">Лошо</option>
						</select>
					</div>
					<div class="form-group" id="categoryGroup">
						<select class="form-control input-1" id="itemCategory" onChange="loadSubCategories1()">
							<option selected disabled>Категория</option>
							` + catList + `
						</select>
					</div>
					<div class="form-group">
						<label for="exampleFormControlFile1">Изображения</label>
						<input type="file" class="form-control-file input-1" id="itemImage" multiple required/>
					</div>
					<button type="button" class="btn btn-info btn-block btn-round button-red" onClick="createItem()">Създаване</button>
					<button type="button" class="btn btn-info btn-block btn-round button-gray" onClick="$('#window').modal('hide');">Назад</button>
				</form>
			</div>`
	);
	$('#itemForm').trigger("reset");
	$('#window').modal('show');
}

function loadSubCategories1() {
	if ($("#subCategory1Group").length)
		$("#subCategory1Group").remove();
	let category = $("#itemCategory").val();
	let subCategories = ``;
	let subCategoryDiv = 
	`<div class="form-group" id="subCategory1Group">
		<select class="form-control input-1" id="itemSubCategory1" onChange="loadSubCategories2()">
			<option selected disabled>Подкатегория</option>
		</select>
	</div>`
	for (let i = 0; i < categories.sub[category].length; i++)
		subCategories += `<option value="` + i + `">` + categories.sub[category][i] + `</option>`;
	if (subCategories) {
		$("#categoryGroup").after(subCategoryDiv);
		$("#itemSubCategory1").append(subCategories);
	}
}

function loadSubCategories2() {
	if ($("#subCategory2Group").length)
		$("#subCategory2Group").remove();
	let category = $("#itemCategory").val();
	let subcategory = $("#itemSubCategory1").val();
	let subCategories = ``;
	let subCategoryDiv = 
	`<div class="form-group" id="subCategory2Group">
		<select class="form-control input-1" id="itemSubCategory2">
			<option selected disabled>Подкатегория</option>
		</select>
	</div>`
	for (let i = 0; i < categories.sub2[category][subcategory].length; i++)
		subCategories += `<option value="` + i + `">` + categories.sub2[category][subcategory][i] + `</option>`;
	if (subCategories) {
		$("#subCategory1Group").after(subCategoryDiv);
		$("#itemSubCategory2").append(subCategories);
	}
}

function createItem() {
	if (!($('#itemCategory').val() && $('#itemSubCategory1').val() && $('#itemSubCategory2').val())) {
		showMessage("Моля изберете категории.");
		return;
	}
	let formData = new FormData();
	formData.append('title', $('#itemTitle').val())
	formData.append('author', $('#itemAuthor').val())
	formData.append('descr', $('#itemDescr').val())
	formData.append('price', $('#itemPrice').val())
	formData.append('category', $('#itemCategory').val())
	formData.append('subcategory', $('#itemSubCategory1').val())
	formData.append('subcategory2', $('#itemSubCategory2').val())
	formData.append('condit', $('#itemCondition').val())
	let filecount = $('#itemImage').prop('files').length;
	for (i = 0; i < filecount; i++)
		formData.append("files[]", $('#itemImage').prop('files')[i]);
	$.ajax({
		type: "POST",
		url: 'scripts/createItem.php',
		cache: false,
		contentType: false,
		processData: false,
		data: formData,
		success: function(result) {
			showMessage(result);
			if (result == "Успешно създаване.") {
				loadItemList();
				$('#window').modal('hide');
			}
		},
	});
}

function viewMessages() {
	window.location.href = 'messages.php';
}

function viewAccount() {
	$.ajax({
		type: "POST",
		url: 'scripts/getCurrentUser.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: {},
		success: function(result) {
			if (result) {
				window.location.href = 'account.php?uid='+result;
			}
		},
	});
}

function viewPurchases(page) {
	let formData = new FormData();
	if (page)
		formData.append('page', page);
	else
		page = 0;
	$.ajax({
		type: "POST",
		url: 'scripts/getPurchases.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result) {
				let table =
				`<div class="container">       
					<table class="table">
						<thead>
							<tr>
								<th>Заглавие</th>
								<th>Цена</th>
							</tr>
						</thead>
						<tbody id="itemTable">
						</tbody>
					</table>
					<div id="pages">
						<i class="fas fa-arrow-left" onclick="viewPurchases(` + (parseInt(page)-1) + `)"></i>
						<span id="page">Страница ` + (parseInt(page)+1) + `</span>
						<i class="fas fa-arrow-right" onclick="viewPurchases(` + (parseInt(page)+1) + `)"></i>
					</div>
				</div>`
				$("#window").modal('show');
				$("#windowTitle").html("Направени поръчки");
				$("#windowForm").html(table);
				for (let i = 0; i < result.data.length; i++)
					loadPurchases(result.data[i].id, result.data[i].title, result.data[i].price);
			}
		},
	});
}

function loadPurchases(id, title, price) {
	let item =
	`<tr onClick="viewPurchase('`+ id +`')">
		<td>` + title + `</td>
		<td>` + price + `лв</td>
	</tr>`
	$("#itemTable").append(item);
}

function viewPurchase(id) {
	let formData = new FormData();
	formData.append('id', id);
	$.ajax({
		type: "POST",
		url: 'scripts/getItem.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result) {
				$("#windowForm").html(
					`<i class="fas fa-arrow-left" id="back" onclick="viewPurchases()"></i>
					<div class="d-flex flex-column text-center" id="addButton">
						<img src="files/` + result.items[0].image + `" class="item-large-image">
						<div class="item-large-price">` + result.items[0].price + `лв</div>
						<div class="item-large-descr">` + result.items[0].descr + `</div>
					</div>`);
					if (result.items[0].rating == 0) 
						$("#addButton").append(`<button type="button" id="removeButton" class="btn btn-info btn-block btn-round" onClick="confirmRating(` + id + `)">Остави рейтинг</button>`)
				$("#window").modal('show');
				$("#windowTitle").html(result.items[0].title);
			}
		},
	});
}

function confirmRating(id) {
	$("#windowTitle").html("Остави рейтинг");
		$("#windowForm").html(
			`<div class="d-flex text-center" id="confirm">
					<button type="button" class="btn btn-info btn-block btn-round" onClick="createRating(2, ` + id + `)">+</button>
					<button type="button" class="btn btn-info btn-block btn-round" onClick="createRating(1, ` + id + `)">-</button>
			</div>`
		);
	$("#window").modal('show');
}

function createRating(rate, id) {
	let formData = new FormData();
	formData.append('id', id);
	formData.append('rate', rate);
	$.ajax({
		type: "POST",
		url: 'scripts/createRating.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result) {
				if (result == 4)
					showMessage("Успешно зададен рейтинг.");
				else if (result == 3)
					showMessage("Неуспешно задаване на рейтинг.");
				else if (result == 2)
					showMessage("Рейтингът може да е само между + и -");
				else if (result == 1)
					showMessage("Тази поръчка не е ваша.");
				else
					showMessage("Неуспешно задаване на рейтинг.");
				$("#window").modal('hide');
			}
		},
	});
}


function loadAccount() {
	$.ajax({
		type: "POST",
		url: 'scripts/session.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: {},
		success: function(result) {
			if (result) {
				$('#window').modal('hide');
				$("#menuLogin").html(newMenu);
				$(".navbar-brand").attr('user',result.uid);
				//if (result.admin)
					//$("#newMenu").append(`<li class="nav-item"><a class="nav-link" href="#" onClick="gotoAdmin()">Админ панел</a></li>`)
			}
		},
	});
}

function logoutAccount() {
	$.ajax({
		type: "POST",
		url: 'scripts/logout.php',
		data: {},
		success: function(result) {
				showMessage("Успешен изход");
				$("#menuLogin").html(oldMenu);
		},
	});
}

function validateEmail(email) {
	if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
		return true;
	return false;
}



$(function() {

	$(document).on('keypress','#loginForm',function(e){
		if(e.which == 13) {
			e.preventDefault();
			loginAccount();
		}
	});

	$(document).on('keypress','#registerForm',function(e){
		if(e.which == 13) {
			e.preventDefault();
			registerAccount();
		}
	});

	$(document).on('keypress','#itemForm',function(e){
		if(e.which == 13) {
			e.preventDefault();
			createItem();
		}
	});

  $("#menuLogin").html(oldMenu);
  loadAccount();
});