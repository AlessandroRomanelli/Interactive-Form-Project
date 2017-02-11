//Problem: Form compiling is not user-friendly
//Solution: Add interactivity

// ===== 1st task: Set focus on the first text field

 //When the page loads,
 $(document).ready(function(){
   //Give focus to the first text field
   $("input[type=text]")[0].focus();
   $("form").children().last().prop("disabled", true);
  $("form").children().last().addClass("disabled");
 });

// ===== 2nd task: ”Job Role” section of the form:

//When Job Role option changes
$("select#title").change(function(){
  //jQuery rappresentation of the textField                              v-----  Text that will hide automatically with user input
  var $textField = $('<textarea id="other-title" name="user_title" placeholder=" Please specify your job role... "></textarea>');
  //If the option "Other" is selected
  if ($("select#title").val() == "other") {
    //Append the textarea to the end of the first fieldset
    $("fieldset").first().append($textField);
    //Slide in animation
    $textField.hide().slideDown("fast");
    //Give the new generated content the focus for the user to type in
    $textField.focus();
  } else {
    $("#other-title").slideUp("fast", function() {this.remove()});
  }
});

// ===== 3rd task: ”T-Shirt Info” section of the form:

//Creating empty arrays to store the colors
var  $punsColors = [],
        $heartJS = [],
    $colorOptions = $("select#color").children();
//Hiding the t-shirt color select+label
$("#colors-js-puns").hide();
//Dividing the six colors into the two arrays
for (i = 0; i < $colorOptions.length; i++) {
  //First three colors in the first array
  if (i < 3) {
  $punsColors.push($colorOptions[i]);
  //Second three colors in the second array
  } else {
    $heartJS.push($colorOptions[i]);
  }
}

//On Design select change
$("select#design").change(function(){
  //Clear the option list
  $colorOptions.remove();
  //Rendering the color select+label
  $("#colors-js-puns").show();
  //If Design Menu value is "js puns"
  if ($("select#design").val() == "js puns") {
    //Append the first array to the options
    $("select#color").append($punsColors);
    //Otherwise
  } else
  //If Design Menu value is "heart js"
  if ($("select#design").val() == "heart js") {
    //Append the second array to the options
    $("select#color").append($heartJS);
    //Otherwise (meaning no design is selected) hide the color select+label
  } else {
    $("#colors-js-puns").hide()
  }
});

// ===== 4th task: ”Register for Activities” section of the form:

var $checkbox = $(".activities input");
//When a checkbox changes status
$checkbox.change(function(){
//(Re)Calculate total purchase:
  var money = 0,
      $moneySpan = $("<span>Total purchase: $</span>"),
      $checkedCB = $(".activities input:checked");
  //Go through all checked items
  for (i = 0; i < $checkedCB.length; i++) {
    //Sum all the values
    money += parseInt($checkedCB[i].value);
  }
  //Print the new value at the end of the list
  $moneySpan.append(money);
  $(".activities span").remove();
  $(".activities").append($moneySpan);

//Declaring a function to exclude conflicting dayTimes
function checkboxEsclusion (dayTime) {
  //If there is atleast one checked element
  if ($(dayTime+":checked").length > 0){
    //Then disable each element with same dayTime
    $(dayTime).each(function(){
      $(this).prop("disabled", true);
      //Add
      $(this).parent().addClass("conflict");
    });
  } else {
    //Else enable each element
    $(dayTime).each(function(){
      $(this).prop("disabled", false);
      $(this).parent().removeClass("conflict")
    });
  }
}
  //Call the function on tuesday morning and afternoon elements
  checkboxEsclusion(".tuesday.am");
  checkboxEsclusion(".tuesday.pm");
  //Keep the already checked items enabled
  $(".tuesday:checked").prop("disabled", false);
  $(".tuesday:checked").parent().removeClass("conflict")
});

// ===== 5th task: Payment Info section of the form:

//Hide all payment methods but the credit-card method, default
$("#credit-card").nextAll().hide();
//When payment select changes option
$("#payment").change(function(){
  //If paypal is selected,
  if ($("#payment").val() == "paypal") {
    //Hide all elements
    $("#payment").nextAll().slideUp();
    //..but PayPal!
    $("#credit-card").next().slideDown();
    //Else if bitcoin is selected
  } else if ($("#payment").val() == "bitcoin") {
    //Hide all elements
    $("#payment").nextAll().slideUp();
    //... but BitCoin!
    $("#payment").nextAll().last().slideDown();
    //Otherwise if credit card is selected AND the div is hidden
  } else if ($("#payment").val() == "credit card" && $("#credit-card").prop("style")[0] == "display") {
    //Hide all elements
    $("#payment").nextAll().slideUp();
    //But the Credit Card
    $("#payment").next().slideDown();
  }
})

// ===== 5th task: Form validation:

//Function to enable submit button
function enableSubmit() {
  $("form").children().last().prop("disabled", false);
  $("form").children().last().removeClass("disabled");
}

//Function to disable submit button
function disableSubmit() {
  $("form").children().last().prop("disabled", true);
  $("form").children().last().addClass("disabled");
}

//Function to check if string is empty
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

//Function to check if e-mail format is valid
function emailIsValid(){
   var regex = new RegExp ("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
   return regex.test($("#mail").val());
}

//Function to check if role has been selected
function roleIsSelected() {
  return $("#title").val() !== null
}

//Function to check that atleast an activity has been picked
function activityIsValid(){
  return ($(".activities input:checked").length > 0)
}

//Function to check if credit card number is between 13 and 16
function CCIsValid(){
  var str = $("#cc-num").val().replace(/-/g, "");
  console.log(str);
  return str.length >= 13 && str.length <= 16
}

//TO MYSELF: MAKE IT SO THAT THESE TWO TAKE ONLY NUMBERS
//Function to check if ZIP code is valid
function zipIsValid(){
  return $("#zip").val().length == 5;
}

//Function to check if CVV is valid
function cvvIsValid(){
  return $("#cvv").val().length == 3;
}

//After leaving a field
$("fieldset").change(function(){
  //If any of this conditions is true
  if (
      !isBlank($("#name").val()) &&
      emailIsValid() &&
      roleIsSelected() &&
      activityIsValid()
    ) {
  if ($("#title").val() == "other"){
    if (!isBlank($("#other-title").val())){
      //If credit card div is displayed
      if ($("#payment").val() == null || $("#payment").val() == "credit card") {
          //If the credit card data is correct
          if (CCIsValid() && zipIsValid() && cvvIsValid()) {
            //Enable the submit button
            enableSubmit();
          //Otherwise disable it
          } else {
            disableSubmit();
          }
        //Otherwise if users selects other payment methods, enable
        } else {
          enableSubmit();
        }
      }
    }
  }
});
