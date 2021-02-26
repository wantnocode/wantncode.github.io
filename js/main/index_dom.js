/*
			max 最大长度
			tag 状态
			ox 坐标
			left 起点
			bgleft 背景
*/
var menu_x,menu_y;
var max = $(".slide_content").width() - 5;
var tag = false,
ox = 0,
left = 0,
bgleft = 0;
$('.slide_box').mousedown(function(e) {
    ox = e.pageX - left;
    tag = true;
});
$(document).mouseup(function() {
    tag = false;
});





$('.slide_content').mousemove(function(e) { //鼠标移动
    if (tag) {
        left = e.pageX - ox;
        if (left <= 0) {
            left = 0;
        } else if (left > max) {
            left = max;
        }

        $('.slide_box').css('left', left);
        // console.log(left/max)
        if(parseInt(left / max * 400) < 1){

              $('.scale_num').html('1%');
              if(rendering_type == 2){
                webgl_setZoom(left/max*4)
                return;
              }
              graph_tool.setZomm(0.01)
              return
        }
        if(rendering_type == 2){
          webgl_setZoom(left/max*4)
          return;
        }
        graph_tool.setZomm(left/max*4)
    }
});



$('.slide_content').click(function(e) { //鼠标点击
    if (!tag) {
        bgleft = $('.slide_content').offset().left;
        left = e.pageX - bgleft;
        if (left <= 0) {
            left = 0;
        } else if (left > max) {
            left = max;
        }
        $('.slide_box').css('left', left);
        if(parseInt(left / max * 400) < 1){

              $('.scale_num').html('1%');
              if(rendering_type == 2){
                webgl_setZoom(left/max*4)
                return;
              }
              graph_tool.setZomm(0.01)
              return
        }

        $('.scale_num').html(parseInt(left / max * 400) + '%');
        if(rendering_type == 2){
          webgl_setZoom(left/max*4)
          return;
        }
         graph_tool.setZomm(left/max*4)
    }
});



//  鹰眼点击展示隐藏
$(".eye_c").click(function() {
    $(".eye_c").attr('src') == "img/eye_h.png" ? $(".eye_c").attr('src', "img/eye_l.png") : $(".eye_c").attr('src', "img/eye_h.png");
    $("#myOverviewDIV").css('right') == '1px' ? $("#myOverviewDIV").css('right', '-300px') : $("#myOverviewDIV").css('right', '1px');
})



/*
*设置右键内容
*/
function setRightMenu_data(o){
    var arr = [];
    var nodeLen = graph_tool.nodesSelectCount();    // 选中节点
    var linkLen = graph_tool.edgesSelectCount();   // 选中边
    
    // console.log(nodeLen,linkLen)
    // if(rendering_type == 2 && selectedNodes.size > 0 && selectedLinks > 0){

    // }
    if(nodeLen > 0 && linkLen == 0){   //节点选择数量大于0
        arr = r_node_list.map(e=>{
            return e;
        })
        if(nodeLen < 2){
              var index = arr.indexOf("合并实体");
              arr.splice(index,1);
        }
        if(o.is_group == "1" && o.merge_type == 2){  //叶子节点合并之后的节点
              arr = r_node_list.map(e=>{
                  return e;
              })
              var index = arr.indexOf("合并叶子节点");
              arr.splice(index,1,"展开叶子节点")
        }else if(o.is_group == "1"){   //合并实体之后的节点
              arr = r_node_list.map(e=>{
                  return e;
              }); 
              var index = arr.indexOf("合并实体");
              arr.splice(index,1,"还原实体");
        }
        
    }
    if(linkLen > 0 && nodeLen == 0){
        arr = r_link_list.map(e=>{
            return e;
        })
        var link_type  = graph_tool.getcurrentEdge().type;
        var link_id = graph_tool.getcurrentEdge().id;
        if(link_type == "transaction" && link_id.indexOf("_") == -1){
            arr = r_link_list.map(e=>{
                return e;
            })
            arr.push("追踪单笔链路");
        }
    }
    if(nodeLen == 0 && linkLen == 0){
          arr =  r_blank_list.map(e=>{
            return e;
          })
    }
    if(nodeLen > 0 && linkLen > 0){
          arr = r_node_list.filter(e=>{
              if(e == "发至新图"){
                return e
              }
          })
    }
    return arr;
}

function set_R_menu(arr){
  
    var html = "";
   
    arr.map(e=>{
       var txt = (function(){
			if(e == "选中" || e == "隐藏"){
				return e + "<span style = 'padding-left:90px;'>></span>"
			}else{
				return e
			}
      })()   
        var li = "<li onclick='R_menu_li_click(\"" + e +"\")' onmouseenter='R_menu_li_in(\"" + e +"\")'>"+txt +"</li>"
        html += li
    })
    $(".R_menu").empty()
    $(".R_menu").append(html)

}

function set_R_menu_(arr){
    var html = ""
    arr.map(e=>{
        var li = "<li onclick='R_menu_li_click(\"" + e +"\")' >"+e+"</li>"
        html += li
    })
    $(".R_menu_").empty()
    $(".R_menu_").append(html)
}

/*
 右键移入
*/
function R_menu_li_in(e){
  var r_menu_ = document.getElementById("menu_");
  let o  = graph_tool.getcurrentNodes()[0];
  let l = graph_tool.getcurrentEdges()[0];

  if(e == "选中" && o){
    r_menu_.style.left= menu_x +138 +'px' ;
    r_menu_.style.top = menu_y  + 96+ 'px';
    set_R_menu_(r_node_list_select);
    $(".R_menu_").show();
  }
  else if(e == "隐藏" && o){
    r_menu_.style.left= menu_x +138 +'px' ;
    r_menu_.style.top = menu_y  + 128+ 'px';
    set_R_menu_(r_node_list_hide);
    $(".R_menu_").show();
  }
 
  else if(e == "选中" && l){
    r_menu_.style.left= menu_x +138 +'px' ;
    r_menu_.style.top = menu_y  + 64+ 'px';
    set_R_menu_(r_link_list_select);
    $(".R_menu_").show();
  }
  else if(e == "隐藏" && l){
    r_menu_.style.left= menu_x +138 +'px' ;
    r_menu_.style.top = menu_y  + 32+ 'px';
    set_R_menu_(r_link_list_hide);
    $(".R_menu_").show();
  }else {
    $(".R_menu_").hide();
  }


}
function R_menu_li_click(e){
    switch(e){
        case "复制":
        graph_tool.copySelection()
        break;
        case "删除":
        graph_tool.deleteSelection()
        break;
        case "全选":
        graph_tool.selectAll();
        ChangedSelection_fuc();
        break;
        case "粘贴":
        graph_tool.pasteSelection()
        break;
        case "反选":
        graph_tool.reverseSelected()
        break;
        case "属性":
        send_newGraph("属性")
        break;
        case "隐藏":
        hideVertex()
        break;
        case "全部显示":
        show_allEntity()
        break;
        case "列出明细":
        send_newGraph("列出明细")
        break;
        case "发至新图":
        send_newGraph("发至新图")
        break;
        case "追来源去向":
        send_newGraph("追来源去向")
        break;
        case "添加标签":
        send_newGraph("添加标签")
        break;
        case "创建分组":
        send_newGraph("创建分组")
        break;
        case "断点接续":
        send_newGraph("断点接续")
        break;
        case "列出明细":
        send_newGraph("列出明细")
        break;
        case "追踪单笔链路":
        send_newGraph("追踪单笔链路")
        break;
        case "添加调单":
        send_newGraph("添加调单")
        break;
        case "合并叶子节点":
        merge_child_link()
        break;
        case "展开叶子节点":
        cacel_merge_child_link()
        break;
        case "选中端点":
        select_Both_ends()
        break;
        case "选中端点和链接":
        select_Both_ends_links()
        break;
        case "选中链接":
        select_links()
        break;
        case "合并实体":
        merge_vertex()
        break;
        case "还原实体":
        cacel_merge_node();
        break;
        case "链接合并":
        merge_link_method()
        break;
        case "关系拓展":
        send_newGraph("关系拓展")
        break;
        case "隐藏未选项":
        setEntity2hide()
        break;
        case "隐藏选中项":
        setSelectEntity2hide()
        break;

        
        
        

    }
}

/*  发送到新图
    eventName  1 发送到新图
               2 资金追踪
               3 添加标签
               4 创建分组  
*/
function send_newGraph (eventName){
    let obj = {
        event_name:eventName,
        model:model,
        entity_type:entity_type,
        nodeArray:graph_tool.getcurrentNodes(),
        linkArray:graph_tool.getcurrentEdges(),
        layout:layout,
        graph_id:graph_id
    }
    if(webgl_select_nodes.length > 0){
      var nodelist = [];
      var linklist = [];
        webgl_select_nodes.forEach(e=>{
          nodeArray.map(o=>{
            if(o.key == e){
              nodelist.push(o)

            }
          })
          linkArray.map(l=>{
            if((l.from == e && webgl_select_nodes.indexOf(l.to)) || (l.to == e && webgl_select_nodes.indexOf(l.from)) ){
              linklist.push(l)
            }
          })
        })
        // selectedLinks.forEach(e=>{
        //   linklist.push(e)
        // })
      
      obj.nodeArray = nodelist;
      obj.linkArray = linklist;
      console.log(obj)
    }
    if(eventName == "断点接续"){
        obj.from_link = get_eids()
    }
    postmessageToParent(obj)
}
//===============================================================================
/*  删除实体标签
        index 标签索引
        
*/
function delete_lable(index){
  var name = "label"+index+"_text";
  
  let obj = {
    currnode:graph_tool.getcurrentNode(),
    label:graph_tool.getcurrentNode().tags[index-1],
    event_name:"删除实体标签",
    index:index,
    graph_id:graph_id
  }
  
  postmessageToParent(obj)
}


window.oncontextmenu = function(e) {

              // if(selectedNodes.size > 0){
              if(webgl_select_nodes.length > 0){
                //webgl
                arr = ["发至新图"];
                e.preventDefault();
                var r_menu = document.getElementById("menu");
              }else{
                
                 //canvas2d
                  let o  = graph_tool.getcurrentNodes()[0];
                  e.preventDefault();
                  var r_menu = document.getElementById("menu");
                  // console.log(o)
                  var html = "";
                  var arr = setRightMenu_data(o) 
              }
              // 如果是反洗钱
              if(graph_mode == "fxq"){
                    if(arr.indexOf("添加调单") != -1){
                      arr.splice(arr.indexOf("添加调单"),1)
                    }
                    var is_account = false;
                    var nodes = graph_tool.getcurrentNodes();
                    nodes.map(e=>{
                      if(e.type == "account" && e.isExpand !== 3){
                        is_account = true
                      }
                    })
                    if(is_account && arr.indexOf("添加调单") == -1){
                      arr.push("添加调单")
                    }
              }
              set_R_menu(arr)
              r_menu.style.display = "block"
              var x,y;
              if(e.clientY > 480){
                y = 480
              }else{
                y = e.clientY
              }
              if(e.clientX > 1600){
                 x = 1600
              }else{
                 x = e.clientX
              }
              menu.style.left= x  +'px' ;
              menu.style.top = y  +'px';
              menu_x =  x;
              menu_y =  y;





}


window.onclick=function(e){
    e.stopPropagation()
    send_newGraph("视图被点击了")
    var r_menu = document.getElementById("menu");
     r_menu.style.display = "none"
    var r_menu_ = document.getElementById("menu_");
     r_menu_.style.display = "none"

     if(graph_tool.getcurrentNodes().length > 0){
      return
     }

     
     myDiagram.model.nodeDataArray.map(e=>{
        myDiagram.model.setDataProperty(e,"fill",e.default_fill)
        myDiagram.model.setDataProperty(e,"stroke",e.default_stroke)
        
    })
     myDiagram.model.linkDataArray.map(e=>{
        myDiagram.model.setDataProperty(e,"fill",e.default_fill)
        myDiagram.model.setDataProperty(e,"stroke",e.default_stroke)
     })
}


/*
==================================================================
搜索實體 ~
*/

function search_entity(text){
    var node_; //最后一个选中
     myDiagram.nodes.each(function(node){
         if(node.data.text.indexOf(text) !== -1){
              node_ = node;
             node.isSelected = true;
        }
    })
       // myDiagram.scale =  2.0
          myDiagram.commandHandler.scrollToPart(node_);
     
}




/*
=====================================================================
    获取当前选中节点的来源边
*/
function get_eids(){
    console.log(graph_tool.getcurrentNodes())
    if(graph_tool.getcurrentNodes().length > 0){
        var from_link = []
        var node = graph_tool.getcurrentNodes()[0]
        
        myDiagram.model.linkDataArray.map(e=>{
            if(e.to == node.key){
                from_link.push(e)
            }
        })
        return from_link
    }
}


//======================================================================
function setView(){
      var wWidth = document.documentElement.clientWidth;
      // console.log(wWidth)
      if(wWidth > 1380){
        $(".Lcss").css("margin-left","14%")

      }
      if(wWidth > 1600 ){
        $(".Lcss").css("margin-left","20%")
      }
}
    setView()
    $(".zoom_s").click(function(){
      if(rendering_type == 2){
         webgl_decreaseZoom();
         return
      }
      graph_tool.decreaseZoom()
    })
    $(".zoom_f").click(function(){
      if(rendering_type == 2){
         webgl_increaseZoom();
         return
      }
      graph_tool.increaseZoom()
    })
function sets_sale_num(num){
      // console.log(sum)
      $('.slide_box').css('left', parseInt(num *100) / 400 * 130);
      $('.scale_num').html(parseInt(num *100 ) + '%');
}