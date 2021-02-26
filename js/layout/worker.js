importScripts("d3/d3-collection.v1.js");
importScripts("d3/d3-dispatch.v1.js");
importScripts("d3/d3-quadtree.v1.js");
importScripts("d3/d3-timer.v1.js");
importScripts("d3/d3-force.v1.js");

onmessage = function(event) {
  var nodes = event.data.nodes,
      links = event.data.links;
  

  var simulation = d3.forceSimulation(nodes)
      .force("charge", d3.forceManyBody())
      .force("link", d3.forceLink(links).distance(30).strength(0.7))

      // .force("node", d3.forceNode(nodes))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .stop();

  for (var i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
    postMessage({type: "tick", progress: i / n});
    // simulation.nodes
    simulation.tick();
  }
  nodes.forEach(e=>{
    e.loc = e.x + " " + e.y
  })
  postMessage({type: "end", nodes: nodes, links: links});
};

