/**
 * Initial entry point. Referenced from index.html.
 */

import WenderNode from "./WenderNode/index.mjs";
import TableWidget from "./TableWidget/index.mjs";

/**
 * "Entry point" in which a Nameplace is instantiated, configured, and finally
 * rendered. See "README.md" for more details.
 * 
 * @param {Object} event - Basic on-window-load event
 */
function onWindowLoad(event) {
    let root = new WenderNode()
        .render(window.document.body);
    let [lhs, rhs] = root.splitLR();
    let [top, bot] = rhs.splitTB();
    root.registerWidget("Table", TableWidget);
}

window.addEventListener("load", onWindowLoad);
