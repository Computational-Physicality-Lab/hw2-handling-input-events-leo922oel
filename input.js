/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/
const target = document.getElementsByClassName("target");

for (var id=0; id < target.length; id++) {
    console.log(target[id]);
    target[id].addEventListener("click", SelectObj);
    target[id].addEventListener("mousedown", MouseHandler);
    target[id].addEventListener("dbclick", doubleclick);
}

/////// need debug
function SelectObj(e) {
    if (e.type === "click") {
        e.preventDefault();
        document.div = this;
        console.log(document.div.class);
        if (document.div.style.backgroundColor == 'rgb(255, 0, 0)') {
            console.log("blue to red");
            document.div.style.backgroundColor = 'rgb(0, 0, 255)';
        } else {
            console.log("red to blue");
            document.div.style.backgroundColor = 'rgb(255, 0, 0)';
        }
    }
}
function MouseHandler(e) {
    if (e.type === "mousedown") {
        e.preventDefault();
        document.div = this;
        document.offset = {x: e.offsetX, y:e.offsetY};
        document.addEventListener("mousemove", MouseHandler);
        document.addEventListener("mouseup", MouseHandler);
    } else if (e.type === "mousemove") {
        document.div.style.left = e.clientX - document.offset.x + "px";
        document.div.style.top = e.clientY - document.offset.y + "px";

    } else if (e.type === "mouseup") {
        document.removeEventListener("mousemove", MouseHandler);
        document.removeEventListener("mouseup", MouseHandler);
    }
}

function doubleclick(e) {
    if (e.type === "dbclick") {
        // selectObj(e);
        e.preventDefault();
        document.div = this;
        document.offset = {x: e.offsetX, y:e.offsetY};
        document.addEventListener("mousemove", doubleclick);
        document.addEventListener("mouseup", doubleclick);
    } else if (e.type === "mousemove") {
        document.div.style.left = e.clientX - document.offset.x + "px";
        document.div.style.top = e.clientY - document.offset.y + "px";

    } else if (e.type === "mouseup") {
        document.removeEventListener("mousemove", doubleclick);
        document.removeEventListener("mouseup", doubleclick);
    }
}