// Tabla local en memoria para cachear la configuración
let configCache = {};

// Cargar la configuración desde chrome.storage al iniciar
chrome.storage.sync.get(null, (data) => {
    configCache = { ...data };
    console.log("Configuración cargada en caché:", configCache);
});

// Función para obtener un valor de configuración (desde cache)
function getConfigValue(key, callback) {
    if (key in configCache) {
        callback(configCache[key]); // Obtener de la caché local
    } else {
        chrome.storage.sync.get([key], (data) => {
            const value = data[key] ?? false;
            configCache[key] = value; // Guardar en cache
            callback(value);
        });
    }
}

// Función para establecer un valor en el almacenamiento (y en cache)
function setConfigValue(key, value) {
    configCache[key] = value; // Actualizar la caché local
    const obj = {};
    obj[key] = value;
    chrome.storage.sync.set(obj, () => {
        console.log(`${key} configurado a:`, value);
    });
}

// Escuchar cambios en `chrome.storage.sync` para actualizar la cache
chrome.storage.onChanged.addListener((changes) => {
    for (let key in changes) {
        const newValue = changes[key].newValue;
        configCache[key] = newValue; // Actualizar la caché
        console.log(`Cache actualizada: ${key} = ${newValue}`);
    }
});

// Responder a los mensajes de otros scripts solicitando un valor de configuración
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getConfigState") {
        getConfigValue(message.key, (value) => {
            sendResponse({ value: value });
        });
        return true; // La respuesta será asincrónica
    }

    if (message.action === "setConfigState") {
        setConfigValue(message.key, message.value);
        sendResponse({ status: "success" });
    }
});

























/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 873:
/***/ ((module) => {

var localeMap = {
  en_GB: 'en-gb',
  en_US: 'en',
  zh_CN: 'zh-cn',
  zh_TW: 'zh-tw'
};

var parseLocale = function parseLocale(locale) {
  var mapLocale = localeMap[locale];
  return mapLocale || locale.split('_')[0];
};

module.exports = function (option, dayjsClass, dayjsFactory) {
  var oldLocale = dayjsClass.prototype.locale
  dayjsClass.prototype.locale = function(arg) {
    if (typeof arg === 'string') {
      arg = parseLocale(arg)
    }
    return oldLocale.call(this, arg)
  }
}

/***/ }),

/***/ 484:
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ }),

/***/ 734:
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";return function(e,t,r){var n=t.prototype,s=n.format;r.en.ordinal=function(e){var t=["th","st","nd","rd"],r=e%100;return"["+e+(t[(r-20)%10]||t[r]||t[0])+"]"},n.format=function(e){var t=this,r=this.$locale();if(!this.isValid())return s.bind(this)(e);var n=this.$utils(),a=(e||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,(function(e){switch(e){case"Q":return Math.ceil((t.$M+1)/3);case"Do":return r.ordinal(t.$D);case"gggg":return t.weekYear();case"GGGG":return t.isoWeekYear();case"wo":return r.ordinal(t.week(),"W");case"w":case"ww":return n.s(t.week(),"w"===e?1:2,"0");case"W":case"WW":return n.s(t.isoWeek(),"W"===e?1:2,"0");case"k":case"kk":return n.s(String(0===t.$H?24:t.$H),"k"===e?1:2,"0");case"X":return Math.floor(t.$d.getTime()/1e3);case"x":return t.$d.getTime();case"z":return"["+t.offsetName()+"]";case"zzz":return"["+t.offsetName("long")+"]";default:return e}}));return s.bind(this)(a)}}}));

/***/ }),

/***/ 285:
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},e=/(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,n=/\d\d/,r=/\d\d?/,i=/\d*[^\s\d-_:/()]+/,o={},s=function(t){return(t=+t)+(t>68?1900:2e3)};var a=function(t){return function(e){this[t]=+e}},f=[/[+-]\d\d:?(\d\d)?|Z/,function(t){(this.zone||(this.zone={})).offset=function(t){if(!t)return 0;if("Z"===t)return 0;var e=t.match(/([+-]|\d\d)/g),n=60*e[1]+(+e[2]||0);return 0===n?0:"+"===e[0]?-n:n}(t)}],u=function(t){var e=o[t];return e&&(e.indexOf?e:e.s.concat(e.f))},h=function(t,e){var n,r=o.meridiem;if(r){for(var i=1;i<=24;i+=1)if(t.indexOf(r(i,0,e))>-1){n=i>12;break}}else n=t===(e?"pm":"PM");return n},d={A:[i,function(t){this.afternoon=h(t,!1)}],a:[i,function(t){this.afternoon=h(t,!0)}],S:[/\d/,function(t){this.milliseconds=100*+t}],SS:[n,function(t){this.milliseconds=10*+t}],SSS:[/\d{3}/,function(t){this.milliseconds=+t}],s:[r,a("seconds")],ss:[r,a("seconds")],m:[r,a("minutes")],mm:[r,a("minutes")],H:[r,a("hours")],h:[r,a("hours")],HH:[r,a("hours")],hh:[r,a("hours")],D:[r,a("day")],DD:[n,a("day")],Do:[i,function(t){var e=o.ordinal,n=t.match(/\d+/);if(this.day=n[0],e)for(var r=1;r<=31;r+=1)e(r).replace(/\[|\]/g,"")===t&&(this.day=r)}],M:[r,a("month")],MM:[n,a("month")],MMM:[i,function(t){var e=u("months"),n=(u("monthsShort")||e.map((function(t){return t.substr(0,3)}))).indexOf(t)+1;if(n<1)throw new Error;this.month=n%12||n}],MMMM:[i,function(t){var e=u("months").indexOf(t)+1;if(e<1)throw new Error;this.month=e%12||e}],Y:[/[+-]?\d+/,a("year")],YY:[n,function(t){this.year=s(t)}],YYYY:[/\d{4}/,a("year")],Z:f,ZZ:f};function c(n){var r,i;r=n,i=o&&o.formats;for(var s=(n=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(e,n,r){var o=r&&r.toUpperCase();return n||i[r]||t[r]||i[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(t,e,n){return e||n.slice(1)}))}))).match(e),a=s.length,f=0;f<a;f+=1){var u=s[f],h=d[u],c=h&&h[0],l=h&&h[1];s[f]=l?{regex:c,parser:l}:u.replace(/^\[|\]$/g,"")}return function(t){for(var e={},n=0,r=0;n<a;n+=1){var i=s[n];if("string"==typeof i)r+=i.length;else{var o=i.regex,f=i.parser,u=t.substr(r),h=o.exec(u)[0];f.call(e,h),t=t.replace(h,"")}}return function(t){var e=t.afternoon;if(void 0!==e){var n=t.hours;e?n<12&&(t.hours+=12):12===n&&(t.hours=0),delete t.afternoon}}(e),e}}return function(t,e,n){n.p.customParseFormat=!0,t&&t.parseTwoDigitYear&&(s=t.parseTwoDigitYear);var r=e.prototype,i=r.parse;r.parse=function(t){var e=t.date,r=t.utc,s=t.args;this.$u=r;var a=s[1];if("string"==typeof a){var f=!0===s[2],u=!0===s[3],h=f||u,d=s[2];u&&(d=s[2]),o=this.$locale(),!f&&d&&(o=n.Ls[d]),this.$d=function(t,e,n){try{if(["x","X"].indexOf(e)>-1)return new Date(("X"===e?1e3:1)*t);var r=c(e)(t),i=r.year,o=r.month,s=r.day,a=r.hours,f=r.minutes,u=r.seconds,h=r.milliseconds,d=r.zone,l=new Date,m=s||(i||o?1:l.getDate()),M=i||l.getFullYear(),Y=0;i&&!o||(Y=o>0?o-1:l.getMonth());var p=a||0,v=f||0,D=u||0,g=h||0;return d?new Date(Date.UTC(M,Y,m,p,v,D,g+60*d.offset*1e3)):n?new Date(Date.UTC(M,Y,m,p,v,D,g)):new Date(M,Y,m,p,v,D,g)}catch(t){return new Date("")}}(e,a,r),this.init(),d&&!0!==d&&(this.$L=this.locale(d).$L),h&&e!=this.format(a)&&(this.$d=new Date("")),o={}}else if(a instanceof Array)for(var l=a.length,m=1;m<=l;m+=1){s[1]=a[m-1];var M=n.apply(this,s);if(M.isValid()){this.$d=M.$d,this.$L=M.$L,this.init();break}m===l&&(this.$d=new Date(""))}else i.call(this,t)}}}));

/***/ }),

/***/ 425:
/***/ (function(module) {

!function(e,n){ true?module.exports=n():0}(this,(function(){"use strict";return function(e,n,t){t.isMoment=function(e){return t.isDayjs(e)}}}));

/***/ }),

/***/ 212:
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";return function(e,t){t.prototype.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)}}}));

/***/ }),

/***/ 412:
/***/ (function(module) {

!function(e,i){ true?module.exports=i():0}(this,(function(){"use strict";return function(e,i){i.prototype.isSameOrBefore=function(e,i){return this.isSame(e,i)||this.isBefore(e,i)}}}));

/***/ }),

/***/ 36:
/***/ (function(module) {

!function(n,e){ true?module.exports=e():0}(this,(function(){"use strict";return function(n,e,t){var r=e.prototype,o=function(n){return n&&(n.indexOf?n:n.s)},u=function(n,e,t,r,u){var i=n.name?n:n.$locale(),a=o(i[e]),s=o(i[t]),f=a||s.map((function(n){return n.substr(0,r)}));if(!u)return f;var d=i.weekStart;return f.map((function(n,e){return f[(e+(d||0))%7]}))},i=function(){return t.Ls[t.locale()]},a=function(n,e){return n.formats[e]||function(n){return n.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(n,e,t){return e||t.slice(1)}))}(n.formats[e.toUpperCase()])},s=function(){var n=this;return{months:function(e){return e?e.format("MMMM"):u(n,"months")},monthsShort:function(e){return e?e.format("MMM"):u(n,"monthsShort","months",3)},firstDayOfWeek:function(){return n.$locale().weekStart||0},weekdays:function(e){return e?e.format("dddd"):u(n,"weekdays")},weekdaysMin:function(e){return e?e.format("dd"):u(n,"weekdaysMin","weekdays",2)},weekdaysShort:function(e){return e?e.format("ddd"):u(n,"weekdaysShort","weekdays",3)},longDateFormat:function(e){return a(n.$locale(),e)},meridiem:this.$locale().meridiem,ordinal:this.$locale().ordinal}};r.localeData=function(){return s.bind(this)()},t.localeData=function(){var n=i();return{firstDayOfWeek:function(){return n.weekStart||0},weekdays:function(){return t.weekdays()},weekdaysShort:function(){return t.weekdaysShort()},weekdaysMin:function(){return t.weekdaysMin()},months:function(){return t.months()},monthsShort:function(){return t.monthsShort()},longDateFormat:function(e){return a(n,e)},meridiem:n.meridiem,ordinal:n.ordinal}},t.months=function(){return u(i(),"months")},t.monthsShort=function(){return u(i(),"monthsShort","months",3)},t.weekdays=function(n){return u(i(),"weekdays",null,null,n)},t.weekdaysShort=function(n){return u(i(),"weekdaysShort","weekdays",3,n)},t.weekdaysMin=function(n){return u(i(),"weekdaysMin","weekdays",2,n)}}}));

/***/ }),

/***/ 176:
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};return function(t,o,n){var r=o.prototype,i=r.format;n.en.formats=e,r.format=function(t){void 0===t&&(t="YYYY-MM-DDTHH:mm:ssZ");var o=this.$locale().formats,n=function(t,o){return t.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,n,r){var i=r&&r.toUpperCase();return n||o[r]||e[r]||o[i].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,o){return t||o.slice(1)}))}))}(t,void 0===o?{}:o);return i.call(this,n)}}}));

/***/ }),

/***/ 183:
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";var e="week",t="year";return function(i,n,r){var f=n.prototype;f.week=function(i){if(void 0===i&&(i=null),null!==i)return this.add(7*(i-this.week()),"day");var n=this.$locale().yearStart||1;if(11===this.month()&&this.date()>25){var f=r(this).startOf(t).add(1,t).date(n),s=r(this).endOf(e);if(f.isBefore(s))return 1}var a=r(this).startOf(t).date(n).startOf(e).subtract(1,"millisecond"),o=this.diff(a,e,!0);return o<0?r(this).startOf("week").week():Math.ceil(o)},f.weeks=function(e){return void 0===e&&(e=null),this.week(e)}}}));

/***/ }),

/***/ 172:
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";return function(e,t){t.prototype.weekYear=function(){var e=this.month(),t=this.week(),n=this.year();return 1===t&&11===e?n+1:0===e&&t>=52?n-1:n}}}));

/***/ }),

/***/ 833:
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";return function(e,t){t.prototype.weekday=function(e){var t=this.$locale().weekStart||0,i=this.$W,n=(i<t?i+7:i)-t;return this.$utils().u(e)?n:this.subtract(n,"day").add(e,"day")}}}));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
// to use a complex file name to prevent same name with user project 
// e.g. bad name init-dayjs.js
// e.g. good name init-dayjs-webpack-plugin-entry
var dayjs = __webpack_require__(484);var isSameOrBefore = __webpack_require__(412);var isSameOrAfter = __webpack_require__(212);var advancedFormat = __webpack_require__(734);var customParseFormat = __webpack_require__(285);var weekday = __webpack_require__(833);var weekYear = __webpack_require__(172);var weekOfYear = __webpack_require__(183);var isMoment = __webpack_require__(425);var localeData = __webpack_require__(36);var localizedFormat = __webpack_require__(176);dayjs.extend(isSameOrBefore);dayjs.extend(isSameOrAfter);dayjs.extend(advancedFormat);dayjs.extend(customParseFormat);dayjs.extend(weekday);dayjs.extend(weekYear);dayjs.extend(weekOfYear);dayjs.extend(isMoment);dayjs.extend(localeData);dayjs.extend(localizedFormat);var antdPlugin = __webpack_require__(873);dayjs.extend(antdPlugin);
})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
let friendsList = [];
let thumbnailCache = new Map();
let places = {};

const getFriends = function (id) {
  return new Promise((resolve, reject) => {
    fetch(`https://friends.roblox.com/v1/users/${id}/friends?userSort=StatusFrequents`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json'
      },
      method: 'GET'
    }).then(response => {
      response.json().then(data => {
        resolve(data.data);
      });
    }).catch(err => {
      reject(err);
    });
  });
};

const getThumbnails = function (data) {
  return new Promise(resolve => {
    fetch('https://thumbnails.roblox.com/v1/batch', {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      method: 'POST'
    }).then(response => {
      response.json().then(data => {
        if (data.errors) {
          resolve([]);
        } else {
          resolve(data.data);
        }
      });
    });
  });
};

const sliceIntoChunks = function (arr, chunkSize) {
  const res = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }

  return res;
};

const getAllThumbnails = function (data) {
  const chunks = sliceIntoChunks(data, 60);
  return Promise.all(chunks.map(chunk => {
    return getThumbnails(chunk);
  }));
};

let multiGetPlaceDetailsCache = {};

const multiGetPlaceDetails = function (ids) {
  let cache = [];
  let idsToResolve = [];

  for (const element of ids) {
    let id = element;

    if (multiGetPlaceDetailsCache[id]) {
      cache.push(multiGetPlaceDetailsCache[id]);
    } else {
      idsToResolve.push(id);
    }
  }

  if (idsToResolve.length === 0) {
    return Promise.resolve(cache);
  }

  return new Promise(resolve => {
    fetch(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${idsToResolve.join('&placeIds=')}`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json'
      },
      method: 'GET'
    }).then(response => {
      response.json().then(data => {
        for (const element of data) {
          multiGetPlaceDetailsCache[element.placeId] = element;
        }

        if (cache.length > 0) {
          data.push(cache);
        }

        resolve(data);
      });
    });
  });
};

const getPresence = function (friends, url) {
  const ids = friends.map(friend => friend.id);
  const request = JSON.stringify({
    userIds: ids
  });
  return new Promise((resolve, reject) => {
    fetch(url, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: request,
      method: 'POST'
    }).then(response => {
      response.json().then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  });
};

const fetchThumbnails = function (ids, thumbnailType, size) {
  return new Promise(resolve => {
    let request = [];
    let cache = [];
    ids.forEach(id => {
      const cached = thumbnailCache.get(id);

      if (cached) {
        cache.push({
          targetId: id,
          type: thumbnailType,
          imageUrl: cached
        });
      } else {
        request.push({
          format: 'png',
          requestId: `${id}:GameIcon:150x150:jpeg:regular`,
          targetId: id,
          size: size,
          token: '',
          type: thumbnailType
        });
      }
    });

    if (request.length > 0) {
      getAllThumbnails(request).then(data => {
        data = data.flat();

        if (data) {
          for (const element of data) {
            thumbnailCache.set(element.targetId, element.imageUrl);
          }

          if (cache.length > 0) {
            data.push(cache);
          }

          resolve(data);
        }
      });
    } else {
      resolve(cache);
    }
  });
};

let userId;

const getUserId = async () => {
  if (userId) {
    return Promise.resolve(userId);
  }

  try {
    return await new Promise((resolve, reject) => {
      fetch('https://www.roblox.com/my/account/json', {
        method: 'GET',
        credentials: 'include'
      }).then(response => {
        try {
          response.json().then(data => {
            userId = data.UserId;
            resolve(data.UserId);
          });
        } catch (e) {
          reject(e);
        }
      });
    });
  } catch (err) {
    console.error(`getUserId failed ${err}`);
  }
};

const getPlaceIds = function (friends) {
  return new Promise(resolve => {
    friends.forEach(friend => {
      if (friend.placeId && !places[friend.placeId]) {
        places[friend.placeId] = {};
      }

      if (friend.rootPlaceId && !places[friend.rootPlaceId]) {
        places[friend.rootPlaceId] = {};
      }
    });
    resolve(places);
  });
};

const getMissingValues = (array, targetKey) => {
  return new Promise(resolve => {
    let missing = [];

    for (const [key, value] of Object.entries(array)) {
      if (!value[targetKey]) {
        missing.push(key);
      }
    }

    resolve(missing);
  });
};

const getFriendInfo = async () => {
  const userId = await getUserId();
  const friends = await getFriends(userId);

  if ((friends === null || friends === void 0 ? void 0 : friends.length) === 0) {
    return Promise.resolve([]);
  }

  const presence = await getPresence(friends, "https://presence.roblox.com/v1/presence/users");
  const lastOnline = await getPresence(friends, "https://presence.roblox.com/v1/presence/last-online");
  await getPlaceIds(presence.userPresences);
  const placesInfoNeeded = await getMissingValues(places, 'name');
  const placeDetails = await multiGetPlaceDetails(placesInfoNeeded);
  const iconsNeeded = await getMissingValues(places, 'icon');
  const placeIcons = await fetchThumbnails(iconsNeeded, 'PlaceIcon', "150x150");
  const friendIcons = await fetchThumbnails(friends.map(friend => friend.id), 'AvatarHeadShot', "150x150");
  const thumbnailsNeeded = await getMissingValues(places, 'thumbnail');
  const gameThumbnails = await fetchThumbnails(thumbnailsNeeded, 'GameThumbnail', "768x432");
  const lastOnlineMap = new Map();

  //for (const element of lastOnline.lastOnlineTimestamps) {
  //  lastOnlineMap.set(element.userId, element.lastOnline);
  //}

  const presenceIdKeys = {};

  for (const element of presence.userPresences) {
    presenceIdKeys[element.userId] = element;
    //const lastOnline = lastOnlineMap.get(element.userId);

    //if (lastOnline) {
    //  presenceIdKeys[element.userId].lastOnline = lastOnlineMap.get(element.userId);
    //}
  }

  for await (const info of placeDetails) {
    if (info.placeId && info.name !== undefined) {
      places[info.placeId].name = info.name;
      places[info.placeId].price = info.price;
      places[info.placeId].universeId = info.universeId;
      places[info.placeId].reasonProhibited = info.reasonProhibited;
      places[info.placeId].builder = info.builder;
      places[info.placeId].description = info.description;
      places[info.placeId].isPlayable = info.isPlayable;
    }
  }

  const friendIconMap = new Map();

  for await (const icon of friendIcons.flat()) {
    if (icon.targetId && icon.imageUrl || icon.state === "Blocked") {
      if (icon.state === "Blocked") {
        console.log("Blocked", icon);
      }

      friendIconMap.set(icon.targetId, icon.imageUrl);
    }
  }

  for (const friend of friends) {
    if (friendIconMap.has(friend.id)) {
      friend.avatar = friendIconMap.get(friend.id);
    }
  }

  for await (const icon of placeIcons.flat()) {
    if (icon.targetId && icon.imageUrl || icon.state === "Blocked") {
      if (icon.state === "Blocked") {
        console.log("Blocked", icon);
      }

      places[icon.targetId].icon = icon.imageUrl;
    }
  }

  for await (const icon of gameThumbnails.flat()) {
    if (icon.targetId && icon.imageUrl || icon.state === "Blocked") {
      if (icon.state === "Blocked") {
        console.log("Blocked", icon);
      }

      places[icon.targetId].thumbnail = icon.imageUrl;
    }
  }

  return {
    placeDetails: places,
    presence: presenceIdKeys,
    friends: friends
  };
};

let openPorts = function () {
  let index = 0;
  let ports = {};
  let op = {
    getPorts: function () {
      let result = {};

      for (let id in ports) {
        result[id] = ports[id];
      }

      return result;
    },
    getPortsArray: function () {
      let result = [];

      for (let id in ports) {
        result.push(ports[id]);
      }

      return result;
    },
    get: function (id) {
      return ports[id];
    },
    add: function (port) {
      let id = index;
      ports[id] = port;
      port.onDisconnect.addListener(() => {
        op.remove(id);
      });
      index++;
      return id;
    },
    remove: function (id) {
      delete ports[id];
    },
    messageAll: function (message) {
      for (let id in ports) {
        ports[id].postMessage(message);
      }
    }
  };
  return op;
}();

getFriendInfo().then(friends => {
  friendsList = friends;
  openPorts.messageAll(friends);
});
setInterval(() => {
  const ports = openPorts.getPorts();
  if (!ports || Object.keys(ports).length === 0) return;
  getFriendInfo().then(friends => {
    friendsList = friends;
    openPorts.messageAll(friends);
  });
}, 10000);
chrome.runtime.onConnect.addListener(port => {
  console.assert(port.name === 'update');
  port.onMessage.addListener(() => {
    port.postMessage(friendsList);
  });
  openPorts.add(port);
});
})();

/******/ })()
;