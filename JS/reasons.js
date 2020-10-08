var drawreasons1= function(sad,target,graphDim,xScale,yScale,colorScale)
{
    target.selectAll("rect")
    .data(sad)
    .enter()
    .append("rect")
    
    .attr("x",function(sad)
         {
        console.log(xScale)
        return xScale(sad.sexualOrientation);
    })
    .attr("y",function(sads)
         {console.log(yScale(sads.Males))
        return yScale(sads.Males)
    })
    .attr("width",xScale.bandwidth)
    .attr("height",function(sad)
         {
        return graphDim.height-yScale(sad.Males)
    })
    
    .attr("fill",function(sad)
         {
        return colorScale("Male")
    })
    
          }
var drawsad2= function(sad,target,graphDim,xScale,yScale,colorScale)
{
    target.selectAll("rect")
    .data(sad)
    .enter()
    .append("rect")
    
    .attr("x",function(sad)
         {
        console.log(xScale(sad.sexualOrientation))
        return xScale(sad.sexualOrientation);
    })
    .attr("y",function(sads)
         {console.log(yScale(sads.Females))
        return yScale(sads.Females)
    })
    .attr("width",xScale.bandwidth)
    .attr("height",function(sad)
         {
        return graphDim.height-yScale(sad.Females)
    })
         
    .attr("fill",function(sad)
         {
        return colorScale("Female")
    })
        
          }
var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}

var drawAxes = function(graphDim,margins,xScale,yScale)
{
   console.log(graphDim)
    var xAxis = d3.axisBottom();
    xAxis.scale(xScale)
    d3.select("#svg2").append("g")
    .attr("class","axis")
    .attr("transform", "translate("+margins.left+"," + (graphDim.height+margins.top) + ")")
    .call(xAxis)
    var yAxis = d3.axisLeft();
    yAxis.scale(yScale)
    d3.select("#svg2").append("g")
    .attr("class","axis")
    .attr("transform", "translate("+margins.bottom+"," + margins.right + ")")
    .call(yAxis) 
    
}

var drawLabels = function(graphDim,margins)
{
    var labels = d3.select("#svg2")
    .append("g")
    .classed("labels",true)
    
    labels.append("text")
    .text("Percentage of Teenagers Who Felt Sad/Hopeless (2015-2017)")
    .classed("title",true)
    .attr("text-anchor","middle")
    .attr("x", margins.left+(graphDim.width/2))
    .attr("y", margins.top+(8))
    
    labels.append("text")
    .text("Sexual Orientation")
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

var drawLegend2 = function(graphDim,margins)
{
    var categories = [
        {
            class:"Females",
            name:"Females"
        },
        {
            class:"Males",
            name:"Males"
        }
    ]
    var legend = d3.select("#svg2")
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

var initGraph = function(sads)
{
    var screen = {width:600,height:360}
    var margins = {left:30,right:20,top:20,bottom:30}
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height-margins.top-margins.bottom
        }
    console.log(graph);
    
    d3.select("#svg2")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("#svg2")
    .append("g")
    .attr("id","#graph")
    .attr("transform","translate("+margins.left+","+margins.top+")");
    
    var xScale = d3.scaleBand()
.domain(["Heterosexual","Lesbian/Gay","Bisexual","Not sure"])
    .range([0,(graph.width/1.5)])
    .paddingInner(.6)
    
    var yScale = d3.scaleLinear()
    .domain([0,80])
    .range([graph.height,0])
    
    var colorScale=
        d3.scaleOrdinal()
    .range(["red","blue"])
    
    drawAxes(graph,margins,xScale,yScale);
    var g0=target.append("g")
    .attr("transform","translate(45,0)")
    
    drawsad1(sads,target,graph,xScale,yScale,colorScale);
    drawsad2(sads,g0,graph,xScale,yScale,colorScale);
    drawLabels(graph,margins);
    drawLegend2(graph,margins);
    
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