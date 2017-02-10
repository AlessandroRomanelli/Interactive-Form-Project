//Problem: Form compiling is not user-friendly
//Solution: Add interactivity

// ===== 1st task: Set focus on the first text field

 //When the page loads,
 $(document).ready(function(){
   //Give focus to the first text field
   $("input[type=text]")[0].focus();
   //Give the credit-card number a mask to reduce user input errors
   jQuery(function($){
   $("#cc-num").mask("9999-9999-9999-9999", {placeholder:"XXXX-XXXX-XXXX-XXXX"});
});
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

//When a checkbox changes status
var $checkbox = $(".activities input");
var checkedClass = "";

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

  //If there is atleast one element checked on tuesday morning
  if ($(".tuesday.am:checked").length > 0){
    //Then disable each element
    $(".tuesday.am").each(function(){
      $(this).prop("disabled", true);
      $(this).parent().addClass("error");
    });
  } else {
    //Else enable each element
    $(".tuesday.am").each(function(){
      $(this).prop("disabled", false);
      $(this).parent().removeClass("error")
    });
  }
  //If there is atleast one element on tuesday afternoon
  if ($(".tuesday.pm:checked").length > 0){
    $(".tuesday.pm").each(function(){
      $(this).prop("disabled", true)
      $(this).parent().addClass("error");
    })
  } else {
    $(".tuesday.pm").each(function(){
      $(this).prop("disabled", false);
      $(this).parent().removeClass("error")
    })
  }
  //Keep the already checked items enabled
  $(".tuesday:checked").prop("disabled", false);
  $(".tuesday:checked").parent().removeClass("error")
});

// ===== 5th task: ”Register for Activities” section of the form:

//Hide all payment methods but the credit-card method, default
//Based on the value of the payment method select
  //Display only one at a time
