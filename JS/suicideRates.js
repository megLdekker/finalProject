var drawsuicide1= function(suicide,target,graphDim,xScale,yScale,colorScale)
{
    target.selectAll("rect")
    .data(suicide)
    .enter()
    .append("rect")
    
   
    
    .attr("x",function(suicide)
         {
        console.log(suicide.age)
        return xScale(suicide.age);
    })
    .attr("y",function(suicide)
         {console.log(yScale(suicide.straightMales))
        return yScale(suicide.straightMales)
    })
    
   .attr("width",xScale.bandwidth)
    .attr("height",function(suicide)
         {
        console.log(yScale(suicide.straightMales))
        return graphDim.height-yScale(suicide.straightMales)
    })
    
    .attr("fill",function(suicide)
         {
        return colorScale("straightMales")
    })
    
          }
var drawsuicide2= function(suicide,target,graphDim,xScale,yScale,colorScale)
{
    target.selectAll("rect")
    .data(suicide)
    .enter()
    .append("rect")
    
    .attr("x",function(suicide)
         {
        console.log(xScale(suicide.age))
        return xScale(suicide.age);
    })
    .attr("y",function(suicides)
         {console.log(yScale(suicides.straightFemales))
        return yScale(suicides.straightFemales)
    })
    .attr("width",xScale.bandwidth)
    .attr("height",function(suicide)
         {
        return graphDim.height-yScale(suicide.straightFemales)
    })
         
    .attr("fill",function(suicide)
         {
        return colorScale("straightFemales")
    })
        
          }
var drawsuicide3= function(suicide,target,graphDim,xScale,yScale,colorScale)
{
    target.selectAll("rect")
    .data(suicide)
    .enter()
    .append("rect")
    
    .attr("x",function(suicide)
         {
        console.log(xScale(suicide.age))
        return xScale(suicide.age);
    })
    .attr("y",function(suicides)
         {console.log(yScale(suicides.lgbt))
        return yScale(suicides.lgbt)
    })
    .attr("width",xScale.bandwidth)
    .attr("height",function(suicide)
         {
        return graphDim.height-yScale(suicide.lgbt)
    })
         
    .attr("fill",function(suicide)
         {
        return colorScale("lgbt")
    })
        
          }
var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}

var drawAxes1 = function(graphDim,margins,xScale,yScale)
{
   console.log(graphDim)
    var xAxis = d3.axisBottom();
    xAxis.scale(xScale)
    d3.select("#svg1").append("g")
    .attr("class","axis")
    .attr("transform", "translate("+margins.left+"," + (graphDim.height+margins.top) + ")")
    .call(xAxis)
    var yAxis = d3.axisLeft();
    yAxis.scale(yScale)
    d3.select("#svg1").append("g")
    .attr("class","axis")
    .attr("transform", "translate("+margins.bottom+"," + margins.right + ")")
    .call(yAxis) 
    
}

var drawLabels1 = function(graphDim,margins)
{
    var labels = d3.select("#svg1")
    .append("g")
    .classed("labels",true)
    
    labels.append("text")
    .text("Suicides By Age")
    .classed("title",true)
    .attr("text-anchor","middle")
    .attr("x", margins.left+(graphDim.width/2))
    .attr("y", margins.top+(8))
    
    labels.append("text")
    .text("Age")
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

var drawLegend1 = function(graphDim,margins)
{
    var categories = [
        {
            class:"straightMales",
            name:"Non-LGBT Males"
        },
        {
            class:"straightFemales",
            name:"Non-LGBT Females"
        },
        {
            class:"lgbt",
            name:"LGBT Persons"
        }
    ]
    var legend = d3.select("#svg1")
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

var initGraph1 = function(suicides)
{
    var screen = {width:600,height:360}
    var margins = {left:30,right:20,top:20,bottom:30}
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height-margins.top-margins.bottom
        }
    console.log(graph);
    
    d3.select("#svg1")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("#svg1")
    .append("g")
    .attr("id","#graph")
    .attr("transform","translate("+margins.left+","+margins.top+")");
    
    var xScale = d3.scaleBand()
.domain(["12 - 14","15 - 17","18 - 20","21 - 24","25 - 29"])
    .range([0,(graph.width/1.5)])
    .paddingInner(.7)
    
    var yScale = d3.scaleLinear()
    .domain([0,80])
    .range([graph.height,0])
    
    var colorScale=
        d3.scaleOrdinal()
    .range(["blue","red","black"])
    
    drawAxes1(graph,margins,xScale,yScale);
    var g0=target.append("g")
    .attr("transform","translate(20,0)")
    var g1=target.append("g")
    .attr("transform","translate(47,0)")
    
    drawsuicide1(suicides,target,graph,xScale,yScale,colorScale);
    drawsuicide2(suicides,g0,graph,xScale,yScale,colorScale);
    drawsuicide3(suicides,g1,graph,xScale,yScale,colorScale);
    drawLabels1(graph,margins);
    drawLegend1(graph,margins);
    
}

var suicidePromise = d3.csv("Data/suicideRates.csv");
var succFCN = function(suicides)
{
    console.log("Suicides",suicides);
    initGraph1(suicides)
    
}
var failFCN = function(error)
{
    console.log("Not Today, Pal",error);
}
suicidePromise.then(succFCN,failFCN)