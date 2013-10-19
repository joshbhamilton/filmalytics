(function() {
  d3.create_donut_graph = function() {
    var w = 175, h = 175, outerRadius = 74, innerRadius =44;

//    d3.csv("http://filmalytics.com/wp-content/uploads/2013/10/3d.csv", function(error, data){
    d3.csv("/data/gravity/3d.csv", function(error, data){
      var pie = d3.layout.pie().sort(function(a, b){a.RT_Critic - b.RT_Critic});
    
      data.forEach(function(d){
        var rt_c = parseInt(d.RT_Critic);
        var values = pie([parseInt(rt_c), 100-parseInt(rt_c)]);
        d.values = values;
      })
    
      var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius).startAngle(function(d){return d.startAngle-Math.PI/2.0}).endAngle(function(d){return d.endAngle-Math.PI/2.0});
    
      var svg = d3.select("#top_3d_movies").selectAll(".pie").data(data).enter().append("svg").attr("class", "pie").attr("width", w).attr("height", h);
    
      var arcs = svg.selectAll("g.arc").data(function(d){return d.values}).enter().append("g").attr("class", "arc").attr("transform", "translate(" + w/2 + ", " + h/2 + ")");
    
      var color = d3.scale.ordinal().range(["#d84b2a", "white"])
    
      arcs.append("path").attr("fill", function(d,i){return color(i);}).attr("d", arc);
      arcs.append("text")
        .attr("transform", function(d) {return "translate(" + arc.centroid(d) + ")";})
        .attr("text-anchor", "middle").style("font-family", "sans-serif").style("font-size", "10px").style("fill", "white")
        .text(function(d,i) {
          if(i==0) {return d.value + "%";}
          else
          {return "";}
        });
      svg.append("foreignObject").attr("width",65).attr("height",h/2).attr("dy", ".35em").style("text-anchor", "middle").attr("x", w/3).attr("y", h/3).text(function(d) {return d.Title;})
        .style("font-size", "12px");
    });
    };
})();