/*

下载图片到本地
*/





function webgl_downloadImg (){
		

        document.getElementById("graph-container").children[0].children[0].toBlob(function(blob){
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
		})
}



/*

获取图资源和图片
*/
function webgl_getGraphAssets(){
			// document.getElementById("graph-container").children[0].children[0].getContext("2d").fillStyle = "#fff";
			// document.getElementById("graph-container").children[0].children[0].getContext("2d").fillRect(0,0,document.getElementById("graph-container").children[0].children[0].width,document.getElementById("graph-container").children[0].children[0].height)
			document.getElementById("graph-container").children[0].children[0].toBlob(function(blob){
				var reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.onload = function(){
					console.log(reader.result);
					var obj = {
						g_pic:reader.result,
						g_json:JSON.stringify({
							"nodeDataArray":nodeArray,
							"linkDataArray":linkArray,
							// "layout":layout
						})
					}
					window.parent.postMessage(obj,"*")
				}
			})

}




function  webgl_decreaseZoom(){
	g_scale = g_scale - 0.1;
	Graph.zoom([g_scale]);
}

function webgl_increaseZoom(){
	g_scale = g_scale + 0.1;
	Graph.zoom([g_scale]);
}

function webgl_setZoom(num){
	g_scale = num;
	Graph.zoom([g_scale]);
}


function webgl_zoomToFit(){
	Graph.zoomToFit()
}

function webgl_scrollToPart(){
	g_scale = 2;
	Graph.zoom([g_scale]);
}

function webgl_selectAll(){
	nodeArray.map(node=>{
		selectedNodes.has(node) ||  selectedNodes.add(node);
	})
	linkArray.map(link=>{
		selectedLinks.has(link) ||  selectedLinks.add(link);
	})
}

//reverseSelected
function webgl_reverseSelected(){
	nodeArray.map(node=>{
		selectedNodes.has(node) ? selectedNodes.delete(node) : selectedNodes.add(node);
	})
	linkArray.map(link=>{
		selectedLinks.has(link) ? selectedLinks.delete(link) : selectedLinks.add(link);
	})
}