var drawhate1= function(hate,target,graphDim,xScale,yScale,colorScale)
{
    target.selectAll("rect")
    .data(hate)
    .enter()
    .append("rect")
    
   
    
    .attr("x",function(hate)
         {
        console.log(hate.identity)
        return xScale(hate.identity);
    })
    .attr("y",function(hate)
         {console.log(yScale(hate.sexualHarassment))
        return yScale(hate.sexualHarassment)
    })
    
   .attr("width",xScale.bandwidth)
    .attr("height",function(hate)
         {
        console.log(yScale(hate.sexualHarassment))
        return graphDim.height-yScale(hate.sexualHarassment)
    })
    
    .attr("fill",function(hate)
         {
        return colorScale("sexualHarassment")
    })
    
          }
var drawhate2= function(hate,target,graphDim,xScale,yScale,colorScale)
{
    target.selectAll("rect")
    .data(hate)
    .enter()
    .append("rect")
    
    .attr("x",function(hate)
         {
        console.log(xScale(hate.identity))
        return xScale(hate.identity);
    })
    .attr("y",function(hates)
         {console.log(yScale(hates.genderExpression))
        return yScale(hates.genderExpression)
    })
    .attr("width",xScale.bandwidth)
    .attr("height",function(hate)
         {
        return graphDim.height-yScale(hate.genderExpression)
    })
         
    .attr("fill",function(hate)
         {
        return colorScale("genderExpression")
    })
        
          }
var drawhate3= function(hate,target,graphDim,xScale,yScale,colorScale)
{
    target.selectAll("rect")
    .data(hate)
    .enter()
    .append("rect")
    
    .attr("x",function(hate)
         {
        console.log(xScale(hate.identity))
        return xScale(hate.identity);
    })
    .attr("y",function(hates)
         {console.log(yScale(hates.sexualOrient))
        return yScale(hates.sexualOrient)
    })
    .attr("width",xScale.bandwidth)
    .attr("height",function(suicide)
         {
        return graphDim.height-yScale(suicide.sexualOrient)
    })
         
    .attr("fill",function(hate)
         {
        return colorScale("sexualOrient")
    })
        
          }
var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}

var drawAxes3 = function(graphDim,margins,xScale,yScale)
{
   console.log(graphDim)
    var xAxis = d3.axisBottom();
    xAxis.scale(xScale)
    d3.select("#svg3").append("g")
    .attr("class","axis")
    .attr("transform", "translate("+margins.left+"," + (graphDim.height+margins.top) + ")")
    .call(xAxis)
    var yAxis = d3.axisLeft();
    yAxis.scale(yScale)
    d3.select("#svg3").append("g")
    .attr("class","axis")
    .attr("transform", "translate("+margins.bottom+"," + margins.right + ")")
    .call(yAxis) 
    
}

var drawLabels3 = function(graphDim,margins)
{
    var labels = d3.select("#svg3")
    .append("g")
    .classed("labels",true)
    
    labels.append("text")
    .text("Percentage of LGBTQ Students Who Experienced Type of Discrimination")
    .classed("title",true)
    .attr("text-anchor","middle")
    .attr("x", margins.left+(graphDim.width/2))
    .attr("y", margins.top+(8))
    
    labels.append("text")
    .text("Identity")
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

var drawLegend3 = function(graphDim,margins)
{
    var categories = [
        {
            class:"sexualHarassment",
            name:"Sexual Harassment"
        },
        {
            class:"genderExpression",
            name:"Based on Gender Expression"
        },
        {
            class:"sexualOrient",
            name:"Based on Sexual Orientation"
        }
    ]
    var legend = d3.select("#svg3")
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

var initGraph3 = function(hates)
{
    var screen = {width:600,height:360}
    var margins = {left:30,right:20,top:20,bottom:30}
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height-margins.top-margins.bottom
        }
    console.log(graph);
    
    d3.select("#svg3")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("#svg3")
    .append("g")
    .attr("id","#graph")
    .attr("transform","translate("+margins.left+","+margins.top+")");
    
    var xScale = d3.scaleBand()
.domain(["Gay/Lesbian","Bisexual","Pansexual","Queer","Questioning"])
    .range([0,(graph.width/1.5)])
    .paddingInner(.7)
    
    var yScale = d3.scaleLinear()
    .domain([0,80])
    .range([graph.height,0])
    
    var colorScale=
        d3.scaleOrdinal()
    .range(["blue","red","black"])
    
    drawAxes3(graph,margins,xScale,yScale);
    var g0=target.append("g")
    .attr("transform","translate(20,0)")
    var g1=target.append("g")
    .attr("transform","translate(47,0)")
    
    drawhate1(hates,target,graph,xScale,yScale,colorScale);
    drawhate2(hates,g0,graph,xScale,yScale,colorScale);
    drawhate3(hates,g1,graph,xScale,yScale,colorScale);
    drawLabels3(graph,margins);
    drawLegend3(graph,margins);
    
}

var hatePromise = d3.csv("Data/discriminate.csv");
var succFCN = function(hates)
{
    console.log("hates",hates);
    initGraph3(hates)
}
var failFCN = function(error)
{
    console.log("We Hate to See It",error);
}
hatePromise.then(succFCN,failFCN)