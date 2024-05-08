window.addEventListener('DOMContentLoaded', () => {   
const gridContainer= document.querySelector(`#container`);          // container for sketching area
const gridSlider= document.querySelector(`#pixel-range`);           // the slider itself
const sliderValue= document.querySelector(`#slider-value`);         // span displaying slider value
const colorValue=document.querySelector(`#color-picker`)            // value of pen color
let selectedColor=colorValue.value;                                 //initialzing the pen with a default color black

const rainbowMode=document.querySelector(`#rainbow-mode`);



let gridValue = gridSlider.value;                                    // Initialize gridValue here with the initial value

gridSlider.oninput = function() {                                    // on any change in slider input lets call a func to change the grid size
    sliderValue.textContent = `${this.value}*${this.value}`;         // update the slider value to current value
    gridValue=this.value;
    gridContainer.style.setProperty('--grid-size', gridValue);      // Set the custom property value for grid size for CSS
    createGrid(gridValue);                                         
}       

function createGrid(value){                                         
    gridContainer.textContent=``;                                   // empty the grid to reset on each func call
    
    for (i=0;i<value * value;i++){                                  // creating a N*N grid
        
        const tempPixel=document.createElement("div");
        gridContainer.appendChild(tempPixel);
        tempPixel.setAttribute("class","tempGrid")                  //adding a class to manipulate CSS externally
    }
}

colorValue.addEventListener('input', (e) => {
    selectedColor = colorValue.value;                               // storing color value   default black
});


// adding event listener is added accross the whole document to allow users to leave and enter canvas while holding M1

let rainbowOn=false;                                                 // initial flag for rainbow is off

rainbowMode.addEventListener(`click`,(e)=>{
    rainbowOn=!rainbowOn;
})
console.log(rainbowOn);
let isMouseDown=false;                                               // initial value is set to off   

            document.addEventListener(`mousedown`, (e) =>{                      
                isMouseDown=true;                                               // set flag to true, to start tracking
            });                       
            
            gridContainer.addEventListener(`mousemove`,(e) =>{                  // tracking mouse movement over the container to allow for dragging and coloring
                    if (isMouseDown){                                          
                    e.target.style.backgroundColor = selectedColor;             // changes color to pen color
                } 
                })
                
                document.addEventListener('mouseup',(e)=>{                 // resetting flag upon release of M1
                    isMouseDown=false;
                })
})

