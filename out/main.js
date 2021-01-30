!function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=8)}([function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Vector3D=void 0;const n=r(2);class i{constructor(t=0,e=0,r=0){this._x=t,this._y=e,this._z=r}clone(t){this._x=t._x,this._y=t._y,this._z=t._z}static randomInUnitDisk(){let t;for(;t=new i(n.randomIn(-1,1),n.randomIn(-1,1),0),!(t.lengthSquared()<1););return t}reset(t,e,r){this._x=t,this._y=e,this._z=r}get x(){return this._x}get y(){return this._y}get z(){return this._z}static randomUnitVector(){let t=n.randomIn(0,2*n.PI),e=n.randomIn(-1,1),r=Math.sqrt(1-e*e);return new i(r*Math.cos(t),r*Math.sin(t),e)}static randomIn(t=0,e=1){return new i(n.randomIn(t,e),n.randomIn(t,e),n.randomIn(t,e))}static convert2Vector(t){return"number"==typeof t?new i(t,t,t):t}static add(t,e){let r=this.convert2Vector(t),n=this.convert2Vector(e);return new i(r._x+n._x,r._y+n._y,r._z+n._z)}static sub(t,e){let r=this.convert2Vector(t),n=this.convert2Vector(e);return new i(r._x-n._x,r._y-n._y,r._z-n._z)}static mul(t,e){let r=this.convert2Vector(t),n=this.convert2Vector(e);return new i(r._x*n._x,r._y*n._y,r._z*n._z)}static div(t,e){let r=i.convert2Vector(t),n=i.convert2Vector(e);return new i(r._x/n._x,r._y/n._y,r._z/n._z)}static dot(t,e){return t._x*e._x+t._y*e._y+t._z*e._z}static cross(t,e){return new i(t._y*e._z-t._z*e._y,t._z*e._x-t._x*e._z,t._x*e._y-t._y*e._x)}static negative(t){return new i(-t._x,-t._y,-t._z)}add(t){return i.add(this,t)}sub(t){return i.sub(this,t)}cross(t){return i.cross(this,t)}mul(t){return i.mul(this,t)}div(t){return i.div(this,t)}unitVector(){return this.div(this.length())}length(){return Math.sqrt(this.lengthSquared())}negative(){return i.negative(this)}dot(t){return i.dot(this,t)}lengthSquared(){return this._x*this._x+this._y*this._y+this._z*this._z}}e.Vector3D=i},function(t,e){t.exports=require("assert")},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.writeToFile=e.clamp=e.randomIn=e.degreesToRadians=e.PI=e.INFINITY=e.rangeIn=void 0;const n=r(10);e.rangeIn=function(t,e,r){return t>=e&&t<=r},e.INFINITY=Number.MAX_SAFE_INTEGER,e.PI=Math.PI,e.degreesToRadians=function(t){return t*e.PI/180},e.randomIn=function(t=0,e=1){return t+Math.random()*(e-t)},e.clamp=function(t,e,r){return t<e?e:t>r?r:t},e.writeToFile=async function(t,e){t=JSON.stringify(t),n.writeFileSync(e,t,"utf8"),console.log("数据写入完成")}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Ray=void 0;const n=r(0),i=r(1),o=r(5);class s{constructor(t=new n.Vector3D(0,0,0),e=new n.Vector3D(0,0,0)){this._origin=t,this._direct=e}clone(t){this._origin=t.origin,this._direct=t.direct}reset(t,e){this._origin=t,this._direct=e}set origin(t){this._origin=t}set direct(t){this._direct=t}get origin(){return this._origin}get direct(){return this._direct}at(t){return this.origin.add(this.direct.mul(t))}static getRayColor(t,e,r){var a;if(r<=0)return new n.Vector3D(0,0,0);let c=new o.HitRecord;if(e.hitPerObject(t,.001,1/0,c)){i(c.normalUnitVec&&c.hitPoint&&c.material);let o=new s,u=new n.Vector3D;return(null===(a=c.material)||void 0===a?void 0:a.scatter(t,c,u,o))?u.mul(this.getRayColor(o,e,r-1)):new n.Vector3D(0,0,0)}let u=.5*(t.direct.unitVector().y+1),l=new n.Vector3D(1,1,1),h=new n.Vector3D(.5,.7,1);return l.mul(1-u).add(h.mul(u))}}e.Ray=s},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Material=void 0;const n=r(0);e.Material=class{scatter(t,e,r,n){return!0}reflect(t,e){let r=n.Vector3D.dot(t,e);return t.sub(e.mul(2*r))}refract(t,e,r){let n=t.negative().dot(e),i=t.add(e.mul(n)).mul(r),o=e.mul(Math.sqrt(1-i.lengthSquared())).negative();return i.add(o)}schlick(t,e){let r=(1-e)/(1+e);return r*=r,r+(1-r)*Math.pow(1-t,5)}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.HitRecord=void 0;const n=r(0),i=r(1);e.HitRecord=class{constructor(t,e,r,n){this._hitPoint=t,this._normalUnitVec=e,this._t=r,this._isOutside=n}get material(){return this._material}set material(t){this._material=t}set hitPoint(t){this._hitPoint=t}set normalUnitVec(t){this._normalUnitVec=t}set t(t){this._t=t}set isOutside(t){this._isOutside=t}get hitPoint(){return this._hitPoint}get normalUnitVec(){return this._normalUnitVec}get t(){return this._t}get isOutside(){return this._isOutside}setNormal(t,e){this._isOutside=n.Vector3D.dot(e,t.direct)<0,this._normalUnitVec=this._isOutside?e:e.negative()}randomInHemisphere(){let t=n.Vector3D.randomUnitVector();return i(void 0!==this._normalUnitVec),n.Vector3D.dot(this._normalUnitVec,t)>0?t:t.negative()}clone(t){this._hitPoint=t._hitPoint,this._t=t._t,this._normalUnitVec=t._normalUnitVec,this._isOutside=t._isOutside,this._material=t._material}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Lambertian=void 0;const n=r(4),i=r(3),o=r(0),s=r(1);class a extends n.Material{constructor(t=new o.Vector3D(.5,.5,.5)){super(),this.albedo=t}scatter(t,e,r,n){s(e.hitPoint&&e.normalUnitVec);let o=e.normalUnitVec.add(e.randomInHemisphere());return n.clone(new i.Ray(e.hitPoint,o)),r.clone(this.albedo),!0}}e.Lambertian=a},function(t,e,r){var n={};t.exports=n,n.themes={};var i=r(17),o=n.styles=r(18),s=Object.defineProperties,a=new RegExp(/[\r\n]+/g);n.supportsColor=r(19).supportsColor,void 0===n.enabled&&(n.enabled=!1!==n.supportsColor()),n.enable=function(){n.enabled=!0},n.disable=function(){n.enabled=!1},n.stripColors=n.strip=function(t){return(""+t).replace(/\x1B\[\d+m/g,"")};n.stylize=function(t,e){if(!n.enabled)return t+"";var r=o[e];return!r&&e in n?n[e](t):r.open+t+r.close};var c=/[|\\{}()[\]^$+*?.]/g;function u(t){var e=function t(){return f.apply(t,arguments)};return e._styles=t,e.__proto__=d,e}var l,h=(l={},o.grey=o.gray,Object.keys(o).forEach((function(t){o[t].closeRe=new RegExp(function(t){if("string"!=typeof t)throw new TypeError("Expected a string");return t.replace(c,"\\$&")}(o[t].close),"g"),l[t]={get:function(){return u(this._styles.concat(t))}}})),l),d=s((function(){}),h);function f(){var t=Array.prototype.slice.call(arguments),e=t.map((function(t){return null!=t&&t.constructor===String?t:i.inspect(t)})).join(" ");if(!n.enabled||!e)return e;for(var r=-1!=e.indexOf("\n"),s=this._styles,c=s.length;c--;){var u=o[s[c]];e=u.open+e.replace(u.closeRe,u.open)+u.close,r&&(e=e.replace(a,(function(t){return u.close+t+u.open})))}return e}n.setTheme=function(t){if("string"!=typeof t)for(var e in t)!function(e){n[e]=function(r){if("object"==typeof t[e]){var i=r;for(var o in t[e])i=n[t[e][o]](i);return i}return n[t[e]](r)}}(e);else console.log("colors.setTheme now only accepts an object, not a string.  If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));")};var _=function(t,e){var r=e.split("");return(r=r.map(t)).join("")};for(var m in n.trap=r(22),n.zalgo=r(23),n.maps={},n.maps.america=r(24)(n),n.maps.zebra=r(25)(n),n.maps.rainbow=r(26)(n),n.maps.random=r(27)(n),n.maps)!function(t){n[t]=function(e){return _(n.maps[t],e)}}(m);s(n,function(){var t={};return Object.keys(h).forEach((function(e){t[e]={get:function(){return u([e])}}})),t}())},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});r(9).render()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.render=void 0;const n=r(0),i=r(11),o=r(12),s=r(13),a=r(14),c=r(2),u=r(15),l=r(3),h=r(6),d=r(29),f=r(30);e.render=function(){const t=new n.Vector3D(13,2,3),e=new n.Vector3D(0,0,0),r=new n.Vector3D(0,1,0);let _=new a.Camera(t,e,r,20,1980/1080,.1,10),m=function(){let t=new o.HittableList;t.add(new s.Sphere(new n.Vector3D(0,-1e3,0),1e3,new h.Lambertian(new n.Vector3D(.5,.5,.5))));for(let e=-11;e<11;e++)for(let r=-11;r<11;r++){let i=Math.random(),o=new n.Vector3D(e+.9*Math.random(),.2,r+.9*Math.random());if(o.sub(new n.Vector3D(4,.2,0)).length()>.9)if(i<.4){let e=n.Vector3D.randomIn().mul(n.Vector3D.randomIn());t.add(new s.Sphere(o,.2,new h.Lambertian(e)))}else if(i<.7){let e=n.Vector3D.randomIn(.5),r=c.randomIn(0,.5);t.add(new s.Sphere(o,.2,new d.Metal(e,r)))}else t.add(new s.Sphere(o,.2,new f.Dielectric(1.5)))}return t.add(new s.Sphere(new n.Vector3D(0,1,0),1,new f.Dielectric(1.5))),t.add(new s.Sphere(new n.Vector3D(-4,1,0),1,new h.Lambertian(new n.Vector3D(.4,.2,.1)))),t.add(new s.Sphere(new n.Vector3D(4,1,0),1,new d.Metal(new n.Vector3D(.7,.6,.5)))),t}(),g=new Array(8553600),p=0,b=new i.Pixel,v=new u.ProgressBar(20);for(let t=1079;t>=0;t--){for(let e=0;e<1980;e++){let r=new n.Vector3D(0,0,0);for(let n=0;n<150;n++){let n=_.getRay((e+Math.random())/1980,(t+Math.random())/1080);r=r.add(l.Ray.getRayColor(n,m,75))}b.vector=r,b.writePixel(g,150,p),p+=4}v.render(p/8553600*100)}console.log("渲染完成，开始将数据写入文件..."),c.writeToFile(g,"./out/data.json")}},function(t,e){t.exports=require("fs")},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Pixel=void 0;const n=r(2),i=r(1);e.Pixel=class{constructor(t,e=[255,255,255],r=255){this._vector=t,this._r=e[0],this._g=e[1],this._b=e[2],this._alpha=r}set vector(t){this._vector=t}setRGBByScale(t){let e=1/t;i(void 0!==this._vector),this._r=Math.sqrt(e*this._vector.x),this._g=Math.sqrt(e*this._vector.y),this._b=Math.sqrt(e*this._vector.z)}writePixel(t,e,r){this.setRGBByScale(e),t[r++]=256*n.clamp(this._r,0,.999),t[r++]=256*n.clamp(this._g,0,.999),t[r++]=256*n.clamp(this._b,0,.999),t[r++]=this._alpha}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.HittableList=void 0;const n=r(1),i=r(5);e.HittableList=class{constructor(t){this.objectList=[],t&&this.add(t)}clear(){this.objectList=[]}add(t){this.objectList.push(t)}hitPerObject(t,e,r,o){let s=new i.HitRecord,a=!1,c=r;for(let r=0;r<this.objectList.length;r++){this.objectList[r].hit(t,e,c,s)&&(a=!0,n(null!=s.t),c=s.t,o.clone(s))}return a}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Sphere=void 0;const n=r(0),i=r(2),o=r(6);e.Sphere=class{constructor(t,e,r=new o.Lambertian){this.center=t,this.radius=e,this.material=r}hit(t,e,r,o){let s=t.origin.sub(this.center),a=t.direct.lengthSquared(),c=n.Vector3D.dot(t.direct,s),u=c*c-a*(s.lengthSquared()-this.radius*this.radius);const l=Math.sqrt(u);let h=(-c-l)/a;if(!i.rangeIn(h,e,r)&&(h=(-c+l)/a,!i.rangeIn(h,e,r)))return!1;o.t=h,o.hitPoint=t.at(h);const d=o.hitPoint.sub(this.center).div(this.radius);return o.setNormal(t,d),o.material=this.material,!0}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Camera=void 0;const n=r(0),i=r(3),o=r(2);e.Camera=class{constructor(t,e,r,n,i,s,a){let c=o.degreesToRadians(n),u=Math.tan(c/2),l=u*i;this.lensRadius=s/2,this.w=t.sub(e).unitVector(),this.u=r.cross(this.w).unitVector(),this.v=this.w.cross(this.u).unitVector(),this.origin=t,this.renderStartVec=t.sub(this.u.mul(l*a)).sub(this.v.mul(u*a)).sub(this.w.mul(a)),this.horizontal=this.u.mul(2*l*a),this.vertical=this.v.mul(2*u*a)}getRay(t,e){let r=n.Vector3D.randomInUnitDisk().mul(this.lensRadius),o=this.u.mul(r.x).add(this.v.mul(r.y)),s=this.horizontal.mul(t),a=this.vertical.mul(e),c=this.renderStartVec.add(s).add(a).sub(this.origin).sub(o);return new i.Ray(this.origin.add(o),c)}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ProgressBar=void 0;r(16);e.ProgressBar=class{constructor(t=10,e="渲染进度：",r=0){this.description=e,this.nowValue=r,this.totalBlock=t,this.preBlockLength=100/t}render(t){const e=Math.floor(t/this.preBlockLength),r=this.totalBlock-e;let n=this.description;for(let t=0;t<e;t++)n+="█";for(let t=0;t<r;t++)n+="▒";n+="  "+t.toFixed(2)+"%",console.clear(),console.log(n.blue)}}},function(t,e,r){var n=r(7);t.exports=n,r(28)()},function(t,e){t.exports=require("util")},function(t,e){var r={};t.exports=r;var n={reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29],black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],gray:[90,39],grey:[90,39],brightRed:[91,39],brightGreen:[92,39],brightYellow:[93,39],brightBlue:[94,39],brightMagenta:[95,39],brightCyan:[96,39],brightWhite:[97,39],bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgGray:[100,49],bgGrey:[100,49],bgBrightRed:[101,49],bgBrightGreen:[102,49],bgBrightYellow:[103,49],bgBrightBlue:[104,49],bgBrightMagenta:[105,49],bgBrightCyan:[106,49],bgBrightWhite:[107,49],blackBG:[40,49],redBG:[41,49],greenBG:[42,49],yellowBG:[43,49],blueBG:[44,49],magentaBG:[45,49],cyanBG:[46,49],whiteBG:[47,49]};Object.keys(n).forEach((function(t){var e=n[t],i=r[t]=[];i.open="["+e[0]+"m",i.close="["+e[1]+"m"}))},function(t,e,r){"use strict";var n=r(20),i=r(21),o=process.env,s=void 0;function a(t){return function(t){return 0!==t&&{level:t,hasBasic:!0,has256:t>=2,has16m:t>=3}}(function(t){if(!1===s)return 0;if(i("color=16m")||i("color=full")||i("color=truecolor"))return 3;if(i("color=256"))return 2;if(t&&!t.isTTY&&!0!==s)return 0;var e=s?1:0;if("win32"===process.platform){var r=n.release().split(".");return Number(process.versions.node.split(".")[0])>=8&&Number(r[0])>=10&&Number(r[2])>=10586?Number(r[2])>=14931?3:2:1}if("CI"in o)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI"].some((function(t){return t in o}))||"codeship"===o.CI_NAME?1:e;if("TEAMCITY_VERSION"in o)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(o.TEAMCITY_VERSION)?1:0;if("TERM_PROGRAM"in o){var a=parseInt((o.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(o.TERM_PROGRAM){case"iTerm.app":return a>=3?3:2;case"Hyper":return 3;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(o.TERM)?2:/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(o.TERM)||"COLORTERM"in o?1:(o.TERM,e)}(t))}i("no-color")||i("no-colors")||i("color=false")?s=!1:(i("color")||i("colors")||i("color=true")||i("color=always"))&&(s=!0),"FORCE_COLOR"in o&&(s=0===o.FORCE_COLOR.length||0!==parseInt(o.FORCE_COLOR,10)),t.exports={supportsColor:a,stdout:a(process.stdout),stderr:a(process.stderr)}},function(t,e){t.exports=require("os")},function(t,e,r){"use strict";t.exports=function(t,e){var r=(e=e||process.argv).indexOf("--"),n=/^-{1,2}/.test(t)?"":"--",i=e.indexOf(n+t);return-1!==i&&(-1===r||i<r)}},function(t,e){t.exports=function(t,e){var r="";t=(t=t||"Run the trap, drop the bass").split("");var n={a:["@","Ą","Ⱥ","Ʌ","Δ","Λ","Д"],b:["ß","Ɓ","Ƀ","ɮ","β","฿"],c:["©","Ȼ","Ͼ"],d:["Ð","Ɗ","Ԁ","ԁ","Ԃ","ԃ"],e:["Ë","ĕ","Ǝ","ɘ","Σ","ξ","Ҽ","੬"],f:["Ӻ"],g:["ɢ"],h:["Ħ","ƕ","Ң","Һ","Ӈ","Ԋ"],i:["༏"],j:["Ĵ"],k:["ĸ","Ҡ","Ӄ","Ԟ"],l:["Ĺ"],m:["ʍ","Ӎ","ӎ","Ԡ","ԡ","൩"],n:["Ñ","ŋ","Ɲ","Ͷ","Π","Ҋ"],o:["Ø","õ","ø","Ǿ","ʘ","Ѻ","ם","۝","๏"],p:["Ƿ","Ҏ"],q:["্"],r:["®","Ʀ","Ȑ","Ɍ","ʀ","Я"],s:["§","Ϟ","ϟ","Ϩ"],t:["Ł","Ŧ","ͳ"],u:["Ʊ","Ս"],v:["ט"],w:["Ш","Ѡ","Ѽ","൰"],x:["Ҳ","Ӿ","Ӽ","ӽ"],y:["¥","Ұ","Ӌ"],z:["Ƶ","ɀ"]};return t.forEach((function(t){t=t.toLowerCase();var e=n[t]||[" "],i=Math.floor(Math.random()*e.length);r+=void 0!==n[t]?n[t][i]:t})),r}},function(t,e){t.exports=function(t,e){t=t||"   he is here   ";var r={up:["̍","̎","̄","̅","̿","̑","̆","̐","͒","͗","͑","̇","̈","̊","͂","̓","̈","͊","͋","͌","̃","̂","̌","͐","̀","́","̋","̏","̒","̓","̔","̽","̉","ͣ","ͤ","ͥ","ͦ","ͧ","ͨ","ͩ","ͪ","ͫ","ͬ","ͭ","ͮ","ͯ","̾","͛","͆","̚"],down:["̖","̗","̘","̙","̜","̝","̞","̟","̠","̤","̥","̦","̩","̪","̫","̬","̭","̮","̯","̰","̱","̲","̳","̹","̺","̻","̼","ͅ","͇","͈","͉","͍","͎","͓","͔","͕","͖","͙","͚","̣"],mid:["̕","̛","̀","́","͘","̡","̢","̧","̨","̴","̵","̶","͜","͝","͞","͟","͠","͢","̸","̷","͡"," ҉"]},n=[].concat(r.up,r.down,r.mid);function i(t){return Math.floor(Math.random()*t)}function o(t){var e=!1;return n.filter((function(r){e=r===t})),e}return function(t,e){var n,s,a="";for(s in(e=e||{}).up=void 0===e.up||e.up,e.mid=void 0===e.mid||e.mid,e.down=void 0===e.down||e.down,e.size=void 0!==e.size?e.size:"maxi",t=t.split(""))if(!o(s)){switch(a+=t[s],n={up:0,down:0,mid:0},e.size){case"mini":n.up=i(8),n.mid=i(2),n.down=i(8);break;case"maxi":n.up=i(16)+3,n.mid=i(4)+1,n.down=i(64)+3;break;default:n.up=i(8)+1,n.mid=i(6)/2,n.down=i(8)+1}var c=["up","mid","down"];for(var u in c)for(var l=c[u],h=0;h<=n[l];h++)e[l]&&(a+=r[l][i(r[l].length)])}return a}(t,e)}},function(t,e){t.exports=function(t){return function(e,r,n){if(" "===e)return e;switch(r%3){case 0:return t.red(e);case 1:return t.white(e);case 2:return t.blue(e)}}}},function(t,e){t.exports=function(t){return function(e,r,n){return r%2==0?e:t.inverse(e)}}},function(t,e){t.exports=function(t){var e=["red","yellow","green","blue","magenta"];return function(r,n,i){return" "===r?r:t[e[n++%e.length]](r)}}},function(t,e){t.exports=function(t){var e=["underline","inverse","grey","yellow","red","green","blue","white","cyan","magenta","brightYellow","brightRed","brightGreen","brightBlue","brightWhite","brightCyan","brightMagenta"];return function(r,n,i){return" "===r?r:t[e[Math.round(Math.random()*(e.length-2))]](r)}}},function(t,e,r){var n=r(7);t.exports=function(){var t=function(t,e){String.prototype.__defineGetter__(t,e)};t("strip",(function(){return n.strip(this)})),t("stripColors",(function(){return n.strip(this)})),t("trap",(function(){return n.trap(this)})),t("zalgo",(function(){return n.zalgo(this)})),t("zebra",(function(){return n.zebra(this)})),t("rainbow",(function(){return n.rainbow(this)})),t("random",(function(){return n.random(this)})),t("america",(function(){return n.america(this)})),Object.keys(n.styles).forEach((function(e){t(e,(function(){return n.stylize(this,e)}))})),n.setTheme=function(e){"string"!=typeof e?function(e){var r=["__defineGetter__","__defineSetter__","__lookupGetter__","__lookupSetter__","charAt","constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf","charCodeAt","indexOf","lastIndexOf","length","localeCompare","match","repeat","replace","search","slice","split","substring","toLocaleLowerCase","toLocaleUpperCase","toLowerCase","toUpperCase","trim","trimLeft","trimRight"];Object.keys(e).forEach((function(i){if(-1!==r.indexOf(i))console.log("warn: ".red+("String.prototype"+i).magenta+" is probably something you don't want to override.  Ignoring style name");else if("string"==typeof e[i])n[i]=n[e[i]],t(i,(function(){return n[i](this)}));else{var o=function(t){for(var r=t||this,o=0;o<e[i].length;o++)r=n[e[i][o]](r);return r};t(i,o),n[i]=function(t){return o(t)}}}))}(e):console.log("colors.setTheme now only accepts an object, not a string. If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));")}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Metal=void 0;const n=r(4),i=r(3),o=r(1);class s extends n.Material{constructor(t,e=0){super(),this.albedo=t,this.fuzz=Math.min(e,1)}scatter(t,e,r,n){o(e.normalUnitVec&&e.hitPoint);let s=this.reflect(t.direct.unitVector(),e.normalUnitVec);return s=s.add(e.randomInHemisphere().mul(this.fuzz)),n.clone(new i.Ray(e.hitPoint,s)),o(this.albedo),r.clone(this.albedo),s.dot(e.normalUnitVec)>0}}e.Metal=s},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Dielectric=void 0;const n=r(4),i=r(1);class o extends n.Material{constructor(t=1){super(),this.refractiveIdx=t}scatter(t,e,r,n){i(e.normalUnitVec&&e.hitPoint),r.reset(1,1,1);let o=this.refractiveIdx;e.isOutside&&(o=1/o);let s,a=t.direct.unitVector(),c=Math.min(a.negative().dot(e.normalUnitVec),1),u=Math.sqrt(1-c*c),l=this.schlick(c,o);return s=o*u>1||Math.random()<l?this.reflect(a,e.normalUnitVec):this.refract(a,e.normalUnitVec,o),n.reset(e.hitPoint,s),!0}}e.Dielectric=o}]);
//# sourceMappingURL=main.js.map