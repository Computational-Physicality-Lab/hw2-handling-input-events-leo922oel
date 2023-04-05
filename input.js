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
    this.offset = {x: null, y: null};
    this.pos = {left: null, top: null};

// touch event
    this.touchCount = 0;
    this.current = {x: null, y: null};
    this.prev = {x: null, y: null};
    this.prevV = {x: null, y: null};
    this.V = {x: null, y: null};
    this.last = null;
    this.lastStart = null;
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
        // workspace.addEventListener('touchcancel', this, false);
        for (let id=0; id < target.length; id++) {
            target[id].addEventListener('mousedown', this, false);
            // target[id].addEventListener('mousemove', this);
            target[id].addEventListener('mouseup', this, false);
            target[id].addEventListener('click', this, false);
            target[id].addEventListener('dblclick', this, false);
            target[id].addEventListener('touchstart', this, false);
            target[id].addEventListener('touchmove', this, false);
            target[id].addEventListener('touchend', this, false);
            // target[id].addEventListener('touchcancel', this, false);

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
                this.setTarget(e);
                isDrag = false;
                this.handlerTimer = setTimeout(this.setDrag, 200);
                break;

            case 'mousemove':
                this.state = "moving";
                console.log(this.state);
                // document.div.style.left = e.clientX - document.offset.x + "px";
                // document.div.style.top = e.clientY - document.offset.y + "px";
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
                isTouch = false;
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
                if (e.touches.length == 2) {
                    this.prevV = {x: e.touches[1].pageX - e.touches[0].pageX, y: e.touches[1].pageY - e.touches[0].pageY};
                    console.log("success pinsh");
                }

                var now = Date.now();
                this.lastStart = now;
                var time = now - (this.last || now);
                if (!this.isDblclick) this.TouchsetTarget(e);
                // this.current = {x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY};
                this.candi = (time > 0 && time < 200 && 
                    Math.abs(this.current.x - this.prev.x) < 30 &&
                    Math.abs(this.current.y - this.prev.y) < 30);
                this.last = Date.now();
                this.prev = this.current;

                isDrag = false;
                this.handlerTimer = setTimeout(this.setDrag, 100);
                e.stopPropagation();
                break;

            case 'touchmove':
                e.preventDefault();
                if (e.touches.length === 2) {
                    console.log("scale");
                    vX = e.touches[1].pageX - e.touches[0].pageX;
                    vY = e.touches[1].pageY - e.touches[0].pageY;
                    if (this.store.V.x !== null) {
                        e.scale = this.GetLen(vX, vY) / this.GetLen(this.store.V.x, this.store.V.y);
                        console.log(document.div.style.width);
                        document.div.style.width *= e.scale; 
                        console.log(document.div.style.width);
                    }
                }
                break;

            case 'touchend':
                this.state = "touchend";
                console.log(this.state);
                var Point = {x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY};
                this.touchCount++;
                console.log(this.touchCount);
                var now = Date.now();
                var time = now - (this.lastStart || now);
                this.isDblclick = (this.candi || (!this.candi && this.isDblclick && time > 100));
                console.log("dbl: " + this.isDblclick);
                
                if (this.isDblclick) {
                    this.touchCount = 0;
                    this.prev = {x: null, y: null};
                    this.DblTap(e);
                    isTouch = true;
                } else {
                    if (Math.abs(Point.x - this.current.x) < 10 && Math.abs(Point.y - this.current.y) < 10) {
                        this.Tap(e);
                    }
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
    setTarget: function setTarget(e) {
        // this.target = name;
        // console.log(this.target);
        this.div = e.target;
        this.offset = {x: e.offsetX, y: e.offsetY};
        this.pos = {left: e.target.style.left, top: e.target.style.top};
        e.stopPropagation();
    },
    TouchsetTarget: function TouchsetTarget(e) {
        touch = e.changedTouches[0];
        this.div = touch.target;
        this.pos = {left: (this.div.style.left || 0), top: (this.div.style.top || 0)};
        this.current = {x: touch.pageX, y: touch.pageY};
        this.offset = {x: this.current.x - parseInt(this.pos.left, 10), y: this.current.y - parseInt(this.pos.top, 10)};
        e.stopPropagation();
    },
    Tap: function Tap(e) {
        if (isDrag) {
            isDrag = false;
            return;
        }
        if (this.pretarget) {
            this.target = this.pretarget;
            this.pretarget = null
        }
        this.state = 'tap';
        this.target = e.changedTouches[0].target;
        console.log(this.state);
        if (this.isDblclick) {
            this.target = workspace;
            this.isDblclick = false;
        } 
    },
    DblTap: function DblTap(e) {
        this.state = 'dbltap';
        console.log(this.state);
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
                    document.div.style.left = this.store.pos.left;
                    document.div.style.top = this.store.pos.top;
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
                if (!isTouch && this.store.isDblclick) {
                    // this.target.preventDefault();
                    document.div = this.store.div;
                    if (document.div !== workspace) {
                        // console.log(document.div);
                        document.offset = {x: this.store.offset.x, y:this.store.offset.y};
                        document.addEventListener("mousemove", this.MouseHandler);
                        document.addEventListener("click", this.MouseHandler);
                    }
                } else {
                    document.removeEventListener("mousemove", this.MouseHandler);
                    // document.removeEventListener("touchmove", this.TouchHandler);
                }
                if (this.store.state === 'mousedown') {
                    document.div = this.store.div;
                    if (document.div !== workspace) {
                        // console.log(document.div);
                        document.offset = {x: this.store.offset.x, y: this.store.offset.y};
                        document.addEventListener("mousemove", this.MouseHandler);
                        document.addEventListener("mouseup", this.MouseHandler);
                    }

                }
                if (this.store.state === 'touchstart') {
                    if (this.store.isDblclick) {
                        // if (this.store.div !== workspace) {
                        // document.div = this.store.div;
                        // }
                            document.offset = {x: this.store.offset.x, y: this.store.offset.y};
                            document.addEventListener("touchmove", this.TouchHandler);

                    } else {
                        console.log("enter2");
                    document.div = this.store.div;
                    if (this.store.div !== workspace) {
                        document.offset = {x: this.store.offset.x, y: this.store.offset.y};
                        document.addEventListener("touchmove", this.TouchHandler);
                    }

                    }
                } else {
                    document.removeEventListener("touchmove", this.TouchHandler);
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
                e.preventDefault();
                console.log("scale");
                vX = e.touches[1].pageX - e.touches[0].pageX;
                vY = e.touches[1].pageY - e.touches[0].pageY;
                if (this.store.V.x !== null) {
                    e.scale = this.GetLen(vX, vY) / this.GetLen(this.store.V.x, this.store.V.y);
                    console.log(document.div.style.width);
                    document.div.style.width *= e.scale; 
                    console.log(document.div.style.width);
                }

            }
            else {
                console.log("moving when touch");
                document.div.style.left = e.touches[0].pageX - document.offset.x + "px";
                document.div.style.top = e.touches[0].pageY - document.offset.y + "px";
            }
        } else if (e.type === "touchend") {
            console.log("enter this");
            // console.log(this.store.offsetX);
            // console.log(this.store.offsetY);
            document.removeEventListener("touchmove", this.TouchHandler);
            document.removeEventListener("touchend", this.TouchHandler);
        }
    },
    GetLen: function GetLen(x, y) {
        return Math.sqrt(x * x + y * y);
    }
}

var DataStore = new Store();
DataStore.init();
Render.init(DataStore);
