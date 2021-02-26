

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
  type 3
  order 7
  图链接合并
  单一合并
  双向合并


*/


const deepClone = function(obj) {
  // 先检测是不是数组和Object
  // let isArr = Object.prototype.toString.call(obj) === '[object Array]';
  let isArr = Array.isArray(obj);
  let isJson = Object.prototype.toString.call(obj) === '[object Object]';
  if (isArr) {
    // 克隆数组
    let newObj = [];
    for (let i = 0; i < obj.length; i++) {
      newObj[i] = deepClone(obj[i]);
    }
    return newObj;
  } else if (isJson) {
    // 克隆Object
    let newObj = {};
    for (let i in obj) {
      newObj[i] = deepClone(obj[i]);
    }
    return newObj;
  }
  // 不是引用类型直接返回
  return obj;
};

Object.prototype.deepClone = function() {
  return deepClone(this);
};
Object.defineProperty(Object.prototype, 'deepClone', {enumerable: false});



function  merge_link_method(obj){
	var mergeLinks = [];// 合并链接后的集合;
	var links = myDiagram.model.linkDataArray.deepClone();
	console.log(nodeArray)

/*
	链接合并
	俩种合并方式 单一合并 双向合并

*/
		links.map(e=>{
			if(e.type == obj.data.filed.type){
				mergeLinks.push(e)
			}
		})
				

		let newData = {}
			    mergeLinks.forEach(e => {
			      //新建属性名
			      if(obj.data.methods == 1){
			    	  if (Object.keys(newData).indexOf(e.from + "_" +e.to) === -1 && Object.keys(newData).indexOf( e.to  + "_" + e.from) === -1) {
				        newData[e.from + "_" + e.to] = []
				      }
				      if(Object.keys(newData).indexOf(e.from + "_" + e.to) !== -1){

				      		newData[e.from + "_" + e.to].push(e)
				      }else{
				      	 	newData[ e.to  + "_" + e.from].push(e)
				      }
				      
			    }
			    if(obj.data.methods == 2){
			    	if (Object.keys(newData).indexOf(e.from + "_" +e.to) === -1 ) {
				        newData[e.from + "_" + e.to] = []
				      }
				      if(Object.keys(newData).indexOf(e.from + "_" + e.to) !== -1){

				      		newData[e.from + "_" + e.to].push(e)
				      }
			    }
			      //对应插入属性值
			      
			    })

    for(let i in newData){
		let num_total__ = 0;
			if(obj.data.filed.property){
				newData[i].map(e=>{
					e.numeric.map(vl=>{
						if(vl.name == obj.data.filed.property.type){
							num_total__ = num_total__ + vl.value;
						}
					})
				})
			}
                 	let o = {
                 		"from":newData[i][0].from,
                 		"to":newData[i][0].to,
                 		// 方向
                 		"text":newData[i][0].type_text + "("+newData[i].length+"次)" + (num_total__ > 0 ? num_total__ :""),
                 		"list":newData[i],
                 		"merge_type":1,
						"type":newData[i][0].type,
                 		"fill":newData[i][0].d_fill,
                 		"d_fill":newData[i][0].d_fill,
                 		"stroke":newData[i][0].d_stroke,
                 		"d_stroke":newData[i][0].d_stroke

                 	}
                 	newData[i].map(e=>{
                 		linkArray.map((o,i)=>{
                 			if(o.from == e.from && o.to == e.to ){
                 				linkArray.splice(i,1)
                 			}
                 		})
                 	})
                 	linkArray.push(o)
                }
                // console.log(linkArray)
                // myDiagram.model.nodeDataArray = nodeArray; 
                 myDiagram.model.linkDataArray = linkArray; 
                 setLayout(layout)
                 
				return
			   
				/*

					@合并连接展示样式问题;
					@key  节点key
					@type 节点类型
					@num  连接次数
					@f_num  统计数值和;
				*/
				
}

/*
	取消链接合并
	message_
	type 3
	order 8

*/
function  cancel_mergeLink(obj){
	/* 类型判断*/
	myDiagram.model.linkDataArray.map(e=>{
	       
		if(e.list){
		     if(obj.fileds.indexOf(e.type) !== -1 ){
			e.list.map(o=>{
				linkArray.push(o)
			})
		     }
		}

	})
	linkArray = linkArray.filter(function(item) {
	//obj.fileds.indexOf(item.type) !== -1 &&
	    if(item.merge_type == 1){
	   	if(obj.fileds.indexOf(item.type) == -1){
		   return item
		}
                    }
	    if(item.merge_type != 1){
	   	return item
                    }
 	});
	setLayout(layout)

}

/*
收缩叶子节点
*/
function merge_child_link(){
				var mergeLinks = [];// 合并链接后的集合;
				var links = myDiagram.model.linkDataArray.deepClone();
				var currnode = graph_tool.getcurrentNodes();
				links.map(e=>{
					if(e.from == currnode[0].key || e.to == currnode[0].key){
						mergeLinks.push(e)
					}
				})
				
				let newData = {}
			    

			    mergeLinks.forEach(e => {
			      //新建属性名
			      	 if (Object.keys(newData).indexOf(e.from + "_" +e.type) === -1 ) {
				        newData[e.from + "_" + e.type] = []
				      }
				      	
				        newData[ e.from  + "_" + e.type].push(e)
				       
				
			      
			    })
			    // console.log(newData)

				

			    for(let i in newData){
			    	console.log(newData[i])
			    	if(newData[i].length > 0){ /// 判断是否有不同的子节点======================
			    		var status = false;
			    		newData[i].map(e=>{
			    			if(e.id !== newData[i][0].id){
			    				status = true;
			    			}
			    		})
			    		if(!status)  continue;
			    		let o = {
	                 		"from":newData[i][0].from,
	                 		"to":newData[i][0].to,
	                 		"fill":newData[i][0].fill,
	                 		"stroke":newData[i][0].stroke,
	                 		"d_stroke":newData[i][0].d_stroke,
	                 		// "d_fill":newData[i][0].d_fill,
	                 		// 方向
	                 		"text":newData[i][0].type_text ? newData[i][0].type_text : newData[i][0].text +"("+newData[i].length+"次)",
	                 		"_list":newData[i],
	                 		"merge_type":2    //收缩子节点

	                 	}
	                 	let arr = [];
	                 	let key = "";
	                 	let text = "";
	                 	newData[i].map(e=>{
                 			linkArray.map((o,i)=>{
		                 		if(o.from == e.from && o.to == e.to ){
		                 				linkArray.splice(i,1)
		                 		}
	                 		})

                 			myDiagram.model.nodeDataArray.map(l=>{
                 				if(l.key == e.to){
                 					key = key == "" ?  l.key  : key + "_" +l.key;
                 					let status = true;
                 					arr.forEach(item=>{
									    if(item.id==l.id){
									        status = false;
									    }
									})
									if(status){
										arr.push(l);
									}
                 					// text = 
                 				}
                 			})

	                 	})
	                 	if(arr.length > 1){
	                 		// return
	                 		let obj = {
	                 			"key":key,
								"is_group":"1",
								"_list":arr,
								"stroke":arr[0].d_stroke,
								"fill":arr[0].d_fill,
								"d_stroke":arr[0].d_stroke,
								"d_fill":arr[0].d_fill,
								"default_stroke":arr[0].default_stroke,
								"default_fill":arr[0].default_fill,
								// "geo":"IP",
								"text":text,
								"text_color":"#333333",
								"width":60,
								"height":60,
								"merge_type":2

	                 		}
	                 		obj.text = "合并(" + arr.length+")" + arr[0].text + "等"
	                 		o.to = key;
	                 		arr.map((e,i)=>{
	                 			key = key == "" ?  e.key  : key + "_" +e.key;
	                 			text  = "合并实体";
	                 			nodeArray.map((d,index)=>{
	                 				if(d.key == e.key){
	                 					nodeArray.splice(index,1)
	                 				}
	                 			})

	                 		})
	                 		nodeArray.push(obj)

	                 	}
	                 		linkArray.push(o)
			    		
			    	}
			    }
			// setLayout(layout)

}


/**
函数名称 取消叶子合并
*/
function cacel_merge_child_link(){
	myDiagram.model.linkDataArray.map(e=>{
		if(e._list){

			e._list.map(o=>{
				linkArray.push(o)
			})
			linkArray.map((n,i)=>{
				if(n.from == e.from && n.to == e.to && n.merge_type == 2){
					linkArray.splice(i,1)
				}
			})
		}

	})
	myDiagram.model.nodeDataArray.map(e=>{
		if(e._list){
			e._list.map(o=>{
				nodeArray.push(o)
			})
			nodeArray.map((n,i)=>{
				if(n.key==e.key && n.merge_type == 2){
					nodeArray.splice(i,1)
				}
			})
		}
	})
	console.log(nodeArray)
	myDiagram.model.nodeDataArray = nodeArray;
	myDiagram.model.linkDataArray = linkArray;
	setLayout(layout)

}
/*
@作者xieguoliang
@更新时间 2020/7/21
@函数名称 获取图上所有的边类型
@返回值 返回所有的边类型 Array
*/
function get_graph_links_type(){
	var data = [];
	var arr = [];
	myDiagram.model.linkDataArray.map(e=>{
		let obj = {
			type:e.type,
			type_key:e.type_key,
			type_text:e.type_text
			// properties:e.properties
		}
		data.push(JSON.stringify(obj))
	})
	Array.from(new Set(data)).map(e=>{
		arr.push(JSON.parse(e))
	})
	return arr;
}




/*
@作者xieguoliang
@更新时间 2020/7/21
@函数名称 获取图上已经合并的边类型
@返回值 返回已经合并的边类型 Array
*/
function get_graph_mergeLink_type(){
	// if(layout !== "ForceDirectedLayout")  return
	var data = [];
	var arr = [];
	myDiagram.model.linkDataArray.map(e=>{
		if(e.list && e.list.length > 0 ){
			let obj = {
				type:e.list[0].type,
				type_key:e.list[0].type_key,
				type_text:e.list[0].type_text
			}
			data.push(JSON.stringify(obj))
		}
	})
	Array.from(new Set(data)).map(e=>{
		arr.push(JSON.parse(e))
	})
	return arr;
	
}


/*
@作者 xieguoliang
@更新时间 20020/7/21
@函数名称 合并图节点
@返回值 新nodearray linkarray
*/
function merge_vertex(){
	if(layout !== "ForceDirectedLayout")  return
	// 要合并的节点obj
	var obj = graph_tool.getcurrentNodes();
	let text = "合并("+obj.length+")" + obj[0].text + "等";
	// let text = "11111111111111111111111111111111111111111111"
	let key = "";
	let keys = [];
	obj.map(e=>{
		keys.push(e.key)
		key = key == "" ?  e.key  : key + "_" +e.key;
		myDiagram.model.removeNodeData(e)
		// keys.push(e.key)
	})
	// console.log(obj[0])
	var node_ = {
			"key":key,
			"is_group":"1",
			"list":obj,
			"stroke":obj[0].d_stroke,
			"fill":obj[0].d_fill,
			"d_stroke":obj[0].d_stroke,
			"d_fill":obj[0].d_fill,
			"default_stroke":obj[0].default_stroke,
			"default_fill":obj[0].default_fill,
			"icon":obj[0].icon,
			"text":text,
			"fontSize":"#333333",
			"fontSize":"#333333",
			// "vertex_type":"取现",
			"width":60,
			"height":60,
	}

	myDiagram.model.addNodeData(node_);
	// console.log(myDiagram.model.nodeDataArray)
	var links = [];
	for(let i = 0;i<myDiagram.model.linkDataArray.length; i++){
		let e = myDiagram.model.linkDataArray[i];
		if(keys.indexOf(e.from) !== -1 || keys.indexOf(e.to) !== -1){
			
			
			// continue;
		}
		if(keys.indexOf(e.from) !== -1){
			
			let o = {
				"from":node_.key,
				"to":e.to,
				"c_from":e.from,
				"text":e.text,
				"stroke":e.stroke,
				"fill":e.fill,
				"d_stroke":e.d_stroke,
				// "d_fill":e.d_fill,
				"id":e.id
			}
			links.push(o)
			myDiagram.links.each(link=>{
				if(link.data.from == e.from && link.data.to == e.to){
					link.visible = false;
				}
			})
			
		}
		if(keys.indexOf(e.to) !== -1){
			
			let o = {
				"from":e.from,
				"to":node_.key,
				"c_to":e.to,
				"text":e.text,
				"stroke":e.stroke,
				"fill":e.fill,
				"d_stroke":e.d_stroke,
				// "d_fill":e.d_fill,
				"id":e.id
			}
			links.push(o)
			myDiagram.links.each(link=>{
				if(link.data.from == e.from && link.data.to == e.to){
					link.visible = false;
				}
			})
		}

	}
	// console.log(links)
	links.map(e=>{
		let status = true;
        myDiagram.model.linkDataArray.map(item=>{
			if(item.id == e.id){
				status = false;
			}
		})
		// if(status == true){

			myDiagram.model.addLinkData(e)
		// }
		// }	

	})
	myDiagram.model.nodeDataArray = nodeArray;
	myDiagram.model.linkDataArray = linkArray;
	// setLayout(layout)
	
}


/*
@函数名称 取消合并实体
*/
function cacel_merge_node(){
	myDiagram.model.nodeDataArray.map(e=>{
		if(e.is_group == 1){
			var links = [];
			e.list.map(o=>{
				myDiagram.model.addNodeData(o)
			})
			myDiagram.model.removeNodeData(e)
			myDiagram.model.linkDataArray.map(n=>{
				if(n.from == e.key || n.to == e.key){
					// myDiagram.model.removeLinkData(n)
					links.push(n)
				}
			})
			

			links.map(e=>{
				// console.log(e)
				if(e.c_from){
					myDiagram.links.each(link=>{
						if(link.data.from == e.c_from && link.data.to == e.to){
							link.visible = true;
						}
					})
				}
				if(e.c_to){
					myDiagram.links.each(link=>{
						if(link.data.from == e.from && link.data.to == e.c_to){
							link.visible = true;
						}
					})
				}
		  		myDiagram.model.linkDataArray.map(o=>{
		  			if(e.from == o.from && e.to == o.to){
		  				myDiagram.model.removeLinkData(o)
		  			}
		  		})
		  	})
			
		}
	})
	//nodeArray = myDiagram.model.nodeDataArray;
	//linkArray = myDiagram.model.linkDataArray;
// change_graph(layout)
	// setLayout(layout)
}




/*
@作者: xieguoliang 
@更新时间 2020/7/20
@函数名称:选中端点
@ 无返回值
*/
function select_Both_ends(){
	var links = graph_tool.getcurrentEdges()
	links.map(e=>{
		myDiagram.nodes.each(function(node) {
	            if(node.data.key == e.from || node.data.key == e.to){
	            	node.isSelected = true
	            }
	    }) 
	})
	ChangedSelection_fuc() 
}




/*
@作者: xieguoliang 
@更新时间 2020/7/20
@函数名称:选中端点及链接
@ 无返回值
*/
function select_Both_ends_links(){
	var links = graph_tool.getcurrentEdges();
	var nodes = graph_tool.getcurrentNodes();
	var l_node = [];
	links.map(e=>{
		myDiagram.nodes.each(function(node) {
	            if(node.data.key == e.from || node.data.key == e.to){
	            	node.isSelected = true
	            	
	            }
	    })
	    myDiagram.links.each(function(link){
	    		if(link.data.from == e.from && link.data.to == e.to){
	    			link.isSelected = true
	    			
	    		}
	    }) 
	}) 
	nodes.map(e=>{
		myDiagram.nodes.each(function(node) {
	            if(node.data.key == e.key){
	            	node.isSelected = true
	            }
	    })
	    myDiagram.links.each(function(link){
	    		if(link.data.from == e.key || link.data.to == e.key){
	    			link.isSelected = true
	    			l_node.push(link.data.from)
	    			l_node.push(link.data.to)
	    		}
	    }) 
	})
	
	l_node.map(e=>{
		myDiagram.nodes.each(function(node) {
	            if(node.data.key == e){
	            	node.isSelected = true
	            }
	    })
	})
	ChangedSelection_fuc()  
}


/*
@作者: xieguoliang 
@更新时间 2020/7/20
@函数名称:选中链接
@无返回值
*/
function select_links(){
	var nodes = graph_tool.getcurrentNodes()
	nodes.map(e=>{
		myDiagram.links.each(function(link) {
	            if(link.data.from == e.key || link.data.to == e.key){
	            	link.isSelected = true
	            }
	    })
	})
	ChangedSelection_fuc() 
}




/*==========================================================================
@作者 xieguoliang
@更新时间 2020/7/20
@函数名称 切换选中模式 和 拖动模式
@参数  state 状态
@无返回值
*/


function change_selectordrag(state) {
	myDiagram.allowSelect =  state
}



/*============================================================================
@作者 xieguoliang
@更新时间 2020/7/20
@函数名称 隐藏未选中节点和边
@无返回值
*/
function  setEntity2hide(){
	var nodes = graph_tool.getcurrentNodes();
	myDiagram.nodes.each(function(node) {
	        myDiagram.model.setDataProperty(node.data,"visible",false)
	})
	nodes.map(e=>{
	    myDiagram.nodes.each(function(node) {
	            if(node.data.key == e.key){
	            	myDiagram.model.setDataProperty(node.data,"visible",true)
	            }
	    })
	})
}



/*
@作者 xieguoliang
@更新时间 2020/7/20
@函数名称 隐藏选中节点和边
@无返回值
*/
function setSelectEntity2hide(){
	var nodes = graph_tool.getcurrentNodes();
var links = graph_tool.getcurrentEdges();
        nodes.map(o=>{
            myDiagram.model.setDataProperty(o,"visible",false)
        })
        links.map(o=>{
            hide_link_list.push(o)
        })
       myDiagram.model.linkDataArray.map(e=>{
          links.map(o=>{
         	if(e.id == o.id){
		myDiagram.model.removeLinkData(o)
	} 
          
         })
      })
}



function show_allEntity(){
			myDiagram.model.nodeDataArray.map(o=>{
                myDiagram.model.setDataProperty(o,"visible",true)
           })
           myDiagram.model.linkDataArray.map(o=>{
                myDiagram.model.setDataProperty(o,"visible",true)
           })	
        hide_link_list.map(e=>{
       	myDiagram.model.addLinkData(e);
       })
      hide_link_list  = [];
}

/*===================
@作者xieguoliang
@更新时间 2020/7/20
@函数名称  处理出节点表格
@维度  type  类型
	   id    标识
	   text   文本(标签)
	   link_out  出度
	   link_in   入度
	   link_total  总计
@返回值各维度统计值返回  array
*/
function get_node_rows(){
	var rows = [];
	myDiagram.nodes.each(function(e){
		let obj = {
			type:"",
			id:"",
			text:"",
			link_out:"",
			link_in:"",
			link_total:"",
			link_num_total:""
			// link_num_net:""
		}
		let data = e.data;
		let out_num = 0;  //出度
		let in_num = 0;  //入度
		let total_num = 0;  //总计
		let link_num_total = 0;  //值综合统计
		// let link_num_net = 0;   //值的净值
		obj.type = data.type_text;
		obj.id = data.id;
		obj.text = data.text;
		myDiagram.links.each(function(o){
			let n = o.data
			if(n.from == e.key){
				out_num++;
				total_num++;
			}
			if(n.to == e.key){
				in_num++;
				total_num++;
			}
			o.numeric && o.numeric.map(v=>{
				link_num_total = link_num_total + v.value;
			})
		})
			obj.link_out = out_num;
			obj.link_in = in_num;
			obj.link_total = total_num;
		rows.push(obj)

	})
	return rows;
}



/*
@作者xieguoliang
@更新时间 2020/7/20
@函数名称  处理出边表格
@维度  type  类型
	   text   文本(标签)
	   from_text  来源标签
	   to_text   目标标签
	   link_num  链接统计
	   total_num 数值统计
*/
function get_link_rows(){
	
	var rows = [];
	myDiagram.links.each(function(e){
		let obj = {
			type:"",
			text:"",
			from_text:"",
			to_text:"",
			link_num:"",
			total_num:""
		}
		let data = e.data;
		let link_num = -1;  //连接数
		let total_num = 0;  //随机数值统计
		obj.type = data.type_text;
		obj.text = data.text;
		obj.from_text = graph_tool.findNodeForKey(data.from).data.text;
		obj.to_text = graph_tool.findNodeForKey(data.to).data.text
		myDiagram.links.each(function(o){
			let n = o.data;
			if(n.type == data.type){
				link_num ++;
				// if(n.numeric.length > 0 ) total_num = total_num + n.numeric[0].value;  /// 有坑============================== 有可能不同维度数值
			}
			
		})
		obj.total_num = total_num;
		obj.link_num = link_num;
		rows.push(obj)

	})
	return rows;
}





/*
@作者 xieguoliang
@更新时间 2020/7/20
@函数名称 统计链接类型 , 发生次数维度
		types 类型
		counts 发生次数

*/
function get_link_Dimension_count (){
	var types = [];
	var counts = [];
	myDiagram.links.each(e=>{
		let n = e.data;
		types.push(n.type_text);
	})

	types = get_array_ele_count(types);
	for(let i = 0 ; i < types.length; i ++){
		counts.push(types[i].value)
	}
	counts = get_array_ele_count(counts);

	let obj = {
		"types":types,
		"counts":counts
	}
	return obj
}



/*
@作者 xieguoliang
@更新时间 2020/7/21
@参数统计实体维度
	types : get_array_ele_count(types)  类型
	texts : get_array_ele_count(texts)  标签
	link_total : get_array_ele_count(link_total)  一度连接总数
	link_out : get_array_ele_count(link_out)     一度出向链接
	link_in : get_array_ele_count(link_in)       一度进向链接
	link_num_total : get_array_ele_count(link_num_total)  一度数值总数
	link_num_out : get_array_ele_count(link_num_out)   一度出向数值统计
	ink_num_in : get_array_ele_count(link_num_in)     一度进向数值统计
@返回值需要统计的维度  obj 

*/
function get_node_Dimension_count(){
	let types = [];
	let texts = [];
	let link_total = [];
	let link_out = [];
	let link_in = [];
	let link_num_total = [];
	let link_num_out = [];
	let link_num_in = [];
	myDiagram.nodes.map(function(e){
		types.push(e.data.type_text);
		texts.push(e.data.text);
		let data = e.data;
		let link_out_ = 0;  //出度
		let link_in_ = 0;  //入度
		let link_total_ = 0;  //总计
		let link_num_out_ = 0;
		let link_num_in_ = 0;
		let link_num_total_ = 0;
		myDiagram.links.each(function(o){
			let n = o.data
			if(n.from == e.key){
				link_out_++;
				link_total_++;
				// link_num_out_ = n.numeric.length > 0 ?link_num_out_ + n.numeric[0].value : link_num_out_;
				// link_num_total_ =  n.numeric.length > 0 ? link_num_total_ + n.numeric[0].value : link_num_total_;
				link_num_out_ = 0;
				link_num_total_ = 0;
			}
			if(n.to == e.key){
				link_in_++;
				link_total_++;
				// link_num_in_ =  n.numeric.length > 0 ? link_num_in_ + n.numeric[0].value : link_num_in_;
				// link_num_total_ = n.numeric.length > 0 ? link_num_total_ + n.numeric[0].value : link_num_total_;
				link_num_in_ = 0;
				link_num_total_ = 0;
			}
		})
		link_total.push(link_total_);
		link_out.push(link_out_);
		link_in.push(link_in_);
		link_num_out.push(link_num_out_);
		link_num_in.push(link_num_in_);
		link_num_total.push(link_num_total_);
	})
	

	let obj = {
		types : get_array_ele_count(types),
		texts : get_array_ele_count(texts),
		link_total : get_array_ele_count(link_total),
		link_out : get_array_ele_count(link_out),
		link_in : get_array_ele_count(link_in),
		link_num_total : get_array_ele_count(link_num_total),
		link_num_out : get_array_ele_count(link_num_out),
		link_num_in : get_array_ele_count(link_num_in)
	}
	return obj


}



/*
@工具类
@作者xieguoliang
@更新时间 2020/7/21
@函数名称 获取数组各元素出现的次数
@参数 arraylist 需要统计一维数组
@返回值 统计数组每个元素的个数  对象{}


*/
function get_array_ele_count(arrayList){
	var arr = []
	var obj  = arrayList.reduce(function (obj, name) {
		 obj[name] = obj[name] ? ++obj[name] : 1;
		 return obj;
	}, {});
	for(let i in obj){
		let o  = {
			"name":i,
			"value":obj[i]
		}
		arr.push(o)
	}
	return arr;
}



/*
@图方法
@作者xieguoliang
@更新时间2020/7/21
@函数名称 节点叶子节点展开或折叠
@返回值 无

*/
function node_expandorcollapse(state){
	var n= graph_tool.getcurrentNode();
	var node;
	myDiagram.nodes.each(function(e){
		if(e.data.key == n.key){
			node = e;
		}
	})
	if (node.isTreeExpanded && state == "collapseTree") {
		           
		myDiagram.commandHandler.collapseTree(node);
	} 
	if(state == "expandTree") {
		myDiagram.commandHandler.expandTree(node);
	}
}
/*
@图方法
@作者xieguoliang
@更新时间2020/7/21
@函数名称 节点是否高亮
@返回值 无

*/
function setNodeHighlighted(state){
	var n= graph_tool.getcurrentNode();
	myDiagram.nodes.each(function(e){
		if(e.data.key == n.key){
			e.part.isHighlighted  = state
		}
	})
	
}



/*
@数据处理
@作者xieguoliang
@更新时间 2020/7/21
@函数名称 处理图数据为时间事件图格式
@返回值 nodes links ydata  | object
*/
function set_datatoTiming_layout(){
	var timing_nodes = [];
	var timing_links = [];
	var timings = [];
	// myDiagram.model.linkDataArray.map(e=>{
	linkArray.map(e=>{
		if(e.time > 0){
			let from_key = {
				"name":e.from + e.time,
				"value":[
					e.time,e.from+e.time
				],
				"text":e.from
			}
			let to_key = {
				"name":e.to + e.time,
				"value":[
					e.time,e.to+e.time
				],
				"text":e.to
			}
			let link = {
				"source":e.from + e.time,
				"target":e.to + e.time,
				"text":e.time
			}
			timing_nodes.push(from_key);
			timing_nodes.push(to_key);
			timing_links.push(link)
			timings.push(e.time)
		}
	})
	var yData = [];
	timing_nodes.map(e=>{
		yData.push(e.name)
	})
	yData = Array.from(new Set(yData));
	let obj = {
		nodes:timing_nodes,
		links:timing_links,
		yData:yData,
		timings:timings
	}
	console.log(obj)
	return obj
}



/*
@作者xieguoliang
@更新时间
@函数名称 force布局动态效果

*/

function start_layout_animation(){
		// console.log(myDiagram.layout.infinityDistance)
        let stance = 10;
       // if(animation_time_out !== null) return;
        animation_time_out =  setInterval(function(){
		         myDiagram.startTransaction("changed Layout");
		         myDiagram.layout.defaultElectricalCharge = stance;
		         myDiagram.commitTransaction("changed Layout");
				 if(stance > 500 ){
		         	stance = stance - 20
		         	return;
		         }
		         if(stance >= 10 && stance < 500){
		         	stance = stance + 20
		         }
		         // console.log(stance)
        },100)
}


function stop_layout_animation(){
	clearInterval(animation_time_out)
}


/*
	收缩子节点
*/
// function shrink_child_node(){
// 	var 
// }



/*
  多点共同关系

*/
function _commonRelationship(){
	var nodes = myDiagram.selection.toArray();
	
	var commonNodes = [];
	myDiagram.nodes.each(node=>{

		var count;
		node.findLinksConnected().each(n1=>{
			// if(nodes.has(n1) && )
			// nodes.each(sn=>{
			// 	if(n1.data.from == sn.data.key){
			// 		console.log(sn)
			// 	}
			// })
			 for (var i = 0; i < nodes.length; i++) {
		        var sn = nodes[i];
		        if(n1.data.from == sn.data.key || n1.data.to == sn.data.key){
					count = i;
				}
		        // var t = nodes.get(i + 1);
		        // f.findLinksTo(t).each(function(l) { l.isSelected = true; });
		      }
		})
		if(count == nodes.length - 1){
			node.isSelected = true;
			commonNodes.push(node);
		}
	})
	return commonNodes;

}


/*
  俩点全部路径

*/
// function _findAllPath(begin_,end_){
function _findAllPath(){
	 function collectAllPaths(begin, end) {
      var stack = new go.List(/*go.Node*/);
      var coll = new go.List(/*go.List*/);

      function find(source, end) {
        source.findNodesOutOf().each(function(n) {
          if (n === source) return;  
          if (n === end) {  // success
            var path = stack.copy();
            path.add(end);  
            coll.add(path);  
          } else if (!stack.has(n)) {  
            stack.add(n);  
            find(n, end);
            stack.removeAt(stack.count - 1);
          }  // else might be a cycle
        });
      }

      stack.add(begin);  
      find(begin, end);
      return coll;
    }
    var begin_ = myDiagram.selection.first();
    var end_ ;
    myDiagram.selection.each(n=>{
    	if(n.data.key !== begin_.data.key){
    		end_ = n;
    	}
    })
    var paths = collectAllPaths(begin_,end_);
    var path_ = [];        //全部边集合
    function highlightPath(path) {
      myDiagram.clearHighlighteds();
      for (var i = 0; i < path.count - 1; i++) {
        var f = path.get(i);
        var t = path.get(i + 1);
        f.findLinksTo(t).each(function(l) { l.isSelected = true; });
      }
    }
    paths.each(function(path) {
        var obj = {
        	"length":path.length,
        	"items":[]
        };
	    for (var i = 0; i < path.length; i++) {
	        obj.items.push(path.get(i).data)
	    }
        path_.push(obj);
        highlightPath(path)
     });

    // console.log(path_);
    return path_;
}


/*
  俩点最短路径

*/
function _findShortPath(begin,end){
	 function collectAllPaths(begin, end) {
      var stack = new go.List(/*go.Node*/);
      var coll = new go.List(/*go.List*/);

      function find(source, end) {
        source.findNodesOutOf().each(function(n) {
          if (n === source) return;  
          if (n === end) {  // success
            var path = stack.copy();
            path.add(end);  
            coll.add(path); 
          } else if (!stack.has(n)) {  
            stack.add(n);  
            find(n, end);
            stack.removeAt(stack.count - 1);
          }  
        });
      }

      stack.add(begin);  
      find(begin, end);
      return coll;
    }
    var begin_ = myDiagram.selection.first();
    var end_ ;
    myDiagram.selection.each(n=>{
    	if(n.data.key !== begin_.data.key){
    		end_ = n;
    	}
    })
    var paths = collectAllPaths(begin_,end_);
    var path_ = [];        //全部边集合
    function highlightPath(path) {
      myDiagram.clearHighlighteds();
      for (var i = 0; i < path.count - 1; i++) {
        var f = path.get(i);
        var t = path.get(i + 1);
        f.findLinksTo(t).each(function(l) { l.isSelected = true; });
      }
    }
    paths.each(function(path) {
        var obj = {
        	"length":path.length,
        	"nodes":[],
        	"path":path
        };
	    for (var i = 0; i < path.length; i++) {
	        obj.nodes.push(path.get(i).data)
	    }
        path_.push(obj);
    });
    if(path_.length == 0){
    	var message_ = {
    		data:0,
    		eventName:"_findShortPath"
    	}
    	return;
    }
    var min = path_[0].length;
    var shortPath = [];
    path_.map(p=>{
    	if(p.length < min){
    		min = p.length;
    	}
    })
    paths.each(function(path) {
        if(path.length == min){
        	highlightPath(path)
        	shortPath.push(path);
        }
        
    });
   return shortPath;



}