/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/
const workspace = document.querySelector("#workspace");
var target = document.querySelectorAll(".target");

var isDrag = false;
var isEsc = false;

function Store() {
    this.state = 'idle';
    this.target = 'workspace';
    // this.e = null;
    this.div = null;
    this.isDblclick = false;
    // this.isDrag = false;
    this.handlerTimer = null;
    this.offsetX = null;
    this.offsetY = null;
    this.left = null;
    this.top = null;
}

Store.prototype = {
    init: function store_init(element) {
        // const workspace = document.querySelector("#workspace");
        // var target = document.querySelectorAll(".target");
        window.addEventListener('keydown', this);
        workspace.addEventListener('mousedown', this);
        workspace.addEventListener('mouseup', this);
        workspace.addEventListener('click', this);
        workspace.addEventListener('dblclick', this);
        for (let id=0; id < target.length; id++) {
            target[id].addEventListener('mousedown', this);
            // target[id].addEventListener('mousemove', this);
            target[id].addEventListener('mouseup', this);
            target[id].addEventListener('click', this);
            target[id].addEventListener('dblclick', this);
        }
    },
    handleEvent: function store_handleEvent(e) {
        switch (e.type) {
            case 'keydown':
                if (e.code === "Escape") {
                console.log("esc");
                this.state = "idle";
                if (!this.isDblclick) this.pretarget = this.target;
                // this.target = 'workspace';
                this.isDblclick = false;
                this.handlerTimer = null;
                isDrag = false;
                isEsc = true;
                }
                break;
                
            case 'mousedown':
                this.state = "mousedown";
                console.log(this.state);
                e.preventDefault();
                this.setTarget(e, 'target0', e.offsetX, e.offsetY);
                // switch (e.target) {
                    // case target[0]:
                        // this.setTarget(e, 'target0', e.offsetX, e.offsetY);
                        // break;
                    // case target[1]:
                        // this.setTarget(e, 'target1', e.offsetX, e.offsetY);
                        // break;
                    // case target[2]:
                        // this.setTarget(e, 'target2', e.offsetX, e.offsetY);
                        // break;
                    // case workspace:
                        // this.setTarget(e, 'workspace', null, null);
                        // break;
                // }
                isDrag = false;
                this.handlerTimer = setTimeout(this.setDrag, 200);
                break;
            case 'mousemove':
                this.state = "moving";
                console.log(this.state);
                document.div.style.left = e.clientX - document.offset.x + "px";
                document.div.style.top = e.clientY - document.offset.y + "px";
                break;
            case 'click':
                if (e.detail == 2) break;
                if (isDrag) {
                    isDrag = false;
                    e.stopPropagation();
                    break;
                }
                if (this.pretarget) {
                    this.target = this.pretarget;
                    this.pretarget = null
                    break;
                }
                this.state = 'click';
                switch (e.target) {
                    case target[0]:
                        this.target = 'target0';
                        break;
                    case target[1]:
                        this.target = 'target1';
                        break;
                    case target[2]:
                        this.target = 'target2';
                        break;
                    case workspace:
                        this.target = 'workspace';
                        break;
                }
                console.log(this.state);
                if (this.isDblclick) this.isDblclick = false;
                e.stopPropagation();
                break;
            case 'dblclick':
                this.state = 'dblclick';
                console.log(this.state);
                if (this.div !== null && this.div !== workspace) this.isDblclick = true;
                e.stopPropagation();
                break;
            case 'mouseup':
                this.state = 'idle';
                if (!isDrag) {
                    clearTimeout(this.handlerTimer);
                    console.log("mouse up from click");
                } else {
                    // isDrag = false;
                    console.log("mouse up from drag");
                }
                e.stopPropagation();
                break;
        }
        window.dispatchEvent(new Event('render_view'));
    },
    setTarget: function setTarget(e, name, offsetX, offsetY, left, top) {
        // this.target = name;
        console.log(this.target);
        this.div = e.target;
        // document.offset = {x: e.offsetX, y:e.offsetY};
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.left = e.target.style.left;
        this.top = e.target.style.top;
        console.log(this.offsetX);
        console.log(this.offsetY);
        e.stopPropagation();
    },
    setDrag: function setDrag() {
        isDrag = true;
    }
};

var Render = {
    init: function view_init(store) {
        // this.element = view;
        this.store = store;
        this.target = null;
        window.addEventListener('render_view', this);
    },
    handleEvent: function render_handleEvent(e) {
        switch (e.type) {
            case 'render_view':
                if (isEsc) {
                    document.div.style.left = this.store.left;
                    document.div.style.top = this.store.top;
                    this.store.div = null;
                    document.removeEventListener("mousemove", this.MouseHandler);
                    document.removeEventListener("mouseup", this.MouseHandler);
                    isEsc = false;
                }
                for (let id=0; id < target.length; id++) {
                    target[id].style.backgroundColor = 'red';
                }
                switch (this.store.target) {
                    case 'target0':
                        target[0].style.backgroundColor = 'blue';
                        this.target = target[0];
                        break;
                    case 'target1':
                        target[1].style.backgroundColor = 'blue';
                        this.target = target[1];
                        break;
                    case 'target2':
                        target[2].style.backgroundColor = 'blue';
                        this.target = target[2];
                        break;
                    case 'workspace':
                        break;
                }
                if (this.store.isDblclick) {
                    // this.target.preventDefault();
                    document.div = this.store.div;
                    console.log(document.div);
                    document.offset = {x: this.store.offsetX, y:this.store.offsetY};
                    document.addEventListener("mousemove", this.MouseHandler);
                    document.addEventListener("click", this.MouseHandler);
                } else {
                    document.removeEventListener("mousemove", this.MouseHandler);
                }
                // console.log("drag: " + isDrag);
                if (this.store.state === 'mousedown') {
                    document.div = this.store.div;
                    if (document.div !== workspace) {
                        console.log(document.div);
                        document.offset = {x: this.store.offsetX, y:this.store.offsetY};
                        document.addEventListener("mousemove", this.MouseHandler);
                        document.addEventListener("mouseup", this.MouseHandler);
                    }

                }
        }
    },
    MouseHandler: function MouseHandler(e) {
        if (e.type === "mousemove") {
            console.log("moving");
            document.div.style.left = e.clientX - document.offset.x + "px";
            document.div.style.top = e.clientY - document.offset.y + "px";
        // } else if (e.type === "mouseup") {
            // console.log("enter this");
            // console.log(this.store.offsetX);
            // console.log(this.store.offsetY);
            // document.removeEventListener("mousemove", this.MouseHandler);
            // document.removeEventListener("mouseup", this.MouseHandler);
        }
    }
}

var DataStore = new Store();
DataStore.init();
Render.init(DataStore);

for (var id=0; id < target.length; id++) {
    // window.setTimeout(target[id].addEventListener("dblclick", doubleclick), 1000);
    // target[id].addEventListener("click", SelectObj);
    // target[id].addEventListener("dblclick", doubleclick);
    // target[id].addEventListener("mousedown", MouseHandler);
}

let clicktimer, mousetimer;

function MouseHandler(e) {
    if (e.type === "mousedown") {
        e.preventDefault();
        document.div = this;
        console.log(this);
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