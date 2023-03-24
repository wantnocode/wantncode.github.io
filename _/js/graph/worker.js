importScripts("d3/d3-collection.v1.js");
importScripts("d3/d3-dispatch.v1.js");
importScripts("d3/d3-quadtree.v1.js");
importScripts("d3/d3-timer.v1.js");
importScripts("d3/d3-force.v1.js");

/**
 * @Author  XGL
 * @remarks [onmessage worker事件]
 * @param   [event] onmessage事件结构体
 * @return  [return]
 */
onmessage = function(event) {
  var nodes = event.data.nodes,
      links = event.data.links;
  let node_keys = nodes.map(node=>node.key);
  let layout_links = [];
  let groups =  [];
  //['group_264', 'group_86', 'group_24', 'group_87', 'group_10', 'group_6', 'group_114', 'group_132', 'group_109', 'group_147', 'group_170', 'group_201', 'group_38', 'group_64', 'group_107'];
  // let layout_links = links.filter(link=>{
  //   if(node_keys.indexOf(link.from) != -1 && node_keys.indexOf(link.to) != -1){
  //       return link;
  //   }
  // })
  nodes.map(node=>{
    if(groups.indexOf(node.group) == -1 && node.group != undefined){
        groups.push(node.group)
    }
  })
  function _isGroup(from,to){
    let from_G,to_G;
    nodes.map(node=>{
      if(node.key == from)from_G = node.group;
      if(node.key == to)to_G = node.group;
    })
    return from_G == to_G;  
  }
  links.map(link=>{
      if(node_keys.indexOf(link.from) != -1 && node_keys.indexOf(link.to) != -1){
        layout_links.push(link);
      }
  })
  let layout_links_group = [];  //组与组的边不参与运算
  // console.log(groups)
  if(groups.length > 0){
    layout_links.map(link=>{
      let isHave = _isGroup(link.from,link.to);
      if(isHave && node_keys.indexOf(link.from) != -1 && node_keys.indexOf(link.to) != -1){
        layout_links_group.push(link);
      }
    })
  }
  var simulation = d3.forceSimulation(nodes)
      .force("charge", d3.forceManyBody())
      // .force("link", d3.forceLink(links).distance(30).strength(0.3))
      // defaults strength: Math.min(count(link.source), count(link.target));
      // default distance 30
      .force("link", d3.forceLink(layout_links))
      // .force("link", d3.forceLink(links))

      
      .force("x", d3.forceX())
      // .force('x', d3.forceX().x(function(d) {
        // return groups.indexOf(d.group) * 1200;
        // return Math.floor(groups.indexOf(d.group) / 3) * 1000;
      // }))
      .force("y", d3.forceY())
      // .force("y", d3.forceY().y(function(d){
      //   return Math.floor(groups.indexOf(d.group) / 3) * 100;
      // }))
      .stop();
  if(groups.length > 0){
    simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody())
        // .force("link", d3.forceLink(links).distance(30).strength(0.3))
        // defaults strength: Math.min(count(link.source), count(link.target));
        // default distance 30
        .force("link", d3.forceLink(layout_links_group))

        
        // .force("x", d3.forceX())
        .force('x', d3.forceX().x(function(d) {
          return groups.indexOf(d.group) * 1200;
          // return Math.floor(groups.indexOf(d.group) / 3) * 1000;
        }))
        // .force("y", d3.forceY())
        .force("y", d3.forceY().y(function(d){
          return Math.floor(groups.indexOf(d.group) / 3) * 100;
        }))
        .stop();
  }
  for (var i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
    postMessage({type: "tick", progress: i / n});
    // simulation.nodes
    simulation.tick();
  }
  nodes.forEach(e=>{
    e.loc = e.x + " " + e.y
  })
  // postMessage({type: "end", nodes: nodes, links: links});
  postMessage({type: "end", nodes: nodes, links: layout_links});
};

