
// =============================================================
// =============================================================
// =============================================================
// =============================================================
// =============================================================

/*! qq:820115719  autor xiaotian  weixin:wywin2021*/
// =============================================================
// =============================================================
// =============================================================
// =============================================================
// =============================================================



const graph_methods = {

  initGraphData:function(data){
    data.nodeArray.forEach(e=>{
                  e.d_stroke = e.stroke
                  e.d_fill = e.fill
                  e.default_stroke = e.d_stroke
                  e.default_fill = e.d_fill

                  
        })
        data.linkArray.forEach(e=>{
            e.d_stroke = e.stroke
            
        })
    nodeArray = data.nodeArray;
        linkArray = data.linkArray;
        layout = data.layout;
        setLayout(layout);
  },
  // 追加图数据
  addGraphData:function(data){

      data.nodeArray.map(e=>{
                myDiagram.model.addNodeData(e)
                     
            })

            data.linkArray.map(e=>{
                        myDiagram.model.addLinkData(e)
                        if(data.layout == "sankey"){
                              if(data.animation == 1){
                                 animation = null;
                                 animation = new go.Animation();
                                 animation.easing = go.Animation.EaseLinear;
                                 myDiagram.links.each(function(link) {
                                if(link.data.id == e.id && link.data.money == e.money){
                                     link.findObject("PIPE").opacity = 1
                                     animation.add(link.findObject("PIPE"), "strokeDashOffset", 20, 0)
                                }
                                });
                                animation.runCount = Infinity;
                                animation.start();
                                setTimeout(function(){
                                  myDiagram.links.each(function(link) {
                                      if(link.fromNode.key == e.from && link.toNode.key == e.to){
                                          link.findObject("PIPE").opacity = 0
                                      }
                                  });
                                  animation.stop();
                                },10000)
                              }
                      }
                })
            myDiagram.layoutDiagram(true);


  },
  // 获取图资源
  getGraphAssets:function(id){
    if(id == 1){
      // 获取json和图谱
      graph_tool.makeBlob_toParent();
      return;

    }else if(id == 2){
      //获取选中节点和边
                  // var vertexs = graph_tool.getcurrentNodes();
                  // var edges = graph_tool.getcurrentEdges();
                  // var e_ = edges.map(e=>{
                  //   return{
                  //     "from":e.from,
                  //     "to":e.to,
                  //     "text":e.text,
                  //     "id":e.id,
                  //     "numeric":e.numeric,
                  //     "time":e.time,
                  //     "type_key":e.type_key,
                  //     "type_text":e.type_text,
                  //     "type":e.type,
                  //     "money":e.money,
                  //     "size":e.size,
                  //     "color":e.color,
                  //     "width":e.width,
                  //     "category":e.category,
                  //     "direction":e.direction,
                  //     "stroke":e.d_stroke,
                  //     "dir":e.dir,
                  //     "d_stroke":e.d_stroke,
                  //     "d_fill":e.d_stroke

                  //   }
                  // })
                  var obj = {
                    vertexs:updateData().nodeDataArray,
                    edges:updateData().linkDataArray,
                  msg:"获取选中点和边集合"
                  }
                 
                  return obj;

    }
  },
  //  修改图数据
  editGraphData:function(data){
    var nodes = data.nodeArray;
    var links = data.linkArray;
    if(nodes && nodes.length > 0){
      nodes.map(cn=>{
        myDiagram.nodes.each(n=>{
          if(cn.key == n.data.key){
            myDiagram.model.removeNodeData(n.data);
            myDiagram.model.addNodeData(cn);
          }
        })
      })
    }
    if(links && links.length > 0){
      links.map(cl=>{
        myDiagram.links.each(l=>{
          if(cl.from == l.data.from && cl.to == l.data.to && cl.id == l.data.id){
            myDiagram.model.removelinkData(l.data);
            myDiagram.model.addlinkData(cl);
          }
        })
      })
    }

  },
  lockingNode:function(){  //锁定选中节点
    var node_ = graph_tool.getcurrentNodes();
        // graph_tool.setNodeCanLayoutByKey(false,node_);  
        nodeArray.forEach(e=>{
            if(e.key == node_[0].key){
              e.isLocking = 1;
              e.loc = {
                x: node_[0].bounds.x,
                y:  node_[0].bounds.y
              };
            }
        })



  },
  unlockingNode:function(){  //锁定选中节点
    var node_ = graph_tool.getcurrentNodes();
        // graph_tool.setNodeCanLayoutByKey(true,node_);  
        nodeArray.forEach(e=>{
            if(e.key == node_[0].key){
              e.isLocking = 0;
              e.loc = "";
            }
        })
  },
  filterGraphElements:function(obj,type){

      let key = obj.key;
      let val = obj.value;
      if(key == ""){
         myDiagram.nodes.each(e=>{
                e.part.visible = true;
        })
         myDiagram.links.each(e=>{
                e.part.visible = true;
        })
         return;
      }
      if(type == 1 ){
          myDiagram.nodes.each(e=>{
             if(e.part.data[key] !== val){
                e.part.visible = false;
             }
          })
          return;
      }
      if(type == 2 ){
        myDiagram.links.each(e=>{
           if(e.part.data[key] !== val){
              e.part.visible = false;
           }
        })
        return
      }
       myDiagram.nodes.each(e=>{
             if(e.part.data[key] !== val){
                e.part.visible = false;
             }
      })
       myDiagram.links.each(e=>{
           if(e.part.data[key] !== val){
              e.part.visible = false;
           }
      })

  }


















}