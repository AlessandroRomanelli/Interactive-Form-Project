//Problem: Form compiling is not user-friendly
//Solution: Add interactivity



// ===== 1st task: Set focus on the first text field

 //When the page loads,
 $(document).ready(function(){
   //Give focus to the first text field
   $("input[type=text]")[0].focus();
   disableSubmit();
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
var $submitButton = $("form").children().last(),

    nameNotBlank = false,
    otherNotBlank = false,

    validMail = false,
    validRole = false,
    validActivity = false,
    validCC = false,
    validForm = false,

    validNum = false,
    validZIP = false,
    validCVV = false;
//Function to enable submit button
function enableSubmit() {
  $submitButton.prop("disabled", false);
  $submitButton.removeClass("disabled");
}

//Function to disable submit button
function disableSubmit() {
  $submitButton.prop("disabled", true);
  $submitButton.addClass("disabled");
}

//Function to check if the passed string is blank
function isBlank(str) {
    var isBlank = (!str || /^\s*$/.test(str));
    return isBlank;
}

//Function that removes error class when the class is true
function validation(validClass, $object) {
  if (!validClass) {
    $object.addClass("content-error");
    $object.prev().addClass("header-error");
  } else {
    $object.removeClass("content-error");
    $object.prev().removeClass("header-error")
  }
}

//Validation of name when the field is modified, changed or blurred
//Checks that the name isn't equal to an empty string
$("#name").on("keypress change blur", function() {
  nameNotBlank = !isBlank($(this).val());
  validation(nameNotBlank, $("#name"));
  var originalHeader = $(this).prev().text()
  if (!nameNotBlank) {
    if ($(this).prev().text().length < 10) {
      $(this).prev().append($("<span> (Please provide a valid name)</span>"))
    }
  } else {
    $(this).prev().children().remove();
  }
});

//Validation of mail when the field is modified, changed or blurred
//Checks that the mail is formatted in the following way: xxxx@xxx.xxx
$("#mail").on("keypress change blur", function() {
  var regex = new RegExp ("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
  validMail = regex.test($(this).val());
  validation(validMail, $("#mail"));
  if (!validMail) {
    if ($(this).prev().text().length < 10) {
      $(this).prev().append($("<span> (Please provide a valid email address)</span>"))
    }
  } else {
    $(this).prev().children().remove();
  }
})

//Validation of title when a select is chosen,
//Checks that the title is selected
$("#title").on("blur change", function() {
  validRole = $("#title").val() !== null;
  //If the other role is chosen and no further action is taken, returns false
  if ($("#title").val() == "other" || !validRole) {
    validRole = false;
  }
  validation(validRole, $("#title"));
  if (!validRole) {
    if ($(this).prev().text().length < 10) {
      $(this).prev().append($("<span> (Please specify a valid job role)</span>"))
    }
  } else {
    $(this).prev().children().remove();
  }
})

//Validation of other-title field textarea (needs to be coded like this or the
//validation of a dynamically generated element wouldn't work)
//Checks that the textarea is not an empty string, if it is, returns false, else true
$(document).on("keyup change blur", "#other-title", function() {
  otherNotBlank = !isBlank($("#other-title").val());
  if (otherNotBlank) {
    validRole = true;
    $(this).prev().prev().children().remove();
  } else {
    validRole = false;
  }
  validation(otherNotBlank, $("#other-title"));
  $(this).prev().removeClass("header-error");
  validation(validRole, $("#title"))
});

$("#design").change(function() {
  if ($(this).val() !== null) {
    $(".shirt legend").children().remove();
  }
})

//Validation of activities
//Checks that at least one activity is selected
$(".activities").change(function() {
  if ($("#design").val() == null) {
    if ($(".shirt legend").text().length < 15) {
      $(".shirt legend").append("<span style='color:#ff2222'><br>Don't forget to pick a T-shirt!")
    }
  }
  validActivity = ($(".activities input:checked").length > 0);
  if (!validActivity) {
    if ($(".activities legend").text().length < 30) {
      $(".activities legend").append($("<span style='color:#ff2222'><br> Please chose at least one activity</span>"))
    } else {
    $(".activities legend").children().remove();
    }
  }
})

//Validation of payment
//Checks that the payment is different from the credit-card, if it is, return true
$("#payment").change(function() {
  if ($("#design").val() == null) {
    if ($(".shirt legend").text().length < 15) {
      $(".shirt legend").append("<span style='color:#ff2222'><br>Don't forget to pick a T-shirt!")
    }
  }
  if (!validActivity) {
    if ($(".activities legend").text().length < 30) {
      $(".activities legend").append($("<span style='color:#ff2222'><br> Please chose at least one activity</span>"))
    }
  }
  if ($("#payment").val() !== "credit card" && $("#payment").val() !== null) {
    validCC = true;
  } else {
    validCC = false;
  }
});

//Validation of credit card number
//Input already accepts only numbers, therefore only checks if length is between 13 and 16
$("#cc-num").on("change blur keyup", function() {
  var ccNum = $("#cc-num").val();
  if (ccNum.length >= 13 && ccNum.length <= 16) {
    validNum = true;
  } else {
    validNum = false;
  }
  validation(validNum, $("#cc-num"));
});

//Validation of zip code
//Input already accepts only numbers, only checks if length = 5
$("#zip").on("change blur keyup", function () {
  var zip = $("#zip").val();
  if (zip.length == 5) {
    validZIP = true;
  } else {
    validZIP = false;
  }
  validation(validZIP, $("#zip"));
});

//Validation of cvv code
//Input already accepts only numbers, only checks if length = 3
$("#cvv").on("change blur keyup", function () {
  var cvv = $("#cvv").val();
  if (cvv.length == 3) {
    validCVV = true;
  } else {
    validCVV = false;
  }
  validation(validCVV, $("#cvv"));
})

//Validation of credit credit-card
//If all of the three above conditions are true, credit-card is valid
$("#credit-card input").on("change blur keyup", function() {
  if (validNum && validZIP && validCVV) {
    validCC = true;
  } else {
    validCC = false;
  }
})

//Enable/Disable of submit button
//Periodically checks the document for the conditions to be all true, when they are
//enable the button, when they aren't disable it
$(document).on("keyup change", "input, select, textarea", function() {
  validForm = nameNotBlank && validMail && validRole && validActivity && validCC;
  console.log("The form is valid? "+validForm);
  if (validForm) {
    enableSubmit();
  } else {
    disableSubmit();
  }
})
