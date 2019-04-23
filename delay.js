//get original text from element
var text = document.getElementById("delay").innerHTML;
var textCount = text.length;
//clear the element so we can type it out
document.getElementById("delay").innerHTML = "";
var i = 0;
//create a variable of the setInterval function so we can call it during clearInterval if the i counter hits the end of the text length.  Otherwise, this will run infinitely.
var typeText = setInterval(function () {
    document.getElementById("delay").innerHTML += text.substring(i, i + 1);
    i++;
    if (i >= textCount) {
        clearInterval(typeText);
    }
}, 400);
