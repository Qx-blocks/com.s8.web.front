

import { S8WebFront } from '/s8-web-front/S8WebFront.js';
import { NeObject } from '/s8-io-bohr-neon/NeObject.js';
import { Popover } from '/s8-web-front/carbide/popover/Popover.js';
import { S8 } from '/s8-io-bohr-atom/S8.js';


S8WebFront.CSS_import("/s8-web-front/carbide/objform/ObjForm.css");
S8WebFront.CSS_import("/s8-web-front/carbide/objform/ObjFormOptions.css");


export const getColor = function (code) {
    switch (code) {
        case 0x00: return "white";
        case 0x01: return "grey";
        case 0x02: return "blue";
        case 0x03: return "purple";
        case 0x04: return "yellow";
        case 0x05: return "green";
        default: throw "Unsupported color code";
    }
}



export class ObjFormElement extends NeObject {



    /** @type{HTMLDivElement} */
    fieldNode;


    /**
     * @type{HTMLDivElement}
     */
    infoNode;

    /**
     * @type{Popover}
     */
    tooltip = null;

    /**
     * 
     */
    documentation = null;

    constructor() {
        super();
        this.fieldNode = document.createElement("div");
    }

    getEnvelope() {
        return this.fieldNode;
    }





    createInfoNode() {
        this.infoNode = document.createElement("div");
        this.infoNode.classList.add("objform-info");

        let innerNode = document.createElement("span");
        innerNode.innerHTML = "?";
        this.infoNode.appendChild(innerNode);

        this.infoNode.setAttribute("enabled", "false");

        /*
        const _this = this;
        this.infoNode.addEventListener("mouseenter", function(event){
            event.stopPropagation();
            if(_this.tooltip !=null){ _this.tooltip.show(); }
        });
        this.infoNode.addEventListener("mouseleave", function(event){
            event.stopPropagation();
            if(_this.tooltip !=null){ _this.tooltip.hide(); }
        });
        */
        return this.infoNode;
    }


    S8_set_tooltip(tooltip) {
        /* clear previous */
        if (this.tooltip != null) { this.infoNode.removeChild(this.tooltip.getEnvelope()); }

        if (tooltip != null) {
            this.tooltip = tooltip;
            this.infoNode.appendChild(this.tooltip.getEnvelope());
            this.infoNode.setAttribute("enabled", "true");
            this.tooltip.show(); /* CSS controlled */
        }
        else { // tooltip == null
            this.infoNode.setAttribute("enabled", "false");
        }
    }



    createPlusNode() {
        this.plusNode = document.createElement("div");
        this.plusNode.classList.add("objform-icon-dots");
        this.plusNode.setAttribute("enabled", "false");
        this.plusNode.innerHTML = ` <svg 
            width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
            <circle cx="8" cy="32" r="8" />
            <circle cx="32" cy="32" r="8" />
            <circle cx="56" cy="32" r="8" />
        </svg>`;

        /* create optionsPopover */
        this.optionsPopover = new Popover();
        this.optionsPopover.setTheme("dark");
        this.optionsPopover.setDirection("left-top");
        this.optionsPopover.hide();
        this.plusNode.appendChild(this.optionsPopover.getEnvelope());

        /* -X- */
        const _this = this;
        this.plusNode.addEventListener("click", function (event) {
            event.stopPropagation();

            S8.branch.setFocusOn(_this.optionsPopover);
            _this.optionsPopover.show();

            _this.S8_vertex.runVoid("on-options-required");
        });
        return this.plusNode;
    }


    S8_set_hasOptions(isEnabled) {
        if (isEnabled) {
            this.plusNode.setAttribute("enabled", "true");
        }
        else { // options == null
            this.plusNode.setAttribute("enabled", "false");
        }
    }


    /**
     * 
     * @param {Popover} options 
     */
    S8_set_options(options) {
        this.optionsPopover.S8_set_content(options);
    }

}

