

/*
* 求圆周上等分点的坐标
* ox,oy为圆心坐标
* r为半径
* count为等分个数
*/
function getPoint_cir(r, ox, oy, count){
	var cir_point = []; //结果
    var radians = (Math.PI / 180) * Math.round(360 / count), //弧度
        i = 0;
    for(; i < count; i++){
        var x = ox + r * Math.sin(radians * i),
            y = oy + r * Math.cos(radians * i);
 
        cir_point.unshift({x:x,y:y}); //为保持数据顺时针
    }
    return cir_point;
}