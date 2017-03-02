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



form.on("submit", function(e) {
    e.preventDefault();

    if(nameTextField.val() === "")
    {
        nameTextField.css("background-color", "red");
    }
});