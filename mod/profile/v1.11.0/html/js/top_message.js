/**
* @license MIT
* @fileOverview Favico animations
* @author Miroslav Magda, http://blog.ejci.net
* @version 0.3.4
*/
!function(){var e=function(e){"use strict";function t(e){if(e.paused||e.ended||w)return!1;try{f.clearRect(0,0,h,s),f.drawImage(e,0,0,h,s)}catch(o){}p=setTimeout(t,k.duration,e),R.setIcon(c)}function o(e){var t=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(t,function(e,t,o,n){return t+t+o+o+n+n});var o=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return o?{r:parseInt(o[1],16),g:parseInt(o[2],16),b:parseInt(o[3],16)}:!1}function n(e,t){var o,n={};for(o in e)n[o]=e[o];for(o in t)n[o]=t[o];return n}function i(){return document.hidden||document.msHidden||document.webkitHidden||document.mozHidden}e=e?e:{};var r,a,s,h,c,f,l,d,u,y,g,w,m,x,p,b={bgColor:"#d00",textColor:"#fff",fontFamily:"sans-serif",fontStyle:"bold",type:"circle",position:"down",animation:"slide",elementId:!1};m={},m.ff=/firefox/i.test(navigator.userAgent.toLowerCase()),m.chrome=/chrome/i.test(navigator.userAgent.toLowerCase()),m.opera=/opera/i.test(navigator.userAgent.toLowerCase()),m.ie=/msie/i.test(navigator.userAgent.toLowerCase())||/trident/i.test(navigator.userAgent.toLowerCase()),m.supported=m.chrome||m.ff||m.opera;var v=[];g=function(){},d=w=!1;var C=function(){r=n(b,e),r.bgColor=o(r.bgColor),r.textColor=o(r.textColor),r.position=r.position.toLowerCase(),r.animation=k.types[""+r.animation]?r.animation:b.animation;var t=r.position.indexOf("up")>-1,i=r.position.indexOf("left")>-1;if(t||i)for(var d=0;d<k.types[""+r.animation].length;d++){var u=k.types[""+r.animation][d];t&&(u.y=u.y<.6?u.y-.4:u.y-2*u.y+(1-u.w)),i&&(u.x=u.x<.6?u.x-.4:u.x-2*u.x+(1-u.h)),k.types[""+r.animation][d]=u}r.type=I[""+r.type]?r.type:b.type;try{a=R.getIcon(),c=document.createElement("canvas"),l=document.createElement("img"),a.hasAttribute("href")?(l.setAttribute("src",a.getAttribute("href")),l.onload=function(){s=l.height>0?l.height:32,h=l.width>0?l.width:32,c.height=s,c.width=h,f=c.getContext("2d"),M.ready()}):(l.setAttribute("src",""),s=32,h=32,l.height=s,l.width=h,c.height=s,c.width=h,f=c.getContext("2d"),M.ready())}catch(y){throw"Error initializing favico. Message: "+y.message}},M={};M.ready=function(){d=!0,M.reset(),g()},M.reset=function(){d&&(v=[],u=!1,f.clearRect(0,0,h,s),f.drawImage(l,0,0,h,s),R.setIcon(c),window.clearTimeout(x),window.clearTimeout(p))},M.start=function(){if(d&&!y){var e=function(){u=v[0],y=!1,v.length>0&&(v.shift(),M.start())};if(v.length>0){y=!0;var t=function(){["type","animation","bgColor","textColor","fontFamily","fontStyle"].forEach(function(e){e in v[0].options&&(r[e]=v[0].options[e])}),k.run(v[0].options,function(){e()},!1)};u?k.run(u.options,function(){t()},!0):t()}}};var I={},A=function(e){return e.n="number"==typeof e.n?Math.abs(0|e.n):e.n,e.x=h*e.x,e.y=s*e.y,e.w=h*e.w,e.h=s*e.h,e.len=(""+e.n).length,e};I.circle=function(e){e=A(e);var t=!1;2===e.len?(e.x=e.x-.4*e.w,e.w=1.4*e.w,t=!0):e.len>=3&&(e.x=e.x-.65*e.w,e.w=1.65*e.w,t=!0),f.clearRect(0,0,h,s),f.drawImage(l,0,0,h,s),f.beginPath(),f.font=r.fontStyle+" "+Math.floor(e.h*(e.n>99?.85:1))+"px "+r.fontFamily,f.textAlign="center",t?(f.moveTo(e.x+e.w/2,e.y),f.lineTo(e.x+e.w-e.h/2,e.y),f.quadraticCurveTo(e.x+e.w,e.y,e.x+e.w,e.y+e.h/2),f.lineTo(e.x+e.w,e.y+e.h-e.h/2),f.quadraticCurveTo(e.x+e.w,e.y+e.h,e.x+e.w-e.h/2,e.y+e.h),f.lineTo(e.x+e.h/2,e.y+e.h),f.quadraticCurveTo(e.x,e.y+e.h,e.x,e.y+e.h-e.h/2),f.lineTo(e.x,e.y+e.h/2),f.quadraticCurveTo(e.x,e.y,e.x+e.h/2,e.y)):f.arc(e.x+e.w/2,e.y+e.h/2,e.h/2,0,2*Math.PI),f.fillStyle="rgba("+r.bgColor.r+","+r.bgColor.g+","+r.bgColor.b+","+e.o+")",f.fill(),f.closePath(),f.beginPath(),f.stroke(),f.fillStyle="rgba("+r.textColor.r+","+r.textColor.g+","+r.textColor.b+","+e.o+")","number"==typeof e.n&&e.n>999?f.fillText((e.n>9999?9:Math.floor(e.n/1e3))+"k+",Math.floor(e.x+e.w/2),Math.floor(e.y+e.h-.2*e.h)):f.fillText(e.n,Math.floor(e.x+e.w/2),Math.floor(e.y+e.h-.15*e.h)),f.closePath()},I.rectangle=function(e){e=A(e);var t=!1;2===e.len?(e.x=e.x-.4*e.w,e.w=1.4*e.w,t=!0):e.len>=3&&(e.x=e.x-.65*e.w,e.w=1.65*e.w,t=!0),f.clearRect(0,0,h,s),f.drawImage(l,0,0,h,s),f.beginPath(),f.font="bold "+Math.floor(e.h*(e.n>99?.9:1))+"px sans-serif",f.textAlign="center",f.fillStyle="rgba("+r.bgColor.r+","+r.bgColor.g+","+r.bgColor.b+","+e.o+")",f.fillRect(e.x,e.y,e.w,e.h),f.fillStyle="rgba("+r.textColor.r+","+r.textColor.g+","+r.textColor.b+","+e.o+")","number"==typeof e.n&&e.len>3?f.fillText((e.n>9999?9:Math.floor(e.n/1e3))+"k+",Math.floor(e.x+e.w/2),Math.floor(e.y+e.h-.2*e.h)):f.fillText(e.n,Math.floor(e.x+e.w/2),Math.floor(e.y+e.h-.15*e.h)),f.closePath()};var E=function(e,t){t=("string"==typeof t?{animation:t}:t)||{},g=function(){try{if("number"==typeof e?e>0:""!==e){var n={type:"badge",options:{n:e}};if("animation"in t&&k.types[""+t.animation]&&(n.options.animation=""+t.animation),"type"in t&&I[""+t.type]&&(n.options.type=""+t.type),["bgColor","textColor"].forEach(function(e){e in t&&(n.options[e]=o(t[e]))}),["fontStyle","fontFamily"].forEach(function(e){e in t&&(n.options[e]=t[e])}),v.push(n),v.length>100)throw"Too many badges requests in queue.";M.start()}else M.reset()}catch(i){throw"Error setting badge. Message: "+i.message}},d&&g()},T=function(e){g=function(){try{var t=e.width,o=e.height,n=document.createElement("img"),i=o/s>t/h?t/h:o/s;n.setAttribute("src",e.getAttribute("src")),n.height=o/i,n.width=t/i,f.clearRect(0,0,h,s),f.drawImage(n,0,0,h,s),R.setIcon(c)}catch(r){throw"Error setting image. Message: "+r.message}},d&&g()},L=function(e){g=function(){try{if("stop"===e)return w=!0,M.reset(),void(w=!1);e.addEventListener("play",function(){t(this)},!1)}catch(o){throw"Error setting video. Message: "+o.message}},d&&g()},U=function(e){if(window.URL&&window.URL.createObjectURL||(window.URL=window.URL||{},window.URL.createObjectURL=function(e){return e}),m.supported){var o=!1;navigator.getUserMedia=navigator.getUserMedia||navigator.oGetUserMedia||navigator.msGetUserMedia||navigator.mozGetUserMedia||navigator.webkitGetUserMedia,g=function(){try{if("stop"===e)return w=!0,M.reset(),void(w=!1);o=document.createElement("video"),o.width=h,o.height=s,navigator.getUserMedia({video:!0,audio:!1},function(e){o.src=URL.createObjectURL(e),o.play(),t(o)},function(){})}catch(n){throw"Error setting webcam. Message: "+n.message}},d&&g()}},R={};R.getIcon=function(){var e=!1,t="",o=function(){for(var e=document.getElementsByTagName("head")[0].getElementsByTagName("link"),t=e.length,o=t-1;o>=0;o--)if(/(^|\s)icon(\s|$)/i.test(e[o].getAttribute("rel")))return e[o];return!1};if(r.elementId?(e=document.getElementById(r.elementId),e.setAttribute("href",e.getAttribute("src"))):(e=o(),e===!1&&(e=document.createElement("link"),e.setAttribute("rel","icon"),document.getElementsByTagName("head")[0].appendChild(e))),t=r.elementId?e.src:e.href,-1===t.indexOf(document.location.hostname))throw new Error("Error setting favicon. Favicon image is on different domain (Icon: "+t+", Domain: "+document.location.hostname+")");return e.setAttribute("type","image/png"),e},R.setIcon=function(e){var t=e.toDataURL("image/png");if(r.elementId)document.getElementById(r.elementId).setAttribute("src",t);else if(m.ff||m.opera){var o=a;a=document.createElement("link"),m.opera&&a.setAttribute("rel","icon"),a.setAttribute("rel","icon"),a.setAttribute("type","image/png"),document.getElementsByTagName("head")[0].appendChild(a),a.setAttribute("href",t),o.parentNode&&o.parentNode.removeChild(o)}else a.setAttribute("href",t)};var k={};return k.duration=40,k.types={},k.types.fade=[{x:.4,y:.4,w:.6,h:.6,o:0},{x:.4,y:.4,w:.6,h:.6,o:.1},{x:.4,y:.4,w:.6,h:.6,o:.2},{x:.4,y:.4,w:.6,h:.6,o:.3},{x:.4,y:.4,w:.6,h:.6,o:.4},{x:.4,y:.4,w:.6,h:.6,o:.5},{x:.4,y:.4,w:.6,h:.6,o:.6},{x:.4,y:.4,w:.6,h:.6,o:.7},{x:.4,y:.4,w:.6,h:.6,o:.8},{x:.4,y:.4,w:.6,h:.6,o:.9},{x:.4,y:.4,w:.6,h:.6,o:1}],k.types.none=[{x:.4,y:.4,w:.6,h:.6,o:1}],k.types.pop=[{x:1,y:1,w:0,h:0,o:1},{x:.9,y:.9,w:.1,h:.1,o:1},{x:.8,y:.8,w:.2,h:.2,o:1},{x:.7,y:.7,w:.3,h:.3,o:1},{x:.6,y:.6,w:.4,h:.4,o:1},{x:.5,y:.5,w:.5,h:.5,o:1},{x:.4,y:.4,w:.6,h:.6,o:1}],k.types.popFade=[{x:.75,y:.75,w:0,h:0,o:0},{x:.65,y:.65,w:.1,h:.1,o:.2},{x:.6,y:.6,w:.2,h:.2,o:.4},{x:.55,y:.55,w:.3,h:.3,o:.6},{x:.5,y:.5,w:.4,h:.4,o:.8},{x:.45,y:.45,w:.5,h:.5,o:.9},{x:.4,y:.4,w:.6,h:.6,o:1}],k.types.slide=[{x:.4,y:1,w:.6,h:.6,o:1},{x:.4,y:.9,w:.6,h:.6,o:1},{x:.4,y:.9,w:.6,h:.6,o:1},{x:.4,y:.8,w:.6,h:.6,o:1},{x:.4,y:.7,w:.6,h:.6,o:1},{x:.4,y:.6,w:.6,h:.6,o:1},{x:.4,y:.5,w:.6,h:.6,o:1},{x:.4,y:.4,w:.6,h:.6,o:1}],k.run=function(e,t,o,a){var s=k.types[i()?"none":r.animation];return a=o===!0?"undefined"!=typeof a?a:s.length-1:"undefined"!=typeof a?a:0,t=t?t:function(){},a<s.length&&a>=0?(I[r.type](n(e,s[a])),x=setTimeout(function(){o?a-=1:a+=1,k.run(e,t,o,a)},k.duration),R.setIcon(c),void 0):void t()},C(),{badge:E,video:L,image:T,webcam:U,reset:M.reset}};"undefined"!=typeof define&&define.amd?define([],function(){return e}):"undefined"!=typeof module&&module.exports?module.exports=e:this.Favico=e}();


var profile = {
	favicon : new Favico({
		animation: 'popFade',
		position: 'up',
		bgColor: '#00ffff',
		textColor: '#000'
	}),
	monitoring : {
		start: function(){
            profile.monitoring.process();
            this.intervalId = setInterval(profile.monitoring.process, 15000);
        },
        stop: function(){
            clearInterval(this.intervalId);
        },
        process: function(){
            $.ajax({url:"index.php?module=profile&unread=1", global:false})
				.done(function (n) {
                    profile.showUnread(n)
				})
				.fail(function( jqXHR, textStatus, errorThrown) {
                    //profile.monitoring.stop();
					if (jqXHR.status == 503) alertify.delay(14000).error("Сервис не доступен.");
					else {
						profile.monitoring.stop();
						alertify.error("Произошла ошибка " + jqXHR.status);
					}
                });
        }
    },
	showUnread: function (n) {
        if ($('#module_profile').is(":visible")) {
            var $container = $('#module_profile span.menu_block');
            $container.find('#msgCount').remove();
            if (!isNaN(parseFloat(n)) && isFinite(n) && n > 0) {
                $container.append('<span style="color:blue;font-weight:bold" id="msgCount" title="Непрочитанные сообщения"> (' + n + ')</span>');
                $container.find('#msgCount').on('click', profile.msgClick);
                profile.favicon.badge(n);
            }
        } else {
            var $container = $('#user-section .messages a');
            $container.find('#msgCount').remove();
            $container.find('i').show();
            if (!isNaN(parseFloat(n)) && isFinite(n) && n > 0) {
                $container.prepend('<span class="badge" id="msgCount" title="Непрочитанные сообщения">' + n + '</span>');
                $container.find('i').hide();
                profile.favicon.badge(n);
            }
        }
    },
	msgClick: function(e) {
		load("index.php?module=profile&action=messages");
		e.stopPropagation();
	},
	sse: {
        source : new EventSource('index.php?module=profile&sse=open'),
        start: function(){
            profile.sse.source.addEventListener('message', function(e) {
                profile.showUnread(e.data)
            }, false);

            profile.sse.source.addEventListener('open', function(e) {
                // Соединение было открыто
            }, false);

            profile.sse.source.addEventListener('error', function(e) {
                if (e.eventPhase == EventSource.CLOSED) {
                    //alertify.error("Сервис не доступен. Проверьте соединение с сетью Интернет.");
                }
            }, false);
        }
    }
};


$(document).ready(function(){
    if (typeof(EventSource) !== "undefined") {
        profile.sse.start();
    } else {
        profile.monitoring.start();
    }
});
