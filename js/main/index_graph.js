
// body_person 主体 人员   
// body_company 主体企业   
// account 账户  
// account_person 账户 人员 
// account_company 账户企业   
// account_government账户 政府 
// account_ThirdParty 账户第三方 
// group_person 组包只含人员  
// group_company 组只包含人员 
// group_person_company 组只包含人员和企业  
// group_account 组包含多个账户 
// money 现金   
// ip_mac  ip/mac/代办人

function geoFunc(geoname) {
     return "./img/icon/"+geoname+".svg"
}




/*
=============================================================================================================================
=============================================================================================================================
** 选中实体发生改变回调
@autor ----------------------
@time -------------------------
*/

function ChangedSelection_fuc(){  
  // return
    
      // myDiagram.nodes.each(e=>{
      //      if(e.isSelected){
      //           myDiagram.model.setDataProperty(e.data,"d_stroke","#FFC106");

      //       }else{
      //          myDiagram.model.setDataProperty(e.data,"d_stroke",e.data.default_stroke);
      //       }
      // })
      if(graph_tool.getcurrentNodes().length == 2){
              startVertex = graph_tool.getcurrentNodes()[0]
              endVertex = graph_tool.getcurrentNodes()[1]
              
      }
      if(nodeArray.length < 1000 && linkArray.length < 1000){
        
        setBottom_nav(graph_tool.getNodesCount(),graph_tool.nodesSelectCount(),graph_tool.nodesVisibleCount(),graph_tool.getEdgesCount(),graph_tool.edgesSelectCount(),graph_tool.edgesVisibleCount())
      }
            var obj = {
              nodeArray:graph_tool.getcurrentNodes(),
              linkArray:graph_tool.getcurrentEdges()
            }
            send_newGraph("实体选中内容发生变化")


}

myDiagram =  GO(go.Diagram, "myDiagramDiv");  //初始化内容区


var myOverview =  GO(go.Overview, "myOverviewDIV",{ observed: myDiagram });   //初始化鹰眼内容区





/*
=============================================================================================================================
=============================================================================================================================
** 设置节点tooltip模板
@autor ----------------------
@time -------------------------
*/
var tooltipTemplate =
        GO("ToolTip",
          { "Border.fill": "#fff", "Border.stroke": "lightgray" },
          GO(go.TextBlock,
            { 
              stroke:"#167CF3",
              text:"",
              font: "16px sans-serif",
              wrap: go.TextBlock.WrapFit,
              desiredSize: new go.Size(200, NaN),
              alignment: go.Spot.Center,
              margin: new go.Margin(10,15,10,15),

            },
            new go.Binding("text","toolTip_text")
            )
);


var tooltipTemplate_text =
        GO("ToolTip",
          { "Border.fill": "#fff", "Border.stroke": "lightgray" },
          GO(go.TextBlock,
            { 
              stroke:"#167CF3",
              text:"",
              font: "16px sans-serif",
              wrap: go.TextBlock.WrapFit,
              desiredSize: new go.Size(200, NaN),
              alignment: go.Spot.Center,
              margin: new go.Margin(10,15,10,15),

            },
            new go.Binding("text")
            )
);





    
       
/*
=============================================================================================================================
=============================================================================================================================
** 设置标签tooltip模板
@autor ----------------------
@time -------------------------
*/
function init_tooltipTemplate_label(i){
      return GO("ToolTip",
          { "Border.fill": "#fff", "Border.stroke": "lightgray" },
          GO(go.TextBlock,
            { 
              stroke:"#167CF3",
              text:"",
              font: "16px sans-serif",
              wrap: go.TextBlock.WrapFit,
              desiredSize: new go.Size(200, NaN),
              alignment: go.Spot.Center,
              margin: new go.Margin(10,15,10,15),

            },
            new go.Binding("text", "tags",function(n){
                          return n[i].text
             })
      ))
}

var tooltipTemplate_label1 = init_tooltipTemplate_label(0);
var tooltipTemplate_label2 = init_tooltipTemplate_label(1);
var tooltipTemplate_label3 = init_tooltipTemplate_label(2);



    


    
       
/*
=============================================================================================================================
=============================================================================================================================
** 设置连线样式模板
@autor ----------------------
@time -------------------------
*/     
var tooltipTemplate_link =
        GO("ToolTip",
          { "Border.fill": "#fff", "Border.stroke": "lightgray" },
          GO(go.TextBlock,
            { 
              stroke:"#167CF3",
              text:"",
              font: "16px sans-serif",
              wrap: go.TextBlock.WrapFit,
              desiredSize: new go.Size(200, NaN),
              alignment: go.Spot.Center,
              margin: new go.Margin(10,15,10,15),

            },
            new go.Binding("text","toolTip_text")
            )
);

    






       
/*
=============================================================================================================================
=============================================================================================================================
** 设置节点样式模板
@autor ----------------------
@time -------------------------
*/
function setLayout(type,n_) {
    $(".loading").show()
    $(".loading_box").show()
    $("#container").css("z-index",-10);
    $("#myDiagramDiv").css("z-index",10);  
    $("#myDiagramDiv").show();  
    $(".eye_c").show();  
    $("#graph-container").hide();
    $("#graph-container").css("opacity",0)
     rendering_type = 1;
    
    
    // if(n_ === 3){
    //   // 切换布局
    //   $(".entity_toast").css("left",document.body.clientWidth / 2 )
    //   $(".entity_toast").css("top",300)
    //   $(".entity_toast").text("布局计算中...");
    //   $(".entity_toast").show()
    // }
    if(type == "layer"){
      layer_layout()
    }else if(type == "mlm_layout"){
      mlm_layout()
      
    }else if(type == "fast_sankey"){
      sankey_layout_Nolayer();
    }
    else if (type == "skr_layout") {
      skr_layout()
    }else if(type == "p_c_layout"){
      p_c_layout()
    }else if(type == "Equity_layout"){
      Equity_layout()
    }else if (type == "ForceDirectedLayout") {
      // f_layout()
      // return
          if(nodeArray.length >= 3000 || linkArray.length >= 3000){
            $("#myDiagramDiv").hide();
            // $(".eye_c").hide();    
            $("#graph-container").show();
            rendering_type = 2;
            if(renderer){
               renderer.dispose();
               renderer = null;
            }
            $(".node-label").remove();
            $(".link-label").remove();
            init_Webgl()
          //   setBottom_nav(nodeArray.length,0,0,linkArray.length,0,0)
          //   // init_force_()
            return;
          }else{
              // froce_layout()
          //     setBottom_nav(nodeArray.length,0,0,linkArray.length,0,0)

              f_v_layout()

              myWholeModel.nodeDataArray = nodeArray;
              myWholeModel.linkDataArray = linkArray;
              myDiagram.layoutDiagram(true);
              return
          }
    }else if (type == "sankey") {
      // sankey_layout()
      // if(nodeArray.length >= 500 || linkArray.length >= 500){
      //     // fast_sankey_layout()
      //     sankey_layout()
      //     // 
      // }else{
          sankey_layout()
          
      // }
      // fast_sankey_layout()
    }else if (type == "treeLayout") {
      tree_layout()
      // layer_tree_layout()
    }else if(type == "cirular"){
      cirular_layout()
    }else if(type == "structure"){
      structure_layout()
    }else if(type == "timing"){
          function process(arr) {
              // 缓存用于记录
              const cache = [];
              for (const t of arr) {
                  if (cache.find(c => c.name === t.name )) {
                      continue;
                  }
                   cache.push(t);
              }
              return cache;
          }
          option.xAxis.max  = Math.max.apply(null,set_datatoTiming_layout().timings);
          option.xAxis.min  = Math.min.apply(null,set_datatoTiming_layout().timings);
          option.series[0].data =  process(set_datatoTiming_layout().nodes)
          // console.log(n)
          option.series[0].links =  set_datatoTiming_layout().links;
          option.yAxis.data =  set_datatoTiming_layout().yData;
          myChart.setOption(option);
          $("#container").css("z-index",10);
          $("#myDiagramDiv").css("z-index",-10);  
          (".loading").hide()
          $(".loading_box").hide()
          return;
    }


      if(rendering_type == 1){
        
        
        myDiagram.model.nodeDataArray = nodeArray;
        myDiagram.model.linkDataArray = linkArray;


       
         //  var angle = 2;
         // // setInterval(function(){
         //   myDiagram.nodes.map(node=>{
         //          animation = null;
         //          animation = new go.Animation();
         //          // animation.add(node.findObject("PIPE"), "angle",node.angle, angle);
         //          animation.add(node.findObject("PIPE"), "strokeDashOffset", 20, 0)
         //          // animation.duration = 1;
         //          animation.start()
         //    })
            // angle = angle + 2;
         // },10)
      }
      myDiagram.addDiagramListener("InitialLayoutCompleted",function(e){
          let obj = {
            "events":"InitialLayoutCompleted",
            "events_name":"图布局初次加载完成"
            // "guid":

          }
          if(isGraph_events){
               callBackToClient(obj)
          }
          // if()
          download_scale = myDiagram.scale;
          $(".loading").hide()
          $(".loading_box").hide()
          $(".entity_toast").css("left",document.body.clientWidth / 2 -100)
                $(".entity_toast").css("top",300)
                $(".entity_toast").text("布局完成");
                $(".entity_toast").show()
                setTimeout(function(){
                  $(".entity_toast").hide()
                },200)
              myDiagram.nodes.each(function(node) {
                      if(node.part.isSelected){
                          // node.part.isSelected = true;
                           myDiagram.commandHandler.scrollToPart(node);
           
                      }
                      if(node.part.data.isSelected == 1){
                           node.part.isSelected = true
                      }
              })
              myDiagram.links.each(function(link) {
                      
                      if(link.part.data.isSelected == 1){
                           link.part.isSelected = true
                      }
              })
       
            
        })
 



       
/*
=============================================================================================================================
=============================================================================================================================
** 视图选中节点发生变化
@autor ----------------------
@time -------------------------
*/
myDiagram.addDiagramListener("ChangedSelection",function(e){
      ChangedSelection_fuc()
})
        



/*
=============================================================================================================================
=============================================================================================================================
** 视图发生改变
@autor ----------------------
@time -------------------------
*/
myDiagram.addDiagramListener("ViewportBoundsChanged",function(e){
        $(".item-inner").hide()
          
        if(myDiagram.scale <= 4) {
            sets_sale_num(myDiagram.scale);
         }else{
            myDiagram.scale = 4
        }


        if(rendering_type == 1){
            setBottom_nav(graph_tool.getNodesCount(),graph_tool.nodesSelectCount(),graph_tool.nodesVisibleCount(),graph_tool.getEdgesCount(),graph_tool.edgesSelectCount(),graph_tool.edgesVisibleCount())
        }
        // let scale = myDiagram.scale; 
        // // myDiagram.nodes.each(function(node){
        // //     var node_= node.findObject("node_");
        // //     var node_text= node.findObject("node_text");
        // //       if(node_ !== null) {
        // //           node_.visible =  scale < 1 ? false : true
        // //       }
        // //       if(node_text !== null){
        // //           node_text.visible =  scale < 0.6 ? false : true
        // //       }
                     
        // // })
        // myDiagram.nodes.each(function(node){
        //     let inView = myDiagram.viewportBounds.containsRect(node.part.actualBounds);
        //     // if(inView){
        //       // console.log(node)
        //         // node.part.visible = true;
        //         var node_= node.findObject("node_");
        //         var node_text = node.findObject("node_text");

        //           if(node_ !== null) {
        //               node_.visible =  scale < 0.8 ? false : true
        //           }
        //           if(node_text !== null) {
        //               node_text.visible =  scale < 0.8 ? false : true
        //           }
        //         // }else{
        //           // node.part.visible = false;
        //         // }
        //       // console.log(node.bounds.intersectsRect(e.diagram.viewportBounds))
                     
        // })
        // myDiagram.links.each(function(link){
        //       var link_ = link.findObject("link_");
        //       var link_text= link.findObject("link_text");
        //       if(link_text !== null){
        //           link_text.visible = scale < 0.6 ? false : true;      
        //       }
        //       if(link_ !== null){
        //           link_.visible = scale < 0.6 ? false : true;
        //       }
        // })
        let scale = myDiagram.scale; 
        myDiagram.nodes.each(function(node){
            let inView = myDiagram.viewportBounds.containsRect(node.part.actualBounds);
            // if(inView){
              // console.log(inView)
                // node.part.visible = true;
                var node_icon= node.findObject("node_icon");
                var node_text = node.findObject("node_text");

                  if(node_icon !== null) {
                      node_icon.opacity =  scale < 0.8 ? false : true
                  }
                  if(node_text !== null) {
                      node_text.opacity =  scale < 0.8 ? false : true
                  }
     
                     
        })
        myDiagram.links.each(function(link){
              var link_text= link.findObject("link_text");
              // var link_ = link.findObject("link_");
              var link_arrow = link.findObject("link_arrow");
              if(link_text !== null){
                  link_text.opacity = scale < 0.8 ? false : true;      
              }
              // if(link_ !== null){
              //     link_.opacity = scale < 0.8 ? false : true;
              // }
              if(link_arrow !== null){
                  link_arrow.opacity = scale < 0.8 ? false : true;
              }
        })


        
})



}





/*
=============================================================================================================================
=============================================================================================================================
@autor ----------------------
@time -------------------------
***调整节点标签
*/

function setLabel_state(state){
  // console.log(state)
 
     myDiagram.nodes.each(function(node){
        var entity_label= node.findObject("entity_label");  //标签背景1
        var entity_label2= node.findObject("entity_label2"); //标签2
        var entity_label3= node.findObject("entity_label3");//标签3
        var entity_label_text1= node.findObject("entity_label_text1");//标签内容1
        var entity_label_text2= node.findObject("entity_label_text2");//2
        var entity_label_text3= node.findObject("entity_label_text3");//3
        var entity_label_text_x1= node.findObject("entity_label_text_x1");//标签关闭
        var entity_label_text_x2= node.findObject("entity_label_text_x2");//标签关闭
        var entity_label_text_x3= node.findObject("entity_label_text_x3");//标签关闭
        
        if(entity_label !== null) {
           entity_label.opacity = state
           if(entity_label_text1.text == ""){
             entity_label.opacity = 0
          }
        }
        if(entity_label2 !== null) {
              entity_label2.opacity = state
              if(entity_label_text2.text == ""){
                 entity_label2.opacity = 0
              }
        }
        if(entity_label3 !== null) {
              entity_label3.opacity = state
              if(entity_label_text3.text == ""){
                 entity_label3.opacity = 0
              }
        }
        if(entity_label_text1 !== null) {
              entity_label_text1.opacity = state
              if(entity_label_text1.text == ""){
                 entity_label_text1.opacity = 0
              }
        }
        if(entity_label_text2 !== null) {
              entity_label_text2.opacity = state
              if(entity_label_text2.text == ""){
                 entity_label_text2.opacity = 0
              }
        }
        if(entity_label_text3 !== null) {
              entity_label_text3.opacity = state
              if(entity_label_text3.text == ""){
                 entity_label_text3.opacity = 0
              }
        }
        if(entity_label_text_x1 !== null) {
              entity_label_text_x1.opacity = state
              if(entity_label_text1.text == ""){
                 entity_label_text_x1.opacity = 0
              }
        }
        if(entity_label_text_x2 !== null) {
              entity_label_text_x2.opacity = state
              if(entity_label_text2.text == ""){
                 entity_label_text_x2.opacity = 0
              }
        }
        if(entity_label_text_x3 !== null) {
              entity_label_text_x3.opacity = state
              if(entity_label_text3.text == ""){
                 entity_label_text_x3.opacity = 0
              }
        }
                       
                      
                     
    })                  

}


/*
=============================================================================================================================
=============================================================================================================================
@autor ----------------------
@time -------------------------
** 设置底部展示信息
*/
function setBottom_nav(v,select_v,hide_v,e,select_e,hide_e){
    $(".v_num").text(v)
    $(".select_v_num").text(select_v)
    $(".hide_v_num").text(hide_v)
    $(".e_num").text(e)
    $(".selece_e_num").text(select_e)
    $(".hide_e_num").text(hide_e)
}




/*
=============================================================================================================================
=============================================================================================================================
@autor ----------------------
@time -------------------------
** 查找diStances
*/
function findDistances(source) {
      var diagram = source.diagram;
      var distances = new go.Map();
     
      var nit = diagram.nodes;
      while (nit.next()) {
        var n = nit.value;
        distances.set(n, Infinity);
      }
      
      distances.set(source, 0);
      var seen = new go.Set(/*go.Node*/);
      seen.add(source);

      var finished = new go.Set(/*go.Node*/);
      while (seen.count > 0) {
        var least = leastNode(seen, distances);
        var leastdist = distances.get(least);
        seen.delete(least);
        finished.add(least);
        var it = least.findLinksOutOf();
        while (it.next()) {
          var link = it.value;
          var neighbor = link.getOtherNode(least);
          if (finished.has(neighbor)) continue;
          var neighbordist = distances.get(neighbor);
          var dist = leastdist + 1; 
          if (dist < neighbordist) {
            if (neighbordist === Infinity) {
              seen.add(neighbor);
            }
           
            distances.set(neighbor, dist);
          }
        }
      }

      return distances;
}







/*
=============================================================================================================================
=============================================================================================================================
@autor ----------------------
@time -------------------------
*/
function nodeSelectionChanged(node){
         if (myDiagram.selection.count === 0) {
              myDiagram.links.each(function(l){
                l.isHighlighted = false
              }) 
         }
}



/*
=============================================================================================================================
=============================================================================================================================
** 查找最短路径
@autor ----------------------
@time -------------------------
*/
function findShortestPath(begin, end) {
      distances = findDistances(begin);

     
      var path = new go.List();
      path.add(end);
      while (end !== null) {
        var next = leastNode(end.findNodesInto(), distances);
        if (next !== null) {
          if (distances.get(next) < distances.get(end)) {
            path.add(next);  
          } else {
            next = null; 
          }
        }
        end = next;
      }
      path.reverse();
      return path;
}





/*
=============================================================================================================================
=============================================================================================================================
** 查找最短路径 节点
@autor ----------------------
@time -------------------------
*/
function leastNode(coll, distances) {
      var bestdist = Infinity;
      var bestnode = null;
      var it = coll.iterator;
      while (it.next()) {
        var n = it.value;
        var dist = distances.get(n);
        if (dist < bestdist) {
          bestdist = dist;
          bestnode = n;
        }
      }
      return bestnode;
}


/*
=============================================================================================================================
=============================================================================================================================
** 查找最短路径 高亮
@autor ----------------------
@time -------------------------
*/
function highlightPath(path) {
      myDiagram.clearHighlighteds();
      for (var i = 0; i < path.count - 1; i++) {
        var f = path.get(i);
        var t = path.get(i + 1);
        f.findLinksTo(t).each(function(l) { 
            
            l.isHighlighted = true
           
        });
      }
}


