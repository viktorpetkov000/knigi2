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

function loadItemPage() {
  formData = new FormData;
  formData.append('id', getUrlParameter('id'));
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
        $("#item-page-title").html(result.items[0].title);
        $("#item-page-image").attr("src","files/" + result.items[0].image);
        if (result.items[0].ended == 1)
          $("#purchase").remove();
        formData = new FormData;
        formData.append('uid', result.items[0].uid);
        $.ajax({
          type: "POST",
          url: 'scripts/getUsername.php',
          cache: false,
          contentType: false,
          processData: false,
          dataType: 'json',
          data: formData,
          success: function(result) {
            if (result) {
              $("#item-page-user").attr("sid",result.users[0].uid);
              $("#item-page-user").html(`<i class="far fa-user icon-fa"></i><a href="account.php?uid=` + result.users[0].uid + `">` + result.users[0].username + `</a>`);
            }
            else showMessage("Няма такъв потребител.");
          },
        });   
        $("#item-page-price").html("Цена: " + result.items[0].price + "лв.");
        let condit = "";
        switch (result.items[0].condit) {
          case "1": 
          condit = "Ново"
          break;
          case "2": 
          condit = "Отлично"
          break;
          case "3": 
          condit = "Много добро"
          break;
          case "4": 
          condit = "Добро"
          break;
          case "5": 
          condit = "Лошо"
          break;
        }
        $("#item-page-condit").html("Състояние: " + condit);
        $("#item-page-descr").html(result.items[0].descr);
        $("#item-page-nav").html('<a href="index.php?cat=' + result.items[0].category + '&page=0">'+ categories.main[result.items[0].category] + '</a>'+ " / " +
        '<a href="index.php?cat=' + result.items[0].category + '&subcat=' + result.items[0].subcategory + '&page=0">' + categories.sub[result.items[0].category][result.items[0].subcategory] + '</a>' + " / " +
        '<a href="index.php?cat=' + result.items[0].category + '&subcat=' + result.items[0].subcategory + '&subcat2=' + result.items[0].subcategory2 + '&page=0">' + categories.sub2[result.items[0].category][result.items[0].subcategory][result.items[0].subcategory2] + '</a')
        for (i = 0; i < result.items.length; i++)
          $("#item-page-add-container").append(`<img class="col- item-page-image-add" src=files/` + result.items[i].name + ` onclick="switchImage('` + result.items[i].name + `')">`);
      } else showMessage("Няма такава продажба.");
    },
	});
}

function switchImage(src) {
  $("#item-page-image").prop("src", 'files/' + src);
}

function confirmPurchase() {
  $("#windowTitle").html("Потвърдете поръчка.");
	$("#windowForm").html(
      `<div class="d-flex text-center" id="confirm">
          <button type="button" class="btn btn-info btn-block btn-round" onClick="purchase()">Продължи</button>
          <button type="button" class="btn btn-info btn-block btn-round" onClick="cancelPurchase()">Отказ</button>
			</div>`
  );
  $('#window').modal('show');
}

function purchase() {
  formData = new FormData;
  formData.append('iid', getUrlParameter('id'));
  formData.append('sid', $("#item-page-user").attr("sid"));
  $.ajax({
		type: "POST",
		url: 'scripts/purchase.php',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
    data: formData,
		success: function(result) {
			if (result == 1)
        showMessage("Моля влезте в профила си.");
      else if (result == 2)
        showMessage("Невалидна поръчка.");
      else if (result == 3)
        showMessage("Тази продажба е приключила.");
      else if (result == 4) {
        showMessage("Успешна поръчка.");
        confirmPurchase();
        contactSeller($("#item-page-user").attr("sid"));
      }
      else if (result == 5)
        showMessage("Не може да купите собствена продажба.");
      else
        showMessage("Възникна проблем.");
    },
	});
}

function cancelPurchase() {
  $('#window').modal('hide');
}

function contactSeller(sid) {
  let formData = new FormData();
  formData.append('receivedby', sid);
  formData.append('message', "Закупих вашата продажба - " + $("#item-page-title").html());
  $.ajax({
    type: "POST",
    url: 'scripts/sendMessage.php',
    cache: false,
    contentType: false,
    processData: false,
    dataType: 'json',
    data: formData,
    success: function(result) {
      if (result)
        window.location.href = 'messages.php?cid='+sid;
    },
  });
}

$(function() {
  loadItemPage();
});