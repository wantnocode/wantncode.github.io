/*
  求三角夹角度数

*/
var pi180 = 180 / Math.PI;

function getAngle(point1_x, point1_y, point2_x, point2_y, point3_x, point3_y)
{
    var _cos1 = getCos(point1_x, point1_y, point2_x, point2_y, point3_x, point3_y);//第一个点为顶点的角的角度的余弦值

    return Math.acos(_cos1) * pi180;
}


//获得三个点构成的三角形的 第一个点所在的角度的余弦值
function getCos(point1_x, point1_y, point2_x, point2_y, point3_x, point3_y)
{
    var length1_2 = getLength(point1_x, point1_y, point2_x, point2_y);//获取第一个点与第2个点的距离
    var length1_3 = getLength(point1_x, point1_y, point3_x, point3_y);
    var length2_3 = getLength(point2_x, point2_y, point3_x, point3_y);

    var res = (Math.pow(length1_2, 2) + Math.pow(length1_3, 2) - Math.pow(length2_3, 2)) / (length1_2 * length1_3 * 2);//cosA=(pow(b,2)+pow(c,2)-pow(a,2))/2*b*c

    return res;
}


//获取坐标轴内两个点间的距离
function getLength(point1_x, point1_y, point2_x, point2_y)
{
    var diff_x = Math.abs(point2_x - point1_x);
    var diff_y = Math.abs(point2_y - point1_y);

    var length_pow = Math.pow(diff_x, 2) + Math.pow(diff_y, 2);//两个点在 横纵坐标的差值与两点间的直线 构成直角三角形。length_pow等于该距离的平方

    return Math.sqrt(length_pow);
}