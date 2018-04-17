let userData; //stores the info from the ajax request
let directoryHTML; //generated user box HTML will be stored here
let modalHTML; //generated modal window HTML will be stored here
let employeeList;
let directoryInputs;
//this function is the callback when ajax request is successful
function displayPhotos(data){
		userData = data.results; //stores the data retrieved from the server
		createUserBox(data); //creates visible directory with html
		createModalWindows(data);
		addModalFunctionality();
}

//this function takes server data and displays the user data as html
function createUserBox(data){

		directoryHTML = '<ul id="employee-list">'; //open ul tag

		$.each(data.results, function(i,employee){ //loop through each employee
			directoryHTML += '<li>'; //open li tag
			directoryHTML += '<label for="employee'+(i+1)+'">'; //labels each employee

			//to format the image and the text that is displayed, I put the image in a div and 
			//the text in a seperate div
			directoryHTML += '<div class="img-container">'; //div containing the image
			directoryHTML += '<img src="'+employee.picture.large+'">'; //add profile image
			directoryHTML += '</div>'; //end image div

			directoryHTML += '<div class="text-container">'; //div containing the profile text info
			//add first and last name
			directoryHTML += '<h3>';
			directoryHTML += employee.name.first + " " + employee.name.last;
			directoryHTML += '</h3>';
			//add username
			directoryHTML += '<p>'
			directoryHTML += employee.login.username;
			directoryHTML += '</p>';
			//add location-city
			directoryHTML += '<p>';
			directoryHTML += employee.location.city;
			directoryHTML += '</p>';
			directoryHTML += '</div>'; //close profile text info

			directoryHTML += '<input name="employees" class="directory-inputs" type="radio" id="employee'+(i+1)+'">' //radio input for each employee
			directoryHTML += '</label>' //close label tag
			directoryHTML += '</li>'; //close li tag										//to select them easily
		});

		directoryHTML += "</ul>"; //close ul tag

		$('#employees').html(directoryHTML); //appends the created html to the dom
		employeeList = $('#employee-list').children(); //stores the li's

}

function createModalWindows(data){

	modalHTML = '<ul>'; //open ul

	$.each(data.results, function(i,employee){

		modalHTML += '<li class="employee-modal">'; //open li

		//add close button to the window
		modalHTML += '<span class="close">'; 
		modalHTML += '&#10006';
		modalHTML += '</span>';

		modalHTML += '<div class="basic-info">'; //open basic info div
		modalHTML += '<img class="round" src="'+employee.picture.large+'">'; //add profile picture
		//add first and last name
		modalHTML += '<h3>';
		modalHTML += employee.name.first +" "+ employee.name.last;
		modalHTML += '</h3>';
		//add username
		modalHTML += '<p>'
		modalHTML += employee.login.username;
		modalHTML += '</p>';
		//add email
		modalHTML += '<p>';
		modalHTML +=  employee.email;
		modalHTML += '</p>';
		
		modalHTML += '</div>'; //end basic info div

		modalHTML += '<div class="more-info">'; //open additional info div

		//add phone number
		modalHTML += '<p>';
		modalHTML += employee.cell;
		modalHTML += '</p>';
		//add more address info
		modalHTML += '<p>';
		modalHTML += employee.location.street +", "+ employee.location.city +", "+ employee.location.state +" "+ employee.location.postcode;
		modalHTML += '</p>';
		//add birthday
		modalHTML += '<p>';
		modalHTML += "Birthday: "+ employee.dob;
		modalHTML += '</p>';

		modalHTML += '</div>'; //end additional info div

		modalHTML += '</li>'; //close li
	});

	modalHTML += '</ul>'; //close ul
	$('#modal-windows').html(modalHTML); //append modalHTML to it's div in the html
}




//SCOPE ISSUES REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
function addModalFunctionality(){
	//hides the modal window when the 'x' button is clicked
	$('.close').click(function(){
		$(this).parent().css("visibility","hidden");
		$('#dim-screen').css('display','none')
	});
	//loops through each employee and adds a click event to bring the modal window into view
	$.each(employeeList, function(i,employee){
		(function(i){
			let employeeModals = document.getElementsByClassName('employee-modal');
			employeeModals[i].style.visibility="hidden"
			$(employee).click(function(){
				$('#dim-screen').css('display','block')
				employeeModals[i].style.visibility = "visible"
				// $('div').not('employeeModals[i]').css('background-color','rgba(0,0,0,0.5')
			});
		})(i);
	});
}

//ajax request
$.ajax({
	url: 'https://randomuser.me/api/?results=12&nat=us,nz,gb,au',
	dataType: 'json',
	success: displayPhotos //runs the displayPhotos function if server req is successful
});

