$(function() {
	$("#menuLogin").html(oldMenu);
	loadAccount();
	if (getUrlParameter('code') && getUrlParameter('email')) {
		activateAccount(getUrlParameter('email'), getUrlParameter('code'));
	}
	
	if (getUrlParameter('page') && getUrlParameter('cat')) {
		if (typeof getUrlParameter('subcat2') !== 'undefined') {
			searchCategories(getUrlParameter('cat'));
			searchSubCategories(getUrlParameter('subcat'), getUrlParameter('cat'), getUrlParameter('page'));
			searchSubCategories2(getUrlParameter('subcat2'), getUrlParameter('subcat'), getUrlParameter('cat'), getUrlParameter('page'));
		}
		else if (typeof getUrlParameter('subcat') !== 'undefined') {
			searchCategories(getUrlParameter('cat'), getUrlParameter('page'));
			searchSubCategories(getUrlParameter('subcat'), getUrlParameter('cat'), getUrlParameter('page'));
		}
		else if (typeof getUrlParameter('cat') !== 'undefined')
			searchCategories(getUrlParameter('cat'), getUrlParameter('page'));
	} else {
		if (getUrlParameter('page'))
			loadMainCategories(getUrlParameter('page'));
		else
			loadMainCategories(0);
	}
	

});