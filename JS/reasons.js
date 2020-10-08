var drawBars = function(reasons,target,xScale,yScale)
{
    target.selectAll("rect")
    .data(reasons)
    .enter()
    .append("rect")
    
    .attr("x",function(reasons)
         {
        return xScale(reason);
    })
    .attr("y",function(reasons)
         {
        return yScale(reason)
    })
    .attr("width",xScale.bandwidth)
    .attr("height",function(reason)
         {
        return graphDim.height-yScale(reason)
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
            class:"Percent of Cisgender Individuals",
            name:"Percent of Cisgender Individuals"
        },
        {
            class:"Percent of Transgender/Non-Binary Individuals",
            name:"Percent of Transgender/Non-Binary Individuals"
        }
    ]
}

var initGraph = function(reasons)
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
    
    var xScale = d3.scaleLinear()
    .domain([0,60])
    .range([0,graph.width])
    
    var yScale = d3.scaleBand()
    .domain(["Inability to Afford Care","Concerns About Parent/Caregiver Permissions","Concerns About Finding an LGBTQ Competent Provider","Transportation Difficulties","Fears of Being Outed","Previous Negative Experience","Lack of Providers Who Were LGBTQ"])
    .range([graph.height,0])
    
    drawAxes(graph,margins,xScale,yScale);
    
    drawBars(reasons,target,graph,xScale,yScale);
    drawLabels(graph,margins);
    drawLegend(graph,margins);
}

var reasonsPromise = d3.csv("Data/reasons.csv");
var succFCN = function(reasons)
{
    console.log("Reasons",reasons);
    
}
var failFCN = function(error)
{
    console.log("Give Me One Reason",error);
}
reasonsPromise.then(succFCN,failFCN)