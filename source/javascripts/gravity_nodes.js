(function() {
  d3.create_circle_graph = function() {
    // diameter will set the value for how wide the SVG element will be.
    var width = 800, height = 650;
    var small_circle_radius = 10, large_circle_radius = 30;
    var default_transition_duration = 200;
        
    var color = d3.scale.category20();

    var svg = d3.select("#movies_2013").append("svg").attr("width", width).attr("height", height);

    var force = d3.layout.force()
        .charge(function(d){return 10-d.total})
        .gravity(.08)
        .size([width, height]);

    d3.json("/data/gravity/top_2013_movies.json", function(error, graph){
      force.nodes(graph.nodes).start();

      var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .style("stroke", "black")
        .style("stroke-width", ".5px")
        .style("fill", function(d){
          if(d.title == "Gravity")
            return "red"
          else
            return "#9caf84"
        })
        .attr("id", function(d){return "circle_" + d.index;})
        .attr("r", function(d){return Math.sqrt(3*d.total);}).text(0)
        .call(force.drag);
        
      force.on("tick", function(){
        node.attr("cx", function(d){return d.x;}).attr("cy", function(d){return d.y;});
        node.attr("x", function(d){return d.x;}).attr("y", function(d){return d.y;})
      });


      node.on("mouseover", function(n,i){
        var el = d3.select(this);
        var xpos = Number(el.attr('cx'))
        var ypos = (el.attr('cy') - 10)

        svg.append("text").attr("id", "details-tooltip")
          .attr("x", xpos).attr("y",ypos)
          .attr("text-anchor", "middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "11px")
          .attr("font-weight", "bold")
          .attr("fill", "black")
          .text(function(d){return (n.title + ": " + n.total + " Total Cast");})

        d3.selectAll(".node")
          .transition().duration(default_transition_duration)
          .attr('r', 1);

        d3.select("#circle_" + n.index)
          .transition()
          .attr("r", large_circle_radius);
      });

      node.on("mouseout", function(n,i){
        d3.select("#details-tooltip").remove();
        d3.selectAll(".node")
          .transition().duration(default_transition_duration)
          .attr("r", function(d){return Math.sqrt(3*d.total);})
          .style("stroke-width", "1.5px")
      });
    });	
  };
})();