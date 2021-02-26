/**
 * webgl force
* autor xgl
 * renderer
 */
// function onLoad() {

// var renderer;
var colors = [
0x1f77b4ff, 0xaec7e8ff,
0xff7f0eff, 0xffbb78ff,
0x2ca02cff, 0x98df8aff,
0xd62728ff, 0xff9896ff,
0x9467bdff, 0xc5b0d5ff,
0x8c564bff, 0xc49c94ff,
0xe377c2ff, 0xf7b6d2ff,
0x7f7f7fff, 0xc7c7c7ff,
0xbcbd22ff, 0xdbdb8dff,
0x17becfff, 0x9edae5ff
];


var nodes_pos = new Map(); //节点坐标集合
var entity_list = new Map();


// var graph = graphGenerator.grid(10, 10);
function init_Webgl(){
   // var n = linkArray.splice(0,80000);
                // var n = data.links;
   var graph = Viva.Graph.graph();
   linkArray.map(e=>{ 

        graph.addLink(e.from, e.to,e);
// 
    })
   nodeArray.map(e=>{
       graph.addNode(e.key,e)
   })
      var container = document.getElementById('graph-container');
      var layout = Viva.Graph.Layout.forceDirected(graph,{
          springLength:150,
          springCoeff:0.0001,
          // dragCoeff:0.02,
          // gravity: -2 
      });
      function generateDOMLabels(graph) {
                  // this will map node id into DOM element
                  // console.log(graph)
                  var labels = Object.create(null);
                  graph.forEachNode(function(node,pos) {
                    // console.log(graph.getNode(node.id),pos)
                    var label = document.createElement('span');
                    label.classList.add('node-label');
                    label.innerText = node.id;
                    label.innerText = node.data.text;
                    labels[node.id] = label;
                    // container.appendChild(label);
                    // entity_list.set(node.id,label)
                  });
                  // NOTE: If your graph changes over time you will need to
                  // monitor graph changes and update DOM elements accordingly
                  return labels;
        }

        function generateLinkLabels(graph) {
                  // this will map node id into DOM element
                  // console.log(graph)
                  var labels = Object.create(null);
                  graph.forEachLink(function(link,pos) {
                    // console.log(link)
                    var label = document.createElement('span');
                    label.classList.add('link-label');
                    label.innerText = link.id;
                    label.innerText = link.data.text;
                    labels[link.data.id] = label;
                    // container.appendChild(label);
                  });
                  // NOTE: If your graph changes over time you will need to
                  // monitor graph changes and update DOM elements accordingly
                  return labels;
        }

        var domLabels =   generateDOMLabels(graph);
        var linkLabels =  generateLinkLabels(graph);
        var multiSelectOverlay;

        var processingElement = document.getElementById('log');

        // we need to compute layout, but we don't want to freeze the browser
        precompute(300, renderGraph);

        function precompute(iterations, callback) {
          // let's run 10 iterations per event loop cycle:
          var i = 0;
          while (iterations > 0 && i < 10) {
            layout.step();
            iterations--;
            i++;
          }
          // processingElement.innerHTML = 'Layout precompute: ' + iterations;
          if (iterations > 0) {
            setTimeout(function () {
                precompute(iterations, callback);
                 
            }, 0); 
          } else {
            // we are done!
            $(".loading").hide()
            $(".loading_box").hide()
            $("#graph-container").css("opacity",1)
            callback();
          }
        }

        function renderGraph() {
          var graphics = Viva.Graph.View.webglGraphics();

          renderer = Viva.Graph.View.renderer(graph, {
              layout   : layout,
              graphics   : graphics,
              container: container
              // renderLinks : true,
              // prerender  : true
          });


            // graphics.link(function (link) {
            //   // console.log(111)
            //    return Viva.Graph.View.webglSquare(10,link.data.d_stroke);
            // })
           //  graphics.node(function(node){
           //  // console.log(Viva.Graph.View.webglSquare( 10,node.data.d_stroke));
           //    // return Viva.Graph.View.webglSquare( 10,node.data.d_stroke);
           //  return Viva.Graph.View.webglSquare(1 + Math.random() * 10, colors[(Math.random() * colors.length) << 0]);
           //    // return Viva.Graph.View.webglImage(6,"http://192.168.56.12/fastv/img/" + node.data["geo"] + ".png");
           // })
             graphics
                   .node(function(node){
                       return Viva.Graph.View.webglSquare( 10,node.data.d_stroke);
                   })
                   .link(function(link) {
                       return Viva.Graph.View.webglLine(colors[(Math.random() * colors.length) << 0]);
                   });
            var circleNode = buildCircleNodeShader();
            graphics.setNodeProgram(circleNode);
            // graphics.setNodeProgram(Viva.Graph.View.webglImageNodeProgram());
          /*
              节点坐标信息
          */
          graphics.placeNode(function(ui, pos) {
              $(".node-label").remove()
                   var domPos = {
                      x: pos.x - 1,
                      y: pos.y
                  };
                  if(graphics.getScale() > 2){
                      graphics.transformGraphToClientCoordinates(domPos);
                      // then move corresponding dom label to its own position:
                      var nodeId = ui.node.id;
                      var labelStyle = domLabels[nodeId].style;
                      if(domPos.x > document.body.clientWidth || domPos.x < 0){
                      //   requestAnimationFrame(function(){
                      //       labelStyle.display = "none";
                      //   })
                        return
                      }
                      if(domPos.y > document.body.clientHeight || domPos.y < 0){
                      //   requestAnimationFrame(function(){
                            // labelStyle.display = "none";
                            // container.remove()
                      //   })
                        return
                      }
                        requestAnimationFrame(function(){
                          labelStyle.left = domPos.x + 'px';
                          labelStyle.top = domPos.y + 20 + 'px';
                          // labelStyle.display = "block";
                          container.appendChild(domLabels[nodeId]);
                        })
                  }else{
                    // return
                    // requestAnimationFrame(function(){
                    // //   var nodeId = ui.node.id;
                    // //   var labelStyle = domLabels[nodeId].style;
                    // //   labelStyle.display = "none";
                    // })
                  }
          });
          graphics.placeLink(function(ui,pos,pos1,y) {
            $(".link-label").remove()
            // console.log(strlen(ui.text) / 2* 10)
                      var domPos1 = {
                                x: pos.x,
                                y: pos.y 
                       };
                       var domPos2 = {
                                x: pos1.x, 
                                y: pos1.y
                       };
                       var domPos3 = {
                                x: pos.x,
                                y: pos1.y
                       };

                       var domPos = {
                                x: (pos.x + pos1.x) / 2 ,
                                y: (pos.y + pos1.y) * -1  / 2
                                // x:pos.x,
                                // y:pos.y * -1
                       };
                       graphics.transformGraphToClientCoordinates(domPos);
                       if(graphics.getScale() > 3){
                        var linkId = ui.key;
                        var labelStyle = linkLabels[linkId].style;
                          if(domPos.x > document.body.clientWidth || domPos.x < 0){
                                // requestAnimationFrame(function(){
                                //   labelStyle.display = "none";
                                // })
                                return
                          }
                          if(domPos.y > document.body.clientHeight || domPos.y < 0){
                                // requestAnimationFrame(function(){
                                //   labelStyle.display = "none";
                                // })
                                return
                          }

                          requestAnimationFrame(function(){
                            labelStyle.left = domPos.x - ui.text.length / 3 * 10  +  'px';
                            labelStyle.top = domPos.y + 'px';
                            // labelStyle.transform = "rotate("+ (90- getAngle(pos.x,pos.y,pos1.x,pos1.y,pos.x,pos1.y)) +"deg)"
                            // labelStyle.display = "block";
                            container.appendChild(linkLabels[linkId]);
                          })
                       }else{
                           // requestAnimationFrame(function(){
                           //    var linkId = ui.key;
                           //    var labelStyle = linkLabels[linkId].style;
                           //    labelStyle.display = "none";
                           // })
                       }

            

          });
          renderer.run(1);

          
          var graphRect = layout.getGraphRect();
          var graphSize = Math.min(graphRect.x2 - graphRect.x1, graphRect.y2 - graphRect.y1);
          var screenSize = Math.min(document.body.clientWidth, document.body.clientHeight);

          var desiredScale = screenSize / graphSize;
          zoomOut(desiredScale, 1);

          function zoomOut(desiredScale, currentScale) {
            if (desiredScale < currentScale) {
              currentScale = renderer.zoomOut();
              setTimeout(function () {
                  zoomOut(desiredScale, currentScale);
              }, 10);
            }
          }

          var events = Viva.Graph.webglInputEvents(graphics, graph);

                events.mouseEnter(function (node) {
                  // console.log(nodes_pos.get(node.id).x)
                      // console.log(event)
                      // $(".entity_toast").css("left",event.clientX)
                      // $(".entity_toast").css("top",event.clientY)
                      // $(".entity_toast").text(node.id)
                      // $(".entity_toast").show()
                // console.log('Mouse entered node: ' + node.id);
                }).mouseLeave(function (node) {
                      // $(".entity_toast").hide()
                }).dblClick(function (node) {
                                    
                }).click(function (node) {
                                  // 拓展
                        // graph.addLink(node.id,100);
                        // graph.addLink(100,101);
                        // graph.addLink(node.id,101);
                                    // graph.addLink(node.id,102);
                                    // graph.addLink(node.id,103);
                                    // graph.addLink(node.id,104);
                                  //改变选中
                                  // var nodeUI = graphics.getNodeUI(node.id);
                                  // if(nodeUI.color == 10414335){
                                  //     nodeUI.color = 0xFFA500ff;
                                  //     if(webgl_select_nodes.indexOf(node.id) == -1){
                                  //         webgl_select_nodes.push(node.id);
                                  //      }
                                  // }else{
                                  //     nodeUI.color = 0x009ee8ff;
                                  //     if(webgl_select_nodes.indexOf(node.id) !== -1){
                                  //           webgl_select_nodes.splice(webgl_select_nodes.indexOf(node.id),1)
                                  //     }
                                  // }
                                  
                  console.log('Single click on node: ' + node.id);
                });

                document.addEventListener('keydown', function(e) {
                    if (e.which === 17 && !multiSelectOverlay) { // shift key
                      multiSelectOverlay = startMultiSelect(graph, renderer, layout);
                    }
                });
                document.addEventListener('keyup', function(e) {
                    if (e.which === 17 && multiSelectOverlay) {
                      multiSelectOverlay.destroy();
                      multiSelectOverlay = null;
                    }
                });
                }



        }

  // var graphics = Viva.Graph.View.webglGraphics();

  /*
  节点连线添加着色
  */

      // .link(function(link) {
      //   return Viva.Graph.View.webglLine(colors[(Math.random() * colors.length) << 0]);
      // });
  // var renderer = Viva.Graph.View.renderer(graph, {
  //   layout: layout,
  //   graphics: graphics,
  //   container: document.getElementById('graph-container')
  // });
  // var multiSelectOverlay;

// if(linkArray.length > 50000){
//    renderer.run(800);
// }else{
//    renderer.run(600);
// }

// }

function startMultiSelect(graph, renderer, layout) {
  var graphics = renderer.getGraphics();
  var domOverlay = document.querySelector('.graph-overlay');
  var overlay = createOverlay(domOverlay);
  overlay.onAreaSelected(handleAreaSelected);

  return overlay;

  function handleAreaSelected(area) {
    // For the sake of this demo we are using silly O(n) implementation.
    // Could be improved with spatial indexing if required.
    var topLeft = graphics.transformClientToGraphCoordinates({
      x: area.x,
      y: area.y
    });

    var bottomRight = graphics.transformClientToGraphCoordinates({
      x: area.x + area.width,
      y: area.y + area.height
    });

    graph.forEachNode(higlightIfInside);
    renderer.rerender();

    return;

    function higlightIfInside(node) {
      var nodeUI = graphics.getNodeUI(node.id);
      if (isInside(node.id, topLeft, bottomRight)) {
        // console.log(nodeUI)
        nodeUI.color = "#000";
        nodeUI.size = 20;
        
        if(webgl_select_nodes.indexOf(node.id) == -1){
  // console.log(node)
          webgl_select_nodes.push(node.id);
        }
      } else {
        // nodeUI.color = "#ccc";
        nodeUI.size = 10;
        if(webgl_select_nodes.indexOf(node.id) !== -1){
          webgl_select_nodes.splice(webgl_select_nodes.indexOf(node.id),1)
        }
      }
    }
    //检测视图区域选中点坐标
    function isInside(nodeId, topLeft, bottomRight) {
      var nodePos = layout.getNodePosition(nodeId);
      return (topLeft.x < nodePos.x && nodePos.x < bottomRight.x &&
        topLeft.y < nodePos.y && nodePos.y < bottomRight.y);
    }
  }
}

function createOverlay(overlayDom) {
  var selectionClasName = 'graph-selection-indicator';
  var selectionIndicator = overlayDom.querySelector('.' + selectionClasName);
  if (!selectionIndicator) {
    selectionIndicator = document.createElement('div');
    selectionIndicator.className = selectionClasName;
    overlayDom.appendChild(selectionIndicator);
  }

  var notify = [];
  var dragndrop = Viva.Graph.Utils.dragndrop(overlayDom);
  var selectedArea = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };
  var startX = 0;
  var startY = 0;

  dragndrop.onStart(function(e) {
    startX = selectedArea.x = e.clientX;
    startY = selectedArea.y = e.clientY;
    selectedArea.width = selectedArea.height = 0;

    updateSelectedAreaIndicator();
    selectionIndicator.style.display = 'block';
  });

  dragndrop.onDrag(function(e) {
    recalculateSelectedArea(e);
    updateSelectedAreaIndicator();
    notifyAreaSelected();
  });

  dragndrop.onStop(function() {
    selectionIndicator.style.display = 'none';
  });

  overlayDom.style.display = 'block';

  return {
    onAreaSelected: function(cb) {
      notify.push(cb);
    },
    destroy: function () {
      overlayDom.style.display = 'none';
      dragndrop.release();
    }
  };

  function notifyAreaSelected() {
    notify.forEach(function(cb) {
      cb(selectedArea);
    });
  }

  function recalculateSelectedArea(e) {
    selectedArea.width = Math.abs(e.clientX - startX);
    selectedArea.height = Math.abs(e.clientY - startY);
    selectedArea.x = Math.min(e.clientX, startX);
    selectedArea.y = Math.min(e.clientY, startY);
  }

  function updateSelectedAreaIndicator() {
    selectionIndicator.style.left = selectedArea.x + 'px';
    selectionIndicator.style.top = selectedArea.y + 'px';
    selectionIndicator.style.width = selectedArea.width + 'px';
    selectionIndicator.style.height = selectedArea.height + 'px';
  }
}
