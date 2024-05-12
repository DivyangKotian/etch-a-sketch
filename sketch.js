window.addEventListener('DOMContentLoaded', () => {   
    const gridContainer= document.querySelector(`#container`);          // container for sketching area
    const gridSlider= document.querySelector(`#pixel-range`);           // the slider itself
    const sliderValue= document.querySelector(`#slider-value`);         // span displaying slider value
    const colorValue=document.querySelector(`#color-picker`);            // value of pen color
    const rainbowMode=document.querySelector(`#rainbow-mode`);          // rainbow button
    const rainbowStatus=document.querySelector(`#btn-status`);          
    const eraserMode =document.querySelector(`#eraser-mode`);
    const eraserStatus=document.querySelector(`#eraser-status`);
    let selectedColor=`black`;                                 //initialzing the pen with a default color black
    let gridValue = gridSlider.value;                                    // Initialize gridValue here with the initial value
    let isMouseDown=false;                                               // initial value is set to off   
    let tempPixel=[]
    gridSlider.oninput = function() {                                    // on any change in slider input lets call a func to change the grid size
    sliderValue.textContent = `${this.value}*${this.value}`;         // update the slider value to current value
    gridValue=this.value;
    gridContainer.style.setProperty('--grid-size', gridValue);      // Set the custom property value for grid size for CSS
    createGrid(gridValue);                                         
    }       
    

    function createGrid(value){                                         
        gridContainer.textContent=``;                                   // empty the grid to reset on each func call
        
         for (let i=0;i<value * value;i++){                                  // creating a N*N grid
        
            tempPixel[i]=document.createElement("div");
            gridContainer.appendChild(tempPixel[i]);
            tempPixel[i].setAttribute("class","tempGrid");                  //adding a class to manipulate CSS externally
        }
    }

    rainbowMode.addEventListener(`click`,(e)=>{
        if (rainbowMode.classList.contains(`active`)){
            rainbowMode.classList.add(`inactive`);
            rainbowMode.classList.remove(`active`);
            rainbowStatus.textContent=`binary mode meh...`;
            selectedColor=colorValue.value;
        }
        else{
            rainbowMode.classList.add(`active`);
            rainbowMode.classList.remove(`inactive`);
            rainbowStatus.textContent=`NON-BINARY MODE!!!!`;
        }
    })
    
    eraserMode.addEventListener(`click`, (e)=>{
        if (eraserMode.classList.contains(`active`)){
            eraserMode.classList.add(`inactive`);
            eraserMode.classList.remove(`active`);
            eraserStatus.textContent=`Off`
            selectedColor=colorValue.value;
        }
        else{
            eraserMode.classList.add(`active`);
            eraserMode.classList.remove(`inactive`);
            eraserStatus.textContent=`On`
        }
    
    })

    
    colorValue.addEventListener('input', (e) => {
        selectedColor = colorValue.value;                               // storing color value   default black
    });
// adding event listener on grid to start painting

    document.addEventListener(`mousedown`, (e) =>{                      
            isMouseDown=true;
            if(e.target.classList.contains(`tempGrid`)){ 
            e.target.style.backgroundColor=getColor();                                              // set flag to true, to start tracking
             }
        });                       
         
    gridContainer.addEventListener(`mousemove`,(e) =>{                  // tracking mouse movement over the container to allow for dragging and coloring
        if (isMouseDown){                                          
            e.target.style.backgroundColor = getColor(e);             // changes color to pen color
            if(e.target.classList.contains(`tempGrid`)){ 
                e.target.style.backgroundColor=getColor();                                              // set flag to true, to start tracking        
        }
    } 
    });
    
    document.addEventListener('mouseup',(e)=>{                 // resetting flag upon release of M1, can be released anywhere in the doc
        isMouseDown=false;
    });

    function getColor(e) {
        let color = rainbowMode.classList.contains('inactive') ? selectedColor : '#' + Math.floor(Math.random() * 16777215).toString(16);
        if(eraserMode.classList.contains(`active`)){
            color=`white`
        }
            return color;
    }
})

