
function tree_layout (){
  graph_layout_type = 1;
            // myDiagram = null;
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
                // layout: GO(go.LayeredDigraphLayout,
                // {
                //   setsPortSpots: false,  // to allow the "Side" spots on the nodes to take effect
                //   direction: 90,  // rightwards
                //   layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource,
                //   initializeOption:go.LayeredDigraphLayout.nitDepthFirstOut,
                //   // packOption: go.LayeredDigraphLayout.PackStraighten || go.LayeredDigraphLayout.PackMedian,
                //   packOption: 2,
                //   layerSpacing: 200,  // lots of space between layers, for nicer thick links
                //   columnSpacing: 2
                // })
                layout: GO(go.TreeLayout,
                        {
                          isOngoing: false,  
                          angle: 90,
                          layerSpacing: 200,
                          nodeSpacing:100,
                        }
                    )
            });
            // console.log(myDiagram.layout)
            myOverview.div = null
            myOverview =
             GO(go.Overview, "myOverviewDIV",
                { observed: myDiagram });
               myDiagram.nodeTemplate =
        GO(go.Node, "Vertical",
            new go.Binding("location", "loc", go.Point.parse),
          {
             mouseEnter:function(e,node){

                myDiagram.model.setDataProperty(node.data,"state",true)
             },
             mouseLeave:function(e,node){
              myDiagram.model.setDataProperty(node.data,"state",false)
             },
          },
          { 
            //locationSpot: go.Spot.Center ,
            // fromSpot: go.Spot.TopSide,
          //         toSpot: go.Spot.BottomSide
        },
          // new go.Binding("text", "text"),  // for sorting
          GO(go.Shape, "Ellipse",
                            {
                             name:"node_shape",
                             stroke: "#006ADF", 
                             fill: "#006ADF",
                             width: 60, 
                             cursor: "pointer", 
                             height: 60,
                             // portId: "",
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
                          GO(go.TextBlock, { margin: 6 ,font: "normal 12pt Segoe UI, sans-serif",},
                              new go.Binding("text", "text",function(sel){
                                  // return setText(sel)
                                  return sel
                              }),
                              new go.Binding("stroke", "isSelected", function(sel) {
                                if (sel) return "#fff"; else return "#333";
                              }).ofObject(""),
                              new go.Binding("stroke","fontColor"),
                              new go.Binding("font", "fontSize",function(v){
                                return v + "px helvetica, nomal Arial, sans-serif"
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
                        }
        );


      
          

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
                        new go.Binding("fill", "d_fill"),
                        new go.Binding("stroke", "d_stroke"),
                        // new go.Binding("strokeWidth", "width"),
                       
                        
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
                 "2/3", { segmentIndex: NaN, segmentFraction: 0.5,font: "normal 12pt Segoe UI, sans-serif", stroke: "#333", },
                
                new go.Binding("text","text",function(n){
                  // console.log(n)
                  return n.replace(/(\r\n)|(\n)/g,'  ')
                }),
                new go.Binding("stroke","fontColor"),
                new go.Binding("font", "fontSize",function(v){
                      return v + "px helvetica, nomal Arial, sans-serif"
                })     
                // new go.Binding("font", "font")
                ),
              
              GO(go.Shape, { name: "link_arrow", toArrow: "standard", stroke: "#BDBDBD",fill:"#BDBDBD" },
                new go.Binding("fill", "d_fill"),
                new go.Binding("stroke", "d_stroke")
               
              )
            );
           

}