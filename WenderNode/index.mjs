/**
 * 
 */

import TripletUI from "tripletui";
import RAW_TEMPLATE from "./index.hbs?raw";
import "./index.css?css";

var REGISTERED_WIDGETS = [];

class WenderNode extends TripletUI {
    constructor() {
        super(RAW_TEMPLATE);
        this.lhs = null;
        this.rhs = null;
        this.top = null;
        this.bot = null;
        this.widget = null; // instance of TripletUI
        this._isRoot = true;
        this.dragStart = null;
    }

    registerWidget(title, TripletClass) {
        // in the future, this could also include an icon path and category for dropdown organization
        REGISTERED_WIDGETS.push({
            "title": title,
            "TripletClass": TripletClass
        });
    }

    get isRoot() {
        return this._isRoot;
    }

    set isRoot(v) {
        if (this.subdom) {
            if (v) {
                this.subdom.classList.add("WenderRoot");
            } else {
                this.subdom.classList.remove("WenderRoot");
            }
        }
    }

    onSubdomMousedown(event) {
        // ignore if leaf
        if (event.target.classList.contains("WenderLeaf")) { return; }

        // if LHS button, begin dragging
        this.dragStart = [event.clientX, event.clientY];
    }

    onSubdomMousemove(event) {
        // ignore if not dragging
        if (this.dragStart === null) { return; }

        // compute delta
        let dx = event.clientX - this.dragStart[0];
        let dy = event.clientY - this.dragStart[1];

        // adjust lhs/rhs if LR split

        // adjust top/bot if TB split
    }

    onSubdomMouseup(event) {
        // ignore if leaf
        if (event.target.classList.contains("WenderLeaf")) { return; }

        // if LHS button, end dragging
        this.dragStart = null;
    }

    render(attachment) {
        super.render(attachment);
        this.subdom.addEventListener("mousedown", this.onSubdomMousedown.bind(this));
        this.subdom.addEventListener("mouseup", this.onSubdomMouseup.bind(this));
        this.subdom.addEventListener("mousemove", this.onSubdomMousemove.bind(this));
        this.subdom.addEventListener("mouseout", this.onSubdomMouseup.bind(this));
        this.subdom.classList.add("WenderNode");
        this.subdom.classList.add("WenderLeaf");
        if (this.isRoot) {
            this.subdom.classList.add("WenderRoot");
        }
        return this;
    }

    splitLR() {
        // clear subdom
        this.subdom.innerHTML = "";

        // no longer a leaf
        this.subdom.classList.remove("WenderLeaf");
        this.widget = null;

        // no longer T/B
        this.subdom.classList.remove("WenderTB");
        this.top = null;
        this.bot = null;

        // generate and return L/R leafs
        this.subdom.classList.add("WenderLR");
        this.lhs = new WenderNode().render(this.subdom);
        this.lhs.isRoot = false;
        this.rhs = new WenderNode().render(this.subdom);
        this.rhs.isRoot = false;
        return [
            this.lhs,
            this.rhs
        ];
    }

    splitTB() {
        // clear subdom
        this.subdom.innerHTML = "";

        // no longer a leaf
        this.subdom.classList.remove("WenderLeaf");
        this.widget = null;

        // no longer L/R
        this.subdom.classList.remove("WenderLR");
        this.lhs = null;
        this.rhs = null;

        // generate and return T/B leafs
        this.subdom.classList.add("WenderTB");
        this.top = new WenderNode().render(this.subdom);
        this.top.isRoot = false;
        this.bot = new WenderNode().render(this.subdom);
        this.bot.isRoot = false;
        return [
            this.top,
            this.bot
        ];
    }
}

export default Object.assign(WenderNode, {
    "__tests__": {
        "exists": () => {
            expect(true).toEqual(true);
        }
    }
});
