// Selectors for the form fields
const form = $("#form");
const nameTextField = $("#name");
const emailTextField = $("#mail");
const jobRole = $("#title");
const customTitle = $("#other-title");

const shirtSize = $("#size");
const shirtDesign = $("#design");
const shirtColor = $("#color");

const activitiesSection = $(".activities");
const activitiesList = $(".activities input");
const priceArea = $("#price-area");
const total = $("#total");

const paymentMethod = $("#payment");
const creditCardInfo = $("#credit-card");
const creditCardNumber = $("#cc-num");
const creditCardZip = $("#zip");
const creditCardCvv = $("#cvv");
const creditCardExpMonth = $("#exp-month");
const creditCardExpYear = $("#exp-year");
const paypalInfo = $("#paypal-info");
const bitcoinInfo = $("#bitcoin-info");

// On page load, hide the custom title field. It will be displayed later if the user selects "Other"
customTitle.hide();

// Hide the t-shirt color menu and label
shirtColor.hide();
shirtColor.parent().hide();

// Remove isHidden class from the Total field
priceArea.removeClass("is-hidden");


// Job Role text field appears if user selects other
jobRole.on("change", function(e) {
    const valueChosen = this.value;
    if(valueChosen === "other") {
        customTitle.show();
    } else {
        customTitle.hide();
    }
});

// When design changes, only show options suitable for theme
shirtDesign.on("change", function(e) {
    const valueChosen = this.value;
    const options = $(shirtColor).children();
    shirtColor.show();
    shirtColor.parent().show();
    // if js puns, show cornflowerblue, darkslategrey, and gold
    if(valueChosen === "js puns") {
        for(var i = 0; i < options.length; i++) {
            const option = $(options[i]);
            const colorValue = options[i].value;
            if(colorValue === "cornflowerblue" || colorValue === "darkslategrey" || colorValue === "gold") {
                option.css("display", "inline-block");
            } else {
                option.css("display", "none");
            }
        }
    } else if (valueChosen === "heart js") {
        for(var i = 0; i < options.length; i++) {
            const option = $(options[i]);
            const colorValue = options[i].value;
            if(colorValue === "tomato" || colorValue === "steelblue" || colorValue === "dimgrey") {
                option.css("display", "inline-block");
            } else {
                option.css("display", "none");
            }
        };
    };
});

// React to activities list
activitiesList.on("change", function(e) {
    const eventName = this.name;
    const checkedStatus = this.checked;

    updateRunningTotal();


    // Restricts the options that occur at the same time and also toggles them
    applyRestrictions("express", "#js-frameworks");
    applyRestrictions("js-frameworks", "#express");
    applyRestrictions("js-libs", "#node");
    applyRestrictions("node", "#js-libs");

    function applyRestrictions(targetEventName, elementToChange) {
        if(eventName === targetEventName && checkedStatus) {
            // If JS-Frameworks is not checked, update the UI to disable it
            if(!($(elementToChange).prop("checked"))) {
                updateUI(elementToChange, true, true);
            }
        } else if (eventName === targetEventName && !checkedStatus){
            updateUI(elementToChange, false, false);
        }
    }

    function updateUI(element, toAdd, status) {
        $(element).prop("disabled", status);

        if(toAdd) {
            $(element).parent().addClass("disabled");
        } else {
            $(element).parent().removeClass("disabled");
        }
    }

    function updateRunningTotal() {
        var runningTotal = 0;
        for(var i = 0; i < activitiesList.length; i++) {
            const currentItem = $(activitiesList[i]);
            const price = currentItem.data("price");

            // if item is checked
            if(currentItem.prop("checked")) {
                runningTotal += price;
            }
        }

        // Update running total on the page
        total.text(runningTotal);
    }
});


// Select credit card by default and hide the Bitcoin and PayPal notes
paymentMethod.val("credit card");
paypalInfo.hide();
bitcoinInfo.hide();

paymentMethod.on("change", function(e) {
    const value = this.value;
    if(value === "paypal") {
        // User selects PayPal, hide CC and Bitcoin and show PayPal notice
        creditCardInfo.hide();
        bitcoinInfo.hide();
        paypalInfo.show();
    } else if (value === "bitcoin") {
        creditCardInfo.hide();
        paypalInfo.hide();
        bitcoinInfo.show();
    } else if (value === "credit card") {
        creditCardInfo.show();
        paypalInfo.hide();
        bitcoinInfo.hide();
    }
});

// Validate form on submit
form.on("submit", function(e) {
    e.preventDefault();

    // Resets the background color of the fields in case resubmitting to fix validation issues
    $("input").css("background", "#c1deeb");

    // Checks name field is not empty
    if(nameTextField.val() === "")
    {
        alertField(nameTextField);
    }

    // Checks for email address format
    // // Check for valid email address format; adapted from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    function checkEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const validEmail = checkEmail(emailTextField.val());
    if(validEmail === false) {
        alertField(emailTextField);
    }

    // Check if at least one activity checkbox checked
    if ($(".activities input:checked").length < 1 ){
        alertField(activitiesSection.children("label"));
    }

    // If credit card is the selected option, check all the fields are present with required lengths
    if(paymentMethod.val() === "credit card") {
        // Check CC number is 13 OR 16 digits

        if(isNumber(creditCardNumber)) {
            if(!(creditCardNumber.val().length >= 13 && creditCardNumber.val().length <= 16)) {
                alertField(creditCardNumber);
            }
        } else {
            alertField(creditCardNumber);
        }

        // Check zip code is 5 digits
        if(isNumber(creditCardZip)) {
            if(!(checkLength(creditCardZip, 5))) {
                alertField(creditCardZip);
            }
        } else {
            alertField(creditCardZip);
        }

        // Check CVV is 3 digits

        if(isNumber(creditCardCvv)) {
            if(!(checkLength(creditCardCvv, 3))) {
                alertField(creditCardCvv);
            }
        } else {
            alertField(creditCardCvv);
        }
    }

    function isNumber(input) {
        return !(isNaN(input.val()));
    }

    function checkLength(input, length) {
         return input.val().length === length;
    }

    // Highlights input as red if invalid
    function alertField(element) {
        // Takes jQuery object and makes the background red
        element.css("border", "2px solid red");
    }
});