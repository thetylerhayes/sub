global.notify=function(t){function n(i){if(e[i])return e[i].exports;var o=e[i]={exports:{},id:i,loaded:!1};return t[i].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var e={};return n.m=t,n.c=e,n.p="",n(0)}([function(t,n,e){e(2),t.exports=e(4)},function(t,n,e){"use strict";function i(){}function o(t){try{return t.then}catch(n){return m=n,w}}function a(t,n){try{return t(n)}catch(e){return m=e,w}}function r(t,n,e){try{t(n,e)}catch(i){return m=i,w}}function s(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._45=0,this._81=0,this._65=null,this._54=null,t!==i&&g(t,this)}function h(t,n,e){return new t.constructor(function(o,a){var r=new s(i);r.then(o,a),u(t,new p(n,e,r))})}function u(t,n){for(;3===t._81;)t=t._65;return s._10&&s._10(t),0===t._81?0===t._45?(t._45=1,void(t._54=n)):1===t._45?(t._45=2,void(t._54=[t._54,n])):void t._54.push(n):void c(t,n)}function c(t,n){v(function(){var e=1===t._81?n.onFulfilled:n.onRejected;if(null===e)return void(1===t._81?l(n.promise,t._65):f(n.promise,t._65));var i=a(e,t._65);i===w?f(n.promise,m):l(n.promise,i)})}function l(t,n){if(n===t)return f(t,new TypeError("A promise cannot be resolved with itself."));if(n&&("object"==typeof n||"function"==typeof n)){var e=o(n);if(e===w)return f(t,m);if(e===t.then&&n instanceof s)return t._81=3,t._65=n,void d(t);if("function"==typeof e)return void g(e.bind(n),t)}t._81=1,t._65=n,d(t)}function f(t,n){t._81=2,t._65=n,s._97&&s._97(t,n),d(t)}function d(t){if(1===t._45&&(u(t,t._54),t._54=null),2===t._45){for(var n=0;n<t._54.length;n++)u(t,t._54[n]);t._54=null}}function p(t,n,e){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof n?n:null,this.promise=e}function g(t,n){var e=!1,i=r(t,function(t){e||(e=!0,l(n,t))},function(t){e||(e=!0,f(n,t))});e||i!==w||(e=!0,f(n,m))}var v=e(3),m=null,w={};t.exports=s,s._10=null,s._97=null,s._61=i,s.prototype.then=function(t,n){if(this.constructor!==s)return h(this,t,n);var e=new s(i);return u(this,new p(t,n,e)),e}},function(t,n,e){"undefined"!=typeof window&&("undefined"==typeof Promise&&(e(6).enable(),window.Promise=e(5)),e(10),Object.assign=e(9))},function(t,n,e){"use strict";function i(t){h.length||(a(),u=!0),h[h.length]=t}function o(){for(;c<h.length;){var t=c;if(c+=1,h[t].call(),c>l){for(var n=0,e=h.length-c;n<e;n++)h[n]=h[n+c];h.length-=c,c=0}}h.length=0,c=0,u=!1}function a(){var t=process.domain;t&&(r||(r=e(7)),r.active=process.domain=null),u&&s?setImmediate(o):process.nextTick(o),t&&(r.active=process.domain=t)}var r,s="function"==typeof setImmediate;t.exports=i;var h=[],u=!1,c=0,l=1024;i.requestFlush=a},function(t,n,e){"use strict";function i(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function t(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(n,e,i){return e&&t(n.prototype,e),i&&t(n,i),n}}(),a=e(8);a.fabric.Object.prototype.originX=a.fabric.Object.prototype.originY="center";var r=null,s=null,h=null,u=null,c=null,l=null,f=null,d=function(){function t(n,e,o,h){var u=this;i(this,t),this.width=n,this.height=e,this.widget=o,this.canvas=new a.fabric.StaticCanvas(h),this.onMessage=this.onMessage.bind(this),this.enqueueAnimation=this.enqueueAnimation.bind(this),this.render=this.render.bind(this),this.finish=this.finish.bind(this),this.spin=this.spin.bind(this),this.calculateFromEndPoint=this.calculateFromEndPoint.bind(this),this.afterSpin=this.afterSpin.bind(this),this.afterAnimation=this.afterAnimation.bind(this),this.canvas.on("object:added",function(t){t.target&&t.target._isWheel&&!r&&(r=t.target,u.spin(t.target._optionsPassThrough)),t.target&&t.target._isBg&&!s&&(s=t.target),t.target&&t.target._isRay&&!f&&(f=t.target)}),this.queue=[],this.isRunning=!1}return o(t,[{key:"render",value:function(t){var n=this;this.canvas.setHeight(this.height),this.canvas.setWidth(this.width),a.fabric.Image.fromURL("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1045838/celeberation-spiral%402x.png",function(e){e.setLeft(n.width/2).setTop(n.height/1.095).scaleToWidth(1.4*n.width).setAngle(180).set("opacity",0),e._isRay=!0,n.canvas.add(e),a.fabric.Image.fromURL("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1045838/wheel%402x.png",function(e){e.setLeft(n.width/2).setTop(n.height/1.095).setWidth(n.width-.045*n.width).setHeight(n.width-.045*n.width),e._isWheel=!0,e._optionsPassThrough=t,n.canvas.add(e),a.fabric.Image.fromURL("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1045838/non-moving-parts%20copy.png",function(e){e._isBg=!0,e.setLeft(n.width/2).setTop(n.height/1.1).scaleToWidth(n.width),n.canvas.add(e),a.fabric.Image.fromURL("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1045838/bottom_bar%402x.png",function(e){e.setLeft(n.width/1.98).setTop(n.height/1.095).scaleToWidth(n.width),n.canvas.add(e),n.canvas.add(h=new a.fabric.Text(""+t.username,{width:n.width,height:n.height,left:n.width/2,top:n.height/4,fill:"turquoise",fontFamily:"Titillium Web",fontSize:48/450*n.height,fontWeight:600})),n.canvas.add(u=new a.fabric.Text(t.isResub?t.months+" MONTH RESUB":"NEW SUBSCRIBER",{width:n.width,height:n.height,left:n.width/2,top:n.height/3,fill:"white",fontFamily:"Titillium Web",fontSize:28/450*n.height,fontWeight:600})),n.canvas.add(c=new a.fabric.Text("WINS",{width:n.width,height:n.height,left:n.width/2,top:n.height/3,fill:"red",fontFamily:"Titillium Web",fontSize:.08*n.height,fontWeight:900,opacity:0})),n.canvas.add(l=new a.fabric.Text("",{width:n.width,height:n.height,left:n.width/2,top:n.height/2.3,fill:"white",fontFamily:"Titillium Web",fontSize:.08*n.height,fontWeight:700,opacity:0}))})})})})}},{key:"calculateFromEndPoint",value:function(t){var n=0;switch(t){case 50:n=[20,110,201,291][Math.floor(4*Math.random())];break;case 100:n=[43,88,133,224,269,314][Math.floor(6*Math.random())];break;case 200:n=[64,155,246,336][Math.floor(4*Math.random())];break;case 1500:n=178;break;case"jack":n=359;break;default:n=30}return n-=Math.floor(18*Math.random())}},{key:"spin",value:function(t){var n=this,e=this.calculateFromEndPoint(t.win);r.animate("angle",7200-e,{onChange:this.canvas.renderAll.bind(this.canvas),duration:6e3,easing:a.fabric.util.ease.easeOutCirc}),setTimeout(function(){n.afterSpin(t)},6e3)}},{key:"afterSpin",value:function(t){var n=this;"jack"!==t.win?0===t.months?l.setText(t.win+" coins"):l.setText(t.months+" x "+t.win+" coins"):l.setText("THE JACKPOT"),f.animate("opacity",.8,{duration:300,onChange:this.canvas.renderAll.bind(this.canvas)}),f.animate("angle",720,{onChange:this.canvas.renderAll.bind(this.canvas),duration:1e4}),u.animate("opacity","0",{duration:500,onChange:this.canvas.renderAll.bind(this.canvas),onComplete:function(){n.canvas.remove(u)}}),c.animate("opacity","1",{duration:500,onChange:this.canvas.renderAll.bind(this.canvas)}),c.animate("top",this.height/3.5,{duration:500,onChange:this.canvas.renderAll.bind(this.canvas)}),l.animate("opacity","1",{duration:500,onChange:this.canvas.renderAll.bind(this.canvas)}),l.animate("top",this.height/2.8,{duration:500,onChange:this.canvas.renderAll.bind(this.canvas)}),h.animate("top",this.height/5,{duration:500,onChange:this.canvas.renderAll.bind(this.canvas)}),setTimeout(this.afterAnimation,3e3)}},{key:"afterAnimation",value:function(){var t=this;this.canvas.getObjects().map(function(n){n.animate("top",t.height,{duration:300,onChange:t.canvas.renderAll.bind(t.canvas)}),n.animate("opacity",0,{duration:300,onChange:t.canvas.renderAll.bind(t.canvas),onComplete:function(){t.canvas.remove(n),r=null,s=null,h=null,u=null,c=null,l=null,f=null}})}),setTimeout(this.finish,400)}},{key:"finish",value:function(){if(this.isRunning=!1,this.queue&&this.queue.length){var t=this.queue.shift();this.enqueueAnimation(t)}}},{key:"enqueueAnimation",value:function(t){this.isRunning?this.queue.push(t):(this.isRunning=!0,this.render(t))}},{key:"onMessage",value:function(t){this.enqueueAnimation(t.data)}}]),t}();n["default"]=d,void 0!==window&&(window.notify=d)},function(t,n,e){"use strict";function i(t){var n=new o(o._61);return n._81=1,n._65=t,n}var o=e(1);t.exports=o;var a=i(!0),r=i(!1),s=i(null),h=i(void 0),u=i(0),c=i("");o.resolve=function(t){if(t instanceof o)return t;if(null===t)return s;if(void 0===t)return h;if(t===!0)return a;if(t===!1)return r;if(0===t)return u;if(""===t)return c;if("object"==typeof t||"function"==typeof t)try{var n=t.then;if("function"==typeof n)return new o(n.bind(t))}catch(e){return new o(function(t,n){n(e)})}return i(t)},o.all=function(t){var n=Array.prototype.slice.call(t);return new o(function(t,e){function i(r,s){if(s&&("object"==typeof s||"function"==typeof s)){if(s instanceof o&&s.then===o.prototype.then){for(;3===s._81;)s=s._65;return 1===s._81?i(r,s._65):(2===s._81&&e(s._65),void s.then(function(t){i(r,t)},e))}var h=s.then;if("function"==typeof h){var u=new o(h.bind(s));return void u.then(function(t){i(r,t)},e)}}n[r]=s,0===--a&&t(n)}if(0===n.length)return t([]);for(var a=n.length,r=0;r<n.length;r++)i(r,n[r])})},o.reject=function(t){return new o(function(n,e){e(t)})},o.race=function(t){return new o(function(n,e){t.forEach(function(t){o.resolve(t).then(n,e)})})},o.prototype["catch"]=function(t){return this.then(null,t)}},function(t,n,e){"use strict";function i(){u=!1,s._10=null,s._97=null}function o(t){function n(n){(t.allRejections||r(l[n].error,t.whitelist||h))&&(l[n].displayId=c++,t.onUnhandled?(l[n].logged=!0,t.onUnhandled(l[n].displayId,l[n].error)):(l[n].logged=!0,a(l[n].displayId,l[n].error)))}function e(n){l[n].logged&&(t.onHandled?t.onHandled(l[n].displayId,l[n].error):l[n].onUnhandled||(console.warn("Promise Rejection Handled (id: "+l[n].displayId+"):"),console.warn('  This means you can ignore any previous messages of the form "Possible Unhandled Promise Rejection" with id '+l[n].displayId+".")))}t=t||{},u&&i(),u=!0;var o=0,c=0,l={};s._10=function(t){2===t._81&&l[t._72]&&(l[t._72].logged?e(t._72):clearTimeout(l[t._72].timeout),delete l[t._72])},s._97=function(t,e){0===t._45&&(t._72=o++,l[t._72]={displayId:null,error:e,timeout:setTimeout(n.bind(null,t._72),r(e,h)?100:2e3),logged:!1})}}function a(t,n){console.warn("Possible Unhandled Promise Rejection (id: "+t+"):");var e=(n&&(n.stack||n))+"";e.split("\n").forEach(function(t){console.warn("  "+t)})}function r(t,n){return n.some(function(n){return t instanceof n})}var s=e(1),h=[ReferenceError,TypeError,RangeError],u=!1;n.disable=i,n.enable=o},function(t,n){t.exports=require("domain")},function(t,n){t.exports=require("fabric")},function(t,n){t.exports=require("object-assign")},function(t,n){t.exports=require("whatwg-fetch")}]);
//# sourceMappingURL=index.node.js.map