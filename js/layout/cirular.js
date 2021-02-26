
function  cirular_layout(){
			      myDiagram.div = null ;
            myDiagram = GO(go.Diagram, "myDiagramDiv", 
                {
                     // "ModelChanged": function(e) {console.log(111111) },
                    initialAutoScale: go.Diagram.Uniform,
                    "undoManager.isEnabled":true,
                    layout: GO(go.CircularLayout)
                });

                 myOverview.div = null
                 myOverview =
                       GO(go.Overview, "myOverviewDIV",
                          { observed: myDiagram }
                 );
                  // myDiagram.layout = GO(go.CircularLayout);
                  myDiagram.nodeTemplateMap.add("",
                       GO(go.Node, "Vertical",
                        // 节点类型
                        {
                          layerName:"Foreground",
                          // mouseEnter:function(v){
                          //   console.log(v)
                          // },
                          doubleClick:function(){
                             send_newGraph("属性")
                          }
                        },
                        // {
                        //   toolTip: tooltipTemplate 
                        // },
                        GO(go.Picture, { 
                            source: "./img/ddqp.svg",
                            margin: new go.Margin(0,20,2,0),
                            opacity:0
                        },
                        new go.Binding("source","vertex_type",function(v){
                          console.log(vertex_type)
                        })
                        ), 

                        GO(go.Picture, { 
                            source: "./img/ddqp.svg",
                            margin: new go.Margin(-41,0,2,0),
                            opacity:0
                        }
                        ),
                        GO(go.Picture, { 
                            source: "./img/ddqp.svg",
                            margin: new go.Margin(-41,-20,2,0),
                            opacity:0
                        }
                        ),

                        GO(go.Picture, { 
                            source: "./img/triangle.svg",
                            margin: new go.Margin(-10,-50,2,0),
                            opacity:0

                        },

                        new go.Binding("source","isExpand",function(v){
                          if(v == 1){
                            return "./img/triangle_in.svg"
                          }else if(v == 2){
                            return "./img/triangle_out.svg"
                          }else if(V == 3){
                            return "./img/triangle.svg"
                          }
                        }),
                        new go.Binding("opacity","isExpand",function(v){
                          if(v > 0){
                            return 1
                          }else{
                            return 0 
                          }
                        })
                        ),
                        GO(go.Shape, "Ellipse",
                            {
                             name:"node_shape",
                             stroke: "#006ADF", 
                             fill: "#006ADF",
                             width: 60, 
                             cursor: "pointer", 
                             height: 60,
                             portId: "",
                             strokeWidth:5
                             
                            },
                            {
                              toolTip: tooltipTemplate 
                            },
                            new go.Binding("fill", "d_fill",function(v){
                              if(v == ""){
                                return "#006ADF"
                              }else{
                                return v
                              }
                            }),
                            new go.Binding("stroke","d_stroke"),
                            new go.Binding("width"),
                            new go.Binding("height")
                        ),
                        GO(go.Picture, {
                            name:"icon_enetity", 
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
                            margin:12
                          }, 
                          new go.Binding("margin","width",function(sel){
                            return 12 * sel / 60 * 1.2;
                          }),
                          GO(go.Shape, "Rectangle", { fill: null, stroke: null,margin:new go.Margin(5,0,0,0)},
                            new go.Binding("fill", "isSelected", function(sel) {
                             
                              if (sel) return "#FFC106"; else return null;
                            }).ofObject("")
                          ),
                          GO(go.TextBlock, { margin: 6 },
                            new go.Binding("text", "text",function(sel){
                                return setText(sel)
                            }),
                            new go.Binding("font", "font_size",function(v){
                              return v + "px helvetica, bold Arial, sans-serif"
                            }),
                            new go.Binding("stroke", "isSelected", function(sel) {
                              if (sel) return "#fff"; else return "#333";
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
                        //标签一
                        GO(go.Shape,"RoundedRectangle",
                                { 
                                 name:"entity_label",
                                 margin: new go.Margin(-44,0,0,130),
                                 fill: "red",  
                                 cursor: "pointer",
                                 width:60,
                                 height:18,
                                 // strokeWidth: 0,
                                 opacity:0 
                                },
                                {
                                      // mouseEnter: function(e, n) {
                                      // // console.log(myDiagram.model)

                                      // myDiagram.model.setDataProperty(n,"width",80)
                                      // // console.log(n)
                                      // // myDiagram.model.setDataProperty(n,"fill","#ccc")
                                      //  },
                                      //  mouseLeave:function(e,n){
                                      //   myDiagram.model.setDataProperty(n,"width",60)
                                      // // myDiagram.model.setDataProperty(n,"fill","#000")
                                      // }
                                },
                                {
                                  toolTip: tooltipTemplate_label1 
                                },
                                new go.Binding("opacity","tags",function(v){
                                  if(labelisShow == 0){
                                    return 0
                                  }
                                  if(v[0].style.width > 0){
                                    return 1
                                  }else{
                                    return 0
                                  }
                                }),
                                new go.Binding("fill", "tags",function(v){
                                  return v[0].style.fill
                                }),
                                new go.Binding("stroke", "tags",function(v){
                                  return v[0].style.stroke
                                })
                        ),
                        
                        //标签二
                        GO(go.Shape,"RoundedRectangle",
                                { 
                                 name:"entity_label2",
                                 margin: new go.Margin(2,0,0,140),
                                 fill: "red",  
                                 cursor: "pointer",
                                 width:60,
                                 height:18,
                                 // strokeWidth: 0,
                                 opacity:0 
                                },
                                {
                                  toolTip: tooltipTemplate_label2 
                                },
                                new go.Binding("opacity","tags",function(v){
                                  if(labelisShow == 0){
                                    return 0
                                  }
                                  if(v[1].style.width > 0){
                                    return 1
                                  }else{
                                    return 0
                                  }
                                }),
                                new go.Binding("fill", "tags",function(v){
                                  return v[1].style.fill
                                }),
                                new go.Binding("stroke", "tags",function(v){
                                  return v[1].style.stroke
                                })
                        ),
                        //标签三
                        GO(go.Shape,"RoundedRectangle",
                                { 
                                 name:"entity_label3",
                                 margin: new go.Margin(2,0,0,130),
                                 fill: "red",  
                                 cursor: "pointer",
                                 width:60,
                                 height:18,
                                 // strokeWidth: 0,
                                 opacity:0
                                },
                                {
                                  toolTip: tooltipTemplate_label3 
                                },
                                new go.Binding("opacity","tags",function(v){
                                  if(labelisShow == 0){
                                    return 0
                                  }
                                  if(v[2].style.width > 0){
                                    return 1
                                  }else{
                                    return 0
                                  }
                                }),
                                new go.Binding("fill", "tags",function(v){
                                  return v[2].style.fill
                                }),
                                new go.Binding("stroke", "tags",function(v){
                                  return v[2].style.stroke
                                })
                        ),
                        GO(go.TextBlock, {           //文本设置
                                    name:"entity_label_text1",
                                    text:"",
                                    cursor: "pointer",
                                    opacity:0,
                                    // fill:"#fff",
                                    stroke:"#333",
                                    // alignment: go.Spot.Bottom,
                                    margin: new go.Margin(-59,0,0,120)
                        },
                        {
                            toolTip: tooltipTemplate_label1 
                        },
                        new go.Binding("opacity","tags",function(v){
                                  if(labelisShow == 0){
                                    return 0
                                  }
                                  if(v[0].style.width > 0){
                                    return 1
                                  }else{
                                    return 0
                                  }
                        }),
                        new go.Binding("text", "tags",function(n){
                          if(strlen(n[0].text) > 5){
                            return n[0].text.slice(0,2) + "..."
                          }else{
                            return n[0].text
                          }
                          return n[0].text
                        }),
                        new go.Binding("stroke","tags",function(v){
                          return v[0].style.font_color
                        })
                        ),
                        GO(go.TextBlock, {           //文本设置
                                    name:"entity_label_text_x1",
                                    text:"X",
                                    cursor: "pointer",
                                    opacity:0,
                                    // fill:"#fff",
                                    stroke:"#fff",
                                    // alignment: go.Spot.Bottom,
                                    margin: new go.Margin(-18,0,0,170)
                        },{
                          click:function(n,o){
                            delete_lable(1)
                          }

                        },
                        new go.Binding("opacity","tags",function(v){
                                  if(labelisShow == 0){
                                    return 0
                                  }
                                  if(v[0].style.width > 0){
                                    return 1
                                  }else{
                                    return 0
                                  }
                        })
                        ),
                        GO(go.TextBlock, {           //文本设置
                                    name:"entity_label_text2",
                                    text:"",
                                    cursor: "pointer",
                                    opacity:0,
                                    // fill:"#fff",
                                    stroke:"#333",
                                    // alignment: go.Spot.Bottom,
                                    margin: new go.Margin(5,0,0,120)
                        },
                        {
                            toolTip: tooltipTemplate_label2 
                        },
                        new go.Binding("opacity","tags",function(v){
                                  if(labelisShow == 0){
                                    return 0
                                  }
                                  if(v[1].style.width > 0){
                                    return 1
                                  }else{
                                    return 0
                                  }
                        }),
                        new go.Binding("text", "tags",function(n){
                          if(strlen(n[1].text) > 5){
                            return n[1].text.slice(0,2)
                          }else{
                            return n[1].text
                          }
                          return n[1].text
                        }),
                        new go.Binding("stroke","tags",function(v){
                          return v[1].style.font_color
                        })
                        ),
                        GO(go.TextBlock, {           //文本设置
                                    name:"entity_label_text_x2",
                                    text:"X",
                                    cursor: "pointer",
                                    opacity:0,
                                    // fill:"#fff",
                                    stroke:"#fff",
                                    // alignment: go.Spot.Bottom,
                                    margin: new go.Margin(-17,0,0,180)
                        },{
                          click:function(n,o){
                            delete_lable(2)
                          }
                        },
                        new go.Binding("opacity","tags",function(v){
                                  if(labelisShow == 0){
                                    return 0
                                  }
                                  if(v[1].style.width > 0){
                                    return 1
                                  }else{
                                    return 0
                                  }
                        })
                        ),
                        GO(go.TextBlock, {           //文本设置
                                    name:"entity_label_text3",
                                    text:"",
                                    cursor: "pointer",
                                    opacity:0,
                                    // fill:"#fff",
                                    stroke:"#333",
                                    // alignment: go.Spot.Bottom,
                                    margin: new go.Margin(5,0,0,120)
                        },
                        {
                            toolTip: tooltipTemplate_label3
                        },
                        new go.Binding("opacity","tags",function(v){
                                  if(labelisShow == 0){
                                    return 0
                                  }
                                  if(v[2].style.width > 0){
                                    return 1
                                  }else{
                                    return 0
                                  }
                        }),
                        new go.Binding("text", "tags",function(n){
                          if(strlen(n[2].text) > 5){
                            return n[2].text.slice(0,2)
                          }else{
                            return n[2].text
                          }
                          return n[2].text
                        }),
                        new go.Binding("stroke","tags",function(v){
                          return v[2].style.font_color
                        })
                        ),
                        GO(go.TextBlock, {           //文本设置
                                    name:"entity_label_text_x3",
                                    text:"X",
                                    cursor: "pointer",
                                    opacity:0,
                                    // fill:"#fff",
                                    stroke:"#fff",
                                    // alignment: go.Spot.Bottom,
                                    margin: new go.Margin(-17,0,0,170)
                        },{
                          click:function(n,o){
                            delete_lable(3)
                          }
                        },
                        new go.Binding("opacity","tags",function(v){
                                  if(labelisShow == 0){
                                    return 0
                                  }
                                  if(v[2].style.width > 0){
                                    return 1
                                  }else{
                                    return 0
                                  }
                        })
                        )
                        
                        
                  
                  ));
                  myDiagram.nodeTemplateMap.add("square",
                          GO(go.Node, "Auto",
                            GO(go.Shape,"RoundedRectangle",
                              {  width:120,height:64,fill: "#fff", stroke: "#D55500", strokeWidth: 2},
                              new go.Binding("fill"),
                              new go.Binding("stroke")
                            ),
                            GO(go.TextBlock,
                              {
                                name:"icon_label",
                                opacity:1,
                                margin: 8,
                                maxSize: new go.Size(200, NaN),
                                wrap: go.TextBlock.WrapFit,
                                // textAlign: "center",
                                stroke:"#D55500",
                                editable: true
                              },
                              new go.Binding("text").makeTwoWay()),
                              new go.Binding("stroke")
                            // no ports, because no links are allowed to connect with a comment
                    ));

                    myDiagram.linkTemplate = GO(go.Link, {
                                      cursor: "pointer", 
                                   
                                },{
                                  doubleClick:function(){
                                   send_newGraph("属性")
                                  }
                                },
                                {
                                  toolTip:tooltipTemplate_link
                                },
                                
                                GO(go.Shape, // the arrowhead
                                    {  
                                        name:"edge_standard",
                                        toArrow: "standard",
                                        stroke: "#BDBDBD",
                                        fill:"#BDBDBD",
                                        // name:"edge_standard",
                                        opacity:1
                                    },
                                    new go.Binding("stroke", "d_stroke"),         //连线角的颜色
                                    new go.Binding("strokeWidth", "stroke_width"),
                                    new go.Binding("fill", "d_stroke")            //连线角的边颜色
                                ),
                                // GO(go.Shape,
                                //     {  
                                //         name:"edge_shape", 
                                //         opacity:1, 
                                //         isPanelMain: true, 
                                //         stroke: "#BDBDBD", 
                                //         strokeWidth: 1 ,
                                //         fill:"#BDBDBD"
                                        
                                //     },
                                //     // new go.Binding("fill", "stroke"),
                                //     new go.Binding("stroke", "stroke"),
                                //     new go.Binding("strokeWidth", "width"),
                                //     new go.Binding("stroke", "patt", function(f) { return (f === "") ? ""  : "transparent"; }),
                                //     new go.Binding("pathPattern", "patt", convertPathPatternToShape)
                                    
                                // ), 
                                GO(go.Shape, { 
                                    name: "link_arrow", 
                                    toArrow: "standard",
                                    stroke: "#BDBDBD",
                                    fill:"#BDBDBD",
                                    visible:false 
                                    },
                                        new go.Binding("fill", "d_stroke"),
                                        new go.Binding("strokeWidth", "stroke_width"),
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
                                          new go.Binding("strokeWidth", "stroke_width"),
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
                                  ),
                                {
                                    // doubleClick: function(e, link) {
                                    // }
                                },
                               

                                GO(go.TextBlock, // the label text
                                {       
                                        text:"",
                                        name:"link_text",
                                        textAlign: "center",
                                        font: "12px helvetica, bold Arial, sans-serif",
                                        stroke: "#333",
                                        editable: false,
                                        opacity:1,
                                        segmentOffset: new go.Point(10, NaN),
                                        segmentOrientation: go.Link.OrientUpleft,
                                        margin: 4

                                },
                                new go.Binding("text"),            //连线label
                                new go.Binding("font", "font_size",function(v){
                                  return v + "px helvetica, bold Arial, sans-serif"
                                })             //连线label的字体
                                

                                )

                  );
}
