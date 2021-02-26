
/*
===================================================================================================================================
=================================================请查看文档========================================================================
========================================联系管理==================================================================================
  type 1.为新建图
              nodeArray  节点集合
              linkArray  边集合
              layout  布局方式  "ForceDirectedLayout" 弹性布局   sankey 流向布局  treeLayout  树布局
       2.为追加图 去重边的 追踪
              rfresh  1刷新 2不刷新
              nodeArray
              linkArray
              layout  
              animation  1为显示  0为不显示
       3.事件触发
           order 
           触发事件序列 
                  1切换布局
                  2搜索实体
                  3undo
                  4redo
                  5标签显示
                  6更改实体类型
                  7.合并点
                  8.合并边
                  9 合并实体
                  10 取消合并实体
                  11 全选
                  12 反选
                  13 隐藏选中内容
                  14 取消隐藏
                  15 锁定
                  16 取消锁定
                  17 1:1屏幕
                  18 自适应屏幕
                  19 最大化选区
                  20 动态布局 
                  21 隐藏未选中内容
                  22 拖动模式
                  23 选中模式
                  24 选中端点
                  25 选中连接
                  26 选中端点和连接
                  28: zoomIn
                  29: zoomout
       4.获取图数据
             1 get_type
                1、 下载图片 
                2. 获取图json
                3. 获取图和json
                4. 获取选中节点集合  
                5. 获取选中边集合  
                6. 获取选中点和边集合
                7. 获取json和选中点
        5.链路环路新增
        6.修改图属性
        7.调整图标签
        8.追加数据到图  不去重边的
              nodeArray
              linkArray
              layout  
  dataType 数据类型
       1.
  nodeArray  节点数据集

  linkArray  边数据集
  layout  布局方式
  
*/

window.addEventListener("message",function(e) {
console.log("======================================================数据" + new Date())
  let data_ = JSON.parse(JSON.stringify(e.data));
    if (data_.type == 1) {
        pattern = data_.pattern;
        if(data_.header_state == false){
          $(".graph_pro").hide()
        }
        entity_type = data_.entity_type;
        graph_id = data_.graph_id;
        model = data_.model;
        data_.nodeArray.forEach(e=>{
          // e.id = e.key
          e.d_stroke = e.stroke
          e.d_fill = e.fill
          e.default_stroke = e.d_stroke
          e.default_fill = e.d_fill

          
        })
        graph_mode  = data_.graph_mode;
         data_.linkArray.forEach(e=>{
          e.source = e.from;
          e.target = e.to;
          e.d_stroke = e.stroke
          if(graph_mode !== "basic"){
            e.dir = 1;
          }
          // e.d_fill = e.fill
          
          
        })
        init_rightMenu_list();
        nodeArray = data_.nodeArray;
        linkArray = data_.linkArray;
        
        original_nodes = data_.original_nodes;
        original_links = data_.original_links;
        layout = data_.layout;
        entity_list = data_.entity_list;
        entity_tags = data_.entity_tags;
        moneys = data_.moneys;
        schema = data_.schema ? data_.schema : 0

        setLayout(layout)
        
    }

    if (data_.type == 2) {
          graph_methods(data_);
                // data_.nodeArray.forEach(e=>{
                //   e.d_stroke = e.stroke
                //   e.d_fill = e.fill
                //   e.default_stroke = e.d_stroke
                //   e.default_fill = e.d_fill

                  
                // })
                // data_.linkArray.forEach(e=>{
                //   e.d_stroke = e.stroke
                //   if(graph_mode !== "basic"){
                //        e.dir = 1;
                //   }
                  
                  
                // })
                // var curr = graph_tool.getcurrentNode();
                
                // //expand.js
                 
                // var data = data_;
                // myDiagram.startTransaction("CollapseExpandTree");
                // nodeArray = data_.nodeArray;
                // linkArray = data_.linkArray
                // nodeArray.map(e=>{
                //     let isAdd = 0;
                //     myDiagram.model.nodeDataArray.map(o=>{
                //     // myDiagram.model.setDataProperty(o,"isSelected",e.isSelected)    
                //           if(o.key == e.key ){
                //                isAdd++
                //           }
                //     })
                //     if(e.key !== graph_tool.getcurrentNode().key){
                //         if(isAdd==0){

                //             e.parent = graph_tool.getcurrentNode().key
                //             myDiagram.model.addNodeData(e)
                //         }
                        
                //     }else{
                //         myDiagram.model.setDataProperty(graph_tool.findNodeForKey(e.key).data,"isExpand",e.isExpand);
                //     }
                 
                // })

                // linkArray.map(e=>{
                //         let isAdd = 0;
                //         myDiagram.model.linkDataArray.map(o=>{
                //             // myDiagram.model.setDataProperty(o,"isSelected",e.isSelected)    
                //             if(o.id == e.id){
                //                 isAdd++
                //             }
                //         })
                //         if(isAdd==0){
                //              myDiagram.model.addLinkData(e)
                                        
                //         }
                        
                //         if(data.layout == "sankey"){
                //               if(data.animation == 1){
                //                  animation = null;
                //                  animation = new go.Animation();
                //                  animation.easing = go.Animation.EaseLinear;
                //                  myDiagram.links.each(function(link) {
                //                 if(link.data.id == e.id && link.data.money == e.money){
                //                   console.log(link,e)
                //                      link.findObject("PIPE").opacity = 1
                //                      animation.add(link.findObject("PIPE"), "strokeDashOffset", 20, 0)
                //                 }
                //                 });
                //                 animation.runCount = Infinity;
                //                 animation.start();
                //                 setTimeout(function(){
                //                   myDiagram.links.each(function(link) {
                //                       if(link.fromNode.key == e.from && link.toNode.key == e.to){
                //                           link.findObject("PIPE").opacity = 0
                //                       }
                //                   });
                //                   animation.stop();
                //                 },10000)
                //               }
                //       }
                // })
                // if(layout == "mlm_layout"){
                //   myDiagram.model.nodeDataArray.map(o=>{
                //        myDiagram.model.setDataProperty(o,"isSelected",0) 
                //   })
                //    myDiagram.model.linkDataArray.map(o=>{
                //        myDiagram.model.setDataProperty(o,"isSelected",0) 
                //   })
                //   nodeArray.map(e=>{
                //       myDiagram.model.nodeDataArray.map(o=>{
                //           if(o.key == e.key){
                //              myDiagram.model.setDataProperty(o,"isSelected",e.isSelected) 
                //           }
                //       })
                //   })
                //   linkArray.map(e=>{
                //        myDiagram.model.linkDataArray.map(o=>{
                //             if(o.id == e.id){
                //                 myDiagram.model.setDataProperty(o,"isSelected",e.isSelected)    
                //             }
                //         })
                //   })
                // }
                // myDiagram.commitTransaction("CollapseExpandTree");
               
                // nodeArray = myDiagram.model.nodeDataArray;
                // linkArray = myDiagram.model.linkDataArray;
                // if(layout !== "sankey"){
                //   setLayout(layout,2)
                // }
                // myDiagram.nodes.each(function(node) {

                //       if(node.part.data.key  === curr.key){
                //           node.part.isSelected = true;
                         
           
                //       }
                // }) 
                

                // console.log(linkArray)
                

    
    }
    if(data_.type == 3){
        // console.log(linkArray)
        if(data_.order == 1){
          // nodeArray = myDiagram.model.nodeDataArray;
          // linkArray = myDiagram.model.linkDataArray;
         
          layout = data_.layout
          
          if(layout !== "ForceDirectedLayout"){

              if(nodeArray.length > 10000 && linkArray.length > 10000){
                $(".entity_toast").css("left",document.body.clientWidth / 2 -200)
                $(".entity_toast").css("top",300)
                $(".entity_toast").text("当前节点与边数量超过2万,不支持使用"+layout+"布局交互,请选择其它布局");
                $(".entity_toast").show()
                setTimeout(function(){
                  $(".entity_toast").hide()
                },3000)
                return
              }
          }
          
          $(".loading").show()
          $(".loading_box").show()
          setTimeout(function(){setLayout(data_.layout)},0);
        }
        if(data_.order == 2){
           search_entity(data_.search_text)
        }
        if(data_.order == 3){
          graph_tool.undo()
        }
        if(data_.order == 4){
          graph_tool.redo()
        }
        if(data_.order == 5){
          setLabel_state(data_.labelisShow)
        }
        if(data_.order == 6){
          entity_type = data_.entity_type;
          graph_id = data_.graph_id;
          model = data_.model;
        }
        if(data_.order == 7){
           //合并链接
           merge_link_method(data_)
        }
        if(data_.order == 8){
           //取消合并链接
           cancel_mergeLink(data_)
           // cancel_mergeLink()
        }
        if(data_.order == 9){
           //合并实体
           merge_vertex()
        }
        if(data_.order == 10){
           //取消合并实体
           cacel_merge_node()
        }
        if(data_.order == 11){
          if(rendering_type === 2){
            webgl_selectAll()
            return;
          }

          graph_tool.selectAll();
        }
        if(data_.order == 12){
          if(rendering_type === 2){
            webgl_reverseSelected()
            return;
          }
         graph_tool.reverseSelected()

        }
        if(data_.order == 13){
          // 隐藏
          var nodes = graph_tool.getcurrentNodes();
          nodes.map(o=>{
            myDiagram.model.setDataProperty(o,"visible",false)
          })
        }
        if(data_.order == 14){
           // 显示
           myDiagram.model.nodeDataArray.map(o=>{
                myDiagram.model.setDataProperty(o,"visible",true)
           })
           myDiagram.model.linkDataArray.map(o=>{
                myDiagram.model.setDataProperty(o,"visible",true)
           })
        } 
        if(data_.order == 15){
          //锁定

          var node_ = graph_tool.getcurrentNodes();
          myDiagram.nodes.each(function(node) {
            node_.map(o=>{
              if(node.key == o.key){
                 let obj = {
                  key:node.key,
                  loc:node.location
                 }
                 lockings.push(obj)

              }
            })
          
          }) 
          
          
        }
        if(data_.order == 16){
          // 解锁
          lockings = [];
        }
        if(data_.order == 17){
          // 1：1
          
          myDiagram.commandHandler.resetZoom()
        }
        if(data_.order == 18){
          //自适应
          if(rendering_type == 2){
            webgl_zoomToFit()
            return;
          }
          myDiagram.commandHandler.zoomToFit()
        }
        if(data_.order == 19){
          //最大化
          if(rendering_type == 2){
            webgl_scrollToPart()
          }
          myDiagram.scale =  2.0

          myDiagram.commandHandler.scrollToPart(graph_tool.getcurrentNode()[0]);
        }
        if(data_.order == 20){
          if(data_.start_or_stop == "start"){
              start_layout_animation();
            
          }
          if(data_.start_or_stop == "stop"){
              stop_layout_animation();
          }
        }
        
        if(data_.order == 22){
          //拖动模式
          webgl_graph_state = "tz"
           change_selectordrag(false)
        } 
        if(data_.order == 23){
          //选中模式
          webgl_graph_state = "xz"
              change_selectordrag(true)
        }
        if(data_.order == 24){
          // 选中端点

            select_Both_ends();
        }
        if(data_.order == 25){
          // 选中边
          select_links();
        }
        if(data_.order == 26){
          //选中端点和链接
          select_Both_ends_links();
        }
        if(data_.order == 27){
         //隐藏当前未选中
              setEntity2hide();

        }
        if(data_.order == 28){  //放大
             graph_tool.increaseZoom();
        }
        if(data_.order == 29){
            graph_tool.decreaseZoom();
        }
        if(data_.order == 29){
            graph_tool.decreaseZoom();
        }
        if(data_.order == 29){
            graph_tool.decreaseZoom();
        }
        if(data_.order == 30){
          _findAllPath();
        } 
        if(data_.order == 31){
          _findShortPath();
        }



    }
    if(data_.type == 4){

          if(data_.get_type == 1) {
                  downloadImgName = data_.downloadImgName;
                  if(rendering_type == 2){
                    webgl_downloadImg();
                  }
                  graph_tool.makeBlob()
          }
          // 获取图数据json和图片
          if(data_.get_type == 3){
                if(rendering_type == 2){
                  webgl_getGraphAssets();
                  return;
                }
                graph_tool.makeBlob_toParent();
          
          }
          //获取选中点集合
          if(data_.get_type == 4){
                  var vertexs = graph_tool.getcurrentNodes();
                  var obj = {
                    vertexs:vertexs,
                    startVertex:startVertex,
                    endVertex:endVertex,
                    g_json:graph_tool.graphtoJson(),
                    entity_list:entity_list,
                    msg:"获取选中节点集合"
                  }
                  postmessageToParent(obj)
          }
          //获取选中边集合
          if(data_.get_type == 5){
                  var edges = graph_tool.getcurrentEdges();
                  var obj = {
                    edges:edges,
                    msg:"获取选中边集合"
                  }
                  postmessageToParent(obj)
          }
          if(data_.get_type == 6){
                  let obj = graph_methods.getGraphAssets(2);
                  postmessageToParent(obj)
          }
          if(data_.get_type == 7){
                   var obj = {
                      g_json:graph_tool.graphtoJson(),
                      // g_json:{
                      //   nodeDataArray:nodeArray,
                      //   linkDataArray:linkArray
                      // },
                      vertexs:graph_tool.getcurrentNodes(),
                      original_nodes:original_nodes,
                      original_links:original_links
                   }

                   postmessageToParent(obj)
          }
          if(data_.get_type == 8){
             var obj ={
              msg:"获取边所有类型和属性",
              data:get_graph_links_type()

             }
             postmessageToParent(obj)
          }
          if(data_.get_type == 9){
            var obj = {
              msg:"获取当前合并的边类型",
              data:get_graph_mergeLink_type()
            }
            postmessageToParent(obj)
          }

          if(data_.get_type == 10){
            console.log(myDiagram.model.nodeDataArray)
                var obj = {
                  "msg":"获取维度信息",
                  "node_rows":get_node_rows(),
                  "link_rows":get_link_rows(),
                  "link_Dimension_count":get_link_Dimension_count(),
                  "node_Dimension_count":get_node_Dimension_count(),
                }
                postmessageToParent(obj)
          }
          $(".item-inner").hide()
    }
    if(data_.type == 5){
          data_.nodeArray.forEach(e=>{
          e.d_stroke = e.stroke
          e.d_fill = e.fill
          e.default_stroke = e.d_stroke
          e.default_fill = e.d_fill

          
        })
          var nodes = data_.nodeArray;
          var links = data_.linkArray;
          
              nodes.map((e,i)=>{
                  let isAdd = 0;
                  myDiagram.model.nodeDataArray.map(o=>{
                     if(o.key == e.key ){
                         isAdd++
                      }
                  })
                  if(e.key !== graph_tool.getcurrentNodes().key && isAdd==0){
                       myDiagram.model.addNodeData(e)
                  }
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
            nodeArray = myDiagram.model.nodeDataArray
            linkArray = myDiagram.model.linkDataArray
          if(layout == "ForceDirectedLayout"){
           setLayout("ForceDirectedLayout" )
          }

    }
    
    // 路径分析
    if(data_.type == 6){

        var nodes = data_.nodeArray;
        var links = data_.linkArray;

        myDiagram.model.nodeDataArray.map(e=>{
          nodes.map(o=>{
            if(e.key == o.key){
              console.log(e)
              myDiagram.model.setDataProperty(e,"fill","#EE0000")
              myDiagram.model.setDataProperty(e,"stroke","#EE0000")
              myDiagram.model.setDataProperty(e,"highlight_fill","#EE0000")
              myDiagram.model.setDataProperty(e,"highlight_stroke","#EE0000")
            }
          })
        })
        myDiagram.model.linkDataArray.map(e=>{
          links.map(o=>{
            if(e.e_ids == o.e_ids){
              myDiagram.model.setDataProperty(e,"fill","#EE0000")
              myDiagram.model.setDataProperty(e,"stroke","#EE0000")
              myDiagram.model.setDataProperty(e,"highlight_fill","#EE0000")
              myDiagram.model.setDataProperty(e,"highlight_stroke","#EE0000")
            }
          })
        })
       

    }
    // 调整图标签
    if(data_.type == 7){
        
        var ndata = data_.newData;
        
        myDiagram.model.nodeDataArray.map(o=>{
          if(o.key == ndata.key){
            myDiagram.model.setDataProperty(o,"tags",ndata.tags)
            
            
          }
        })

       
    }
    if (data_.type == 8) {   //追加
            myDiagram.startTransaction("CollapseExpandTree");
                nodeArray = data_.nodeArray;
                linkArray = data_.linkArray
                nodeArray.map(e=>{
                    let isAdd = 0;
                    myDiagram.model.nodeDataArray.map(o=>{
                          if(o.key == e.key ){
                               isAdd++
                          }
                    })
                    if(e.key !== graph_tool.getcurrentNode().key && isAdd==0){
                        e.parent = graph_tool.getcurrentNode().key
                        myDiagram.model.addNodeData(e)
                    }
                 
                })

                linkArray.map(e=>{
                        let isAdd = 0;
                        myDiagram.model.linkDataArray.map(o=>{
                                    
                            if(o.from == e.from && o.to == e.to && o.e_ids == e.e_ids){
                                isAdd++
                            }
                        })
                        if(isAdd==0){
                            myDiagram.model.addLinkData(e)
                        }
                })
                myDiagram.commitTransaction("CollapseExpandTree");
                nodeArray = myDiagram.model.nodeDataArray
            
                linkArray = myDiagram.model.linkDataArray
            return
   
    }
    if(data_.type == 9){
      // 格式化
       
        if(original_nodes.length == 0 && original_links.length == 0){
            myDiagram.model.nodeDataArray.map(e=>{
              original_nodes.push(e)
            })
            myDiagram.model.linkDataArray.map(e=>{
              original_links.push(e)
            })
        }
        /*
          state  1实体  2 链接
        */
        if(data_.state == 1){

            if(data_.nodeArray.length > 0){
	               var arr =[];
                 nodeArray.map((o,i)=>{
                   if(data_.nodeArray[0].type !== o.type){
                       arr.push(o);
                   }
                     
                })
                nodeArray = arr.concat(data_.nodeArray)
                
          }
              nodeArray.forEach(e=>{
                e.d_stroke = e.stroke
                e.d_fill = e.fill
                e.default_stroke = e.d_stroke
                e.default_fill = e.d_fill

                
              })

        }
        if(data_.state == 2){
            var arr = []
            if(data_.linkArray.length > 0){
                
                linkArray.map((o,i)=>{
                   if(data_.linkArray[0].type !== o.type){
                       arr.push(o);
                   }
                     
                })
                linkArray = arr.concat(data_.linkArray)
                linkArray.forEach(e=>{
                    e.d_stroke = e.stroke
                       e.d_fill = e.fill
                    e.default_stroke = e.d_stroke
                    e.default_fill = e.d_fill

                    
                })
            }
           // linkArray = linkArray.concat(arr); 
        }
        setLayout(layout)
    }
    if(data_.type == 10){
      // 清除格式化
       if(original_nodes.length > 0 || original_links.length > 0 ){

              nodeArray = original_nodes;
              linkArray = original_links;
              original_nodes = [];
              original_links = [];
              setLayout(layout)
        }else{
          console.log("未格式化")
        }
    }
    if(data_.type == 11){
      //新增节点 || 边
     
      if(data_.node){
          myDiagram.model.addNodeData(data_.node);
          // graph_tool.findNodeForKey(data_.node.key)
           myDiagram.nodes.each(function(node) {
            if(node.data.key == data_.node){
              myDiagram.commandHandler.scrollToPart(node.data);
            }
          }) 
      }
      if(data_.link){
          	
          myDiagram.model.addLinkData(data_.link);
      }
    }
    //
    if(data_.type == 12){
         data_.nodes && data_.nodes.map(e=>{
          myDiagram.nodes.each(function(node) {
              if(nodes.data.id == e.id){
                 node.isSelected = true
              }
          }) 
         })
    }
    if(data_.type == 13){
        if(data_.nodeArray.length >= 1){
          data_.nodeArray.map(e=>{
            myDiagram.model.nodeDataArray.map(o=>{
              if(e.id == o.id){
                myDiagram.model.setDataProperty(o,"d_stroke",e.stroke);
                myDiagram.model.setDataProperty(o,"default_stroke",e.stroke);
                myDiagram.model.setDataProperty(o,"d_fill",e.fill);
                myDiagram.model.setDataProperty(o,"default_fill",e.fill);
                myDiagram.model.setDataProperty(o,"width",e.width);
                myDiagram.model.setDataProperty(o,"height",e.height);
                myDiagram.model.setDataProperty(o,"icon",e.icon);
                myDiagram.model.setDataProperty(o,"color",e.color);
              }
            })
          })
        }
        if(data_.linkArray.length >= 1){
           data_.linkArray.map(e=>{
            myDiagram.model.linkDataArray.map(o=>{
              if(e.id == o.id){
                myDiagram.model.setDataProperty(o,"d_stroke",e.stroke);
                myDiagram.model.setDataProperty(o,"default_stroke",e.stroke);
                myDiagram.model.setDataProperty(o,"patt",e.patt);
                myDiagram.model.setDataProperty(o,"width",e.width);
                
              }
            })
            })
        }
    }







})




function postmessageToParent(obj){
  // console.log("===========================================")
  // console.log(obj)
    window.parent.postMessage(obj,"*")
}
