/*! qq:820115719  autor xiaotian  weixin:wywin2021*/

﻿"use strict";

function ParallelRouteLink() {
  go.Link.call(this);
}
go.Diagram.inherit(ParallelRouteLink, go.Link);

/**
* @this {ParallelRouteLink}
* @return {boolean}
*/
ParallelRouteLink.prototype.computePoints = function() {
  var result = go.Link.prototype.computePoints.call(this);
  if (!this.isOrthogonal && this.curve !== go.Link.Bezier && this.hasCurviness()) {
    var curv = this.computeCurviness();
    if (curv !== 0) {
      var num = this.pointsCount;
      var pidx = 0;
      var qidx = num-1;
      if (num >= 4) {
        pidx++;
        qidx--;
      }

      var frompt = this.getPoint(pidx);
      var topt = this.getPoint(qidx);
      if(!frompt || !topt){
        return
      }
      var dx = topt.x - frompt.x;
      var dy = topt.y - frompt.y;

      var mx = frompt.x + dx * 1 / 8;
      var my = frompt.y + dy * 1 / 8;
      var px = mx;
      var py = my;
      if (-0.01 < dy && dy < 0.01) {
        if (dx > 0) py -= curv; else py += curv;
      } else {
        var slope = -dx / dy;
        var e = Math.sqrt(curv * curv / (slope * slope + 1));
        if (curv < 0) e = -e;
        px = (dy < 0 ? -1 : 1) * e + mx;
        py = slope * (px - mx) + my;
      }

      mx = frompt.x + dx * 7 / 8;
      my = frompt.y + dy * 7 / 8;
      var qx = mx;
      var qy = my;
      if (-0.01 < dy && dy < 0.01) {
        if (dx > 0) qy -= curv; else qy += curv;
      } else {
        var slope = -dx / dy;
        var e = Math.sqrt(curv * curv / (slope * slope + 1));
        if (curv < 0) e = -e;
        qx = (dy < 0 ? -1 : 1) * e + mx;
        qy = slope * (qx - mx) + my;
      }

      this.insertPointAt(pidx+1, px, py);
      this.insertPointAt(qidx+1, qx, qy);
    }
  }
  return result;
};