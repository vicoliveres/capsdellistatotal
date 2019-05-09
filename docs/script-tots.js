const padding = 2;

const margin = { top: 10, right: 5, bottom: 10, left: 5 };
const width = d3.select('.chart').node().getBoundingClientRect().width;
const height = d3.select('.chart').node().getBoundingClientRect().width;

// From colorbrewer Dark2 + 2
var colour = d3.scaleOrdinal()
    .range(["#5e3c99", "#e66101"]);

const tooltip = d3.select("body").append("div")
    .style("opacity", 0);

document.addEventListener("DOMContentLoaded", function(e) {

  //Chart 1: all user-led grants
  var chartsimple = function(d3) {
    //Load in grants data
    d3.json("cdll.json", function(data) {

      data.sort(function(a, b) {return d3.ascending(a.Sexe, b.Sexe);});

            grid = d3.select("#chart-colours")
              .attr('width', width + margin.left + margin.right)
              .attr('height', height + margin.top + margin.bottom)
              .selectAll("rect")
              .data(data)
              .enter()
              .append("div")
              .attr("class", "block")
              .style("width", 7 + "px")
              .style("height", 7 + "px")
              .style("background-color", function(d){
                return colour(d.Sexe);
              })
              .on("mousemove", function(d) {
                d3.select(this)
                  .style('opacity', 0.5);
                tooltip.transition()
                  .duration(100)
                  .style("opacity", .9)
                  .attr("class", "tooltip")
                  .style("left", (d3.event.pageX + 5) + "px")
                  .style("top", (d3.event.pageY + 5) + "px");
                tooltip.html("Cap de llista:</br><b>" + d.CapDeLlista + "</b></br>" + d.Candidatura + "</br>Municipi: " + d.Municipi +
                      "</br>Habitants: " + d.NHabitants);
                })
              .on("mouseout", function(d) {
                d3.select(this)
                  .style("opacity", 1);
                tooltip.transition()
                  .duration(200)
                  .style("opacity", 0);
                });


            legendValues = d3.set(data.map( function(d) { return d.Sexe } ) ).values()

            var legend = d3.select(".legend")
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .attr("class", "legend-flex")
                .selectAll(".legends")
                .data(legendValues)
                .enter()
                .append("rect")
                .attr("class", "legends")
                .style("background-color", function (d) { return colour(d) })
                .append('text')
                .text(function (d, i) { return d })
                .attr("class", "legend-text")

  });

}(d3);

});
