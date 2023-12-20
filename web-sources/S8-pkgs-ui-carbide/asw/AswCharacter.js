
import { S8 } from '/S8-core-bohr-atom/S8.js';
import { NeObject } from '/S8-core-bohr-neon/NeObject.js';


import { AswCharacterAttitude } from '/S8-pkgs-ui-carbide/asw/AswCharacterAttitude.js';
import { AswCharacterSentence } from '/S8-pkgs-ui-carbide/asw/AswCharacterSentence.js';


/**
 * 
 */
S8.import_CSS('/S8-pkgs-ui-carbide/asw/Asw.css');


export const VOICE_SYNTH = window.speechSynthesis;

/**
 * 
 */
export class AswCharacter extends NeObject {

    viewportX = 25;
    viewportY = 25;
    viewportWidth = 30;
    viewportHeight = 30;


    /**
     * @type {AswCharacterAttitude[]}
     */
    attitudes = [];

    /**
     * @type {Image[]}
     */
    faceImages;

    faceNode;

    /**
     * @type {number}
     */
    faceIndex = 0;


    voiceName = "Aurelie";

    isLoaded = false;

    onButtonPressed;


    /**
     * @type {AswCharacterSentence[]}
     */
    speechSequence = new Array();



	isActivated = false;


    constructor() {
        super();
        this.wrapperNode = document.createElement("div");
        this.wrapperNode.classList.add("asw-character");

        this.faceImageNode = document.createElement("img");

        this.buttonNode = document.createElement("button");
        this.buttonNode.innerHTML = "Start talking!";
        this.buttonNode.style.display = "hidden";

        let _this = this;
        this.onButtonPressed = function (e) { _this.activate(); }
        this.buttonNode.addEventListener("click", this.onButtonPressed);

        this.wrapperNode.appendChild(this.faceImageNode);
        this.wrapperNode.appendChild(this.buttonNode);

        console.log("this");
    }



    getEnvelope() {
        return this.wrapperNode;
    }


    /**
     * 
     * @param {*[]} elements 
     */
    S8_set_elements(elements) {
        elements.forEach(element => {
            if (element != null) {
                this.wrapperNode.appendChild(element.getEnvelope());
            }
        });
    }


    S8_set_viewportX(x) {
        this.viewportX = x;
    }

    S8_set_viewportY(y) {
        this.viewportY = y;
    }

    S8_set_viewportWidth(width) {
        this.viewportWidth = width;
    }

    /**
     * 
     * @param {AswAttitude[]} attitudes 
     */
    S8_set_attitudes(attitudes) {
        this.attitudes = attitudes;
        this.attitudes.forEach(attitude => {
            attitude.character = this;
            attitude.load();
        });
    }

    /**
    * 
    * @param {AswCharacterSentence[]} attitudes 
    */
    S8_set_speechSequence(sentences) {
        sentences.forEach(sentence => this.speechSequence.push(sentence));
    }


    S8_render() {
        /* continuous rendering approach... */
		if(this.isActivated){
			this.talk();
		}
		else{
			this.repaint(this.attitudes[0]);
		}
    }


    S8_dispose() { /* no disposing to be done... */ }



    notifyAttitudeLoaded() {
        let isLoaded = true;
        this.attitudes.forEach(attitude => {
            if (!attitude.isLoaded) {
                isLoaded = false;
            }
        });
        this.isLoaded = isLoaded;

        if (this.isLoaded) {
            this.showButton();
        }
    }

    activate() {
        this.hideButton();
		this.isActivated = true;
        this.talk();
    }


    talk() {
        if (this.speechSequence.length > 0) {
            let sentence = this.speechSequence.shift();
            let attitude = this.attitudes[sentence.attitudeIndex];
            let text = sentence.text;
            let pause = sentence.pause;
            let _this = this;
            this.repaint(attitude);
            attitude.say(text, pause, function () {
                _this.talk();
            });
        }
        /* now: time to listen */
        else{
            this.listen();
        }
    }

    listen() {
        let _obj = this;
        SPEECH_RECKOGNITION.listen(
            function (text) { 
                console.log("Well understood:"+text);
                _obj.S8_vertex.runStringUTF8("answer", text);
            },
            function () { 
                console.log("Not understood");
                _obj.S8_vertex.runVoid("notUnderstood");
            });
    }


    /**
    * 
    * @param {AswAttitude} attitude 
    */
    repaint(attitude) {
        //this.wrapperNode.style.width = `${this.viewportWidth}%`;
       // this.wrapperNode.style.top = `${this.viewportY}%`;
        //this.wrapperNode.style.left = `${this.viewportX}%`;

        this.faceImageNode.src = attitude.faceImage.src;
    }

    showButton() {
        this.buttonNode.style.display = "block";
    }

    hideButton() {
        this.buttonNode.style.display = "none";
    }
}




class AswSpeechReckognition {


    /**
     * @type {webkitSpeechRecognition}
     */
    recognition = new webkitSpeechRecognition();

    constructor() {

        this.recognition = new webkitSpeechRecognition();
        // var speechRecognitionList = new SpeechGrammarList();
        this.recognition.continuous = false;
        this.recognition.lang = 'fr-FR';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
    }

    listen(onHeard, onNotUnderstood) {


        let isUnderstood = false;

        this.recognition.onresult = function (event) {
            isUnderstood = true;
            let result = event.results[0][0];
            console.log('result:' + result.transcript);
            console.log('Confidence: ' + result.confidence);
            // this.recognition.stop();
            onHeard(result.transcript);
        }

        this.recognition.onend = function (event) {
            if (!isUnderstood) {
                // this.recognition.stop();
                onNotUnderstood();
            }
        }

        this.recognition.start();
    }

    display(logText) {
        return logText + ", LISTENING";
    }
}

export const SPEECH_RECKOGNITION = new AswSpeechReckognition();