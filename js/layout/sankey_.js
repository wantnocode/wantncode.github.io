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
                  layerSpacing:  300 ,  // lots of space between layers, for nicer thick links
                  columnSpacing: 2
                })
            });
            // console.log(myDiagram.layout)
            myOverview.div = null
            myOverview =
             GO(go.Overview, "myOverviewDIV",
                { observed: myDiagram });
              myDiagram.nodeTemplateMap.add("",
                       GO(go.Node, "Vertical",
                        // new go.Binding("visible"),
                        // 节点类型
                        {
                          visible:true,
                          layerName:"Foreground",  // 图层
                          click:function(n,v){
                          },
                          doubleClick:function(){
                             send_newGraph("属性")
                          }
                        },
                        new go.Binding("visible"),

                        GO(go.Shape, "Ellipse",
                            {
                             name:"node_shape",
                             stroke:"#fff",
                             fill: "#006ADF",
                             width: 60, 
                             cursor: "pointer", 
                             height: 60,
                             portId: "",
                             // strokeWidth:5,
                             
                            },
                            {
                              toolTip: tooltipTemplate 
                            },
                            // new go.Binding("fill", "d_fill",function(v){
                            //   if(v == ""){
                            //     return "#006ADF"
                            //   }else{
                            //     return v
                            //   }
                            // }),
                            // new go.Binding("strokeDashOffset","strokeDashOffset"),
                            new go.Binding("stroke","d_stroke"),
                            new go.Binding("fill","isHighlighted",function(v,n){
                              // console.log(v,h)
                              return v ? "red": n.part.data.d_fill
                            }).ofObject(),
                            new go.Binding("width"),
                            new go.Binding("height")
                        ),
                        GO(go.Picture, {
                            name:"node_icon", 
                            source: "./img/account.svg",
                            margin: new go.Margin(-40,0,0,0),
                            opacity:1
                        },
                            new go.Binding("source","icon",geoFunc),
                            new go.Binding("width","width",function(v){ 
                              return v * 0.6
                            }),
                            new go.Binding("height","height",function(v){
                              return v * 0.5
                            }),
                            new go.Binding("margin","height",function(v){
                                  return new go.Margin(-v * 0.78 ,0,0,0)  
                            })
                        ),
                        
                        GO(go.Panel, "Auto",{
                            name:"node_text",
                            margin:12,
                            // visible:false
                            opacity:false
                          }, 
                          new go.Binding("margin","width",function(sel){
                            return 12 * sel / 60 * 1.2;
                          }),
                          GO(go.Shape, "Rectangle", { fill: null, stroke: null,margin:new go.Margin(5,0,0,0)},
                            new go.Binding("fill", "isSelected", function(sel) {
                             
                              if (sel) return "#FFC106"; else return null;
                            }).ofObject("")
                          ),
                          GO(go.TextBlock, { margin: 6,font: "12px helvetica, bold Arial, sans-serif", },
                            new go.Binding("text", "text",function(sel){
                                return sel
                            }),
                            new go.Binding("stroke", "isSelected", function(sel) {
                              if (sel) return "#fff"; else return "#000";
                            }).ofObject(""),
                            new go.Binding("font","fontSize",function(v){
                              return v + "px helvetica, bold Arial, sans-serif";
                            })
                          )
                        ),
                        {
                          selectionAdornmentTemplate:
                            GO(go.Adornment, "Vertical",
                              GO(go.Shape, "RoundedRectangle",
                              { width:100,height:130, fill: null, stroke: null, strokeWidth: 5,margin:new go.Margin(0,0,0,0)}),
                              GO(go.Placeholder)
                            )  
                        },
                        //标签一
                       
                        
                        {
                          selectionAdorned:false
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
                            // name:"edge_shape", 
                            opacity:1, 
                            isPanelMain: true, 
                            stroke: "#BDBDBD", 
                            strokeWidth: 1 ,
                            fill:"#BDBDBD",

                            
                        },
                        // new go.Binding("fill", "d_fill"),
                        // new go.Binding("stroke", "d_stroke"),
                        // new go.Binding("strokeWidth", "width"),
                       new go.Binding("strokeWidth", "money",function(money){
                          if(money > 10000000){
                            return 4
                          }
                          if(money > 1000000){
                            return 3
                          }
                          if(money > 100000){
                            return 2
                          }
                          return 1
                        }),
                        new go.Binding("stroke", "money",function(money){
                          if(money > 10000000){
                            return "red"
                          }
                          if(money > 1000000){
                            return "orange"
                          }
                          if(money > 100000){
                            return "green"
                          }
                          return "#ccc"
                        }),
                        // new go.Binding("stroke", "patt", function(f) { return (f === "") ? ""  : "transparent"; }),
                        // new go.Binding("pathPattern", "patt", convertPathPatternToShape)
                        
              ),
               GO(go.Shape, { isPanelMain: true, stroke: "white", strokeWidth: 3, name: "PIPE", strokeDashArray: [10, 10],opacity:0 }), 
              GO(go.TextBlock,
              // {
              //     name:"link_text",
              //     textAlign:"center",
              //      // alignment:go.Spot.Left,
              //      alignmentFocus: new go.Spot(0.5,0,0,16),
              //       // segmentIndex: 0, segmentFraction: 0.5 ,
              //      // stroke:"#000",
              //      // segmentOffset:new go.Point(0,-10),
              //      opacity:1,
                   

              //      // segmentOrientation:go.Link.OrientUpleft
              //   },
                 "2/3", { segmentIndex: NaN, segmentFraction: 0.5,font: " 14pt Segoe UI, sans-serif", stroke: "#333", },
                
                new go.Binding("text","text",function(n){
                  // console.log(n)
                  return n.replace(/(\r\n)|(\n)/g,'  ')
                })
                // new go.Binding("font", "font")
                ),
              
              GO(go.Shape, { name: "link_arrow", toArrow: "standard", stroke: "#BDBDBD",fill:"#BDBDBD" },
                // new go.Binding("fill", "d_fill"),
                // new go.Binding("stroke", "d_stroke")
                new go.Binding("strokeWidth", "money",function(money){
                          if(money > 10000000){
                            return 4
                          }
                          if(money > 1000000){
                            return 3
                          }
                          if(money > 100000){
                            return 2
                          }
                          return 1
                        }),
                        new go.Binding("stroke", "money",function(money){
                          if(money > 10000000){
                            return "red"
                          }
                          if(money > 1000000){
                            return "orange"
                          }
                          if(money > 100000){
                            return "green"
                          }
                          return "#ccc"
                        }),
              )
            );
           

}