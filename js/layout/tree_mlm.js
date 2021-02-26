
function  tree_mlm_layout(){
            myDiagram.div = null ;
            myDiagram = GO(go.Diagram, "myDiagramDiv", 
                {
                     // "ModelChanged": function(e) {console.log(111111) },
                    initialAutoScale: go.Diagram.Uniform,
                    "undoManager.isEnabled":true,
                    "animationManager.isEnabled": false,
                    
                    layout: GO(go.TreeLayout,{
                      isOngoing: false,  
                          angle: 90,
                          layerSpacing: 100,
                          nodeSpacing:300,
                     })
                });

                 myOverview.div = null
                 myOverview =
                       GO(go.Overview, "myOverviewDIV",
                          { observed: myDiagram }
                 );
                  myDiagram.nodeTemplateMap.add("",
                       GO(go.Node, "Vertical",
                        new go.Binding("visible"),
                        // 节点类型
                        {
                          visible:true,
                          layerName:"Foreground",
                          doubleClick:function(){
                             send_newGraph("属性")
                          }
                        },
                        new go.Binding("visible"),
                        new go.Binding("location", "loc",go.Point.parse).makeTwoWay(go.Point.stringify),
                        
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
                              	return sel
			 // return setText(sel)
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
                        }
                  
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
                    new go.Binding("fill", "d_fill")            //连线角的边颜色
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
                        // new go.Binding("fill", "stroke"),
                        new go.Binding("stroke", "d_stroke"),
                        new go.Binding("strokeWidth", "width"),
                        new go.Binding("stroke", "patt", function(f) { return (f === "") ? ""  : "transparent"; }),
                        new go.Binding("pathPattern", "patt", convertPathPatternToShape)
                        
                    ), 
                    {
                        // doubleClick: function(e, link) {

                        // }
                    },
                   

                    GO(go.TextBlock, // the label text
                    {       
                            name:"link_text",
                            text:"",
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
                    new go.Binding("font", "font")             //连线label的字体
                    

                    )

                  );
}
