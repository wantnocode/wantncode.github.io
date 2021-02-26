
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
  graph_tool.disableAllDraw  禁止绘制  
  graph_tool.onMouseLeaveNode    鼠标离开节点
  graph_tool.setVisibleNodeCanLayout   隐藏节点参与布局
  graph_tool.graphtoJson    图数据转换为json数据格式
  graph_tool.goNodesCount   获取节点数量
  graph_tool.getEdgesCount  获取边数量
  graph_tool.nodesVisibleCount 获取隐藏节点数量
  graph_tool.edgesVisibleCount 获取隐藏边数量
  graph_tool.nodesSelectCount  获取节点选中数量
  graph_tool.edgesSelectCount  获取边选中数量
  graph_tool.findNodeForKey  通过key寻找节点
  
*/
function blobToDataURL(blob, callback) {
var a = new FileReader();
a.onload = function (e) { callback(e.target.result); }
a.readAsDataURL(blob);
}
var graph_tool = {
    copySelectData: 0,
    setDataPro:function(e,key,val){
             myDiagram.model.setDataProperty(e,key,val);         //如果为引用对象 则失效

    },
    // isLayoutPositioned
    disableAllDraw: function() { //禁止绘制
        var tool = myDiagram.toolManager.findTool("DragCreating");
        if (tool !== null) tool.isEnabled = false;

        var tool = myDiagram.toolManager.findTool("FreehandDrawing");
        if (tool !== null) tool.isEnabled = false;

    },
    onMouseLeaveNode: function(e, node) { //鼠标离开节点
        if (node == null) return;

        if (_gasInstance.isShowNodeText) return;

        var shape = node.findObject("GRAPHPICTURENODEKEY");
        if (shape != undefined) shape.visible = false;

        shape = node.findObject("GRAPHPICTURENODENAME");
        if (shape != undefined) shape.visible = false;

    },
    setVisibleNodeCanLayout: function() { //设置隐藏节点样式
        myDiagram.nodes.each(function(node) {
            if (node.visible) {
                if(!node.data.locking){  //锁定优先级最高
                    node.data.isLayoutPositioned = true;
                }
            } else {
                node.data.isLayoutPositioned = false;
            }
        });
    },
    setNodeCanLayout: function(val) { //设置隐藏节点样式
        myDiagram.nodes.each(function(node) {
            if(!node.data.locking){  //锁定优先级最高
                    // node.data.isLayoutPositioned = true;
                node.part.isLayoutPositioned = val;
            }
        });
    },
    setNodeCanLayoutByKey: function(val,nodes) { //设置隐藏节点样式
        myDiagram.nodes.each(function(node) {
            nodes.map(e=>{
                if(node.data.key == e.key){
                    node.part.isLayoutPositioned = val;
                    graph_tool.setDataPro(node.data,"locking",val);
                    // graph_tool.setDataPro(node.data,"locking_P",node.part.location)
                }

            })
        });
    },
    graphtoJson: function() { //图数据转换为json数据
        var json = myDiagram.model.toJson();
        return json;
    },
    getNodesCount: function() { //获取节点数量
        return myDiagram.nodes.count;
    },
    getEdgesCount: function() { //获取边数量
        return myDiagram.links.count;
    },
    nodesVisibleCount: function() { //获取隐藏数量
        var num = 0;
        myDiagram.nodes.each(function(l) {
            if (!l.visible) {
                num++;
            }
        });
        return num;
    },
    edgesVisibleCount: function() { //获取隐藏数量
        var num = 0;
        myDiagram.links.each(function(l) {
            if (!l.visible) {
                num++;
            }
        });
        return num;
    },
    nodesSelectCount: function() {
        var num = 0;
        myDiagram.nodes.each(function(l) {
            if (l.isSelected) {
                num++;
            }
        });
        return num;
    },
    edgesSelectCount: function() {
        var num = 0;
        myDiagram.links.each(function(l) {
            if (l.isSelected) {
                num++;
            }
        });
        return num;
    },
    edges: function() { //获取边
        var edgesData = [];
        myDiagram.links.each(function(link) {
            edgesData.push(link.data);
        });
        return edgesData;
    },
    findNodeForKey: function(key) { //通过节点key来寻找节点
        return myDiagram.findNodeForKey(key);
    },
    // 获取当前选中节点
    getcurrentNode: function() {
        var nodes = [];
        for (var nit = myDiagram.nodes; nit.next();) {
            var node = nit.value;
            if (node.isSelected) {
                nodes = node.data
            }
        }
        return nodes
    },
    // 获取当前选中节点
    getcurrentNodes: function() {
        var nodes = [];
        for (var nit = myDiagram.nodes; nit.next();) {
            var node = nit.value;
            if (node.isSelected) {
                nodes.push(node.data)
            }
        }
        return nodes
    },
    // 获取当前选中边
    getcurrentEdge: function() {
        var links = [];
        for (var nit = myDiagram.links; nit.next();) {
            var link = nit.value;
            if (link.isSelected) {
                links = link.data
            }
        }
        return links
    },
    // 获取当前选中边
    getcurrentEdges: function() {
        var links = [];
        for (var nit = myDiagram.links; nit.next();) {
            var link = nit.value;
            if (link.isSelected) {
                links.push(link.data)
            }
        }
        return links
    },
    //设置画布选中
    groupSelection: function() {
        myDiagram.commandHandler.groupSelection();
    },
    unGroupSelection: function() { //设置画布未选中
        myDiagram.commandHandler.ungroupSelection();
    },

    //删除选中节点或边
    deleteSelection: function() {
        myDiagram.commandHandler.deleteSelection()
    },
    // 撤销一步操作
    undo: function() {
        console.log(1111)
        myDiagram.commandHandler.undo()
    },
    redo: function() {
        myDiagram.commandHandler.redo()
    },
    //复制所选内容
    copySelection: function() {
        myDiagram.commandHandler.copySelection();
        graph_tool.copySelectData = 1

    },
    //粘贴所复制内容
    pasteSelection: function() {
        myDiagram.commandHandler.pasteSelection();
        graph_tool.copySelectData = 0; 
        myDiagram.scale = myDiagram.scale + 0.001;
    },
    //缩小
    decreaseZoom: function() {
        var currentScale = myDiagram.scale;
        if (currentScale < 0) return false ;
        myDiagram.scale = myDiagram.scale - 0.1;
        console.log(myDiagram.scale)
        if(myDiagram.scale < 0.01){
            myDiagram.scale = 0.01
        }
        sets_sale_num(myDiagram.scale)

    },
    //放大
    increaseZoom: function() {
        var currentScale = myDiagram.scale
        if (currentScale > 4) return false;
         myDiagram.scale = myDiagram.scale + 0.1;
         sets_sale_num(myDiagram.scale)
    },
    setZomm: function(v) {
        // console.log(v)
        myDiagram.scale = v
    },
    //全选
    selectAll: function() {
        myDiagram.nodes.each(function(node) {
            node.isSelected = true
        }) 
        myDiagram.links.each(function(link) {
            link.isSelected = true
        })
    },
    // 反选
    reverseSelected: function() {
        myDiagram.nodes.each(function(node) {
            node.isSelected = !node.isSelected
        }) 
        myDiagram.links.each(function(link) {
            link.isSelected = !link.isSelected
        })
    },
    // svg的回调函数
    myCallback: function(blob) {
        var url = window.URL.createObjectURL(blob);
        var filename = "mySVGFile.svg";

        var a = document.createElement("a");
        a.style = "display: none";
        a.href = url;
        a.download = filename;

        // IE 11
        if (window.navigator.msSaveBlob !== undefined) {
            window.navigator.msSaveBlob(blob, filename);
            return;
        }

        document.body.appendChild(a);
        requestAnimationFrame(function() {
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        });
    },
    findCommonPath: function() {

        var stack = new go.List(go.Node);
        var coll = new go.List(go.List);

        var begin = myDiagram.selection.first();
        var end;
        myDiagram.selection.each(function(n) {
            end = n;
        });

        stack.add(begin);
        var isFinded = findPath(begin, end);

        changeColor();

        function findPath(begin, end) {

            begin.findNodesOutOf().each(function(n) {

                if (n === begin) return;
                if (n === end) {
                    var path = stack.copy();
                    path.add(end);
                    coll.add(path);
                } else if (!stack.contains(n)) {
                    stack.add(n);
                    findPath(n, end);
                    stack.removeAt(stack.count - 1);
                }
            });
        }

        function changeColor() {

            coll.each(function(p) {
                for (var i = 0; i < p.length - 1; i++) {
                    var f = p.elt(i);
                    var t = p.elt(i + 1);
                    f.findLinksTo(t).each(function(l) {
                        l.isHighlighted = true;
                    });
                }
            });

        }

    },
    //制作svg
    makeSvg: function() {
        var svg = myDiagram.makeSvg({
            scale: 1,
            background: "white"
        });
        var svgstr = new XMLSerializer().serializeToString(svg);
        var blob = new Blob([svgstr], {
            type: "image/svg+xml"
        });
        this.myCallback(blob);
    },
    // 生成图片的回调
    myCallback_img: function(blob) {
        // console.log(blob)

        var url = window.URL.createObjectURL(blob);
        var filename = (downloadImgName ? downloadImgName : new Date()) + ".png";

        var a = document.createElement("a");
        a.style = "display: none";
        a.href = url;
        a.download = filename;

        if (window.navigator.msSaveBlob !== undefined) {
            window.navigator.msSaveBlob(blob, filename);
            return;
        }

        document.body.appendChild(a);
        requestAnimationFrame(function() {
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        });
    },
    uploadImg: function(blob) {
  
        // var data = new FormData();
        // data.append("app_id", "fas-visual-test");
        // data.append("task_id", "10087");
        // data.append("data_id", "456");
        // data.append("case_id", "123");
        // data.append("data_name", "102");
        // data.append("file_name", "file");
        // data.append("file_extension", "png");
        // data.append("remarks", "关系图");
        // data.append("file", blob);
        // data.append("pic_type", "1");
        // data.append("type", "1");
        // data.append("flag", "1");
        // data.append("layout", "1");

        // $.ajax({
        //     type: 'POST',
        //     url: baseUrl + '/file/save-file',
        //     contentType: false,
        //     processData: false,
        //     data: data,
        //     success: function(res) {
        //         alert(res.msg)
        //     }
        // })
    },
    // 制作blob
    makeBlob_toParent:function(guid){
        var blob = myDiagram.makeImageData({
            background: "#fff",
            returnType: "blob",
            scale: download_scale,
            callback: this.toParent_callBack
        });
    },
    toParent_callBack:function(blob,guid){
        // return blob 
        // console.log(blob)
           var pic =blob;
           blobToDataURL(blob, function (data) {
                
               var json = graph_tool.graphtoJson();
               var obj = {
                   g_pic:data,
                   g_json:JSON.stringify(updateData()),
                   // original_nodes :original_nodes,
                   // original_links :original_links
               }
               // let nodes = myDiagram.model.nodeDataArray.map(e=>{
               //      return {
               //          "key":e.key,
               //          "id":e.id,
               //          "text":e.text,
               //          "type":e.type,
               //          "type_key":e.type_key,
               //          "type_text":e.type_text,
               //          "tags":e.tags,
               //          "fill":e.fill,
               //          "icon":e.icon,
               //          "size":e.size,
               //          "color":e.color,
               //          "width":e.width,
               //          "height":e.height,
               //          "stroke":e.d_stroke,
               //          "category":e.category,
               //          "is_hidden":e.is_hidden,
               //          "isExpand":e.isExpand

               //      }
               // })
               // let edges = myDiagram.model.linkDataArray.map(e=>{
               //      return{
               //        "from":e.from,
               //        "to":e.to,
               //        "text":e.text,
               //        "id":e.id,
               //        "numeric":e.numeric,
               //        "time":e.time,
               //        "type_key":e.type_key,
               //        "type_text":e.type_text,  
               //        "type":e.type,
               //        "money":e.money,
               //        "size":e.size,
               //        "color":e.color,
               //        "width":e.width,
               //        "category":e.category,
               //        "direction":e.direction,
               //        "stroke":e.d_stroke
               //      }
               //  })
               //if(nodeArray.length >= 0 || linkArray.length >= 0){
                 
                // obj.g_json = JSON.stringify({
                //     "nodeDataArray":nodes,
                //     "linkDataArray":edges
                // })
                if(source_client_type == 1){
                    obj.guid = Client_guid;
                    callBackToClient(obj)
                    return;
                }
               window.parent.postMessage(obj,"*")
            });
    },  
    makeBlob: function(i) {
        if (i == 1) {
            var blob = myDiagram.makeImageData({
                background: "#1285FD",
                returnType: "blob",
                scale: 0.8,
                callback: this.uploadImg
            });
            return false
        }
        console.log(myDiagram.documentBounds)
        var blob = myDiagram.makeImageData({
            background: "#fff",
            returnType: "blob",
            // scale: download_scale,
            scale:0.9,
            callback: this.myCallback_img,
            // maxSize: new go.Size(NaN, NaN)
            maxSize: new go.Size(myDiagram.documentBounds.width, myDiagram.documentBounds.height)
        });
        //  var d = myDiagram.documentBounds;
        // var halfWidth = d.width / 2;
        // var halfHeight = d.height / 2;
        // myDiagram.makeImageData({
        //     position: new go.Point(d.x, d.y),
        //     size: new go.Size(halfWidth,halfHeight),
        //     background: "#fff",
        //     // scale:1,
        //     returnType: "blob",
        //     // size: new go.Size(3000,3000),
        //     callback:this.myCallback_img
        //   });
        // myDiagram.makeImageData({
        //     background: "#fff",
        //     // scale:1,
        //     returnType: "blob",
        //     position: new go.Point(d.x + halfWidth, d.y),
        //     size: new go.Size(halfWidth,halfHeight),
        //     callback:this.myCallback_img
        //   });
        // myDiagram.makeImageData({
        //     background: "#fff",
        //     // scale:1,
        //     returnType: "blob",
        //      position: new go.Point(d.x, d.y+ halfHeight),
        //     size: new go.Size(halfWidth,halfHeight),
        //     callback:this.myCallback_img
        //   });
        // myDiagram.makeImageData({
        //     background: "#fff",
        //     // scale:1,
        //     returnType: "blob",
        //     position: new go.Point(d.x + halfWidth, d.y + halfHeight),
        //     size: new go.Size(halfWidth,halfHeight),
        //     callback:this.myCallback_img
        //   });


    }

}