let refresher;
let contacts = [];
function getContacts() {
	$.ajax({
		type: "POST",
		url: 'scripts/getContacts.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: {},
		success: function(result) {
			if (result) {
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
                `<div class="contact btn btn-info btn-block btn-round" onclick="getMessages(`+result.data[i].uid+`)">
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

function getMessages(contact) {
  $.ajax({
    type: "POST",
    url: 'scripts/clearContactSession.php',
    cache: false,
    contentType: false,
    processData: false,
    dataType: 'json',
    data: {},
    success: function() {},
  });
  clearInterval(refresher);
  let formData = new FormData();
  formData.append('cid', contact);
  let chat = 
  `<div id="messages-show"></div>
  <div id="controls">
    <div class="row">
      <div class="col-9" style="padding-right: 0">
        <textarea id="send-message"></textarea>
      </div>
      <div class="col-3" style="padding-left: 0">
        <button type="button" id="send-message-button" class="btn btn-info btn-block btn-round" contact="`+contact+`" onclick="sendMessage(` + contact + `)">Изпрати</button>
      </div>
    </div>
  </div>`
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
        refresher = setInterval(function(){ refreshMessages(contact) }, 1000);
      }
    },
  });
}

function refreshMessages(contact) {
  let formData = new FormData();
  formData.append('cid', contact);
  $.ajax({
    type: "POST",
    url: 'scripts/getMessageUpdateContact.php',
    cache: false,
    contentType: false,
    processData: false,
    dataType: 'json',
    data: formData,
    success: function(result) {
      if (result) {
        let message = "";
        for (i = 0; i < result.new.length; i++) {
          message = `<div class="message-container"><span class="message-bubble tooltiptext" data-text="` + result.new[i].created  + `">` + result.new[i].message + `</span></span></div>`;
          $("#messages-show").append(message);
        }
        $("#messages-show").scrollTop($('#messages-show')[0].scrollHeight);
      }
    },
  });
}

function receiveMessage() {
  $.ajax({
    type: "POST",
    url: 'scripts/getMessageUpdate.php',
    cache: false,
    contentType: false,
    processData: false,
    dataType: 'json',
    data: {},
    success: function(result) {
      if (result) {
        let users = [];
        for (i = 0; i < result.new.length; i++)
          if ($("#send-message-button").attr("contact") != result.new[i].sentby)
            users.push(result.new[i].sentby);
        let formData = new FormData();
        formData.append('uid', users);
        $.ajax({
          type: "POST",
          url: 'scripts/getMultipleUsernames.php',
          cache: false,
          contentType: false,
          processData: false,
          dataType: 'json',
          data: formData,
          success: function(result) {
            if (result)
              showMessage("Нови съобщения от: " + result.data.map(e => e.username).join(", "));
          },
        });
      }
    },
  });
}

function sendMessage(receivedby) {
  let formData = new FormData();
  formData.append('receivedby', receivedby);
  formData.append('message', $("#send-message").val());
	$.ajax({
		type: "POST",
		url: 'scripts/sendMessage.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		data: formData,
		success: function(result) {
			if (result) {
        message = `<div class="my-message-container"><span class="my-message-bubble tooltiptext" data-text="` + result[1] + `">` + result[0] + `</span></div>`;
        $("#messages-show").append(message);
        $("#send-message").val("");
        $("#messages-show").scrollTop($('#messages-show')[0].scrollHeight);
			}
    },
	});
}

$(function() {
  $(document).on('keypress','#controls',function(e){
		if(e.which == 13) {
      e.preventDefault();
			sendMessage($("#send-message-button").attr("contact"));
		}
	});
  getContacts();
  setInterval(receiveMessage, 60000);
  if (getUrlParameter('cid'))
    getMessages(getUrlParameter('cid'));
});