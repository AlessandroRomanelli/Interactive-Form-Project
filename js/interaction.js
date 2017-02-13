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
    validForm = false;

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

function isBlank(str) {
    var isBlank = (!str || /^\s*$/.test(str));
    return isBlank;
}

function valid(trueClass, $object) {
  if (trueClass) {
    $object.removeClass("error");
  }
}

function error(falseClass, $object) {
  if (!falseClass) {
    $object.addClass("error");
  }
}

$("#name").on("keyup change", function() {
  nameNotBlank = !isBlank($(this).val());
  valid(nameNotBlank, $("#name"));
  error(nameNotBlank, $("#name"));
});

$("#mail").on("keyup change focus", function() {
  var regex = new RegExp ("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
  validMail = regex.test($(this).val());
  valid(validMail, $("#mail"));
  error(validMail, $("#mail"));
})

$("#title").change(function() {
  validRole = $("#title").val() !== null;
  if ($("#title").val() == "other") {
    validRole = false;
  }
  valid(validRole, $("#title"));
  error(validRole, $("#title"));
})

$(document).on("keyup change focus", "#other-title", function() {
  otherNotBlank = !isBlank($("#other-title").val());
  if (otherNotBlank) {
    valid(validRole, $("#title"));
    valid(otherNotBlank, $("#other-title"));
    validRole = true;
  } else {
    validRole = false;
    error(validRole, $("#title"));
    error(otherNotBlank, $("#other-title"));
  }
});

$(".activities").change(function() {
  validActivity = ($(".activities input:checked").length > 0);
  valid(validActivity, $(".activities"));
  error(validActivity, $(".activities"));
})

$("#payment").change(function() {
  if ($("#payment").val() !== "credit card" && $("#payment").val() !== null) {
    validCC = true;
  } else {
    validCC = false;
  }
});

$("#credit-card input").keyup(function() {
  if ($("#payment").val() == "credit card" || $("#payment").val() == null) {
    var ccNum = $("#cc-num").val(),
          zip = $("#zip").val(),
          cvv = $("#cvv").val(),
          validNum = false,
          validZIP = false,
          validCVV = false;
    if (ccNum.length >= 13 && ccNum.length <= 16) {
      validNum = true;
    } else {
      validNum = false;
    }
    valid(validNum, $("#cc-num"));
    error(validNum, $("#cc-num"));
    if (zip.length == 5) {
      validZIP = true;
    } else {
      validNum = false;
    }
    valid(validZIP, $("#zip"));
    error(validZIP, $("#zip"));
    if (cvv.length == 3) {
      validCVV = true;
    } else {
      validCVV = false;
    }
    valid(validCVV, $("#cvv"));
    error(validCVV, $("#cvv"))
    if (validNum && validZIP && validCVV) {
      validCC = true;
    } else {
      validCC = false;
    }
  }
  valid(validCC, $("#credit-card"));
  error(validCC, $("#credit-card"));
})

$(document).on("keyup change", "input, select, textarea", function() {
  validForm = nameNotBlank && validMail && validRole && validActivity && validCC;
  console.log(validForm);
  if (validForm) {
    enableSubmit();
  } else {
    disableSubmit();
  }
})
