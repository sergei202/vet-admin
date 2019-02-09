function addPet(pet) {
	return $.post('/pet', pet);
}

function getPets() {
	return $.get('/pets').then(pets => {
		console.log('getPets: %o', pets);
		var tableBody = $('table tbody');
		tableBody.empty();
		pets.forEach(pet => {
			var tr = $('<tr>');
			var nameTd = $('<td>').text(pet.name);
			var typeTd = $('<td>').text(pet.type);
			var ownerTd = $('<td>').text(pet.owner.name + ' (' + pet.owner.phone + ')');
			var ageTd = $('<td>').text(pet.age);

			tr.append(nameTd);
			tr.append(typeTd);
			tr.append(ownerTd);
			tr.append(ageTd);

			tableBody.append(tr);
		});
	});
}

function addOwner(owner) {
	return $.post('/owner', owner);
}

function getOwners() {
	return $.get('/owners').then(owners => {
		console.log('getOwners: %o', owners);
		var select = $('select[name=petOwner]');
		select.empty();
		owners.forEach(owner => {
			var option = $('<option>').text(owner.name).val(owner._id);
			select.append(option);
		});
	});
}


function onInputChange() {
	var petName = $('input[name=petName]').val();
	var petAge = +$('input[name=petAge]').val();
	var petBtn = $('.addPetBtn');
	if(petName && petAge) {
		petBtn.attr('disabled', false);
	} else {
		petBtn.attr('disabled', true);
	}

	var ownerName = $('input[name=ownerName]').val();
	var ownerBtn = $('.addOwnerBtn');
	ownerBtn.attr('disabled', !ownerName);

	// btn.attr('disabled', !name || !age);		// Shorter version of the above: Disable if no name, otherwise enable
}




$(document).ready(function() {
	console.log('ready');

	getPets();
	getOwners();

	$('.addPetBtn').click(function() {
		// Get our values
		var name = $('input[name=petName]').val();
		var type = $('select[name=petType]').val();
		var age = $('input[name=petAge]').val();
		var owner = $('select[name=petOwner]').val();
		// Reset fields
		$('input[name=petName]').val('');
		$('input[name=petAge]').val('');
		$('.addPetBtn').attr('disabled', true);

		addPet({
			name: name,
			type: type,
			age: age,
			owner: owner
		}).then(getPets);
	});

	$('.addOwnerBtn').click(function() {
		// Get our values
		var name = $('input[name=ownerName]').val();
		var phone = $('input[name=ownerPhone]').val();
		var email = $('input[name=ownerEmail]').val();
		// Reset fields
		$('input[name=ownerName]').val('');
		$('input[name=ownerPhone]').val('');
		$('input[name=ownerEmail]').val('');
		$('.addOwnerBtn').attr('disabled', true);

		addOwner({
			name: name,
			phone: phone,
			email: email
		}).then(getOwners);
	});


	$('input[name=petName]').on('input', onInputChange);
	$('input[name=petAge]').on('input', onInputChange);
	$('input[name=ownerName]').on('input', onInputChange);
});
