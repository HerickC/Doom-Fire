const canvaHeight = 80;
const canvaWidth = 80;
let fireDataSet = [];
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]
const debug = false;
let ProcessData = null

//Start and keep running the system
function start(){
    createDataSet();
    setFireSource();
    ProcessData = setInterval(calculateDataSet, 50)
}

function stop(){
    clearInterval(ProcessData)
}

//Create a new data set with zeros
function createDataSet(){
    let numPixels = canvaHeight * canvaWidth;
    for( let i = 0; i < numPixels; i++){
        //Set all index to 0
        fireDataSet[i] = 0; 
    }
}

function setFireSource(){
    for( let col = 0; col < canvaWidth; col++){
        let lastPixel = canvaHeight * canvaWidth;
        fireDataSet[lastPixel - canvaWidth + col] = 36;
    }
}

//Calculate new values to fire in data set
function calculateDataSet(){
    for( let col = 0; col < canvaWidth; col++){
        for( let row = 0; row < canvaHeight; row++){
            let currentPixel = row*canvaHeight + col;
            calcFireIntensity(currentPixel)
        }
    }
    renderView()
}

//Calculate the Fire "power" based in pixels below
function calcFireIntensity(pixel){
    let belowPixel = pixel + canvaWidth
    if(belowPixel >= canvaWidth*canvaHeight) {
        return false
    }

    let powerDecay = Math.floor(Math.random()*3)
    let windIntensity = Math.floor(Math.random()*2)
    fireDataSet[pixel - windIntensity] = fireDataSet[belowPixel]-powerDecay >= 0 ? fireDataSet[belowPixel]-powerDecay : 0;
}


//Renderize the view in html
function renderView(){
    let htmlTable = "<table cellpadding=0 cellspacing=0>"
    let index = 0;

    for(let row = 0; row < canvaHeight; row++){
        
        htmlTable += "<tr>";
        for(let col = 0; col < canvaWidth; col++){
            if(!debug){
                let color = fireColorsPalette[fireDataSet[index]];
                color = color.r+','+color.g+','+color.b
                htmlTable += '<td class="colorMode" style="background-color: rgb('+color+')">';
            }else{
                htmlTable += '<td class="debugMode">';
                htmlTable += '<div class="datasetIndex">'+index+'</div>';
                htmlTable += fireDataSet[index];
            }
            htmlTable += "</td>";
            index++
        }

        htmlTable += "</tr>";
    }

    htmlTable += "</table>"

    document.querySelector('#DoomFire').innerHTML = htmlTable;
}

start();