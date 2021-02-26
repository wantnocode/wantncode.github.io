function SankeyLayout() {
      go.LayeredDigraphLayout.call(this);
}
    go.Diagram.inherit(SankeyLayout, go.LayeredDigraphLayout);

    // // determine the desired height of each node/vertex,
    // // based on the thicknesses of the connected links;
    // // actually modify the height of each node's SHAPE
SankeyLayout.prototype.createNetwork = function () {
    this.diagram.nodes.each(function (node) {
        var height = getAutoHeightForNode(node);
        var font = "normal " + Math.max(6, Math.round(height / 8)) + "pt Segoe UI, sans-serif"
        var shape = node.findObject("SHAPE");
        var text = node.findObject("TEXT");
        var textName = node.findObject("TEXTNAME");
        var ltext = node.findObject("LTEXT");
        if (shape)
            shape.height = height;
        if (text) {
            text.font = font;
            textName.font = font;
        }

        if (ltext)
            ltext.font = font;
    });
    return go.LayeredDigraphLayout.prototype.createNetwork.call(this);
};

    function getAutoHeightForNode(node) {
      var heightIn = 0;
      var it = node.findLinksInto()
      while (it.next()) {
        var link = it.value;
        heightIn += link.computeThickness();
      }
      var heightOut = 0;
      var it = node.findLinksOutOf()
      while (it.next()) {
        var link = it.value;
        heightOut += link.computeThickness();
      }
      var h = Math.max(heightIn, heightOut);
      if (h < 10) h = 5;
      return h;
    };

    // treat dummy vertexes as having the thickness of the link that they are in
    SankeyLayout.prototype.nodeMinColumnSpace = function(v, topleft) {
      if (v.node === null) {
        if (v.edgesCount >= 1) {
          var max = 1;
          var it = v.edges;
          while (it.next()) {
            var edge = it.value;
            if (edge.link != null) {
              var t = edge.link.computeThickness();
              if (t > max) max = t;
              break;
            }
          }
          return Math.max(2, Math.ceil(max / this.columnSpacing));
        }
        // return 2;
        return 10;
      }
      return go.LayeredDigraphLayout.prototype.nodeMinColumnSpace.call(this, v, topleft);
    }

    // treat dummy vertexes as being thicker, so that the Bezier curves are gentler
    SankeyLayout.prototype.nodeMinLayerSpace = function(v, topleft) {
      // console.log(v)
      if (v.node === null) return 300;
      return go.LayeredDigraphLayout.prototype.nodeMinLayerSpace.call(this, v, topleft);
    }

    SankeyLayout.prototype.assignLayers = function() {

      go.LayeredDigraphLayout.prototype.assignLayers.call(this);

      var maxlayer = this.maxLayer;
      // now make sure every vertex with no outputs is maxlayer
      for (var it = this.network.vertexes.iterator; it.next();) {
        var v = it.value;
        var node = v.node;
        if (v.destinationVertexes.count == 0) {
          v.layer = 0;
        }
        if (v.sourceVertexes.count == 0) {
          v.layer = maxlayer;
        }
      }
      // from now on, the LayeredDigraphLayout will think that the Node is bigger than it really is
      // (other than the ones that are the widest or tallest in their respective layer).
    };

    // SankeyLayout.prototype.assignLayers = function() {
    //     go.LayeredDigraphLayout.prototype.assignLayers.call(this);
    //     var net = this.network;
    //     net.findAllParts().each(function(link) {
    //       if (!(link instanceof go.Link)) return;
    //       var fv = net.findVertex(link.fromNode);
    //       var tv = net.findVertex(link.toNode);
    //       if (fv.layer < tv.layer) {
    //         net.deleteLink(link);
    //         link.routing = go.Link.AvoidsNodes;
    //         link.curve = go.Link.None;
    //       }
    //     })
    //   }

    SankeyLayout.prototype.commitLayout = function() {
      go.LayeredDigraphLayout.prototype.commitLayout.call(this);
      for (var it = this.network.edges.iterator; it.next();) {
        var link = it.value.link;
        if (link && link.curve === go.Link.Bezier) {
          // depend on Link.adjusting === go.Link.End to fix up the end points of the links
          // without losing the intermediate points of the route as determined by LayeredDigraphLayout
          link.invalidateRoute();
        }
      }
    };


  var animation = new go.Animation();
  animation.easing = go.Animation.EaseLinear;

function sankey_layout (){
  graph_layout_type = 1;
            // myDiagram = null;
            myDiagram.div = null;
            // var bluered = GO(go.Brush,"linear",{0.0:"blue",1.0:"red"})
            myDiagram = GO(go.Diagram, "myDiagramDiv", 
            {
                // initialAutoScale: go.Diagram.Uniform,
                initialAutoScale: go.Diagram.Uniform,
                "animationManager.isEnabled":false,
                // "undoManager.isEnabled":true,
                "ModelChanged":function(e){
                 

                },
                // "animationManager.isEnabled":false,
                layout: GO(SankeyLayout,
                {
                  setsPortSpots: false,  // to allow the "Side" spots on the nodes to take effect
                  direction: 0,  // rightwards
                  // layeringOption: go.LayeredDigraphLayout.LayerOptimalLinkLength,
                  initializeOption:go.LayeredDigraphLayout.InitDepthFirstIn,
                  packOption: go.LayeredDigraphLayout.PackStraighten || go.LayeredDigraphLayout.PackMedian,
                  // packOption: 2,
                  layerSpacing: option.layerSpacing == undefined ? 300 : option.layerSpacing,  // lots of space between layers, for nicer thick links
                  columnSpacing: 2
                })
            });
            // console.log(myDiagram.layout)
            myOverview.div = null
            myOverview =
             GO(go.Overview, "myOverviewDIV",
                { observed: myDiagram });
              myDiagram.nodeTemplateMap.add("",
                       GO(go.Node,go.Panel.Horizontal,
                        // new go.Binding("visible"),
                        // 节点类型
                        {
                          
                          doubleClick:function(){
                             send_newGraph("属性")
                          }
                        },
                        // new go.Binding("visible"),
                        new go.Binding("location", "loc",go.Point.parse).makeTwoWay(go.Point.stringify),
                        
                      GO(go.Shape,
                            {
                              name: "SHAPE",
                              figure: "Rectangle",
                              stroke: null,
                              // strokeWidth: 5,
                              // portId: "",
                              fromSpot: go.Spot.RightSide,
                              toSpot: go.Spot.LeftSide,
                               // fromSpot: go.Spot.LeftSide,
                              // toSpot: go.Spot.RightSide,
                              portId: "",
                              cursor: "pointer",
                              fromLinkable: false,
                              toLinkable: false,
                              // height: 1000,
                              width: 10
                              // opacity:false
                      },
                {
                    toolTip: tooltipTemplate 
                },
                new go.Binding("fill", "d_fill"),
                new go.Binding("stroke","d_stroke")
                // new go.Binding("stroke", "isSelected", function(sel) {
                //               // console.log(color_curr)
                //               if (sel) return "#FFC106"; else return null;
                //             }).ofObject(""),

              ),
              GO(go.TextBlock, { name:"node_text",font: "normal 6pt Segoe UI, sans-serif", stroke: "#333",opacity:false },
                            new go.Binding("text", "text",function(sel){
                                // return setText(sel)
                                return sel.replace(/[\r\n]/g,"")
                            }),
                            new go.Binding("stroke","fontColor"),
                            new go.Binding("font", "fontSize",function(v){
                              return v + "px helvetica, nomal Arial, sans-serif"
                            })    
               ),
                {
                          selectionAdornmentTemplate:
                            GO(go.Adornment, "Auto",
                              GO(go.Shape, "RoundedRectangle",
                              { width:100,height:130, fill: null, stroke: null, strokeWidth: 5,margin:new go.Margin(0,0,0,0)}),
                              GO(go.Placeholder)
                            )  
                        } 
                      
                  ));
           

       
          
          var linkSelectionAdornmentTemplate =
            GO(go.Adornment, "Link",
              GO(go.Shape,
                { isPanelMain: true, fill: null, stroke: "blue", strokeWidth: 3}) 
            );

          myDiagram.linkTemplate =
             GO(go.Link, go.Link.Bezier,
            // GO(ParallelRouteLink,
              {
                // selectionAdornmentTemplate: linkSelectionAdornmentTemplate,
                // layerName: "Background",
                fromEndSegmentLength: 150, 
                toEndSegmentLength: 150,
  
                // routing:go.Link.AvoidsNodes,
                adjusting: go.Link.End
              },{
                doubleClick:function(){
                  send_newGraph("属性")
                }
              },
              {
                // toolTip: tooltipTemplate_link 
              },
              new go.Binding("points").makeTwoWay(),
              //    ),
              GO(go.Shape,
                        {  
                            opacity:1, 
                            isPanelMain: true, 
                            stroke: "#BDBDBD", 
                            strokeWidth: 1 ,
                            fill:"#BDBDBD",

                            
                        },
                        new go.Binding("fill", "d_fill"),
                        new go.Binding("stroke", "d_stroke")
                        
              ),
               GO(go.Shape, { isPanelMain: true, stroke: "white", strokeWidth: 3, name: "PIPE", strokeDashArray: [10, 10],opacity:0 }), 
              GO(go.TextBlock,
                {
                  name:"link_text",
                },
                 "2/3", { segmentIndex: NaN, segmentFraction: 0.5,font: " 6pt Segoe UI, sans-serif", stroke: "#333", },
                
                new go.Binding("text","text",function(n){
                  return n.replace(/(\r\n)|(\n)/g,'  ')
                }),
                new go.Binding("stroke","fontColor"),
                new go.Binding("font", "fontSize",function(v){
                    return v + "px helvetica, nomal Arial, sans-serif"
                })    
                ),
              
              GO(go.Shape, { name: "link_arrow", toArrow: "standard", stroke: "#BDBDBD",fill:"#BDBDBD" },
                new go.Binding("fill", "d_fill"),
                new go.Binding("stroke", "d_stroke")
              )
            );
           

}