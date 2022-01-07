
function verifyAdmin() {
	let adminMenu = 
	`<ul class="navbar-nav mr-auto" id="newMenu">
		<li class="nav-item">
			<a class="nav-link" href="#" onClick="loadItemList(0)">Продажби</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" href="#" onClick="loadUsersList(0)">Потребители</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" href="#" onClick="logoutAccount()">Изход</a>
		</li>
	</ul>`
	$.ajax({
		type: "POST",
		url: 'scripts/session.php',
		dataType: 'json',
		cache: false,
		contentType: false,
		processData: false,
		data: {},
		success: function(result) {
			if (result.admin)
				$("#menu").html(adminMenu);
			else
				alert("You are not an admin!");
		},
	});
}

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
				<i class="fas fa-arrow-right" onclick="loadItemList(`+ (parseInt($("#items-center").attr('pagem'))+1) + `)"></i>
			</div>
		`);
	} else if (items == length && type == 1)  {
		$("#items-center").append(`
			<div id="pages">
				<i class="fas fa-arrow-left" onclick="searchCategories(` + $("#items-center").attr('cat') + `,` + (parseInt($("#items-center").attr('page'))-1) + `)"></i>
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

function loadUsersList(page) {
	if (page >= 0) {
		let formData = new FormData();
		formData.append('page', page);
		let table =
		`<div class="container">       
			<table class="table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Username</th>
						<th>Email</th>
						<th>Banned</th>
						<th>Admin</th>
					</tr>
				</thead>
				<tbody id="userTable">
				</tbody>
			</table>
			<div id="pages">
				<i class="fas fa-arrow-left" onclick="loadUsersList(` + (parseInt(page)-1) + `)"></i>
				<span id="page">Страница ` + (parseInt(page)+1) + `</span>
				<i class="fas fa-arrow-right" onclick="loadUsersList(` + (parseInt(page)+1) + `)"></i>
			</div>
		</div>`
		$.ajax({
			type: "POST",
			url: 'scripts/getUsers.php',
			cache: false,
			contentType: false,
			processData: false,
			dataType: 'json',
			data: formData,
			success: function(result) {
				if (result) {
				$("#items-center").empty();
				$("#items-center").html(table);
				for (let i = 0; i < result.users.length; i++)
					loadUser(result.users[i].email, result.users[i].isadmin, result.users[i].uid, result.users[i].banned, result.users[i].username);
				} else {
					showMessage("Няма открити резултати.");
				}
			},
		});
	}
}

function loadUser(email, admin, id, banned, username) {
	if (admin == 1)
		admin = "True";
	else
		admin = "False";
	if (banned == 1)
		banned = "True";
	else
		banned = "False";
	let user =
	`<tr onClick="viewUser('`+ id +`','` + email + `','` + banned + `')">
		<td>` + id + `</td>
		<td>` + username + `</td>
		<td>` + email + `</td>
		<td>` + banned + `</td>
		<td>` + admin + `</td>
	</tr>`
	$("#userTable").append(user);
}

function viewUser(id, email, banned) {
	console.log(banned);
	let banButton = `<button type="button" class="btn btn-info btn-block btn-round" onClick="deactivateAccountConfirm('` + id + `','` + email + `')">Деактивиране на профил</button>`;
	if (banned == "True")
		banButton = `<button type="button" class="btn btn-info btn-block btn-round" onClick="activateAccountConfirm('` + id + `','` + email + `')">Активиране на профил</button>`
	$("#windowTitle").html(email);
	$("#windowForm").html(
		`<div class="d-flex flex-column text-center">
			` + banButton + `
			<button type="button" class="btn btn-info btn-block btn-round" onClick="loadMessages('` + id + `')">Съобщения</button>
		</div>`);
	$("#window").modal('show');
}


function deactivateAccountConfirm(id, email) {
	$("#windowForm").html(
		`<div class="d-flex text-center" id="confirm">
				<button type="button" class="btn btn-info btn-block btn-round" onClick="deactivateAccount('` + id + `','` + email + `')">Потвърждаване</button>
				<button type="button" class="btn btn-info btn-block btn-round" onClick="viewUser('` + id + `','` + email + `')">Отказване</button>
		</div>`
	);
}

function activateAccountConfirm(id, email) {
	$("#windowForm").html(
		`<div class="d-flex text-center" id="confirm">
				<button type="button" class="btn btn-info btn-block btn-round" onClick="activateAccount('` + id + `','` + email + `')">Потвърждаване</button>
				<button type="button" class="btn btn-info btn-block btn-round" onClick="viewUser('` + id + `','` + email + `')">Отказване</button>
		</div>`
	);
}

function deactivateAccount(id) {
	let formData = new FormData();
	formData.append('id', id)
	$.ajax({
		type: "POST",
		url: 'scripts/deactivateAccount.php',
		cache: false,
		contentType: false,
		processData: false,
		data: formData,
		success: function(result) {
			showMessage(result);
			$('#window').modal('hide');
		},
	});
}

function activateAccount(id) {
	let formData = new FormData();
	formData.append('id', id)
	$.ajax({
		type: "POST",
		url: 'scripts/activateAccount.php',
		cache: false,
		contentType: false,
		processData: false,
		data: formData,
		success: function(result) {
			showMessage(result);
			$('#window').modal('hide');
		},
	});
}

function loadMessages(id) {
	messagesDiv = `
	<div class="row">
		<div class="col-sm-2">
			<div id="contacts-list"></div>
		</div>
		<div class="col-sm-10">
			<div id="chat-container">
				<div id="chat">
					<div id="messages-show"></div>
				</div>
			</div>
		</div>
	</div>`
	$("#items-center").empty();
	$("#items-center").html(messagesDiv);
	$("#window").modal('hide');
	getContacts(id);
}

let contacts = [];
function getContacts(id) {
	let formData = new FormData();
  formData.append('id', id);
	$.ajax({
		type: "POST",
		url: 'scripts/getContacts.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result) {
				console.log(result);
        let contacts = result.data;
        let uid = result.uid;
        let pairs = [];
        let flag;
        let cid = [];
        let temp;
        let temp2;
        let temp3;
        for (i = 0; i < contacts.length; i++) {
          flag = false;
          temp = contacts[i].sentby + "," + contacts[i].receivedby
          if (!pairs.length) {
            pairs.push(temp);
            temp2 = temp.replace("," + uid, "");
            temp3 = temp2.replace(uid + ",", "");
            cid.push(`'` + temp3 + `'`);
          }
          for (j = 0; j < pairs.length; j++)
            if ((contacts[i].sentby + "," + contacts[i].receivedby == pairs[j]) || (contacts[i].receivedby + "," + contacts[i].sentby == pairs[j]))
              flag = true;
          if (!flag) {
            pairs.push(temp);
            temp2 = temp.replace("," + uid, "");
            temp3 = temp2.replace(uid + ",", "");
            cid.push(`'` + temp3 + `'`);
          }
        }
        let formData = new FormData();
        formData.append('uid', cid);
        $.ajax({
          type: "POST",
          url: 'scripts/getMultipleUsernames.php',
          cache: false,
          contentType: false,
          processData: false,
          dataType: 'json',
          data: formData,
          success: function(result) {
            if (result) {
              let count = 0;
              let contact = "";
              for (i = 0; i < result.data.length; i++) {
                contact =
                `<div class="contact btn btn-info btn-block btn-round" onclick="getMessages(`+result.data[i].uid+`, ` + id + `)">
                  ` + result.data[i].username + `
                </div>`
                contacts.push(contact);
                count++;
                if (count <= 10)
                  $("#contacts-list").append(contact);
              }
              $("#contacts-list").append(`
              <div id="pages" style="margin-top: 10px;">
                <i class="fas fa-arrow-left" onclick="contactPages(` + -1 + `)"></i>
                <i class="fas fa-arrow-right" onclick="contactPages(` + 1 + `)"></i>
              </div>
              `)
            }
          },
        });
			}
    },
	});
}

function contactPages(page) {
  if (page > 0) {
    if (contacts.length >= page*10) {
      let count = 0;
      $("contacts-list").html("");
      for (i = 1*(page*10); i <= 10*page; i++) {
        if (contacts[i]) {
          contact =
          `<div class="contact btn btn-info btn-block btn-round" onclick="getMessages(`+result.data[i].uid+`)">
            ` + result.data[i].username + `
          </div>`
        }
        count++;
        if (count <= 10)
          $("#contacts-list").append(contact);
      }
    }
  }
}

function getMessages(contact, id) {
  let formData = new FormData();
  formData.append('cid', contact);
	formData.append('id', id);
  let chat = 
  `<div id="messages-show"></div>`
  $.ajax({
    type: "POST",
    url: 'scripts/getMessages.php',
    cache: false,
    contentType: false,
    processData: false,
    dataType: 'json',
    data: formData,
    success: function(result) {
      if (result) {
        let message = "";
        $("#chat").html(chat);
        for (i = 0; i < result.data.length; i++) {
          if (contact == result.data[i].sentby)
            message = `<div class="message-container"><span class="message-bubble tooltiptext" data-text="` + result.data[i].created + `">` + result.data[i].message + `</span></div>`;
          else 
            message = `<div class="my-message-container"><span class="my-message-bubble tooltiptext" data-text="` + result.data[i].created + `">` + result.data[i].message  + `</span></div>`;
          $("#messages-show").append(message);
        }
        $("#messages-show").scrollTop($('#messages-show')[0].scrollHeight);
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
			window.location.href = 'index.php';
		},
	});
}

verifyAdmin();