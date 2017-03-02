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

const paymentMethod = $("#payment");
const creditCardInfo = $("#credit-card");
const creditCardNumber = $("#cc-num");
const creditCardZip = $("#zip");
const creditCardCvv = $("#cvv");
const creditCardExpMonth = $("#exp-month");
const creditCardExpYear = $("#exp-year");

// On page load, hide the custom title field. It will be displayed later if the user selects "Other"
customTitle.hide();


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


// Validate form on submit
form.on("submit", function(e) {
    e.preventDefault();

    // Make sure name is not blank
    if(nameTextField.val() === "")
    {
        nameTextField.css("background-color", "red");
    }

    // Check for valid email address format
});