/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/
const target = document.querySelectorAll(".target");

for (var id=0; id < target.length; id++) {
    var bg = target[id];
    console.log(bg);
    target[id].addEventListener(
        "click", 
        (e) => {
            // var style = getComputedStyle(target[id]);
            if (target[id].background-color == 'blue') {
                target[id].removeAttribute('background-color');
                target.setAttribute('background-color', 'red');
            } else {
                target[id].removeAttribute('background-color');
                target[id].setAttribute('background-color', 'blue');
            }
        },
        false
    );
}