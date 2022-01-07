let rowID = 0;
let items = 0;
function loadItem(id, image, title, price, description, length, type) {
	items++;
	let colType = 'col-md-3';
	let item =
	`<div class="item-container ` + colType + `" style=""onClick="viewItem('`+ id +`', '` + title  + `','` + image + `', '`+ description + `','` + price + `')">
		<img class="item-image" src="files/` + image + `">
		<div class="item-title">` + title + `</div>
		<div class="item-price">` + price + "лв."+ `</div>
		<div class="item-description">` + description + `</div>
	</div>`
	if (!$("#items-center .row").length)
		$("#items-center").append(`<div class="row" style="	width: 100%;
		margin: auto;" id="row0"></div>`);
	if ($("#row" + rowID).children().length == 4) {
		rowID++;
		$("#items-center").append(`<div class="row" style="	width: 100%;
		margin: auto;" id="row` + rowID + `"></div>`);
	}
	$("#row" + rowID).append(item);
	if (items == length && type == 0) {
		$("#items-center").append(`
			<div id="pages">
				<i class="fas fa-arrow-left" onclick="loadItemList(`+ (parseInt($("#items-center").attr('pagem'))-1) + `)"></i>
				<span id="page">Страница ` + (parseInt($("#items-center").attr('pagem'))+1) + `</span>
				<i class="fas fa-arrow-right" onclick="loadItemList(`+ (parseInt($("#items-center").attr('pagem'))+1) + `)"></i>
			</div>
		`);
	} else if (items == length && type == 1)  {
		$("#items-center").append(`
			<div id="pages">
				<i class="fas fa-arrow-left" onclick="searchCategories(` + $("#items-center").attr('cat') + `,` + (parseInt($("#items-center").attr('page'))-1) + `)"></i>
				<span id="page">Страница ` + (parseInt($("#items-center").attr('page'))+1) + `</span>
				<i class="fas fa-arrow-right" onclick="searchCategories(` + $("#items-center").attr('cat') + `,` + (parseInt($("#items-center").attr('page'))+1) + `)"></i>
			</div>
		`);
	} else if (items == length && type == 2)  {
		$("#items-center").append(`
			<div id="pages">
				<i class="fas fa-arrow-left" onclick="searchSubCategories(` 
				+ $("#items-center").attr('subcat') + ','
				+ $("#items-center").attr('cat') + `,`
				+ (parseInt($("#items-center").attr('page'))-1) + ','
				+ `)"></i>
				<span id="page">Страница ` + (parseInt($("#items-center").attr('page'))+1) + `</span>
				<i class="fas fa-arrow-right" onclick="searchSubCategories(` 
				+ $("#items-center").attr('subcat') + ','
				+ $("#items-center").attr('cat') + `,`
				+ (parseInt($("#items-center").attr('page'))+1) + ','
				+ `)"></i>
			</div>
		`);
	} else if (items == length && type == 3)  {
		$("#items-center").append(`
			<div id="pages">
				<i class="fas fa-arrow-left" onclick="searchSubCategories2(` 
				+ $("#items-center").attr('subcat2') + ','
				+ $("#items-center").attr('subcat') + ','
				+ $("#items-center").attr('cat') + `,`
				+ (parseInt($("#items-center").attr('page'))-1) + ','
				+ `)"></i>
				<span id="page">Страница ` + (parseInt($("#items-center").attr('page'))+1) + `</span>
				<i class="fas fa-arrow-right" onclick="searchSubCategories2(` 
				+ $("#items-center").attr('subcat2') + ','
				+ $("#items-center").attr('subcat') + ','
				+ $("#items-center").attr('cat') + `,`
				+ (parseInt($("#items-center").attr('page'))+1) + ','
				+ `)"></i>
			</div>
		`);
	} else if (items == length && type == 4)  {
		$("#items-center").append(`
			<div id="pages">
				<i class="fas fa-arrow-left" onclick="searchItems(` 
				+ (parseInt($("#items-center").attr('page'))-1)
				+ `)"></i>
				<span id="page">Страница ` + (parseInt($("#items-center").attr('page'))+1) + `</span>
				<i class="fas fa-arrow-right" onclick="searchItems(` 
				+ (parseInt($("#items-center").attr('page'))+1)
				+ `)"></i>
			</div>
		`);
	}
}

function loadItemList(page) {
	if (page >= 0) {
		let formData = new FormData();
		formData.append('page', page);
		$.ajax({
			type: "POST",
			url: 'scripts/items.php',
			cache: false,
			contentType: false,
			processData: false,
			dataType: 'json',
			data: formData,
			success: function(result) {
				if (result) {
					$("#items-center").empty();
					rowID = 0;
					items = 0;
					$("#items-center").attr('subcat2', 0);
					$("#items-center").attr('subcat', 0);
					$("#items-center").attr('cat', 0);
					$("#items-center").attr('pagem', result.page);
					window.history.replaceState(null, null, "?page=" + result.page + "");
					for (let i = 0; i < result.items.length; i++)
						loadItem(result.items[i].id, result.items[i].image, result.items[i].title, result.items[i].price, result.items[i].descr, result.items.length, 0);
				}
			},
		});
	}
}

function viewItem(id, title, image, description, price) {
	$("#windowTitle").html(title);
	$("#windowForm").html(
		`<div class="d-flex flex-column text-center">
			<img src="files/` + image + `" class="item-large-image">
			<div class="item-large-price">` + price + `лв</div>
			<div class="item-large-descr">` + description + `</div>
			<button type="submit" class="btn btn-info btn-block btn-round" onClick="gotoItem(` + id + `)">Към продажбата</button>
		</div>`)
	$("#window").modal('show');
}

function gotoAdmin() {
	window.location.href = 'admin.php';
}

function gotoItem(id) {
	window.location.href = 'item.php?id=' + id;
}

function searchItems(page) {
	if (page >= 0) {
		let formData = new FormData();
		if ($("#catList").attr('main'))
			formData.append('category', $("#catList").attr('main'));
		if ($("#catList").attr('sub'))
			formData.append('subCategory', $("#catList").attr('sub'));
		if ($("#catList").attr('sub2'))
			formData.append('subCategory2', $("#catList").attr('sub2'));
		formData.append('search', $('#search-input').val());
		formData.append('page', page);
		$.ajax({
			type: "POST",
			url: 'scripts/searchItems.php',
			cache: false,
			contentType: false,
			processData: false,
			dataType: 'json',
			data: formData,
			success: function(result) {
				if (result) {
					$("#items-center").empty();
					$("#items-center").attr('page', result.page);
					rowID = 0;
					items = 0;
					for (let i = 0; i < result.items.length; i++)
						loadItem(result.items[i].id, result.items[i].image, result.items[i].title, result.items[i].price, result.items[i].descr, result.items.length, 4);
				} else
					showMessage("Няма открити резултати.");
			},
		});
	}
}

function getUserItems(mode, uid, page) {
	let formData = new FormData();
	formData.append('mode', mode);
	if (uid)
		formData.append('uid', uid);
	if (page)
		formData.append('page', page);
	else
		page = 0;
	$.ajax({
		type: "POST",
		url: 'scripts/getUserItems.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result) {
				let title = "";
				if (mode)
					title = "Неактивни продажби";
				else
					title = "Активни продажби";
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
						<i class="fas fa-arrow-left" onclick="getUserItems(` + mode + `,` + $(".navbar-brand").attr("user") + `,` + (parseInt(page)-1) + `)"></i>
						<span id="page">Страница ` + (parseInt(page)+1) + `</span>
						<i class="fas fa-arrow-right" onclick="getUserItems(` + mode + `,` + $(".navbar-brand").attr("user") + `,` + (parseInt(page)+1) + `)"></i>
					</div>
				</div>`
				$("#window").modal('show');
				$("#windowTitle").html(title);
				$("#windowForm").html(table);
				for (let i = 0; i < result.items.length; i++)
					loadItemTable(result.items[i].id, result.items[i].title, result.items[i].price);
			} else {
				loadItemList();
				showMessage("Няма открити резултати.");
			}
		},
	});
}

function loadItemTable(id, title, price) {
	let item =
	`<tr onClick="viewTableItem('`+ id +`')">
		<td>` + title + `</td>
		<td>` + price + `лв</td>
	</tr>`
	$("#itemTable").append(item);
}

function viewTableItem(id) {
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
					`<i class="fas fa-arrow-left" id="back" onclick="getUserItems(` + result.items[0].ended + `, ` + result.items[0].uid + `)"></i>
					<div class="d-flex flex-column text-center" id="addButton">
						<img src="files/` + result.items[0].image + `" class="item-large-image">
						<div class="item-large-price">` + result.items[0].price + `лв</div>
						<div class="item-large-descr">` + result.items[0].descr + `</div>
					</div>`);
					$("#addButton").append(`<button type="submit" class="btn btn-info btn-block btn-round" onClick="gotoItem(` + id + `)">Към продажбата</button>`)
					if (result.items[0].ended == 0 && $(".navbar-brand").attr('user',) == result.items[0].uid)
						$("#addButton").append(`<button type="button" id="removeButton" class="btn btn-info btn-block btn-round" onClick="removeItemConfirm(` + id + `)">Премахни продажбата</button>`)
				$("#window").modal('show');
				$("#windowTitle").html(result.items[0].title);
			}
		},
	});
}

function removeItem(id) {
	let formData = new FormData();
	formData.append('id', id);
	$.ajax({
		type: "POST",
		url: 'scripts/removeItem.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result == 1)
        showMessage("Моля влезте в профила си.");
      else if (result == 2)
        showMessage("Невалидна продажба.");
      else if (result == 3)
        showMessage("Тази продажба е приключила.");
			else if (result == 4) {
				showMessage("Успешно прекратяване на продажба.")
				$("#confirm").remove();
			}
		},
	});
}

function removeItemConfirm(id) {
	$("#removeButton").remove();
	$("#addButton").append(
			`<div class="d-flex text-center" id="confirm">
					<button type="button" class="btn btn-info btn-block btn-round" style="margin-top: 9px" onClick="removeItem(` + id + `)">Потвърди премахване</button>
					<button type="button" class="btn btn-info btn-block btn-round" style="margin-top: 9px" onClick="cancelRemoveItem(` + id + `)">Отказ</button>
			</div>`
	);
	$('#window').modal('show');
}

function cancelRemoveItem(id) {
	$("#confirm").remove();
	$("#addButton").append(`<button type="button" id="removeButton" class="btn btn-info btn-block btn-round" onClick="removeItemConfirm(` + id + `)">Премахни продажбата</button>`)
}

function searchCategories(id, page) {
	if (page >= 0) {
		let formData = new FormData();
		formData.append('category', id)
		formData.append('page', parseInt(page))
		$.ajax({
			type: "POST",
			url: 'scripts/searchCategories.php',
			cache: false,
			contentType: false,
			processData: false,
			dataType: 'json',
			data: formData,
			success: function(result) {
				if (result) {
					$("#items-center").empty();
					rowID = 0;
					items = 0;
					for (let i = 0; i < result.items.length; i++)
						loadItem(result.items[i].id, result.items[i].image, result.items[i].title, result.items[i].price, result.items[i].descr, result.items.length, 1);
					$("#catList").empty();
					$("#back-cat").remove();
					$("#catTitle").prepend(`<i class="fas fa-arrow-left" id="back-cat" onclick="loadMainCategoriesPre()"></i>`);
					$('#search-input').val('')
					$("#catList").removeAttr("main");
					$("#catList").removeAttr("sub");
					$("#catList").removeAttr("sub2");
					$("#catList").attr('main', id);
					$("#items-center").attr('page', result.page);
					$("#items-center").attr('subcat2', 0);
					$("#items-center").attr('subcat', 0);
					$("#items-center").attr('cat', id);
					window.history.replaceState(null, null, "?cat=" + id + "&page=" + result.page + "");
					for (let i = 0; i < categories.sub[id].length; i++)
						$("#catList").append(`<a href="#"><li onclick="searchSubCategories('` + i + `', '` + id + `',0)">` + categories.sub[id][i] + `</li></a>`);
				} else {
					//loadMainCategories(0)
					showMessage("Няма открити резултати.");
				}
			},
		});
	}
}

function searchSubCategories(id, mainid, page) {
	let formData = new FormData();
	formData.append('category', mainid);
	formData.append('subCategory', id);
	formData.append('page', page);
	$.ajax({
		type: "POST",
		url: 'scripts/searchCategories.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result) {
				$("#items-center").empty();
				rowID = 0;
				items = 0;
				for (let i = 0; i < result.items.length; i++)
					loadItem(result.items[i].id, result.items[i].image, result.items[i].title, result.items[i].price, result.items[i].descr, result.items.length, 2);
				$("#catList").empty();
				$("#back-cat").remove();
				$("#catTitle").prepend(`<i class="fas fa-arrow-left" id="back-cat" onclick="searchCategories('` + mainid + `', 0)"></i>`);
				$("#catList").removeAttr("main");
				$("#catList").removeAttr("sub");
				$("#catList").removeAttr("sub2");
				$('#search-input').val('')
				$("#catList").attr('main', mainid);
				$("#catList").attr('sub', id);
				$("#items-center").attr('page', result.page);
				$("#items-center").attr('subcat2', 0);
				$("#items-center").attr('subcat', id);
				$("#items-center").attr('cat', mainid);
				window.history.replaceState(null, null, "?cat=" + mainid +"&subcat=" + id + "&page=" + result.page + "");
				for (let i = 0; i < categories.sub2[mainid][id].length; i++)
					$("#catList").append(`<a href="#"><li onclick="searchSubCategories2('` + i + `', '` + id + `' , '` + mainid + `',0)">` + categories.sub2[mainid][id][i] + `</li></a>`);
			} else
				showMessage("Няма открити резултати.");

		},
	});
}

function searchSubCategories2(id, subid, mainid, page) {
	let formData = new FormData();
	formData.append('category', mainid);
	formData.append('subCategory', subid);
	formData.append('subCategory2', id);
	formData.append('page', page);
	$.ajax({
		type: "POST",
		url: 'scripts/searchCategories.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result) {
				$("#items-center").empty();
				rowID = 0;
				items = 0;
				$("#catList").removeAttr("main");
				$("#catList").removeAttr("sub");
				$("#catList").removeAttr("sub2");
				$('#search-input').val('')
				$("#catList").attr('main', mainid);
				$("#catList").attr('sub', subid);
				$("#catList").attr('sub2', id);
				$("#items-center").attr('page', result.page);
				$("#items-center").attr('subcat2', id);
				$("#items-center").attr('subcat', subid);
				$("#items-center").attr('cat', mainid);
				window.history.replaceState(null, null, "?cat=" + mainid +"&subcat=" + subid + "&subcat2=" + id + "&page=" + result.page + "");
				for (let i = 0; i < result.items.length; i++)
					loadItem(result.items[i].id, result.items[i].image, result.items[i].title, result.items[i].price, result.items[i].descr, result.items.length, 3);
			} else
				showMessage("Няма открити резултати.");
		},
	});
}

function activateAccount(email, code) {
	let formData = new FormData();
	formData.append('email', email);
	formData.append('code', code);
	$.ajax({
		type: "POST",
		url: 'scripts/verify.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result) {
				console.log(result);
			}
		},
	});
}

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
};

function loadMainCategoriesPre() {
	window.history.replaceState(null, null, ".");
	loadMainCategories(0);
}

function loadMainCategories(page) {
	$("#back-cat").remove();
	$("#catList").empty();
	$("#catList").removeAttr("main");
	$("#catList").removeAttr("sub");
	$("#catList").removeAttr("sub2");
	for (let i = 0; i < categories.main.length; i++)
		$("#catList").append(`<a href="#"><li onclick="searchCategories('` + i + `','` + 0 + `')">` + categories.main[i] + `</li></a>`);
	loadItemList(page);
}

function checkDeactivated() {
	$.ajax({
		type: "POST",
		url: 'scripts/checkDeactivated.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: [],
		success: function(result) {
			console.log(result);
			if (result)
				logoutAccount();
		},
	});
}

$(function() {
	$(document).on('keypress','#search-input',function(e){
		if(e.which == 13) {
			e.preventDefault();
			searchItems(0);
		}
	});
	checkDeactivated()
});