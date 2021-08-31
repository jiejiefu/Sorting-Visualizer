import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations, MergeSortDesc} from '../SortingAlgorithms/MergeSort';
import {getQuickSortAnimations, QuickSortDesc} from '../SortingAlgorithms/QuickSort';
import {getBubbleSortAnimations, BubbleSortDesc} from '../SortingAlgorithms/BubbleSort';
import {getInsertionSortAnimations, InsertionSortDesc} from '../SortingAlgorithms/InsertionSort';
import {getHeapSortAnimations, HeapSortDesc} from '../SortingAlgorithms/HeapSort';
import {getSelectionSortAnimations, SelectionSortDesc} from '../SortingAlgorithms/SelectionSort';
import SortInfo from '../components/SortInfo';
//Changing width,height accordingly with the browser
let WINDOW_WIDTH = window.innerWidth;
let WINDOW_HEIGHT = window.innerHeight;
let NUMBER_OF_ARRAY_BARS = 57;
let ANIMATION_SPEED_MS = 5; //Animation Speed (how fast color changes, how fast height gets overwritten)

const PRIMARY_COLOR = 'PaleTurquoise'; //Normal color of bars
const SECONDARY_COLOR = 'red'; //Color of bars when they are being compared


//Tooltips for buttons
const DISABLED_BUTTON = "Currently Disabled";
const ENABLED_BUTTON = {
    nlogn: "O(NlogN) Time Complexity",
    nSquare: "O(N^2) Time Complexity"
}

const ALGORITHM_DESC = {
    'Bubble Sort': BubbleSortDesc,
    'Selection Sort': SelectionSortDesc,
    'Insertion Sort': InsertionSortDesc,
    'Merge Sort': MergeSortDesc,
    'Quick Sort': QuickSortDesc,
    // 'Quick Sort 3': QuickSort3Desc,
    'Heap Sort': HeapSortDesc,
    // 'Shell Sort': ShellSortDesc
  };
// @CSALS
class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            desc: {}
        };
    }
    componentDidMount() {
        this.resetArray();
        window.addEventListener('load', this.showHeight);
    }
    componentWillUnmount() { 
        window.removeEventListener('load', this.showHeight)  
    }
    //Generates new random array 
    resetArray() {
        const array = []
        // NUMBER_OF_ARRAY_BARS = document.getElementById("sizeSlider").value; //Need to change bar weight as well to place all bars into WINDOW_WIDTH
        for (let i = 0;i < NUMBER_OF_ARRAY_BARS;i++) {
            array.push(randomIntFromInterval(25,WINDOW_HEIGHT-50)); //random array
        }
        this.setState({array: array});
        this.restoreStoreButtons();
    }
    showHeight() {
        // *** make showHeight(button) to be a boolean variable to toggle ***
        let showHeight = false;
        if (showHeight == true) {
            const arrayBars = document.getElementsByClassName('array-bar');
            for (let i = 0;i < arrayBars.length;i++) {
                // if (arrayBars[i].matches(':hover')) console.log(arrayBars[i].offsetHeight);
                let barHeight = arrayBars[i].offsetHeight;
                arrayBars[i].addEventListener('mouseenter', () => {
                    if (arrayBars[i].childNodes.length == 0) {
                        let span = document.createElement("span");
                        span.style.position = "absolute";
                        span.innerHTML = barHeight;
                        arrayBars[i].appendChild(span);
                    } else if (barHeight != arrayBars[i].childNodes[0].innerHTML) {
                        arrayBars[i].childNodes[0].innerHTML = barHeight;
                    }
                });
            }
        }
    }
    restoreStoreButtons() {
        let buttonTags = document.getElementsByTagName("button");
        // console.log(buttonTags);
        for (let i = 1; i < buttonTags.length; i++) {
            buttonTags[i].disabled = false; // can be clicked
            let buttonStyle = buttonTags[i].style;
            buttonTags[i].title = ENABLED_BUTTON.nSquare;
            if (buttonTags[i].id === "mergeSort" || buttonTags[i].id === "heapSort")
                buttonTags[i].title = ENABLED_BUTTON.nlogn;
            buttonStyle.background = "#47535E";
            buttonStyle.cursor = "pointer";
        }
    }
    disableSortButtons() {
        let buttonTags = document.getElementsByTagName("button");
        // i = 0 button = "Generate New Array"
        for (let i = 1; i < buttonTags.length; i++) {
            buttonTags[i].disabled = true;
            let buttonStyle = buttonTags[i].style;
            buttonTags[i].title = DISABLED_BUTTON;
            buttonStyle.cursor = "default";
            buttonStyle.background = "#000000";
        }
    }
    //Sorting Algorithms
    mergeSort() {
        this.disableSortButtons();
        const [animations,sortArray] = getMergeSortAnimations(this.state.array);
        // console.log(animations);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] == "comparision1" || animations[i][0] == "comparision2";
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const [comparision, barOneIndex, barTwoIndex] = animations[i];
                const color = (animations[i][0] == "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                //If we don't multiply by the index then every animations[i] wait for exactly ANIMATION_SPEED_MS and immediately change into final state
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
                
            }
            else {
                setTimeout(() => {
                    const [overwrite, barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                  },i * ANIMATION_SPEED_MS);
            }
        }
        // this.setState({array: sortArray})
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
        setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME); 
    }

    getAnimations(algorithm) {
        this.disableSortButtons();
        let animations, sortArray = [];
        let DONE_COLOR;
        switch (algorithm) {
            case 'Merge Sort': {
                [animations,sortArray] = getMergeSortAnimations(this.state.array);
                DONE_COLOR = 'BlanchedAlmond';
                break;
            }
            case 'Quick Sort': {
                [animations,sortArray] = getQuickSortAnimations(this.state.array);
                DONE_COLOR = 'LightPink';
                break;
            }
            case 'Bubble Sort': {
                [animations,sortArray] = getBubbleSortAnimations(this.state.array);
                DONE_COLOR = 'LightSkyBlue';
                break;
            }
            case 'Insertion Sort': {
                [animations,sortArray] = getInsertionSortAnimations(this.state.array);
                DONE_COLOR = 'Plum';
                break;
            }
            case 'Heap Sort': {
                [animations,sortArray] = getHeapSortAnimations(this.state.array);
                DONE_COLOR = 'Pink';
                break;
            }
            case 'Selection Sort': {
                [animations,sortArray] = getSelectionSortAnimations(this.state.array);
                DONE_COLOR = 'DarkSeaGreen';
                break;
            }
            default:
                break;
        }
        if (animations && animations.length > 0) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const animationsProgress = document.getElementById('animationsProgress');

            for (let i = 0; i < animations.length; i++) {
                const isColorChange = animations[i][0] == "comparision1" || animations[i][0] == "comparision2";
                
                if(isColorChange === true) {
                    const color = (animations[i][0] == "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                    const [comparision, barOneIndex, barTwoIndex] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    const barTwoStyle = arrayBars[barTwoIndex].style;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    },i * ANIMATION_SPEED_MS);
                }
                else {
                    const [swap, barIndex, newHeight] = animations[i];
                    if (barIndex === -1) {
                        continue;
                    }
                    const barStyle = arrayBars[barIndex].style;
                    setTimeout(() => {
                        barStyle.height = `${newHeight}px`;
                        if (swap == "done") barStyle.backgroundColor = DONE_COLOR;
                    },i * ANIMATION_SPEED_MS);  
                }
                // show the progress of animations
                setTimeout(() => {
                    animationsProgress.innerHTML = `${i+1} / ${animations.length}`;
                    this.showHeight();
                },i * ANIMATION_SPEED_MS);
            }
            // this.setState({array: sortArray})
            const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
            setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);
            this.setState({desc: ALGORITHM_DESC[algorithm]});
        }
    }
    quickSort() {
        this.disableSortButtons();
        const [animations,sortArray] = getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] == "comparision1" || animations[i][0] == "comparision2";
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (animations[i][0] == "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [comparision, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [swap, barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS);  
            }        }
        // this.setState({array: sortArray})
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
        setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);  
    }
    bubbleSort() {
        this.disableSortButtons();
        const [animations,sortArray] = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] == "comparision1" || animations[i][0] == "comparision2";
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (animations[i][0] == "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [comparision, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [swap, barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS);  
            }
        }
        // this.setState({array: sortArray})
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
        setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);  
    }
    insertionSort() {
        this.disableSortButtons();
        const [animations,sortArray] = getInsertionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (animations[i][0] === "comparision1") || (animations[i][0] === "comparision2");
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (animations[i][0] === "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [temp, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [temp, barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS);  
            }
        }
        // this.setState({array: sortArray})
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
        setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME); 
    }
    heapSort() {
        this.disableSortButtons();
        const [animations,sortArray] = getHeapSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] == "comparision1" || animations[i][0] == "comparision2";
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (animations[i][0] == "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [comparision, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [swap, barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS);  
            }
        }
        // this.setState({array: sortArray})
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
        setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);  
    }
    selectionSort() {
        this.disableSortButtons();
        const [animations,sortArray] = getSelectionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (animations[i][0] === "comparision1") || (animations[i][0] === "comparision2");
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (animations[i][0] === "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [temp, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [temp, barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS);  
            }
        }
        // this.setState({array: sortArray})
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
        setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME); 
    }
    render() {
        const array = this.state.array;
        const desc = this.state.desc;
        const SORT_BUTTONS = 7;
        const TOTAL_BUTTONS = 1 + SORT_BUTTONS;
        return(
            <React.Fragment>
            <div className="array-container" style={{position:'absolute', right:'20px'}}>
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                        backgroundColor: PRIMARY_COLOR,
                        height: `${value}px`
                        }}
                    ></div>
                ))}
            </div>
            <div className="buttons" > 
                <button title="Generates a new random array" style={{position:'relative',left:`${0*(WINDOW_WIDTH-20)/TOTAL_BUTTONS}px`}} onClick={() => this.resetArray()}>
                    Generate New Array
                </button>
                <button title="O(NlogN) Time Complexity" id = "mergeSort" style={{position:'relative',left:`${0.5*(WINDOW_WIDTH-20)/TOTAL_BUTTONS}px`}} onClick={() => this.getAnimations('Merge Sort')}>
                    Merge Sort
                </button>
                <button title="O(N^2) Time Complexity" id = "quickSort" style={{position:'relative',left:`${1.0*(WINDOW_WIDTH-20)/TOTAL_BUTTONS}px`}} onClick={() => this.getAnimations('Quick Sort')}>
                    Quick Sort
                </button>
                <button title="O(N^2) Time Complexity" id = "bubbleSort" style={{position:'relative',left:`${1.5*(WINDOW_WIDTH-20)/TOTAL_BUTTONS}px`}} onClick={() => this.getAnimations('Bubble Sort')}>
                    Bubble Sort
                </button>
                <button title="O(N^2) Time Complexity" id = "insertionSort" style={{position:'relative',left:`${2.0*(WINDOW_WIDTH-20)/TOTAL_BUTTONS}px`}} onClick={() => this.getAnimations('Insertion Sort')}>
                    Insertion Sort
                </button>
                <button title="O(NlogN) Time Complexity" id = "heapSort" style={{position:'relative',left:`${2.5*(WINDOW_WIDTH-20)/TOTAL_BUTTONS}px`}} onClick={() => this.getAnimations('Heap Sort')}>
                    Heap Sort
                </button>
                <button title="O(N^2) Time Complexity" id = "selectionSort" style={{position:'relative',left:`${3.0*(WINDOW_WIDTH-20)/TOTAL_BUTTONS}px`}} onClick={() => this.getAnimations('Selection Sort')}>
                    Selection Sort
                </button>
            </div>    
            <h2>Progress <br/>
                <span id = "animationsProgress"></span>
            </h2>
            <div class="slidecontainer">
                <input type="range" min="1" max="100" value="57" id="sizeSlider" onChange={()=> this.resetArray()}/>
            </div>
            <div className="algorithm-container">
                <SortInfo {...desc} />
            </div>
            
            </React.Fragment>
        );
    }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;


