/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/
// const target = document.querySelectorAll(".target");
var target = document.querySelectorAll(".target");
for (var id=0; id < target.length; id++) {
    var style = getComputedStyle(target[id]);
    console.log(target[id]);
    target[id].addEventListener(
        "click", 
        (e) => {
            // var style = getComputedStyle(target[id]);
            if (style.backgroundColor == "rgb(255, 0, 0)") {
                // target[id].removeAttribute('background-color');
                e.currentTarget.style.backgroundColor = 'blue';
                console.log(getComputedStyle(e.currentTarget))
                // target.setAttribute('background-color', 'red');
                // style.setProperty("background-color", "blue");
                // target[id].innerHTML = 'red'
            } else if (style.backgroundColor == "rgb(0, 0, 255)") {
                // target[id].removeAttribute('background-color');
                // target[id].setAttribute('background-color', 'blue');
                console.log("rrrrrr");
                e.currentTarget.style.backgroundColor = 'red';
                // style.setProperty("background-color", "red");
            }
        },
        false
    );
}