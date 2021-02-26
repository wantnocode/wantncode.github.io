var elem;
var Graph;
var g_scale;

function init_force_(){
     elem = document.getElementById('graph-container');
    // console.log(elem.clientWidth)
    var data = {
      nodes:nodeArray,
      links:linkArray
    }
   
     Graph = ForceGraph()(elem)
      .graphData(data)
      // .backgroundColor("#fff")
      // .cooldownTicks(0)
      .d3Force('center', null)
      .nodeLabel('text')
      .nodeColor(function(node){
        // console.log(selectedNodes.has(node))
       return selectedNodes.has(node) ? '#FFC106' : node.fill
      })
      // .nodeAutoColorBy('fill')
      // .nodeRelSize(6)
      .nodeVisibility(function(node){
        // console.log(node)
        if(node.x < Graph.screen2GraphCoords(0,0).x  || node.x > Graph.screen2GraphCoords(elem.clientWidth,elem.clientHeight).x ){
            return false;
        }
        else if(node.y < Graph.screen2GraphCoords(0,0).y  || node.y > Graph.screen2GraphCoords(elem.clientWidth,elem.clientHeight).y ){
           return false;
        }
        else{
            return true;
        }
      })
      .nodeCanvasObjectMode(() => 'after')
      .nodeCanvasObject((node, ctx, globalScale) => {
          // console.log(ctx)
          if(globalScale < 2.5){
              return
          }
          // const size = 4;
          // var img =  new Image();
          // img.src = geoFunc(node.icon);
          // ctx.drawImage(img,node.x - size / 2,node.y - size/2,size,size);
          // geoFunc(node.icon)
          const label = setText(node.text);
          // const fontSize = 12/globalScale;
          const fontSize = 14 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          // const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.5); // some padding

          ctx.fillStyle = selectedNodes.has(node) ? '#FFC106' : 'rgba(255, 255, 255, 0)';
          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2 + 6, ...bckgDimensions);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          // ctx.fillStyle = node.color;
          ctx.fillStyle = selectedNodes.has(node) ? '#fff' : '#000';
          // ctx.fillText(label, node.x, node.y);
          ctx.fillText(label, node.x, node.y + 6);
      })
      .linkLabel("text")
      .linkVisibility(function(link,ctx,globalScale){
        // console.log(link)
        if((link.source.y < Graph.screen2GraphCoords(0,0).y  || link.source.y > Graph.screen2GraphCoords(elem.clientWidth,elem.clientHeight).y) && (link.target.y < Graph.screen2GraphCoords(0,0).y  || link.target.y > Graph.screen2GraphCoords(elem.clientWidth,elem.clientHeight).y) ){
            return false;
        }else if((link.source.x < Graph.screen2GraphCoords(0,0).x  || link.source.x > Graph.screen2GraphCoords(elem.clientWidth,elem.clientHeight).x) && (link.target.x < Graph.screen2GraphCoords(0,0).x  || link.target.x > Graph.screen2GraphCoords(elem.clientWidth,elem.clientHeight).x) ){
            return false;
        }
        else{
            return true;
        }
      })
      .linkColor(function(link){
          return selectedLinks.has(link) ? '#FFC106' : link.stroke
      })  
      // .linkDirectionalParticles(2)
      .linkDirectionalArrowLength(2)

      .linkDirectionalParticleWidth(1)
      .linkCanvasObjectMode(() => 'after')
      .linkCanvasObject((link, ctx,globalScale) => {
          if(globalScale < 2.5){
            return
          }

          const MAX_FONT_SIZE = 4;
          const LABEL_NODE_MARGIN = Graph.nodeRelSize() * 1.5;

          const start = link.source;
          const end = link.target;

          
          if (typeof start !== 'object' || typeof end !== 'object') return;

        
          const textPos = Object.assign(...['x', 'y'].map(c => ({
            [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
          })));

          const relLink = { x: end.x - start.x, y: end.y - start.y };

          const maxTextLength = Math.sqrt(Math.pow(relLink.x, 2) + Math.pow(relLink.y, 2)) - LABEL_NODE_MARGIN * 2;

          let textAngle = Math.atan2(relLink.y, relLink.x);
       
          if (textAngle > Math.PI / 2) textAngle = -(Math.PI - textAngle);
          if (textAngle < -Math.PI / 2) textAngle = -(-Math.PI - textAngle);

          // const label = `${link.source.id} > ${link.target.id}`;
          const label = link.text;

          // 
          ctx.font = '1px Sans-Serif';
          // const fontSize = Math.min(MAX_FONT_SIZE, maxTextLength / ctx.measureText(label).width) -2 ;
          const fontSize = 14/globalScale;
          // ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

          // 
          ctx.save();
          ctx.translate(textPos.x, textPos.y);
          ctx.rotate(textAngle);

          ctx.fillStyle = 'rgba(0, 0, 0, 0)';
          ctx.fillRect(- bckgDimensions[0] / 2, - bckgDimensions[1] / 2, ...bckgDimensions);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#000';
          // ctx.fillStyle = 'darkgrey';
          ctx.fillText(label, 0, 0);
          ctx.restore();
      })
      .warmupTicks(30)
      .onNodeHover(node => elem.style.cursor = node ? 'pointer' : null)
      // .onNodeClick(node => {
        // Center/zoom on node
        // Graph.centerAt(node.x, node.y, 1000);
        // Graph.zoom(8, 2000);
      // })
      .onNodeClick((node, event) => {
        if(webgl_graph_state === "tz"){
          return
        }
        // event.stopPropagation();
        // console.log(node)
          if (event.ctrlKey || event.shiftKey || event.altKey) { // multi-selection
            selectedNodes.has(node) ? selectedNodes.delete(node) : selectedNodes.add(node);
          } else { // single-selection
            const untoggle = selectedNodes.has(node) && selectedNodes.size === 1;
            selectedNodes.clear();
            !untoggle && selectedNodes.add(node);
          }

          Graph.nodeColor(Graph.nodeColor()); // update color of selected nodes
      })
      .onLinkClick(function(link,event){
        if(webgl_graph_state === "tz"){
          return
        }
        // console.log(link)
          if (event.ctrlKey || event.shiftKey || event.altKey) { // multi-selection
            selectedLinks.has(link) ? selectedLinks.delete(link) : selectedLinks.add(link);
          } else { // single-selection
            const untoggle = selectedLinks.has(link) && selectedLinks.size === 1;
            selectedLinks.clear();
            !untoggle && selectedLinks.add(link);
          }

      })
      .onBackgroundClick(function(){
        selectedNodes.clear();
        selectedLinks.clear();
      })
      .onZoom(function(o,i){
          // console.log(o.k)
          g_scale = o.k;

          if(g_scale > 8){
            Graph.zoom([8])
            return;
          }
          sets_sale_num(g_scale/2)

      })
      .onEngineTick(function(n){
       
      })
      
      .onEngineStop(function(){
        console.log("======================")
        Graph.cooldownTicks(0)   //
        $(".loading").hide()
        $(".loading_box").hide()
        $("#graph-container").css("opacity",1)

      })
      .onRenderFramePre(function(ctx){
        // console.log(Graph.screen2GraphCoords()
        ctx.fillStyle = "#fff";
        ctx.fillRect(Graph.screen2GraphCoords(0,0).x,Graph.screen2GraphCoords(0,0).y,Graph.screen2GraphCoords(elem.clientWidth * 2,elem.clientHeight*2).x,Graph.screen2GraphCoords(elem.clientWidth*2,elem.clientHeight*2).y)  
      })

      // Graph.zoom([1])

}