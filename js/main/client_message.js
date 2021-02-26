


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


/*
@events客户端通信方式接收
@param guid图事件交互Id
@param events 图事件参数说明

@autor xgl
@time 2020-12-04		
*/
var Client_guid;

///////////////////////////////////////test/////////////////////////////////////
// Client_triggerGraphEvents(123,{type:1},{nodeArray:[],linkArray:[]})
function Client_triggerGraphEvents(obj){
	Client_guid = obj.guid;
	var events = obj.events;
	var data = obj.data;
	console.log("===============================client_events")
	console.log(obj)
	// console.log(events)
	var type = events.type;
	
	if(type == 1) {  // 新增图
		source_client_type = 1;
		isGraph_events = obj.isGraph_events;
		data.nodeArray.forEach(e=>{
			e.d_stroke = e.stroke;
			e.default_stroke = e.stroke;
		})
		graph_methods.initGraphData(data);
		callBackToClient(obj)
        // return;


	}else if(type == 2) { //追加图
		data.nodeArray.forEach(e=>{
			e.d_stroke = e.stroke;
			e.default_stroke = e.stroke;
		})
		graph_tool.setNodeCanLayout(false);
		graph_methods.addGraphData(data);
		// return;


	}else if(type == 3) {  // 获取图数据
		var obj = graph_methods.getGraphAssets(events.id);
		if(obj && events.id == 1){
			makeBlob_toParent();
		}
		if(obj && events.id == 2){
			var obj_ = {};
			obj_.g_pic = obj.vertexs;
			obj_.selectedLinkDataArray = obj.edges;
			callBackToClient(obj_)
		}
		return;


	}else if(type == 4) {  //修改图数据

		graph_methods.editGraphData(data)


	}else if(type == 5) { //图交互
		switch(events.id){
	        case "1":   //切换布局
	        	// graph_tool.setNodeCanLayout(true);
	            layout = data.layout;
          		$(".loading").show();
	          	$(".loading_box").show();
	          	// setTimeout(function(){updateCurrLayout(data.layout)},0);
	          	setTimeout(function(){setLayout(data.layout)},0);
	        break;
	        case "2":  //撤销
	         	graph_tool.undo();
	        break;
	        case "3":  //反撤销
	         	graph_tool.redo();
	        break;
	        case "4":  //全选
	         	graph_tool.selectAll();
	        break;
	        case "5":  //反选
	         	graph_tool.reverseSelected();
	        break;
	        case "6":  //锁定
	        	graph_methods.lockingNode();
	        break;
	        case "7":  //取消锁定
	        	graph_methods.unlockingNode();
	        break;
	        case "8":  //拖动模式
	        	webgl_graph_state = "tz";
           		change_selectordrag(false);
	        break;
	        case "9":  //选中模式
	        	webgl_graph_state = "xz";
                change_selectordrag(true);
	        break;
	        
	        case "10":  //隐藏所选
	        	setSelectEntity2hide();
	        break;
	        case "11":  //隐藏未选
	        	setEntity2hide();
	        break;
	        case "12":  //被隐藏全部显示
	        	show_allEntity();
	        break;
	        case "13":  //1:1
	        	myDiagram.commandHandler.resetZoom();
	        break;
	        case "14":  //自适应大小
	        	if(rendering_type == 2){
		            webgl_zoomToFit()
		            return;
		        }
		        myDiagram.commandHandler.zoomToFit();
	        break;
	        case "15":  //最大化所选
	        	  if(rendering_type == 2){
		            webgl_scrollToPart()
		          }
		          myDiagram.scale =  2.0

		          myDiagram.commandHandler.scrollToPart(graph_tool.getcurrentNode());
	        break;
	        case "16":  //选中对端
	        	select_Both_ends();
	        break;
	        case "17":  //选中边
	        	 select_links();
	        break;
	        case "18":  //选中端点和边
	        	  select_Both_ends_links();
	        break;
	        case "19":  //合并实体
	        	  merge_vertex();
	        break;
	        case "20":  //拆分实体
	        	  cacel_merge_node();
	        break;
	        case "21":  //收缩叶子节点
	        	  // shrink_child_node();
	        	  node_expandorcollapse("collapseTree")
	        break;
	        case "22":  //扩展叶子节点
	        	  node_expandorcollapse("expandTree");
	        break;
	        case "23":  //高亮
	        	  setNodeHighlighted(true);
	        break;
	        case "24":  //取消高亮
	        	  setNodeHighlighted(false);
	        break;
	        case "25":  //过滤
	        	  // setNodeHighlighted(false);
	        	  graph_methods.filterGraphElements(data) // type  key value
	        break;
	        case "26":

	        	search_entity(data.text);
	        break;

     	}	


	}


}




/*
@events客户端通信方式接收callbak
@param guid图事件交互Id
@param events 图事件参数说明

@autor xgl
@time 2020-12-04		
*/



/*
@events客户端通信方式接收callbak
@autor xgl
@time 2020-12-04	
// events	
*/

function callBackToClient(obj){
	obj.guid = Client_guid;
	if(source_client_type){
		cef.callback(obj)
	}
}