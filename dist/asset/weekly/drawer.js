define("weekly/drawer",function(){function e(e,t,n,a,s,r){var i=a||12,_=r||"#fff",d=s||15,o=Math.min(t,n)||35,u=Math.max(t,n)||60,m=u+d,l=u+d,c=Raphael(e,2*u+2*d,2*u+2*d),h=[],M=[],f=2*Math.PI/i,Y={stroke:_,"stroke-width":d,"stroke-linecap":"round"};Raphael.getColor.reset();for(var L=0;i>L;L++){var y=f*L-Math.PI/2,p=Math.cos(y),D=Math.sin(y);M[L]=1/i*L,h[L]=c.path([["M",m+o*p,l+o*D],["L",m+u*p,l+u*D]]).attr(Y),"rainbow"==_&&h[L].attr("stroke",Raphael.getColor())}var k;return function T(){M.unshift(M.pop());for(var e=0;i>e;e++)h[e].attr("opacity",M[e]);c.safari(),k=setTimeout(T,1e3/i)}(),function(){clearTimeout(k),c.remove()}}function t(){a&&a.clear()}function n(e,t){var n=a=Raphael(e),s=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],r=function(){for(var e=[],t=7;t>0;t--)for(var n=0;24>n;n++)e.push(t);return e}(),i=["日","六","五","四","三","二","一"],_=["12am","1","2","3","4","5","6","7","8","9","10","11","12pm","1","2","3","4","5","6","7","8","9","10","11"];return n.dotchart(5,5,320,180,s,r,t,{symbol:"o",max:5,heat:!0,axis:"0 0 0 0",axisxstep:23,axisystep:6,axisxlabels:_,axisxtype:" ",axisytype:" ",axisylabels:i}),n}var a,exports={spinner:e,draw:n,clear:t};return exports});