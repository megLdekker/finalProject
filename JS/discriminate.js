var drawBars = function(hates,target,xScale,yScale)
{
    target.selectAll("rect")
    .data(hates)
    .enter()
    .append("rect")
    
    .attr("x",function(hates)
         {
        return xScale(hate);
    })
    .attr("y",function(hates)
         {
        return yScale(hate)
    })
    .attr("width",xScale.bandwidth)
    .attr("height",function(hate)
         {
        return graphDim.height-yScale(hate)
    })
          
          }
var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}

var drawAxes = function(graphDim,margins,xScale,yScale)
{
    
    
}

var drawLabels = function(graphDim,margins)
{
    
}

var drawLegend = function(graphDim,margins)
{
    var categories = [
        {
            class:"Gender Expression",
            name:"Gender Expression"
        },
        {
            class:"Sexual Orientation",
            name:"Sexual Orientation"
        }
    ]
}

var initGraph = function(hates)
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
    
    var xScale = d3.scaleBands()
    .domain(["Gay and Lesbian","Bisexual","Pansexual","Queer","Questioning"])
    .range([0,graph.width])
    
    var yScale = d3.scaleLinear()
    .domain(["0","80"])
    .range([graph.height,0])
    
    drawAxes(graph,margins,xScale,yScale);
    
    drawBars(hates,target,graph,xScale,yScale);
    drawLabels(graph,margins);
    drawLegend(graph,margins);
}

var hatePromise = d3.csv("Data/discriminate.csv");
var succFCN = function(hates)
{
    console.log("hates",hates);
    
}
var failFCN = function(error)
{
    console.log("We Hate to See It",error);
}
hatePromise.then(succFCN,failFCN)