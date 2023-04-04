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
var isTouch = false;

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

// touch event
    this.touchCount = 0;
    this.currentX = null;
    this.currentY = null;
    this.prevX = null;
    this.prevY = null;
    this.last = null;
    this.preVX = null;
    this.preVY = null;
    this.VX = null;
    this.VY = null;
}

Store.prototype = {
    init: function store_init(element) {
        window.addEventListener('keydown', this, false);
        workspace.addEventListener('mousedown', this, false);
        workspace.addEventListener('mouseup', this, false);
        workspace.addEventListener('click', this, false);
        workspace.addEventListener('dblclick', this, false);
        workspace.addEventListener('touchstart', this, false);
        // workspace.addEventListener('touchmove', this, false);
        workspace.addEventListener('touchend', this, false);
        workspace.addEventListener('touchcancel', this, false);
        for (let id=0; id < target.length; id++) {
            target[id].addEventListener('mousedown', this, false);
            // target[id].addEventListener('mousemove', this);
            target[id].addEventListener('mouseup', this, false);
            target[id].addEventListener('click', this, false);
            target[id].addEventListener('dblclick', this, false);
            target[id].addEventListener('touchstart', this, false);
            target[id].addEventListener('touchend', this, false);
            target[id].addEventListener('touchcancel', this, false);

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
                if (e.detail == 2 || this.isDblclick) break;
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
                isTouch = true;
                this.state = "touchstart";
                console.log(this.state);
                // e.preventDefault();
                if (e.touches.length == 1) this.TouchsetTarget(e, e.offsetX, e.offsetY);
                if (e.touches.length == 2) {
                    this.preVX = e.touches[1].clientX - e.touches[0].clientX;
                    this.preVY = e.touches[1].clientY - e.touches[0].clientY;
                }
                
                var now = Date.now();
                var time = now - (this.last || now);
                this.isDblclick = (time > 0 && time < 200 && 
                    Math.abs(this.currentX - this.prevX) < 30 &&
                    Math.abs(this.currentY - this.prevY) < 30);
                console.log("touch is dbl: " + this.isDblclick);
                this.last = Date.now();
                isDrag = false;
                this.handlerTimer = setTimeout(this.setDrag, 100);
                e.stopPropagation();
                break;

            case 'touchmove':
                this.state = "touchmove";
                console.log(isDrag);
                e.stopPropagation();
                break;

            case 'touchend':
                this.state = "touchend";
                console.log(this.state);
                this.touchCount++;
                console.log(this.touchCount);
                if (this.touchCount == 2) {
                    this.touchCount = 0;
                } 
                e.stopPropagation();
                break;

            case 'touchcancel':
                console.log("touchcancel");
                this.state = "idle";
                if (!this.isDblclick) this.pretarget = this.target;
                // this.target = 'workspace';
                this.isDblclick = false;
                this.handlerTimer = null;
                isDrag = false;
                isEsc = true;
                break;
        }
        window.dispatchEvent(new Event('render_view'));
    },
    setTarget: function setTarget(e, offsetX, offsetY) {
        // this.target = name;
        // console.log(this.target);
        this.div = e.target;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.left = e.target.style.left;
        this.top = e.target.style.top;
        e.stopPropagation();
    },
    TouchsetTarget: function TouchsetTarget(e) {
        this.div = e.touches[0].target;
        this.left = e.touches[0].target.style.left;
        this.top = e.touches[0].target.style.top;
        this.prevX = this.currentX;
        this.prevY = this.currentY;
        this.currentX = e.touches[0].clientX;
        this.currentY = e.touches[0].clientY;
        this.offsetX = this.currentX - parseInt(this.left, 10);
        this.offsetY = this.currentY - parseInt(this.top, 10);
        // this.offsetX = e.touches[0].clientX - parseInt(this.left, 10);
        // this.offsetY = e.touches[0].clientY - parseInt(this.top, 10);
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
                    if (document.div !== workspace) {
                        document.div = this.store.div;
                        // console.log(document.div);
                        document.offset = {x: this.store.offsetX, y:this.store.offsetY};
                        document.addEventListener("mousemove", this.MouseHandler);
                        document.addEventListener("click", this.MouseHandler);
                    }
                } else {
                    document.removeEventListener("mousemove", this.MouseHandler);
                }
                // console.log("drag: " + isDrag);
                if (this.store.state === 'mousedown') {
                    document.div = this.store.div;
                    if (document.div !== workspace) {
                        // console.log(document.div);
                        document.offset = {x: this.store.offsetX, y:this.store.offsetY};
                        document.addEventListener("mousemove", this.MouseHandler);
                        document.addEventListener("mouseup", this.MouseHandler);
                    }

                }
                if (isTouch) {
                    if (this.store.isDblclick) {
                        // this.target.preventDefault();
                        document.div = this.store.div;
                        if (document.div !== workspace) {
                            // console.log(document.div);
                            document.offset = {x: this.store.offsetX, y:this.store.offsetY};
                            document.addEventListener("touchmove", this.TouchHandler);
                            document.addEventListener("touchend", this.TouchHandler);
                        // } else {
                            // document.removeEventListener("mousemove", this.MouseHandler);
                        }
                    }
                }
                if (this.store.state === 'touchstart') {
                    document.div = this.store.div;
                    if (document.div !== workspace) {
                        // console.log(document.div);
                        document.offset = {x: this.store.offsetX, y:this.store.offsetY};
                        document.addEventListener("touchmove", this.TouchHandler);
                        document.addEventListener("touchend", this.TouchHandler);
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
    },
    TouchHandler: function TouchHandler(e) {
        if (e.type === "touchmove") {
            if (e.touches.length === 2) {
                // e.preventDefault();
                console.log("scale");
                vX = e.touches[1].clientX - e.touches[0].clientX;
                vY = e.touches[1].clientY - e.touches[0].clientY;
                if (this.store.preVX !== null) {
                    e.scale = this.GetLen(vX, vY) / this.GetLen(this.store.preVX, this.store.preVY);
                }
                document.div.style.width *= e.scale; 
                console.log(document.div.style.width);

            }
            console.log("moving");
            document.div.style.left = e.touches[0].clientX - document.offset.x + "px";
            document.div.style.top = e.touches[0].clientY - document.offset.y + "px";
        // } else if (e.type === "mouseup") {
            // console.log("enter this");
            // console.log(this.store.offsetX);
            // console.log(this.store.offsetY);
            // document.removeEventListener("mousemove", this.MouseHandler);
            // document.removeEventListener("mouseup", this.MouseHandler);
        }
    },
    GetLen: function GetLen(x, y) {
        return Math.sqrt(x * x + y * y);
    }
}

var DataStore = new Store();
DataStore.init();
Render.init(DataStore);
