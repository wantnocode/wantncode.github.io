var GO = go.GraphObject.make;


var def_color = "#ccc"



function convertPathPatternToShape(name) {
  // console.log(name)
        if (!name) return null;
        return PathPatterns.get(name);
      }

function convertPathPatternToColor(name) {
        var pattobj = convertPathPatternToShape(name);
        return (pattobj !== null) ? pattobj.stroke : "transparent";
}


var PathPatterns = new go.Map();

function definePathPattern(name, geostr, color, width, cap) {
        if (typeof name !== 'string' || typeof geostr !== 'string') throw new Error("invalid name or geometry string argument: " + name + " " + geostr);
        if (color === undefined) color = "black";
        if (width === undefined) width = 1;
        if (cap === undefined) cap = "square";
        PathPatterns.set(name,
          GO(go.Shape,
            {
              geometryString: geostr,
              fill: "transparent",
              stroke: color,
              strokeWidth: width,
              strokeCap: cap
            }
          ));
}
definePathPattern("Dash", "M0 0 M3 0 L6 0","#A01CBB");


/*
  force_directed算法重写
*/
function SmarterForceDirectedLayout() {
    go.ForceDirectedLayout.call(this);
    this.radial = new RadialLayout();
    this.radial.layerThickness = 200;
}
  go.Diagram.inherit(SmarterForceDirectedLayout, go.ForceDirectedLayout);

SmarterForceDirectedLayout.prototype.needsClusterLayout = function() {
    if (go.ForceDirectedLayout.prototype.needsClusterLayout.call(this)) {
      this.radial.network = this.network;
      this.radial.doLayout(this.diagram);
    }
    return false;
}


function  froce_layout(){
            myDiagram.div = null ;
            myDiagram = GO(go.Diagram, "myDiagramDiv", 
                {
                    initialAutoScale: go.Diagram.Uniform,
                    "undoManager.isEnabled":true,
                    "animationManager.isEnabled": false,
                    // "commandHandler.archetypeGroupData": { text: "Group", isGroup: true, color: "blue" },
                    
                    layout:GO(go.ForceDirectedLayout,{
                        defaultSpringLength:50,
                        maxIterations:100,
                        isOngoing:false
                       
                    })
                });

                 myOverview.div = null
                 myOverview =
                       GO(go.Overview, "myOverviewDIV",
                          { observed: myDiagram }
                 );
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
                              if (sel) return "#fff"; else return "#333";
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

      

               // myDiagram.linkTemplate = GO(go.Link, {
                myDiagram.linkTemplateMap.add("", 
                  GO(go.Link, {
                          cursor: "pointer", 
                        // toShortLength: 2
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
                          // visible:false 
                          opacity:false
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
                            opacity:false
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
                        new go.Binding("stroke", "d_stroke",function(sel){
                            return sel;
                          }),
                        new go.Binding("strokeWidth", "stroke_width")
                        // new go.Binding("stroke", "patt", function(f) { return (f === "") ? ""  : "transparent"; }),
                        // new go.Binding("pathPattern", "patt", convertPathPatternToShape)
                        
                    ), 
                    {

                    },
                    GO(go.TextBlock,// the label text
                    {       
                            name:"link_text",
                            // visible:false,
                            text:"",
                            textAlign: "center",
                            font: "10px helvetica, nomal Arial, sans-serif",
                            stroke: "#333",
                            editable: false,
                            opacity:false,
                            segmentOffset: new go.Point(10, NaN),
                            segmentOrientation: go.Link.OrientUpleft,
                            margin: 4

                    },
                    new go.Binding("text"),            //连线label
                    new go.Binding("stroke","fontColor"),
                    new go.Binding("font", "fontSize",function(v){
                      return v + "px helvetica, nomal Arial, sans-serif"
                    })             //连线label的字体
                    

                )

              ));// end
          myDiagram.linkTemplateMap.add("c", 
                GO(go.Link, go.Link.Bezier,
                // GO(ParallelRouteLink,
                  {
                    // name:"link_",
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
                )
                );  //link
}


