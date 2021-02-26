

var myWholeModel;

function f_v_layout(){
   // var $ = go.GraphObject.make;  // for conciseness in defining templates
   myDiagram.div = null;
      myDiagram =
        GO(go.Diagram, "myDiagramDiv",
          {
            contentAlignment: go.Spot.Center,
            initialAutoScale: go.Diagram.Uniform,
            layout: GO(VirtualizedForceDirectedLayout,
                      // { defaultSpringLength: 30 }
                      { defaultSpringLength: 140, maxIterations: 200 }
                      ),
            "undoManager.isEnabled":true,
            // "redoManager.isEnabled":true,
            "animationManager.isEnabled": false
        });
         myOverview.div = null
                 myOverview =
                       GO(go.Overview, "myOverviewDIV",
                          { observed: myDiagram }
                 );
          myDiagram.nodeTemplateMap.add("",
                GO(go.Node, "Vertical",
                        // new go.Binding("visible"),
                        { isLayoutPositioned: false },  // optimization
                  new go.Binding("position", "bounds", function(b,n) { 
                    if(n.part.data.isLocking == 1){
                      console.log(n.part.data)
                        return new go.Point(n.part.data.loc.x,n.part.data.loc.y);
                    }
                    return b.position; 
                  })
                  .makeTwoWay(function(p, d) { return new go.Rect(p.x, p.y, d.bounds.width, d.bounds.height); }),
                        // 节点类型
                        {
                          // visible:true,
                          layerName:"Foreground",  // 图层
                          // mouseEnter:function(v){
                          //   console.log(v)
                          // },
                          click:function(n,v){
                            // console.log(n,v)
                          },
                          doubleClick:function(){
                             send_newGraph("属性")
                          }
                        },
                        new go.Binding("visible"),
                      

                        GO(go.Shape, "Ellipse",
                            {
                             name:"node_shape",
                             // stroke: "#006ADF", 
                             stroke:"#fff",
                             fill: "#006ADF",
                             // fill:go.Brush.randomColor(),
                             width: 60, 
                             cursor: "pointer", 
                             height: 60,
                             portId: "",
                             strokeWidth:5,
                             // strokeDashArray:[4,4],
                             // strokeDashOffset:1,
                             // name: "PIPE"
                             
                            },
                            {
                              toolTip: tooltipTemplate 
                            },
                            // new go.Binding("pathPattern", "patt", convertPathPatternToShape),
                            new go.Binding("fill", "d_fill",function(v){
                              if(v == ""){
                                return go.Brush.randomColor()
                              }else{
                                return v
                              }
                            }),
                            // new go.Binding("strokeDashOffset","strokeDashOffset"),
                            new go.Binding("fill","isHighlighted",function(v,n){
                              // console.log(v,h)
                              return v ? "red": n.part.data.d_fill
                            }).ofObject(),
                            // new go.Binding("stroke","d_stroke"),
                            new go.Binding("width"),
                            new go.Binding("height")
                        ),
                        // GO(go.Shape, { width:65,height:65,isPanelMain: true, stroke: "white", strokeWidth: 3, name: "PIPE", strokeDashArray: [10, 10],opacity:0 }), 
                        GO(go.Picture, {
                            name:"node_", 
                            source: "./img/account.svg",
                            margin: new go.Margin(-40,0,0,0),
                            // opacity:1
                            visible:false
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
                            visible:false

                          }, 
                          new go.Binding("margin","width",function(sel){
                            return 12 * sel / 60 * 1.2;
                          }),
                          GO(go.Shape, "Rectangle", { fill: null, stroke: null,margin:new go.Margin(5,0,0,0)},
                            new go.Binding("fill", "isSelected", function(sel) {
                             
                              if (sel) return "#FFC106"; else return null;
                            }).ofObject("")
                          ),
                          GO(go.TextBlock, { margin: 6 ,font: "14px helvetica, bold Arial, sans-serif", },
                            new go.Binding("text", "text",function(sel){
                                // return setText(sel)
                                return sel
                            }),
                            new go.Binding("font", "font_size", function(sel) {
                              return  sel + "px helvetica, bold Arial, sans-serif"
                            }),  
                            new go.Binding("stroke", "isSelected", function(sel) {
                              if (sel) return "#fff"; else return "#000";
                            }).ofObject("")
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
                        {
                          selectionAdorned:false
                        }
                        //标签一
                        
                  
                  ));
       // myDiagram.nodeTemplateMap.add("",GO(go.Node, "Auto",
       //          { isLayoutPositioned: false },  // optimization
       //          new go.Binding("position", "bounds", function(b) { return b.position; })
       //            .makeTwoWay(function(p, d) { return new go.Rect(p.x, p.y, d.bounds.width, d.bounds.height); }),
       //          { width: 60, height: 60 },  // in cooperation with the load function, below
       //          GO(go.Shape, "Ellipse",
       //            new go.Binding("fill")),
       //          GO(go.TextBlock,
       //            { margin: 2 ,visible:false,name:"node_text" },
       //            new go.Binding("text")),
                
       //    ));
                  // isLayoutPositioned: false
                    myDiagram.linkTemplate = GO(go.Link, {
                          cursor: "pointer",
                          isLayoutPositioned: false 
                        
                    },{
                      doubleClick:function(){
                       send_newGraph("属性")
                      }
                    },
                    {
                      toolTip:tooltipTemplate_link
                    },
                
                    GO(go.Shape, { 
                          name: "link_arrow", 
                          toArrow: "standard",
                          stroke: "#BDBDBD",
                          fill:"#BDBDBD",
                          visible:false 
                          },
                          new go.Binding("fill", "d_stroke",function(sel){
                            // console.log(linkArray)
                            return sel;
                          }),
                           new go.Binding("strokeWidth", "stroke_width"),
                          new go.Binding("stroke", "d_stroke",function(sel){
                            return sel;
                          }),
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
                            new go.Binding("fill", "d_stroke",function(sel){
                            return sel;
                          }),
                            new go.Binding("stroke", "d_stroke",function(sel){
                            return sel;
                          }),
                             new go.Binding("strokeWidth", "stroke_width"),
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
                    ),
                    GO(go.Shape,
                        {  
                            name:"edge_shape", 
                            opacity:1, 
                            isPanelMain: true, 
                            stroke: "#BDBDBD", 
                            strokeWidth: 1 ,
                            fill:"#BDBDBD"
                            
                        },
                        new go.Binding("fill", "d_stroke",function(sel){
                            return sel;
                          }),
                        // new go.Binding("stroke", "d_stroke",function(sel){
                        //     return sel;
                        //   }),
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
                        new go.Binding("strokeWidth", "stroke_width")
                        // new go.Binding("stroke", "patt", function(f) { return (f === "") ? ""  : "transparent"; }),
                        // new go.Binding("pathPattern", "patt", convertPathPatternToShape)
                        
                    ), 
                    {
                        // doubleClick: function(e, link) {

                        // }
                    },
                    GO(go.TextBlock,// the label text
                    {       
                            name:"link_text",
                            text:"",
                            textAlign: "center",
                            font: "10px helvetica, bold Arial, sans-serif",
                            stroke: "#ccc",
                            editable: false,
                            opacity:1,
                            segmentOffset: new go.Point(10, NaN),
                            segmentOrientation: go.Link.OrientUpleft,
                            margin: 4

                    },
                    new go.Binding("text"),            //连线label
                    new go.Binding("font", "font",function(v){
                      return v + "px helvetica, bold Arial, sans-serif"
                    })             //连线label的字体
                    

                )

              );

      myWholeModel =
        GO(go.GraphLinksModel);  

      myDiagram.layout.model = myWholeModel;

      myDiagram.model =   
        GO(go.GraphLinksModel);  

      myDiagram.isVirtualized = true;
      myDiagram.addDiagramListener("ViewportBoundsChanged", onViewportChanged);

      myDiagram.addDiagramListener("InitialLayoutCompleted", function(e) {
        // console.log(new Date() + "================完成")
        $(".loading").hide()
          $(".loading_box").hide()
          $(".entity_toast").css("left",document.body.clientWidth / 2 -100)
                $(".entity_toast").css("top",300)
                $(".entity_toast").text("布局完成");
                $(".entity_toast").show()
                setTimeout(function(){
                  $(".entity_toast").hide()
                },500)
        var firstdata = myWholeModel.findNodeDataForKey(0);
        if (firstdata !== null) {
          myDiagram.centerRect(firstdata.bounds);
        }
      });
      myDiagram.addDiagramListener("ChangedSelection",function(e){
            ChangedSelection_fuc()
      })


      // 拖动节点 隐藏链接
        // function setDraggedLinkVisibility(tool, val) {
        //   var it = tool.draggedParts.iterator;
        //   while (it.next()) {
        //     var p = it.key;
        //     if (p instanceof go.Node) {
        //       var lit = p.linksConnected;
        //       while (lit.next()) {
        //         var l = lit.value;
        //         l.visible = val;
        //       }
        //     }
        //   }
        // }

        // myDiagram.toolManager.draggingTool.doActivate = function () {
        //   go.DraggingTool.prototype.doActivate.call(this);
        //   setDraggedLinkVisibility(this, false);
        // }

        // myDiagram.toolManager.draggingTool.doDeactivate = function () {
        //   setDraggedLinkVisibility(this, true);
        //   go.DraggingTool.prototype.doDeactivate.call(this);
        // }
      // myDiagram.delayInitialization(function() {  load() });
      // load() 
}



    function computeDocumentBounds(model) {
      var b = new go.Rect();
      var ndata = model.nodeDataArray;
      for (var i = 0; i < ndata.length; i++) {
        var d = ndata[i];
        if (!d.bounds) continue;
        if (i === 0) {
          b.set(d.bounds);
        } else {
          b.unionRect(d.bounds);
        }
      }
      return b;
    }

   
function onViewportChanged(e) {
      // $(".item-inner").hide()
          
        if(myDiagram.scale <= 4) {
            sets_sale_num(myDiagram.scale);
         }else{
            myDiagram.scale = 4
        }


        if(rendering_type == 1){
            setBottom_nav(nodeArray.length,graph_tool.nodesSelectCount(),graph_tool.nodesVisibleCount(),linkArray.length,graph_tool.edgesSelectCount(),graph_tool.edgesVisibleCount())
        }
        let scale = myDiagram.scale; 
        myDiagram.nodes.each(function(node){
            var node_= node.findObject("node_");
            var node_text = node.findObject("node_text");

              if(node_ !== null) {
                  node_.visible =  scale < 0.8 ? false : true
              }
              if(node_text !== null) {
                  node_text.visible =  scale < 0.8 ? false : true
              }
              
                     
        })
        myDiagram.links.each(function(link){
              var link_text= link.findObject("link_text");
              var link_ = link.findObject("link_");
              if(link_text !== null){
                  link_text.visible = scale < 0.8 ? false : true;      
              }
              if(link_ !== null){
                  link_.visible = scale < 0.8 ? false : true;
              }
        })
       



        ////////////////////////////==========================================================
       // console.log(new Date() + "================更新前")
       
      var diagram = e.diagram;
      var viewb = diagram.viewportBounds;  // the new viewportBounds
      // viewb.x = viewb.x - 1000;
      // console.log(viewb)
      var model = diagram.model;

      var oldskips = diagram.skipsUndoManager;
      diagram.skipsUndoManager = true;

      var b = new go.Rect();
      var ndata = myWholeModel.nodeDataArray;
      for (var i = 0; i < ndata.length; i++) {
        var n = ndata[i];
        if (!n.bounds) continue;
        if (n.bounds.intersectsRect(viewb)) {
          model.addNodeData(n);
        }
   

      // if (model instanceof go.GraphLinksModel) {
        var ldata = myWholeModel.linkDataArray;
        for (var i = 0; i < ldata.length; i++) {
          var l = ldata[i];
          var fromkey = myWholeModel.getFromKeyForLinkData(l);
          if (fromkey === undefined) continue;
          var from = myWholeModel.findNodeDataForKey(fromkey);
          if (from === null || !from.bounds) continue;

          var tokey = myWholeModel.getToKeyForLinkData(l);
          if (tokey === undefined) continue;
          var to = myWholeModel.findNodeDataForKey(tokey);
          if (to === null || !to.bounds) continue;

          b.set(from.bounds);
          b.unionRect(to.bounds);
          if (b.intersectsRect(viewb)) {
            model.addNodeData(from);
            model.addNodeData(to);
            model.addLinkData(l);
            var link = diagram.findLinkForData(l);
            if (link !== null) {
              link.fromNode.ensureBounds();
              link.toNode.ensureBounds();
              link.updateRoute();
            }
          }
        }
      // }
      }
      diagram.skipsUndoManager = oldskips;

      if (myRemoveTimer === null) {
        myRemoveTimer = setTimeout(function() { removeOffscreen(diagram); }, 3000);
      }

      // updateCounts();  
}

    var myRemoveTimer = null;

    function removeOffscreen(diagram) {
      myRemoveTimer = null;

      var viewb = diagram.viewportBounds;
      var model = diagram.model;
      var remove = [];  // collect for later removal
      var removeLinks = new go.Set();  // links connected to a node data to remove
      var it = diagram.nodes;
      while (it.next()) {
        var n = it.value;
        var d = n.data;
        if (d === null) continue;
        if (!n.actualBounds.intersectsRect(viewb) && !n.isSelected) {
          // even if the node is out of the viewport, keep it if it is selected or
          // if any link connecting with the node is still in the viewport
          if (!n.linksConnected.any(function(l) { return l.actualBounds.intersectsRect(viewb); })) {
            remove.push(d);
            if (model instanceof go.GraphLinksModel) {
              removeLinks.addAll(n.linksConnected);
            }
          }
        }
      }

      if (remove.length > 0) {
        var oldskips = diagram.skipsUndoManager;
        diagram.skipsUndoManager = true;
        model.removeNodeDataCollection(remove);
        if (model instanceof go.GraphLinksModel) {
          removeLinks.each(function(l) { if (!l.isSelected) model.removeLinkData(l.data); });
        }
        diagram.skipsUndoManager = oldskips;
      }

      // updateCounts();  // only for this sample
    }



    function VirtualizedForceDirectedLayout() {
      go.ForceDirectedLayout.call(this);
      this.isOngoing = false;
      this.model = null;  // add this property for holding the whole GraphLinksModel
    }
    go.Diagram.inherit(VirtualizedForceDirectedLayout, go.ForceDirectedLayout);

    VirtualizedForceDirectedLayout.prototype.createNetwork = function() {
      return new VirtualizedForceDirectedNetwork(this);  // defined below
    };

    // ignore the argument, an (implicit) collection of Parts
    VirtualizedForceDirectedLayout.prototype.makeNetwork = function(coll) {
      var net = this.createNetwork();
      net.addData(this.model);  // use the model data, not any actual Nodes and Links
      return net;
    };

    VirtualizedForceDirectedLayout.prototype.commitLayout = function() {
      go.ForceDirectedLayout.prototype.commitLayout.call(this);
      // can't depend on regular bounds computation that depends on all Nodes existing
      this.diagram.fixedBounds = computeDocumentBounds(this.model);
      // update the positions of any existing Nodes
      this.diagram.nodes.each(function(node) {
        node.updateTargetBindings();
      });
    };
    // end VirtualizedForceDirectedLayout class


    function VirtualizedForceDirectedNetwork(layout) {
      go.ForceDirectedNetwork.call(this, layout);
    }
    go.Diagram.inherit(VirtualizedForceDirectedNetwork, go.ForceDirectedNetwork);

    VirtualizedForceDirectedNetwork.prototype.addData = function(model) {
      if (model instanceof go.GraphLinksModel) {
        var dataVertexMap = new go.Map();
        // create a vertex for each node data
        var ndata = model.nodeDataArray;
        for (var i = 0; i < ndata.length; i++) {
          var d = ndata[i];
          var v = this.createVertex();
          v.data = d;  // associate this Vertex with data, not a Node
          dataVertexMap.set(model.getKeyForNodeData(d), v);
          this.addVertex(v);
        }
        // create an edge for each link data
        var ldata = model.linkDataArray;
        for (var i = 0; i < ldata.length; i++) {
          var d = ldata[i];
          // now find corresponding vertexes
          var from = dataVertexMap.get(model.getFromKeyForLinkData(d));
          var to = dataVertexMap.get(model.getToKeyForLinkData(d));
          if (from === null || to === null) continue;  // skip
          // create and add VirtualizedForceDirectedEdge
          var e = this.createEdge();
          e.data = d;  // associate this Edge with data, not a Link
          e.fromVertex = from;
          e.toVertex = to;
          this.addEdge(e);
        }
      } else {
        throw new Error("can only handle GraphLinksModel data");
      }
    };

    VirtualizedForceDirectedNetwork.prototype.deleteArtificialVertexes = function() { };


   