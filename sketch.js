window.addEventListener('DOMContentLoaded', () => {   
const gridContainer= document.querySelector(`#container`);          // container for sketching area
const gridSlider= document.querySelector(`#pixel-range`);           // the slider itself
const sliderValue= document.querySelector(`#slider-value`);         // span displaying slider value


let gridValue = gridSlider.value;                                   // Initialize gridValue here with the initial value
  
    gridSlider.oninput = function() {                               // on any change in slider input lets call a func to change the grid size
        sliderValue.textContent = `${this.value}*${this.value}`;                       // update the slider value to current value
        gridValue=this.value;
        gridContainer.style.setProperty('--grid-size', gridValue);   // Set the custom property value for grid size for CSS
        createGrid(gridValue);                                      // func to create a grid
    }       
   
   
   
   function createGrid(value){
    let isMouseDown=false;                               // initial value is set to off   
    gridContainer.textContent=``;                       // empty the grid to reset on each func call
        for (i=0;i<value * value;i++){                  // creating a N*N grid

            const tempPixel=document.createElement("div");
            gridContainer.appendChild(tempPixel);

            tempPixel.style.backgroundColor = "white";
            tempPixel.setAttribute("class","tempGrid")      //adding a class to manipulate CSS externally
            
            tempPixel.addEventListener(`mousedown`, (e) =>{
                isMouseDown=true;                        // set flag to true, to start tracking
            });                       
            
            gridContainer.addEventListener(`mousemove`,(e) =>{                  // tracking mouse movement over the container to allow for dragging and coloring
                    if (isMouseDown){                                           // if mouse 1 is held down only then change color
                    (e).target.style.backgroundColor="red";
                } 
                })
                
                // event listener is added accross the whole document to avoid glitch where user can leave container which will not capture mouseup even in the container
                document.addEventListener('mouseup',(e)=>{                 // resetting flag upon release of M1
                    isMouseDown=false;
                })
        }
    }
})

