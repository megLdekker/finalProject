var drawMap = function(populationData,target,pathGen,projection)
{
    target.selectAll("path")
    .data(populationData)
    .enter()
    .append("path")
    .attr("d",pathGen)
}


var initGraph = function(populationData)
{
    var screen = {width:800,height:600}
    var margins = {left:30,right:20,top:20,bottom:30}
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height-margins.top-margins.bottom
        }
    console.log(graph);
   
    
    d3.select("svg")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("svg")
    .append("g")
    .attr("id","#graph")
    .attr("transform","translate("+margins.left+","+margins.top+")");
    
    var projection = d3.geoAlbersUsa()
    
    var pathGen = d3.geoPath()
    .projection(projection)
    drawMap(populationData,target,pathGen,projection);
}

var populationPromise = d3.csv("Data/LGBTPopulation.csv");
var succFCN = function(populations)
{
    console.log("Populations",populations);
    
}
var failFCN = function(error)
{
    console.log("Pop Not Found",error);
}
populationPromise.then(succFCN,failFCN)