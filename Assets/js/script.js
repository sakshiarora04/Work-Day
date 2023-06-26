
$(document).ready(function () {
  var currentDay = $("#current-day");
  var timeBlock = $(".time-block");
  var textDesc = $(".description");
  var currentHour = dayjs().format("HH");
  //gets data from local storage
  function readTextFromStorage(key) {
    var textArea = localStorage.getItem(key);
    return textArea;
  }
  //store data to local storage
  function saveTextToStorage(key, textArea) {
    localStorage.setItem(key, textArea);
  }
  //Displays current time and date
  function displayTime() {
    var today = dayjs().format("dddd, MMMM D");
    var time = dayjs().format("hh:mm:ss A");
    currentDay.text("Date: " + "" + today + " &  Time: " + time);
  }
  //print event in textarea of different time as saved
  function printTextMsg() {
    textDesc.empty();
    timeBlock.each(function () {
      // get 'id' name of time blocks
      var key = $(this).attr("id");
      //using key to store text that belongs to that time block only
      var textArea = readTextFromStorage(key);
      $(this).children().eq(1).text(textArea);
    });
  }
  // set color for rows of different time to represent past, future and present time
  function setcolor() {
    $(".time-block").each(function () {
      // split id of time block into 2 arrays
      var hourId = this.id.split("-");
      //compare time to set or remove different class
      if (currentHour === hourId[1]) {
        $(this).addClass("present").removeClass("past future");
      } else if (currentHour > hourId[1]) {
        $(this).addClass("past").removeClass("present future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
   
  }
  // function runs when clicked on save button 
  function handleSaveBtn() {
    //display saved msg for few seconds on button click
    var msg = $(this).children(".msg");
    msg.html("saved").fadeIn("slow");
    msg.delay(1000).fadeOut("slow");
    //save the data in textarea to corresponding key of time block
    var key = $(this).parent().attr("id");
    var textArea = $(this).parent().children().eq(1).val();
    //save the text with corresponding key to local storage
    saveTextToStorage(key, textArea);
    printTextMsg();
  }
  //event handler for save button
  timeBlock.on("click", ".save-btn", handleSaveBtn);
  // displayTime();

  // printTextMsg();
  // setcolor();
  //handle clear button click to clear all textareas at once 
  $(".clear-btn").on("click", function () {
    textDesc.val("");
    localStorage.clear();
  });
 
 
  function init(){
  displayTime();
  printTextMsg();
  setInterval(displayTime, 1000);
  setcolor();
  }
  init();
});
