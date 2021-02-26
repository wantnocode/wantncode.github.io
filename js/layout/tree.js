function tree_layout(){

      // return;
			myDiagram.div = null ;
            myDiagram = GO(go.Diagram, "myDiagramDiv", 
                {
                    initialAutoScale: go.Diagram.Uniform,
                    "undoManager.isEnabled":true,
                    layout: GO(go.TreeLayout,
                        {
                          isOngoing: false,  
                          angle: 90,
                          layerSpacing: 100,
                          nodeSpacing:300,
                        }
                    )
                });

                 myOverview.div = null
                 myOverview =
                       GO(go.Overview, "myOverviewDIV",
                          { observed: myDiagram });
                  function tooltipTextConverter(person) {
                          
                          var str = "";
                          str += person.text;
                          return str;
                 }
             myDiagram.nodeTemplateMap.add("",
                 GO(go.Node, "Auto",{
                    // layerName:"Foreground",
                    layerName:"Foreground",
                    doubleClick:function(){
                       send_newGraph("属性")
                    }
                  },
                  {
                    toolTip: tooltipTemplate 
                  },
                // GO(go.Node, "Vertical",
                  GO(go.Picture, { 
                      source: "./img/ddqp.svg",
                      margin: new go.Margin(0,20,2,0),
                      opacity:0
                  }
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
                      margin: new go.Margin(0,0,0,0),
                      opacity:1
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
                  GO(go.Shape,"RoundedRectangle",
                      {
                       name:"node_shape",
                       stroke: "#006ADF", 
                       fill: "#fff",
                       width: 233, 
                       cursor: "pointer", 
                       height: 60,
                       margin:new go.Margin(1,-30,1,1),
                       strokeWidth:1
                       // layerName:"Foreground"
                      },
                      new go.Binding("stroke","d_stroke"),
                      // new go.Binding("fill","d_fill"),
                      new go.Binding("strokeWidth","stroke_width")
                  ),
                  GO(go.Shape,"RoundedRectangle",
                      {
                       name:"node_shape",
                       stroke: null, 
                       fill: "#006ADF",
                       width: 56, 
                       cursor: "pointer", 
                       height: 59,
                       margin:new go.Margin(0,145,0,0)
                       // layerName:"Foreground"  // 图层问题
                      },
                      // new go.Binding("stroke","d_stroke"),
                      new go.Binding("fill","d_fill")
                      
                  ),
                  GO(go.Picture, { 
                  	  name:"icon_enetity",
                      source: "./img/account.svg",
                      margin: new go.Margin(0,145,0,0),
                      opacity:1
                  },
                  new go.Binding("source","icon",geoFunc)
                  ),

                  GO(go.TextBlock, {           //文本设置
                              name:"icon_label",
                              text:"1",
                              cursor: "pointer",
                              opacity:1,
                              // fill:"#fff",
                              stroke:"#333",
                              // alignment: go.Spot.Bottom,
                              margin: new go.Margin(0,0,0,70)
                  },
                  new go.Binding("text", "text"),
                  new go.Binding("font", "font_size",function(v){
                              return v + "px helvetica, bold Arial, sans-serif"
                  })
                  ),
                  //标签一
                  GO(go.Shape,"RoundedRectangle",
                          { 
                           name:"entity_label",
                           margin: new go.Margin(0,300,34,30),
                           fill: "red",  
                           cursor: "pointer",
                           width:60,
                           height:18,
                           // strokeWidth: 0,
                           opacity:0 
                          },
                          {
                              
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
                           margin: new go.Margin(4,270,0,0),
                           fill: "red",  
                           cursor: "pointer",
                           width:60,
                           height:16,
                           // strokeWidth: 0,
                           opacity:0 
                          },
                          {
                              
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
                           margin: new go.Margin(40,270,0,0),
                           fill: "red",  
                           cursor: "pointer",
                           width:60,
                           height:16,
                           // strokeWidth: 0,
                           opacity:0 
                          },
                          {
                             
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
                              stroke:"#fff",
                              // alignment: go.Spot.Bottom,
                              margin: new go.Margin(-25,280,0,0)
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
                                    margin: new go.Margin(-26,230,0,0)
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
                              margin: new go.Margin(2,280,0,0)
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
                                    margin: new go.Margin(0,230,0,0)
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
                              margin: new go.Margin(38,280,0,0)
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
                                    margin: new go.Margin(36,230,0,0)
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
                              {  width:120,height:64,fill: "#fff", stroke: "#D55500", strokeWidth: 2}
                              // new go.Binding("fill"),
                              // new go.Binding("stroke")
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
                              new go.Binding("text").makeTwoWay()
                             )
          ));


          myDiagram.linkTemplate = GO(go.Link, go.Link.Orthogonal,
                    { 
                      corner: 5, relinkableFrom: true, relinkableTo: true,adjusting: go.Link.End
                    },
                    {
                      doubleClick:function(){
                       send_newGraph("属性")
                      }
                    },
                    {
                      toolTip: tooltipTemplate_link 
                    },
                    GO(go.Shape, { 
                      name: "link_arrow", 
                      toArrow: "standard",
                      stroke: "#BDBDBD",
                      fill:"#BDBDBD",
                      visible:false 
                      },
                          new go.Binding("fill", "d_stroke"),
                          new go.Binding("stroke", "d_stroke"),
                          new go.Binding("strokeWidth", "stroke_width"),
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
                    GO(go.Shape,  // this shape only shows when it isHighlighted
                    {isPanelMain: true, stroke: null, strokeWidth: 2,opacity: 0 },
                    new go.Binding("stroke", "isHighlighted", function(h) { return h ? "blue" : null; }).ofObject()),
                    GO(go.Shape,
                        // mark each Shape to get the link geometry with isPanelMain: true
                        {  
                            name:"edge_shape", 
                            opacity:1, 
                            isPanelMain: true, 
                            stroke: "#BDBDBD", 
                            strokeWidth: 1 ,
                            fill:"#BDBDBD"
                            
                        },
                        new go.Binding("fill", "d_stroke"),
                        new go.Binding("stroke", "d_stroke"),
                        new go.Binding("strokeWidth", "stroke_width")
                        // new go.Binding("stroke", "patt", function(f) { return (f === "") ? ""  : "transparent"; }),
                        // new go.Binding("pathPattern", "patt", convertPathPatternToShape)
                        
                    ), 
                    GO(go.TextBlock, // the label text
                    {       
                            name:"link_text",
                            textAlign: "center",
                            font: "12px helvetica, bold Arial, sans-serif",
                            stroke: "#333",
                            text:"",
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