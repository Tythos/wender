/**
 * 
 */

import TripletUI from "tripletui";
import RAW_TEMPLATE from "./index.hbs?raw";
import "./index.css?css";

class TableWidget extends TripletUI {
    constructor() {
        super(RAW_TEMPLATE);
    }
}

export default Object.assign(TableWidget, {
    "__tests__": {
        "exists": () => {
            expect(true).toEqual(true);
        }
    }
});
