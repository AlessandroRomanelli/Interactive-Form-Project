//Problem: Form compiling is not user-friendly
//Solution: Add interactivity

// ===== 1st task: Set focus on the first text field

 //When the page loads,
 $(document).ready(function(){
   //Give focus to the first text field
   $("input[type=text]")[0].focus();
 });

// ===== 2nd task: ”Job Role” section of the form:

//When Job Role option changes
$("select#title").change(function(){
  //If the option "Other" is selected
  if ($("select#title").val() == "other") {
    //jQuery rappresentation of the textField                              v-----  Text that will hide automatically with user input
    var $textField = $('<br><textarea id="other-title" name="user_title" placeholder="Please specify your job role... "></textarea>');
    //Append the textarea to the end of the first fieldset
    $("fieldset").first().append($textField);
    //Slide in animation
    $textField.hide().slideDown();
    //Give the new generated content the focus for the user to type in
    $textField.focus();
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
