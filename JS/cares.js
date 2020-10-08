var drawcare1= function(care,target,graphDim,xScale,yScale,colorScale)
{
    target.selectAll("rect")
    .data(care)
    .enter()
    .append("rect")
    
   
    
    .attr("x",function(care)
         {
        console.log(care.cisgen)
        return xScale(care.Reasons);
    })
    .attr("y",function(care)
         {console.log(yScale(care.cisgen))
        return yScale(care.cisgen)
    })
    
   .attr("width",xScale.bandwidth)
    .attr("height",function(care)
         {
        console.log(yScale(care.cisgen))
        return graphDim.height-yScale(care.cisgen)
    })
    
    .attr("fill",function(care)
         {
        return colorScale("cisgen")
    })
    
          }
var drawcare2= function(care,target,graphDim,xScale,yScale,colorScale)
{
    target.selectAll("rect")
    .data(care)
    .enter()
    .append("rect")
    
    .attr("x",function(care)
         {
        console.log(xScale(care.reasons))
        return xScale(care.Reasons);
    })
    .attr("y",function(cares)
         {console.log(yScale(cares.transgennb))
        return yScale(cares.transgennb)
    })
    .attr("width",xScale.bandwidth)
    .attr("height",function(care)
         {
        return graphDim.height-yScale(care.transgennb)
    })
         
    .attr("fill",function(care)
         {
        return colorScale("transgennb")
    })
        
          }
var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}

var drawAxes4 = function(graphDim,margins,xScale,yScale)
{
   console.log(graphDim)
    var xAxis = d3.axisBottom();
    xAxis.scale(xScale)
    d3.select("#svg4").append("g")
    .attr("class","axis")
    .attr("transform", "translate("+margins.left+"," + (graphDim.height+margins.top) + ")")
    .call(xAxis)
    var yAxis = d3.axisLeft();
    yAxis.scale(yScale)
    d3.select("#svg4").append("g")
    .attr("class","axis")
    .attr("transform", "translate("+margins.bottom+"," + margins.right + ")")
    .call(yAxis) 
    
}

var drawLabels4 = function(graphDim,margins)
{
    var labels = d3.select("#svg4")
    .append("g")
    .classed("labels",true)
    
    labels.append("text")
    .text("Reasons For Inability to Seek Care")
    .classed("title",true)
    .attr("text-anchor","middle")
    .attr("x", margins.left+(graphDim.width/2))
    .attr("y", margins.top+(8))
    
    labels.append("text")
    .text("Reasons")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("x", margins.left+(graphDim.width/2))
    .attr("y", margins.top+(graphDim.height)+(30))
    
    labels.append("text")
        .text("Percentage")
        .classed("label", true)
        .attr("text-anchor", "middle")
        .attr("transform","translate(11," + (graphDim.height/2)+") rotate(270)")
    
}

var drawLegend4 = function(graphDim,margins)
{
    var categories = [
        {
            class:"cisgen",
            name:"Cisgender Individuals"
        },
        {
            class:"transgennb",
            name:"Transgender/Non-Binary Individuals"
        }
    ]
    var legend = d3.select("#svg4")
        .append("g")
        .classed("legend",true)
        .attr("transform","translate("+
              (margins.left+ 10) +","+
             (margins.top+10)+")");
    var entries = legend.selectAll("g")
    .data(categories)
    .enter()
    .append("g")
    .classed("legendEntry",true)
    .attr("class",function(categories)
         {
        return categories.class;
    })
    
    .attr("transform",function(categories,index)
         {
        return "translate(0,"+index*20+")";
    })
    
    entries.append("rect")
    .attr("width", 10)
    .attr("height", 10)
    
    entries.append("text")
    .text(function(category)
         {
        return category.name
    })
    .attr("x",15)
    .attr("y",10)
    
}

var initGraph4 = function(cares)
{
    var screen = {width:1250,height:360}
    var margins = {left:30,right:20,top:20,bottom:30}
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height-margins.top-margins.bottom
        }
    console.log(graph);
    
    d3.select("#svg4")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("#svg4")
    .append("g")
    .attr("id","#graph")
    .attr("transform","translate("+margins.left+","+margins.top+")");
    
    var xScale = d3.scaleBand()
.domain(["Affordability","Parent Permission","LGBTQ Competent Provider","Transportation","Fears of Being Outed","Previous Negative Experience","Lack of LGBTQ Providers"])
    .range([0,(graph.width/1.5)])
    .paddingInner(.6)
    
    var yScale = d3.scaleLinear()
    .domain([0,60])
    .range([graph.height,0])
    
    var colorScale=
        d3.scaleOrdinal()
    .range(["red","blue"])
    
    drawAxes4(graph,margins,xScale,yScale);
    var g0=target.append("g")
    .attr("transform","translate(51,0)")
    
    drawcare1(cares,target,graph,xScale,yScale,colorScale);
    drawcare2(cares,g0,graph,xScale,yScale,colorScale);
    drawLabels4(graph,margins);
    drawLegend4(graph,margins);
    
}

var caresPromise = d3.csv("Data/cares.csv");
var succFCN = function(cares)
{
    console.log("Cares",cares);
    initGraph4(cares)
    
}
var failFCN = function(error)
{
    console.log("Give Me One Reason",error);
}
caresPromise.then(succFCN,failFCN)