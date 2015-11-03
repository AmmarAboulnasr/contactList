'use strict';

$(document).ready(init);

var contacts = JSON.parse(localStorage.contacts || '[]');
updateList();

function init() {
	$('#add').click(addContact);
	$('#list').on('click', '.remove', removeContact);
}

function updateList() {
	
	$('#list').empty();
	if(contacts.length) {
		$('table.table').show();
		var contactElements = contacts.map(function(contact) {
		var $tr = $('#sample').clone();
    $tr.removeAttr('id');
    $tr.children('.name').text(contact.name);
    $tr.children('.email').text(contact.email);
    $tr.children('.phoneNumber').text(contact.phoneNumber);
    $tr.children('.twitter').text(contact.twitter);
    $tr.show();
    return $tr;
	})

	$('#list').append(contactElements);
	} else {
		$('table.table').hide();
	}
}

function addContact() {
	
	if(!($('#nameField').val() === '' || $('#emailField').val() === '' || $('#phoneField').val() === '' || $('#twitterField').val() === '@' || $('#twitterField').val() === '')) {
		console.log("6");
		var name = $('#nameField').val();
		var email = $('#emailField').val();
		var phoneNumber = $('#phoneField').val();
		var twitter = $('#twitterField').val();
		$('#nameField').val("");
		$('#emailField').val("");
		$('#phoneField').val("");
		$('#twitterField').val("@");

		var contact = {
			name: name,
			email: email,
			phoneNumber: phoneNumber,
			twitter: twitter
		};
		contacts.push(contact);
		updateList();
		saveLocalStorage();
	}
}

function saveLocalStorage() {
	localStorage.contacts = JSON.stringify(contacts);
}

function removeContact(e) {
    var $target = $(e.target);
    var $targetRow = $target.closest('tr');

    var index = $targetRow.index();
    contacts.splice(index, 1);

    updateList();
    saveLocalStorage();
  }
