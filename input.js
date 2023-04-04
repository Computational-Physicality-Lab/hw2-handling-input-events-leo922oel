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
    this.div = null;
    this.isDblclick = false;
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
                this.setTarget(e, e.offsetX, e.offsetY);
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
                this.target = e.target;
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
            case 'touchstart':
                this.state = "touchstart";
                console.log(this.state);
                e.preventDefault();
                this.setTarget(e, e.offsetX, e.offsetY);
                isDrag = false;
                this.handlerTimer = setTimeout(this.setDrag, 200);
                break;
            case 'touchmove':
                break;
            case 'touchstend':
                break;
            case 'touchcancel':
                break;
        }
        window.dispatchEvent(new Event('render_view'));
    },
    setTarget: function setTarget(e, offsetX, offsetY) {
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
                    if (target[id] == this.store.target) {
                        target[id].style.backgroundColor = 'blue';
                        this.target = target[id];
                    }
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
