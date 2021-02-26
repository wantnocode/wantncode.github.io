              if(data_.rfresh == 1){
                          console.log(data_)
                          let nodes = data_.nodeArray;
                          let links = data_.linkArray;
                          var len = (nodes.length / 2 .toFixed()) * 120
                          var cur_point = graph_tool.getcurrentNodes().loc.split(" ")
                          nodes.map((e,i)=>{
                          // //console.log(typeof e.pps)
                            let isAdd = 0;
                            e.loc = (cur_point[0]*1 + 400 + i *30)  + " " + ((cur_point[1] * 1 - len) + i * 120)
                            // console.log(e.loc)
                            myDiagram.model.nodeDataArray.map(o=>{
                              
                              if(o.key == e.key ){
                                isAdd++
                              }
                            })
                            if(e.key !== graph_tool.getcurrentNodes().key && isAdd==0){

                                myDiagram.model.addNodeData(e)

                            }

                            // myDiagram.model.addLinkData({from:graph_tool.getcurrentNodes().key,to:e.key})
                         })
                         links.map(e=>{
                            
                            let isAdd = 0;
                            
                            myDiagram.model.linkDataArray.map(o=>{
                              
                              if(o.from == e.from && o.to == e.to ){
                                isAdd++
                              }
                            })
                            if(isAdd==0){
                                myDiagram.model.addLinkData(e)
                            }

                         })
                  return
                }
                if(data_.rfresh == 2){
                   // console.log(data_)
                          let nodes = data_.nodeArray;
                          let links = data_.linkArray;
                          var len = (nodes.length / 2 .toFixed()) * 120
                          var cur_point = graph_tool.getcurrentNodes()[0].loc.split(" ")
                          let cir_x =  cur_point[0] *1;//圆心X坐标
                          let cir_y =  cur_point[1] *1;//圆心Y坐标
                          let cir_r =  500 ;//圆心半径
                          var locs = getPoint_cir(cir_r,cir_x,cir_y,nodes.length * 2);
                          nodes.map((e,i)=>{
                          // //console.log(typeof e.pps)
                            let isAdd = 0;
                            let len = locs.length / 2 -1 + i ;
                            e.loc =locs[len].x  + " " + locs[len].y;
                            console.log(e.loc)
                            myDiagram.model.nodeDataArray.map(o=>{
                              
                              if(o.key == e.key ){
                                isAdd++
                              }
                            })
                            if(e.key !== graph_tool.getcurrentNodes().key && isAdd==0){

                                myDiagram.model.addNodeData(e)

                            }

                            // myDiagram.model.addLinkData({from:graph_tool.getcurrentNodes().key,to:e.key})
                         })
                         links.map(e=>{
                            
                            let isAdd = 0;
                            
                            myDiagram.model.linkDataArray.map(o=>{
                              
                              if(o.from == e.from && o.to == e.to ){
                                isAdd++
                              }
                            })
                            if(isAdd==0){
                                myDiagram.model.addLinkData(e)
                            }

                         })
                  return
}