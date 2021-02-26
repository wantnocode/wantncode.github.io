 /*

 重构sankey布局
 参数构建高度
 */
function x_SankeyLayout() {
      go.TreeLayout.call(this);
}
go.Diagram.inherit(x_SankeyLayout, go.TreeLayout);

    // determine the desired height of each node/vertex,
    // based on the thicknesses of the connected links;
    // actually modify the height of each node's SHAPE
      x_SankeyLayout.prototype.makeNetwork = function(coll) {
        var net = go.LayeredDigraphLayout.prototype.makeNetwork.call(this, coll);
        this.diagram.nodes.each(function(node) {
          // figure out how tall the node's bar should be
          var height = getAutoHeightForNode(node);
          var shape = node.findObject("SHAPE");
          if (shape) shape.height = height;
          var text = node.findObject("TEXT");
          var ltext = node.findObject("LTEXT");
          var font = "bold " + Math.max(12, Math.round(height / 8)) + "pt Segoe UI, sans-serif"
          if (text) text.font = font;
          if (ltext) ltext.font = font;
          // and update the vertex's dimensions accordingly
          var v = net.findVertex(node);
          if (v !== null) {
            node.ensureBounds();
            var r = node.actualBounds;
            v.width = r.width;
            v.height = r.height;
            v.focusY = v.height/2;
          }
        });
        return net;
     };

    // function getAutoHeightForNode(node) {
    //   var heightIn = 0;
    //   var it = node.findLinksInto()
    //   while (it.next()) {
    //     var link = it.value;
    //     heightIn += link.computeThickness();
    //   }
    //   var heightOut = 0;
    //   var it = node.findLinksOutOf()
    //   while (it.next()) {
    //     var link = it.value;
    //     heightOut += link.computeThickness();
    //   }
    //   var h = Math.max(heightIn, heightOut);
    //   if (h < 10) h = 60;
    //   return h;
    // };

    // treat dummy vertexes as having the thickness of the link that they are in
    x_SankeyLayout.prototype.nodeMinColumnSpace = function(v, topleft) {
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
        return 2;
      }
      return go.LayeredDigraphLayout.prototype.nodeMinColumnSpace.call(this, v, topleft);
    }

    // treat dummy vertexes as being thicker, so that the Bezier curves are gentler
    x_SankeyLayout.prototype.nodeMinLayerSpace = function(v, topleft) {
      if (v.node === null) return 100;
      return go.LayeredDigraphLayout.prototype.nodeMinLayerSpace.call(this, v, topleft);
    }

    x_SankeyLayout.prototype.assignLayers = function() {
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

    x_SankeyLayout.prototype.commitLayout = function() {
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
function fast_sankey_layout (){
  graph_layout_type = 1;

            myDiagram.div = null;
            // var bluered = GO(go.Brush,"linear",{0.0:"blue",1.0:"red"})
            myDiagram = GO(go.Diagram, "myDiagramDiv", 
            {
                initialAutoScale: go.Diagram.Uniform,
                "animationManager.isEnabled":false,
                // "undoManager.isEnabled":true,
                "ModelChanged":function(e){
                 

                },
                // "animationManager.isEnabled":false,
                layout: GO(x_SankeyLayout, {
                    // setsPortSpots: false,  // to allow the "Side" spots on the nodes to take effect

                    layerSpacing: 500,  // lots of space between layers, for nicer thick links
                    alignment:go.TreeLayout.AlignmentStart

                })
            });
            // console.log(myDiagram.layout)
            myOverview.div = null
            myOverview =
             GO(go.Overview, "myOverviewDIV",
                { observed: myDiagram });

            myDiagram.nodeTemplateMap.add("",
            
             GO(go.Node,"Vertical",  //拉伸布局
             // GO(go.Node,
              {
                // selectionAdornmentTemplate: linkSelectionAdornmentTemplate,
                locationObjectName: "SHAPE",
                locationSpot: go.Spot.MiddleLeft,
                layerName:"Foreground"  // 图层问题
                
              },
              {
               //  mouseEnter:function(e,node){
               //     animation = null;
               //     animation = new go.Animation();
               //     animation.easing = go.Animation.EaseLinear;
               //     myDiagram.links.each(function(link) {
               //         if(link.fromNode.key == node.key || link.toNode.key == node.key){
               //         link.findObject("PIPE").opacity = 1
               //         animation.add(link.findObject("PIPE"), "strokeDashOffset", 20, 0)
               //    }
               //    });
               //    // Run indefinitely
               //    animation.runCount = Infinity;
               //    animation.start(); 
               // },
               // mouseLeave:function(e,node){
               //  myDiagram.links.each(function(link) {
               //      if(link.fromNode.key == node.key || link.toNode.key == node.key){
               //         link.findObject("PIPE").opacity = 0
               //      }
               //  });
               //  animation.stop();
               // },
                doubleClick:function(e,node){
                  send_newGraph("属性")
                    
                }
              },
              
              

              GO(go.Shape,
                {
                  name: "SHAPE",
                  figure: "Rectangle",
                  // fill: "#2E8DEF",  
                  // fill: bluered,  
                  stroke: null,
                  strokeWidth: 5,
                  portId: "",
                  fromSpot: go.Spot.RightSide,
                  toSpot: go.Spot.LeftSide,
                  portId: "",
                  cursor: "pointer",
                  fromLinkable: false,
                  toLinkable: false,
                  // height: 1000,
                  width: 20,
                  opacity:1
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
               // new go.Binding("fromLinkable"),                 //如上
                //new go.Binding("toLinkable")
                

              ),
               //标签一
                  // GO(go.Shape,"RoundedRectangle",
                  //         { 
                  //          name:"entity_label",
                  //          margin: new go.Margin(-60,0,0,105),
                  //          fill: "red",  
                  //          cursor: "pointer",
                  //          width:60,
                  //          height:18,
                  //          // strokeWidth: 0,
                  //          opacity:0 
                  //         },
                  //         {
                  //             // toolTip: tooltipTemplate_label1 
                  //         },
                  //         new go.Binding("opacity","tags",function(v){
                  //                 if(labelisShow == 0){
                  //                   return 0
                  //                 }
                  //                 if(v[0].style.width > 0){
                  //                   return 1
                  //                 }else{
                  //                   return 0
                  //                 }
                  //               }),
                  //               new go.Binding("fill", "tags",function(v){
                  //                 return v[0].style.fill
                  //               }),
                  //               new go.Binding("stroke", "tags",function(v){
                  //                 return v[0].style.stroke
                  //               })
                  // ),
                  
                  //标签二
                  // GO(go.Shape,"RoundedRectangle",
                  //         { 
                  //          name:"entity_label2",
                  //          margin: new go.Margin(2,0,0,105),
                  //          fill: "red",  
                  //          cursor: "pointer",
                  //          width:60,
                  //          height:18,
                  //          // strokeWidth: 0,
                  //          opacity:0
                  //         },
                  //         {
                  //           // toolTip: tooltipTemplate_label2 
                  //         },
                  //         new go.Binding("opacity","tags",function(v){
                  //                 if(labelisShow == 0){
                  //                   return 0
                  //                 }
                  //                 if(v[1].style.width > 0){
                  //                   return 1
                  //                 }else{
                  //                   return 0
                  //                 }
                  //               }),
                  //               new go.Binding("fill", "tags",function(v){
                  //                 return v[1].style.fill
                  //               }),
                  //               new go.Binding("stroke", "tags",function(v){
                  //                 return v[1].style.stroke
                  //               })
                  // ),
                  //标签三
                  // GO(go.Shape,"RoundedRectangle",
                  //         { 
                  //          name:"entity_label3",
                  //          margin: new go.Margin(2,0,0,105),
                  //          fill: "red",  
                  //          cursor: "pointer",
                  //          width:60,
                  //          height:18,
                  //          // strokeWidth: 0,
                  //          opacity:0
                  //         },
                  //         {
                  //             // toolTip: tooltipTemplate_label3 
                  //         },
                  //         new go.Binding("opacity","tags",function(v){
                  //                 if(labelisShow == 0){
                  //                   return 0
                  //                 }
                  //                 if(v[2].style.width > 0){
                  //                   return 1
                  //                 }else{
                  //                   return 0
                  //                 }
                  //               }),
                  //               new go.Binding("fill", "tags",function(v){
                  //                 return v[2].style.fill
                  //               }),
                  //               new go.Binding("stroke", "tags",function(v){
                  //                 return v[2].style.stroke
                  //               })
                  // ),





                  // GO(go.TextBlock, {           //文本设置
                  //             name:"entity_label_text1",
                  //             text:"",
                  //             cursor: "pointer",
                  //             opacity:0,
                  //             // fill:"#fff",
                  //             stroke:"#333",
                  //             // alignment: go.Spot.Bottom,
                  //             margin: new go.Margin(-58,0,0,95)
                  // },
                  // {
                  //     toolTip: tooltipTemplate_label1 
                  // },
                  // new go.Binding("opacity","tags",function(v){
                  //                 if(labelisShow == 0){
                  //                   return 0
                  //                 }
                  //                 if(v[0].style.width > 0){
                  //                   return 1
                  //                 }else{
                  //                   return 0
                  //                 }
                  //       }),
                  //       new go.Binding("text", "tags",function(n){
                  //         if(strlen(n[0].text) > 5){
                  //           return n[0].text.slice(0,2) + "..."
                  //         }else{
                  //           return n[0].text
                  //         }
                  //         return n[0].text
                  //       }),
                  //       new go.Binding("stroke","tags",function(v){
                  //         return v[0].style.font_color
                  //       })
                  // ),
                  // GO(go.TextBlock, {           //文本设置
                  //                   name:"entity_label_text_x1",
                  //                   text:"X",
                  //                   cursor: "pointer",
                  //                   opacity:0,
                  //                   // fill:"#fff",
                  //                   stroke:"#fff",
                  //                   // alignment: go.Spot.Bottom,
                  //                   margin: new go.Margin(-18,0,0,150)
                  //       },{
                  //         click:function(n,o){
                  //           if(o.opacity == 1){
                  //              delete_lable(1)
                  //           }
                  //         }
                  //       },
                  //       new go.Binding("opacity","tags",function(v){
                  //                 if(labelisShow == 0){
                  //                   return 0
                  //                 }
                  //                 if(v[0].style.width > 0){
                  //                   return 1
                  //                 }else{
                  //                   return 0
                  //                 }
                  //       })
                  // ),





                  // GO(go.TextBlock, {           //文本设置
                  //             name:"entity_label_text2",
                  //             text:"",
                  //             cursor: "pointer",
                  //             opacity:0,
                  //             // fill:"#fff",
                  //             stroke:"#333",
                  //             // alignment: go.Spot.Bottom,
                  //             margin: new go.Margin(3,0,0,95)
                  // },
                  // {
                  //     toolTip: tooltipTemplate_label2 
                  // },
                  // new go.Binding("opacity","tags",function(v){
                  //                 if(labelisShow == 0){
                  //                   return 0
                  //                 }
                  //                 if(v[1].style.width > 0){
                  //                   return 1
                  //                 }else{
                  //                   return 0
                  //                 }
                  //       }),
                  //       new go.Binding("text", "tags",function(n){
                  //         if(strlen(n[1].text) > 5){
                  //           return n[1].text.slice(0,2)
                  //         }else{
                  //           return n[1].text
                  //         }
                  //         return n[1].text
                  //       }),
                  //       new go.Binding("stroke","tags",function(v){
                  //         return v[1].style.font_color
                  //       })
                  // ),
                  // GO(go.TextBlock, {           //文本设置
                  //                   name:"entity_label_text_x2",
                  //                   text:"X",
                  //                   cursor: "pointer",
                  //                   opacity:0,
                  //                   // fill:"#fff",
                  //                   stroke:"#fff",
                  //                   // alignment: go.Spot.Bottom,
                  //                   margin: new go.Margin(-17,0,0,150)
                  //       },{
                  //         click:function(n,o){
                  //           if(o.opacity == 1){
                  //              delete_lable(2)
                  //           }
                  //         }
                  //       },
                  //       new go.Binding("opacity","tags",function(v){
                  //                 if(labelisShow == 0){
                  //                   return 0
                  //                 }
                  //                 if(v[1].style.width > 0){
                  //                   return 1
                  //                 }else{
                  //                   return 0
                  //                 }
                  //       })
                  // ),




                  // GO(go.TextBlock, {           //文本设置
                  //             name:"entity_label_text3",
                  //             text:"",
                  //             cursor: "pointer",
                  //             opacity:0,
                  //             // fill:"#fff",
                  //             stroke:"#333",
                  //             // alignment: go.Spot.Bottom,
                  //             margin: new go.Margin(5,0,0,95)
                  // },
                  // {
                  //     toolTip: tooltipTemplate_label3 
                  // },
                  // new go.Binding("opacity","tags",function(v){
                  //                 if(labelisShow == 0){
                  //                   return 0
                  //                 }
                  //                 if(v[2].style.width > 0){
                  //                   return 1
                  //                 }else{
                  //                   return 0
                  //                 }
                  //       }),
                  //       new go.Binding("text", "tags",function(n){
                  //         if(strlen(n[2].text) > 5){
                  //           return n[2].text.slice(0,2)
                  //         }else{
                  //           return n[2].text
                  //         }
                  //         return n[2].text
                  //       }),
                  //       new go.Binding("stroke","tags",function(v){
                  //         return v[2].style.font_color
                  //       })
                  // ),
                  // GO(go.TextBlock, {           //文本设置
                  //                   name:"entity_label_text_x3",
                  //                   text:"X",
                  //                   cursor: "pointer",
                  //                   opacity:0,
                  //                   // fill:"#fff",
                  //                   stroke:"#fff",
                  //                   // alignment: go.Spot.Bottom,
                  //                   margin: new go.Margin(-17,0,0,150)
                  //       },{
                  //         click:function(n,o){
                  //           if(o.opacity == 1){
                  //             delete_lable(3)
                  //           }
                  //         }
                  //       },
                  //       new go.Binding("opacity","tags",function(v){
                  //                 if(labelisShow == 0){
                  //                   return 0
                  //                 }
                  //                 if(v[2].style.width > 0){
                  //                   return 1
                  //                 }else{
                  //                   return 0
                  //                 }
                  //       })
                  // ),




                  // GO(go.TextBlock,
                  //   { name: "icon_label" ,margin:5,stroke:"#000",opacity:1},
                  //   new go.Binding("text", "text"),
                  //   new go.Binding("stroke")
                  // )
                 GO(go.Panel, "Auto",  // this whole Panel is a link label
                 {
                  name:"node_text",
                  visible:false
                 },
                          GO(go.Shape, "Rectangle", { fill: null, stroke: null},
                            new go.Binding("fill", "isSelected", function(sel) {
                              // console.log(color_curr)
                              if (sel) return "#FFC106"; else return null;
                            }).ofObject("")
                          ),
                          GO(go.TextBlock, { margin: 3 },
                            new go.Binding("text", "text"),
                            new go.Binding("font", "font_size",function(v){
                              return v + "px helvetica, bold Arial, sans-serif"
                            }),
                            new go.Binding("stroke", "isSelected", function(sel) {
                              // console.log(color_curr)
                              if (sel) return "#FFF"; else return "#333";
                            }).ofObject("")
                          )
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

           myDiagram.nodeTemplateMap.add("square",
                  GO(go.Node, "Auto",
                    GO(go.Shape,"RoundedRectangle",
                      {  width:120,height:64,fill: "#fff", stroke: "#D55500", strokeWidth: 2},
                      new go.Binding("d_fill"),
                      new go.Binding("d_stroke")
                    ),
                    GO(go.TextBlock,
                      {
                        name:"icon_label",
                        visible:1,
                        margin: 8,
                        maxSize: new go.Size(200, NaN),
                        wrap: go.TextBlock.WrapFit,
                        // textAlign: "center",
                        stroke:"#D55500",
                        editable: true
                      },
                      new go.Binding("text").makeTwoWay()),
                      new go.Binding("stroke","d_stroke")
                    // no ports, because no links are allowed to connect with a comment
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
                // name:"link_",
                selectionAdornmentTemplate: linkSelectionAdornmentTemplate,
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
                toolTip: tooltipTemplate_link 
              },
              new go.Binding("points").makeTwoWay(),
              // GO(go.Shape, { name:"link_shape",strokeWidth: 1, stroke: "#BDBDBD" ,fill:"#BDBDBD",cursor: "pointer",opacity:1,},
              //    new go.Binding("strokeWidth", "stroke_width"), 
              //    new go.Binding("fill", "fill"),
              //    new go.Binding("stroke", "stroke"),
              //    ),
              GO(go.Shape,
                        // mark each Shape to get the link geometry with isPanelMain: true
                        {  
                            // name:"edge_shape", 
                            opacity:1, 
                            isPanelMain: true, 
                            stroke: "#BDBDBD", 
                            strokeWidth: 1 ,
                            fill:"#BDBDBD",

                            
                        },
                        new go.Binding("fill", "d_stroke"),
                        new go.Binding("stroke", "d_stroke"),
                        // new go.Binding("strokeWidth", "width"),
                        // new go.Binding("stroke", "patt", function(f) { return (f === "") ? ""  : "transparent"; }),
                        // new go.Binding("pathPattern", "patt", convertPathPatternToShape)
                        
              ),
               GO(go.Shape, { isPanelMain: true, stroke: "white", strokeWidth: 3, name: "PIPE", strokeDashArray: [10, 10],opacity:0 }), 
              GO(go.TextBlock,{
                  name:"link_text",
                  textAlign:"center",
                   // alignment:go.Spot.Left,
                   // alignmentFocus: new go.Spot(0.5,0,0,16),
                   stroke:"#000",
                   // segmentOffset:new go.Point(0,-10),
                   // opacity:1,
                   visible:false

                   // segmentOrientation:go.Link.OrientUpleft
                },
                new go.Binding("font", "font_size",function(v){
                              return v + "px helvetica, bold Arial, sans-serif"
                }),
                new go.Binding("text","text",function(n){
                  // console.log(n)
                  return n.replace(/(\r\n)|(\n)/g,'  ')
                })
                // new go.Binding("text", "to"), 
                // new go.Binding("font", "font")
                ),
              
              // GO(go.Shape, { name: "link_arrow", toArrow: "standard", stroke: "#BDBDBD",fill:"#BDBDBD" },
              //   new go.Binding("fill", "d_fill"),
              //   new go.Binding("stroke", "d_stroke")
              // )
              GO(go.Shape, { 
                      name: "link_arrow", 
                      toArrow: "standard",
                      stroke: "#BDBDBD",
                      fill:"#BDBDBD",
                      visible:false 
                      },
                          new go.Binding("fill", "d_stroke"),
                          new go.Binding("stroke", "d_stroke"),
                          new go.Binding("visible","dir",function(sel){
                            if(sel === 0) {
                              return false
                            }else if(sel === 1){
                              return true
                            }else if(sel === 2){
                              return false
                            }else if(sel === 3){
                              return true
                            }
                          })
                    ),
                    //反向
                GO(go.Shape, { 
                        name: "link_arrow", 
                        // toArrow: "standard",
                        fromArrow: "Backward",   //反向
                        // segmentIndex:1,
                        stroke:"#BDBDBD",
                        fill:"#BDBDBD",
                        visible:false
                      },
                            new go.Binding("fill", "d_stroke"),
                            new go.Binding("stroke", "d_stroke"),
                            new go.Binding("visible","dir",function(sel){
                              if(sel === 0) {
                                return false
                              }else if(sel === 1){
                                return false
                              }else if(sel === 2){
                                return true
                              }else if(sel === 3){
                                return true
                              }
                            })
                  )
            );
           

}