(this["webpackJsonptwitter-clone"]=this["webpackJsonptwitter-clone"]||[]).push([[0],{1698:function(e,t,a){var n={"./ReadMe.md":1699,"./af_ZA":123,"./af_ZA.js":123,"./ar":124,"./ar.js":124,"./az":125,"./az.js":125,"./cz":126,"./cz.js":126,"./de":127,"./de.js":127,"./de_AT":128,"./de_AT.js":128,"./de_CH":129,"./de_CH.js":129,"./el":130,"./el.js":130,"./en":131,"./en.js":131,"./en_AU":132,"./en_AU.js":132,"./en_AU_ocker":133,"./en_AU_ocker.js":133,"./en_BORK":134,"./en_BORK.js":134,"./en_CA":135,"./en_CA.js":135,"./en_GB":136,"./en_GB.js":136,"./en_GH":137,"./en_GH.js":137,"./en_IE":138,"./en_IE.js":138,"./en_IND":139,"./en_IND.js":139,"./en_NG":140,"./en_NG.js":140,"./en_US":141,"./en_US.js":141,"./en_ZA":142,"./en_ZA.js":142,"./es":143,"./es.js":143,"./es_MX":144,"./es_MX.js":144,"./fa":145,"./fa.js":145,"./fi":146,"./fi.js":146,"./fr":147,"./fr.js":147,"./fr_CA":148,"./fr_CA.js":148,"./fr_CH":149,"./fr_CH.js":149,"./ge":150,"./ge.js":150,"./hr":151,"./hr.js":151,"./hy":152,"./hy.js":152,"./id_ID":153,"./id_ID.js":153,"./it":154,"./it.js":154,"./ja":155,"./ja.js":155,"./ko":156,"./ko.js":156,"./nb_NO":157,"./nb_NO.js":157,"./ne":158,"./ne.js":158,"./nl":159,"./nl.js":159,"./nl_BE":160,"./nl_BE.js":160,"./pl":161,"./pl.js":161,"./pt_BR":162,"./pt_BR.js":162,"./pt_PT":163,"./pt_PT.js":163,"./ro":164,"./ro.js":164,"./ru":165,"./ru.js":165,"./sk":166,"./sk.js":166,"./sv":167,"./sv.js":167,"./tr":168,"./tr.js":168,"./uk":169,"./uk.js":169,"./vi":170,"./vi.js":170,"./zh_CN":171,"./zh_CN.js":171,"./zh_TW":172,"./zh_TW.js":172,"./zu_ZA":173,"./zu_ZA.js":173};function r(e){var t=s(e);return a(t)}function s(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=s,e.exports=r,r.id=1698},1825:function(e,t,a){},1826:function(e,t,a){},1828:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(25),o=a.n(s),i=(a(202),a(203),a(174)),c=a.n(i);a(204);var l=function(e){var t=e.active,a=e.text,n=e.Icon;return r.a.createElement("div",{className:"sidebarOption ".concat(t&&"sidebarOption--active")},r.a.createElement(n,null),r.a.createElement("h2",{className:"text"},a))},m=a(179),u=a.n(m),d=a(46),f=a.n(d),p=a(180),_=a.n(p),h=a(181),j=a.n(h),v=a(182),g=a.n(v),E=a(1847);function N(){console.log("Clicked identity")}var b=function(){return r.a.createElement("div",{className:"sidebar"},r.a.createElement(c.a,{className:"sidebar__twitterIcon"}),r.a.createElement(l,{active:!0,Icon:u.a,text:"Home"}),r.a.createElement(l,{Icon:f.a,text:"Explore"}),r.a.createElement(l,{Icon:_.a,text:"Notifications"}),r.a.createElement(l,{Icon:j.a,text:"Messages"}),r.a.createElement("a",{onClick:N},r.a.createElement(l,{Icon:g.a,text:"Profile"})),r.a.createElement(E.a,{variant:"outlined",className:"sidebar__tweet",fullWidth:!0},"Tweet"))},w=a(183),k=a(184),y=a(194),x=a(192),I=a(47),S=a.n(I),C=a(53),O=(a(227),a(1848)),A=a(185),z=a.n(A).a.initializeApp({apiKey:"AIzaSyCw-li0IscS2rJr68dSjoJL3KM3eFq5PfE",authDomain:"twitter-clone-1faac.firebaseapp.com",databaseURL:"https://twitter-clone-1faac.firebaseio.com",projectId:"twitter-clone-1faac",storageBucket:"twitter-clone-1faac.appspot.com",messagingSenderId:"316208638057",appId:"1:316208638057:web:75a37bf24fab32ff145af8",measurementId:"G-HGFP2LDXP9"}).firestore();var B=function(){var e=Object(n.useState)(""),t=Object(C.a)(e,2),a=t[0],s=t[1],o=Object(n.useState)(""),i=Object(C.a)(o,2),c=i[0],l=i[1];return r.a.createElement("div",{className:"tweetBox"},r.a.createElement("form",null,r.a.createElement("div",{className:"tweetBox__input"},r.a.createElement(O.a,{src:"https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png"}),r.a.createElement("input",{onChange:function(e){return s(e.target.value)},value:a,placeholder:"What's happening?",type:"text"})),r.a.createElement("input",{value:c,onChange:function(e){return l(e.target.value)},className:"tweetBox__imageInput",placeholder:"Optional: Enter image URL",type:"text"}),r.a.createElement(E.a,{onClick:function(e){e.preventDefault(),z.collection("posts").add({displayName:"Rafeh Qazi",username:"cleverqazi",verified:!0,text:a,image:c,avatar:"https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png"}),s(""),l("")},type:"submit",className:"tweetBox__tweetButton"},"Tweet")))},R=(a(238),a(186)),T=a.n(R),D=a(187),H=a.n(D),M=a(188),U=a.n(M),P=a(189),L=a.n(P),W=Object(n.forwardRef)((function(e,t){var a=e.displayName,n=e.username,s=e.verified,o=e.text,i=e.image,c=e.avatar;e.explanation;return r.a.createElement("div",{className:"post",ref:t},r.a.createElement("div",{className:"post__avatar"},r.a.createElement(O.a,{src:c})),r.a.createElement("div",{className:"post__body"},r.a.createElement("div",{className:"post__header"},r.a.createElement("div",{className:"post__headerText"},r.a.createElement("h3",null,a," ",r.a.createElement("span",{className:"post__headerSpecial"},s&&r.a.createElement(T.a,{className:"post__badge"})," @",n))),r.a.createElement("div",{className:"post__headerDescription"},r.a.createElement("p",null,o))),r.a.createElement("img",{src:i,alt:""}),r.a.createElement("div",{className:"post__footer"},r.a.createElement(H.a,{fontSize:"small"}),r.a.createElement(U.a,{fontSize:"small"}),r.a.createElement(L.a,{fontSize:"small"}))))})),G=(a(239),a(191)),J=a(193),K=function(e){Object(y.a)(a,e);var t=Object(x.a)(a);function a(e){var n;return Object(w.a)(this,a),(n=t.call(this,e)).addPost=function(){var e="/api/getUserInfo/";n.setState({loading:!0}),S.a.get("/api/getRandomTweet/").then((function(t){var a;a=t.data[0],e=e+a.poster+"/",a.image.startsWith("api:")&&(a.image="https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif",S.a.get(a.image.substring(4)).then((function(e){return a.image=e.data})).catch((function(e){return console.log("axios error with image api: "+e)}))),S.a.get(e).then((function(e){var t=e.data[0];if(a.username=t.username,a.displayName=t.displayName,a.avatar=t.avatar,a.verified=t.verified,a.username.startsWith("random:")){var r=function(){var e={firstName:{faker:"name.firstName"},lastName:{faker:"name.lastName"},username:{function:function(){return this.object.firstName+this.object.lastName+Math.floor(10*Math.random())}},displayName:{function:function(){return this.object.firstName+" "+this.object.lastName}}};return Object(J.a)().schema("user",e,1).buildSync().user[0]}();a.username=r.username,a.displayName=r.displayName}n.setState({posts:n.state.posts.concat(a)}),n.setState({loading:!1})})).catch((function(e){console.log("axios error with getting user info: "+e),n.setState({loading:!1})}))})).catch((function(e){console.log("axios error: "+e),n.setState({loading:!1})}))},n.handleScroll=function(e){e.preventDefault();var t=Math.round(e.target.scrollHeight-e.target.scrollTop);!1===n.state.loading&&t<=Math.ceil(e.target.clientHeight)+300&&n.addPost()},n.state={loading:!1,viewers:[],posts:[]},n}return Object(k.a)(a,[{key:"componentDidMount",value:function(){for(var e=0;e<6;e++)this.addPost()}},{key:"shouldComponentUpdate",value:function(e,t,a){return!this.state.loading}},{key:"render",value:function(){return r.a.createElement("div",{className:"feed",onScroll:this.handleScroll},r.a.createElement("div",{className:"feed__header"},r.a.createElement("h2",null,"Home")),r.a.createElement(B,null),r.a.createElement(G.a,null,this.state.posts.map((function(e,t){return r.a.createElement(W,{key:t,username:e.username,displayName:e.displayName,verified:e.verified,text:e.text,avatar:e.avatar,image:e.image})}))),r.a.createElement("button",{onClick:this.addPost}," load next post "))}}]),a}(r.a.Component);a(1825),a(1829);var X=function(){return r.a.createElement("div",{className:"widgets"},r.a.createElement("div",{className:"widgets__input"},r.a.createElement(f.a,{className:"widgets__searchIcon"}),r.a.createElement("input",{placeholder:"Search Twitter",type:"text"})),r.a.createElement("div",{className:"widgets__widgetContainer"},r.a.createElement("h2",null,"What's happening")))};a(1826);var Z=function(){return r.a.createElement("html",{lang:"en"},r.a.createElement("div",{className:"app"},r.a.createElement(b,null),r.a.createElement(K,null),r.a.createElement(X,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},197:function(e,t,a){e.exports=a(1828)},202:function(e,t,a){},203:function(e,t,a){},204:function(e,t,a){},227:function(e,t,a){},238:function(e,t,a){},239:function(e,t,a){}},[[197,1,2]]]);
//# sourceMappingURL=main.66e78768.chunk.js.map