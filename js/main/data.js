 //过滤节点集合
var filterNodes = []; 
 //过滤连线集合
var filterLinks = [];  
 //实体集合
var entity_list = [];
 //节点集合
var nodeArray = [];
 //连线集合
var linkArray = [];
 //格式化节点集合
var original_nodes = [];
//格式化前边集合
var original_links = []; 



//webgl_相关集合


const selectedNodes = new Set();  //  选中节点集合
const selectedLinks = new Set();  //  选中边集合
const copyNodes = new Set();    //复制集合
// const copyNodes = new Set();
//选中节点起点
var startVertex;
//选中节点终点
var endVertex;
// 图ID
var graph_id;
var moneys = [1,1,1,1]  // 金额过滤集合
var entity_tags=[];    //实体类型过滤集合
var schema =0;     // 是否为过滤模式
//是否展示label
var labelisShow = 1;
//动画是否自动结束
var animation_time_out = null;
//当前颜色
var color_curr = "#ccc";

// 当前选中节点 
var curr_scrollPart =  false;

// work线程url
var workerUrl = "http://192.168.100.118/web_dev/relation_graph"
//webgl 选中节点集合
var webgl_select_nodes = []; //webgl选中节点集合
var webgl_select_links = []; //webgl选中节点集合


var renderer;   //webgl渲染renderer

//当前可视化布局
var layout = "sankey";
//渲染引擎方式
var rendering_type = 1; //1为canvas 2为webgl
var webgl_graph_state = "xz"; // 拖动选中模式切换


//  0为交易明细 1为交易汇总 2差额模式
var model = 1;
var entity_type = 1;   //1为账户 0为主体



var  pattern = "";  // 模式  反洗钱 "fxq"

var  graph_mode = "basic"    //图模式  basic基础版本  fxq版本  zstp知识图谱

var  downloadImgName = "";

var download_scale = 1;

var source_client_type = 0;
var isGraph_events = false;

// var canvas_locking = [];
//连线字体样式
// =================================================

// vertex_type
// var r_menu_list = new Map();


// 右键菜单 basic基础版本

var r_node_list = ["复制","粘贴","删除","选中","隐藏","关系拓展","发至新图","添加标签","合并叶子节点","合并实体","属性"];  //选中多个节点
// var r_node_list1 = ["复制","粘贴","删除","选中","隐藏","关系拓展","发至新图","添加标签","展开叶子节点","合并实体","属性"];  //叶子节点合并后的节点
// var r_node_list2 = ["复制","粘贴","删除","选中","隐藏","关系拓展","发至新图","添加标签","合并叶子节点","还原实体","属性"];  //合并实体之后的节点
// var r_node_list3 = ["发至新图"];  //多个节点
var r_link_list = ["删除","隐藏","选中","属性"];
// var r_link_list_money = ["删除","隐藏","选中","属性","追踪单笔链路"];
var r_blank_list = ["粘贴","全选","全部显示"];
var r_node_list_select = ["选中端点和链接","选中链接","全选","反选"];
var r_node_list_hide = ["隐藏选中项","隐藏未选项"]; 
var r_node_list_expand = ["快速1层","快速2层","快速3层","自定义"]; 
var r_link_list_hide = ["隐藏选中项"]; 
var r_link_list_select = ["选中端点和链接","选中端点"]; 

/*
  初始化右键参数
*/
function init_rightMenu_list(){
  if(graph_mode == "basic" || graph_mode == undefined ){
       // graph_mode
       r_node_list.splice(r_node_list.indexOf("关系拓展"),1)
       r_node_list.splice(r_node_list.indexOf("添加标签"),1)
       r_node_list.splice(r_node_list.indexOf("合并叶子节点"),1)
       r_node_list.splice(r_node_list.indexOf("属性"),1)
       r_link_list.splice(r_link_list.indexOf("属性"),1)
  }
}

// init_rightMenu_list();
var  hide_link_list  = [];







/*
*****字符串长度
*/
function strlen(str){
    var len = 0;
    for (var i=0; i<str.length; i++) {
     var c = str.charCodeAt(i);
    //单字节加1
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
       len++;
     }
     else {
      len+=2;
     }
    }
    return len;
}


/*
*处理字符串展示问题
*autor xgl
*/
function setText(str){
    if(strlen(str) > 10){
        return str.slice(0,8) + "..."
    }else{
        return str
    }
    //return n[0].text
}






function updateData(){
                let nodes = myDiagram.model.nodeDataArray.map(e=>{
                    return {
                        "key":e.key,
                        "id":e.id,
                        "text":e.text,
                        "type":e.type,
                        "type_key":e.type_key,
                        "type_text":e.type_text,
                        "tags":e.tags,
                        "icon":e.icon,
                        "size":e.size,
                        "color":e.color,
                        "width":e.width,
                        "height":e.height,
                        "fill":e.fill,
                        "stroke":e.stroke,
                        "category":e.category,
                        "is_hidden":e.is_hidden,
                        "isExpand":e.isExpand

                    }
               })
               let edges = myDiagram.model.linkDataArray.map(e=>{
                    return{
                      "from":e.from,
                      "to":e.to,
                      "text":e.text,
                      "id":e.id,
                      "numeric":e.numeric,
                      "time":e.time,
                      "type_key":e.type_key,
                      "type_text":e.type_text,  
                      "type":e.type,
                      "money":e.money,
                      "size":e.size,
                      "color":e.color,
                      "width":e.width,
                      "category":e.category,
                      "direction":e.direction,
                      "stroke":e.stroke,
                      "fill":e.fill,
                      "dir":e.dir



                    }
                })

               return {
                "nodeDataArray":nodes,
                "linkDataArray":edges
               }
}

