/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
document.addEventListener('DOMContentLoaded', function() {
	var form = document.getElementById('signup');
    var states = form.elements['state'];
    var option;
	var idx;
	var state;

    for (idx = 0; idx < usStates.length;++idx) { 
        state = usStates[idx];
        option = document.createElement('option');
        option.innerHTML = state.name;
        option.value = state.code;
        states.appendChild(option);
    }

    //var optionButton = document.getElementById('occupation').value = "other";
    var occupationSelect = document.getElementById('occupation');
    occupationSelect.addEventListener('change', function() {
    	if("other" == occupationSelect.value) {
    		form.elements['occupationOther'].style.display = "block";
    	}
    	else {
    		form.elements['occupationOther'].style.display = "none";
    	}
    });

    var nothx = document.getElementById('cancelButton');
    nothx.addEventListener('click', function() {
        if(window.confirm('Are you sure you want to leave?')) {
            window.location = 'http://www.google.com/';
        }
    });
    form.addEventListener('submit', onSubmit);
});

function onSubmit(eventObj) {
    var form = document.getElementById('signup');
    var firstName = document.getElementById('firstName').value;
    var lastName = form.elements['lastName'].value;
    var address = document.getElementById('address1').value;
    var city = document.getElementById('city').value;
    var state = form.elements['state'].value;
    var zip = form.elements['zip'].value;
    var birthday = document.getElementById('birthdate').value;
    var occupationSelect = document.getElementById('occupation');
    var date = new Date(birthday);
    var today = new Date();
    var occupationOther = form.elements['occupationOther'];
    var zipRegExp = new RegExp('^\\d{5}$');
    var valid = true;
    try {
        valid = validateForm(this);
    }
    catch(exception) {
        valid = false; //stop form submission to see error
    }
    if (!valid && eventObj.preventDefault) {
            eventObj.preventDefault(); 
    }
    //use new standard preventDefault() if available
    
    event.returnValue = valid; //for older browsers
    return valid;

    function validateForm() {
        var validation = true;
        if (firstName == "") {
            document.getElementById('firstName').className = 'form-control invalid-field';
            validation = false;
        }
        else {
            document.getElementById('firstName').className = 'form-control';
        }
        if (lastName == "") {
            form.elements['lastName'].className = 'form-control invalid-field';
            validation = false;
        }
        else {
            form.elements['lastName'].className = 'form-control';
        }
        if (address == "") {
            document.getElementById('address1').className = 'form-control invalid-field';
            validation = false;
        }
        else {
            document.getElementById('address1').className = 'form-control';
        }
        if (city == "") {
            document.getElementById('city').className = 'form-control invalid-field';
            validation = false;
        }
        else {
            document.getElementById('city').className = 'form-control';
        }
        if (state == "") {
            form.elements['state'].className = 'form-control invalid-field';
            validation = false;
        }
        else {
            form.elements['state'].className = 'form-control';
        }
        if (zip == "") {
            form.elements['zip'].className = 'form-control invalid-field';
            validation = false;
        }
        else if(zip != "") {
            if (!zipRegExp.test(zip)) {
                form.elements['zip'].className = 'form-control invalid-field';
                validation = false;
            }
            else {
                form.elements['zip'].className = 'form-control';
            }
        } 
        if(occupationSelect.value == "other" && occupationOther.value == "") {
            occupationOther.className = 'form-control invalid-field';
            validation = false;
        }
        else {
            occupationOther.className = 'form-control';
        }
        if(birthday == "") {
            document.getElementById('birthdate').className = 'form-control invalid-field';
            validation = false;
        }
        else if(birthday != "") {
            var yearsDiff = today.getFullYear() - date.getUTCFullYear();
            var monthsDiff = today.getMonth() - date.getUTCMonth();
            var daysDiff = today.getDate() - date.getUTCDate();
            if (((yearsDiff < 13) || (yearsDiff == 13 && monthsDiff < 0)) || 
                ((yearsDiff == 13 && monthsDiff == 0) && (daysDiff < 0))) 
            {
                var message = document.getElementById('birthdateMessage');
                message.innerHTML = "sorry boss u gotta be at least 13";
                document.getElementById('birthdate').className = 'form-control invalid-field';
                validation = false;
            }
            else {
                var message = document.getElementById('birthdateMessage');
                message.innerHTML = "";
                document.getElementById('birthdate').className = 'form-control';
            }
        }
        return validation;
    }

}

