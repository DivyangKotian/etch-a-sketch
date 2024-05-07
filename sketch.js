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
    gridContainer.textContent=``;                       // empty the grid to reset on each func call
        for (i=0;i<value * value;i++){

            const tempPixel=document.createElement("div");
            gridContainer.appendChild(tempPixel);
            tempPixel.style.backgroundColor = "white";
            tempPixel.setAttribute("class","tempGrid")
        }
    } 
})

