/*

		UPDATE LAYOUT 
		autor:xgl
*/
function updateCurrLayout(layout){
			myDiagram.startTransaction("change layout");
			// myDiagram.nodes.each(e=>{
			// 		e.part.isLayoutPositioned = e.data.isLayoutPositioned;
			// 		// e.location.x = new go.Point(0,0)
					
			// })
			if(layout == "ForceDirectedLayout"){

				myDiagram.layout = new go.ForceDirectedLayout({defaultSpringLength: 50, maxIterations: 100})
				// return
				// myDiagram.linkTemplate = GO(go.Link, {
    //                       cursor: "pointer", 
    //                     // selectable: true,
    //                     // routing:go.Link.Orthogonal,
    //                     // curve: go.Link.JumpGap,
    //                     //  adjusting: go.Link.Strsetch,  //连线方式
    //                      // adjusting: go.Link.End,  //连线方式
    //                     //  // corner:go.link
    //                     //  routing:go.Link.Orthogonal,
    //                     // toShortLength: 2
    //                 },{
    //                   doubleClick:function(){
    //                    send_newGraph("属性")
    //                   }
    //                 },
    //                 {
    //                   toolTip:tooltipTemplate_link
    //                 },
                    
    //                 // GO(go.Shape, // the arrowhead
    //                 // {  
    //                 //     name:"edge_standard",
    //                 //     toArrow: "standard",//Backward
    //                 //     // toArrow: "Backward",//Backward
    //                 //     fromArrow: "Backward", 
    //                 //     stroke: "#BDBDBD",
    //                 //     fill:"#BDBDBD",
    //                 //     // name:"edge_standard",
    //                 //     opacity:1
    //                 // },
    //                 // new go.Binding("stroke", "stroke"),         //连线角的颜色
    //                 // new go.Binding("fill", "stroke")            //连线角的边颜色
    //                 // ),
    //                 GO(go.Shape, { 
    //                       name: "link_arrow", 
    //                       toArrow: "standard",
    //                       stroke: "#BDBDBD",
    //                       fill:"#BDBDBD",
    //                       // visible:false 
    //                       opacity:false
    //                       },
    //                       new go.Binding("fill", "d_stroke",function(sel){
    //                         // console.log(linkArray)
    //                         return sel;
    //                       }),
    //                        new go.Binding("strokeWidth", "stroke_width"),
    //                       new go.Binding("stroke", "d_stroke",function(sel){
    //                         return sel;
    //                       }),
    //                       new go.Binding("visible","dir",function(sel){
    //                         if(sel === 0) {
    //                           return false
    //                         }else if(sel === 1){
    //                           return true
    //                         }else if(sel === 2){
    //                           return false
    //                         }else if(sel === 3){
    //                           return true
    //                         }
    //                       })
    //                 ),
    //                 //反向
    //                 GO(go.Shape, { 
    //                         name: "link_arrow", 
    //                         // toArrow: "standard",
    //                         fromArrow: "Backward",   //反向
    //                         // segmentIndex:1,
    //                         stroke:"#BDBDBD",
    //                         fill:"#BDBDBD",
    //                         opacity:false
    //                       },
    //                         new go.Binding("fill", "d_stroke",function(sel){
    //                         return sel;
    //                       }),
    //                         new go.Binding("stroke", "d_stroke",function(sel){
    //                         return sel;
    //                       }),
    //                          new go.Binding("strokeWidth", "stroke_width"),
    //                         new go.Binding("visible","dir",function(sel){
    //                           if(sel === 0) {
    //                             return false
    //                           }else if(sel === 1){
    //                             return false
    //                           }else if(sel === 2){
    //                             return true
    //                           }else if(sel === 3){
    //                             return true
    //                           }
    //                         })
    //                 ),
    //                 GO(go.Shape,
    //                     {  
    //                         name:"edge_shape", 
    //                         opacity:1, 
    //                         isPanelMain: true, 
    //                         stroke: "#BDBDBD", 
    //                         strokeWidth: 1 ,
    //                         fill:"#BDBDBD"
                            
    //                     },
    //                     new go.Binding("fill", "d_stroke",function(sel){
    //                         return sel;
    //                       }),
    //                     new go.Binding("stroke", "d_stroke",function(sel){
    //                         return sel;
    //                       }),
    //                     new go.Binding("strokeWidth", "stroke_width")
    //                     // new go.Binding("stroke", "patt", function(f) { return (f === "") ? ""  : "transparent"; }),
    //                     // new go.Binding("pathPattern", "patt", convertPathPatternToShape)
                        
    //                 ), 
    //                 {

    //                 },
    //                 GO(go.TextBlock,// the label text
    //                 {       
    //                         name:"link_text",
    //                         // visible:false,
    //                         text:"",
    //                         textAlign: "center",
    //                         font: "12px helvetica, bold Arial, sans-serif",
    //                         stroke: "#333",
    //                         editable: false,
    //                         opacity:false,
    //                         segmentOffset: new go.Point(10, NaN),
    //                         segmentOrientation: go.Link.OrientUpleft,
    //                         margin: 4

    //                 },
    //                 new go.Binding("text"),            //连线label
    //                 new go.Binding("font", "font")             //连线label的字体
                    

    //             )

    //           );
				// myDiagram.layout.model = myWholeModel;
			}else if(layout == "layer"){
				// myDiagram.nodes.each(e=>{
				// 	e.part.isLayoutPositioned = e.data.isLayoutPositioned;
					
				// })
				myDiagram.layout = GO(go.LayeredDigraphLayout,
                {
                  setsPortSpots: false,  // to allow the "Side" spots on the nodes to take effect
                  direction: 90,  // rightwards
                  layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource,
                  initializeOption:go.LayeredDigraphLayout.nitDepthFirstOut,
                  // packOption: go.LayeredDigraphLayout.PackStraighten || go.LayeredDigraphLayout.PackMedian,
                  packOption: 2,
                  layerSpacing: 200,  // lots of space between layers, for nicer thick links
                  columnSpacing: 2
                })
              //   myDiagram.linkTemplate = GO(go.Link, {
              //             cursor: "pointer", 
              //           // selectable: true,
              //           // routing:go.Link.Orthogonal,
              //           // curve: go.Link.JumpGap,
              //           //  adjusting: go.Link.Strsetch,  //连线方式
              //            // adjusting: go.Link.End,  //连线方式
              //           //  // corner:go.link
              //           //  routing:go.Link.Orthogonal,
              //           // toShortLength: 2
              //       },{
              //         doubleClick:function(){
              //          send_newGraph("属性")
              //         }
              //       },
              //       {
              //         toolTip:tooltipTemplate_link
              //       },
                    
              //       // GO(go.Shape, // the arrowhead
              //       // {  
              //       //     name:"edge_standard",
              //       //     toArrow: "standard",//Backward
              //       //     // toArrow: "Backward",//Backward
              //       //     fromArrow: "Backward", 
              //       //     stroke: "#BDBDBD",
              //       //     fill:"#BDBDBD",
              //       //     // name:"edge_standard",
              //       //     opacity:1
              //       // },
              //       // new go.Binding("stroke", "stroke"),         //连线角的颜色
              //       // new go.Binding("fill", "stroke")            //连线角的边颜色
              //       // ),
              //       GO(go.Shape, { 
              //             name: "link_arrow", 
              //             toArrow: "standard",
              //             stroke: "#BDBDBD",
              //             fill:"#BDBDBD",
              //             // visible:false 
              //             opacity:false
              //             },
              //             new go.Binding("fill", "d_stroke",function(sel){
              //               // console.log(linkArray)
              //               return sel;
              //             }),
              //              new go.Binding("strokeWidth", "stroke_width"),
              //             new go.Binding("stroke", "d_stroke",function(sel){
              //               return sel;
              //             }),
              //             new go.Binding("visible","dir",function(sel){
              //               if(sel === 0) {
              //                 return false
              //               }else if(sel === 1){
              //                 return true
              //               }else if(sel === 2){
              //                 return false
              //               }else if(sel === 3){
              //                 return true
              //               }
              //             })
              //       ),
              //       //反向
              //       GO(go.Shape, { 
              //               name: "link_arrow", 
              //               // toArrow: "standard",
              //               fromArrow: "Backward",   //反向
              //               // segmentIndex:1,
              //               stroke:"#BDBDBD",
              //               fill:"#BDBDBD",
              //               opacity:false
              //             },
              //               new go.Binding("fill", "d_stroke",function(sel){
              //               return sel;
              //             }),
              //               new go.Binding("stroke", "d_stroke",function(sel){
              //               return sel;
              //             }),
              //                new go.Binding("strokeWidth", "stroke_width"),
              //               new go.Binding("visible","dir",function(sel){
              //                 if(sel === 0) {
              //                   return false
              //                 }else if(sel === 1){
              //                   return false
              //                 }else if(sel === 2){
              //                   return true
              //                 }else if(sel === 3){
              //                   return true
              //                 }
              //               })
              //       ),
              //       GO(go.Shape,
              //           {  
              //               name:"edge_shape", 
              //               opacity:1, 
              //               isPanelMain: true, 
              //               stroke: "#BDBDBD", 
              //               strokeWidth: 1 ,
              //               fill:"#BDBDBD"
                            
              //           },
              //           new go.Binding("fill", "d_stroke",function(sel){
              //               return sel;
              //             }),
              //           new go.Binding("stroke", "d_stroke",function(sel){
              //               return sel;
              //             }),
              //           new go.Binding("strokeWidth", "stroke_width")
              //           // new go.Binding("stroke", "patt", function(f) { return (f === "") ? ""  : "transparent"; }),
              //           // new go.Binding("pathPattern", "patt", convertPathPatternToShape)
                        
              //       ), 
              //       {

              //       },
              //       GO(go.TextBlock,// the label text
              //       {       
              //               name:"link_text",
              //               // visible:false,
              //               text:"",
              //               textAlign: "center",
              //               font: "12px helvetica, bold Arial, sans-serif",
              //               stroke: "#333",
              //               editable: false,
              //               opacity:false,
              //               segmentOffset: new go.Point(10, NaN),
              //               segmentOrientation: go.Link.OrientUpleft,
              //               margin: 4

              //       },
              //       new go.Binding("text"),            //连线label
              //       new go.Binding("font", "font")             //连线label的字体
                    

              //   )

              // );

			}else if(layout == "treeLayout"){
				// myDiagram.nodes.each(e=>{
				// 	e.part.isLayoutPositioned = e.data.isLayoutPositioned;
					
				// })
				myDiagram.layout = GO(go.TreeLayout,
                        {
                          isOngoing: false,  
                          angle: 90,
                          layerSpacing: 100,
                          nodeSpacing:300,
                        }
                )
              //   myDiagram.linkTemplate = GO(go.Link, {
              //             cursor: "pointer", 
              //           // selectable: true,
              //           // routing:go.Link.Orthogonal,
              //           // curve: go.Link.JumpGap,
              //           //  adjusting: go.Link.Strsetch,  //连线方式
              //            // adjusting: go.Link.End,  //连线方式
              //           //  // corner:go.link
              //           //  routing:go.Link.Orthogonal,
              //           // toShortLength: 2
              //       },{
              //         doubleClick:function(){
              //          send_newGraph("属性")
              //         }
              //       },
              //       {
              //         toolTip:tooltipTemplate_link
              //       },
                    
              //       // GO(go.Shape, // the arrowhead
              //       // {  
              //       //     name:"edge_standard",
              //       //     toArrow: "standard",//Backward
              //       //     // toArrow: "Backward",//Backward
              //       //     fromArrow: "Backward", 
              //       //     stroke: "#BDBDBD",
              //       //     fill:"#BDBDBD",
              //       //     // name:"edge_standard",
              //       //     opacity:1
              //       // },
              //       // new go.Binding("stroke", "stroke"),         //连线角的颜色
              //       // new go.Binding("fill", "stroke")            //连线角的边颜色
              //       // ),
              //       GO(go.Shape, { 
              //             name: "link_arrow", 
              //             toArrow: "standard",
              //             stroke: "#BDBDBD",
              //             fill:"#BDBDBD",
              //             // visible:false 
              //             opacity:false
              //             },
              //             new go.Binding("fill", "d_stroke",function(sel){
              //               // console.log(linkArray)
              //               return sel;
              //             }),
              //              new go.Binding("strokeWidth", "stroke_width"),
              //             new go.Binding("stroke", "d_stroke",function(sel){
              //               return sel;
              //             }),
              //             new go.Binding("visible","dir",function(sel){
              //               if(sel === 0) {
              //                 return false
              //               }else if(sel === 1){
              //                 return true
              //               }else if(sel === 2){
              //                 return false
              //               }else if(sel === 3){
              //                 return true
              //               }
              //             })
              //       ),
              //       //反向
              //       GO(go.Shape, { 
              //               name: "link_arrow", 
              //               // toArrow: "standard",
              //               fromArrow: "Backward",   //反向
              //               // segmentIndex:1,
              //               stroke:"#BDBDBD",
              //               fill:"#BDBDBD",
              //               opacity:false
              //             },
              //               new go.Binding("fill", "d_stroke",function(sel){
              //               return sel;
              //             }),
              //               new go.Binding("stroke", "d_stroke",function(sel){
              //               return sel;
              //             }),
              //                new go.Binding("strokeWidth", "stroke_width"),
              //               new go.Binding("visible","dir",function(sel){
              //                 if(sel === 0) {
              //                   return false
              //                 }else if(sel === 1){
              //                   return false
              //                 }else if(sel === 2){
              //                   return true
              //                 }else if(sel === 3){
              //                   return true
              //                 }
              //               })
              //       ),
              //       GO(go.Shape,
              //           {  
              //               name:"edge_shape", 
              //               opacity:1, 
              //               isPanelMain: true, 
              //               stroke: "#BDBDBD", 
              //               strokeWidth: 1 ,
              //               fill:"#BDBDBD"
                            
              //           },
              //           new go.Binding("fill", "d_stroke",function(sel){
              //               return sel;
              //             }),
              //           new go.Binding("stroke", "d_stroke",function(sel){
              //               return sel;
              //             }),
              //           new go.Binding("strokeWidth", "stroke_width")
              //           // new go.Binding("stroke", "patt", function(f) { return (f === "") ? ""  : "transparent"; }),
              //           // new go.Binding("pathPattern", "patt", convertPathPatternToShape)
                        
              //       ), 
              //       {

              //       },
              //       GO(go.TextBlock,// the label text
              //       {       
              //               name:"link_text",
              //               // visible:false,
              //               text:"",
              //               textAlign: "center",
              //               font: "12px helvetica, bold Arial, sans-serif",
              //               stroke: "#333",
              //               editable: false,
              //               opacity:false,
              //               segmentOffset: new go.Point(10, NaN),
              //               segmentOrientation: go.Link.OrientUpleft,
              //               margin: 4

              //       },
              //       new go.Binding("text"),            //连线label
              //       new go.Binding("font", "font")             //连线label的字体
                    

              //   )

              // );

			}else if(layout == "sankey"){
				myDiagram.layout =  GO(SankeyLayout,
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
                // myDiagram.linkTemplate =
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
			
			
			myDiagram.commitTransaction("change layout");


}