import{c as t,A as K,d as O,_ as b,o as v,a as w,b as M,r as h,e as y,w as o,F as P,f as j,g as a,h as c,t as B,u as N}from"./app.95a4fd28.js";var T={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"}}]},name:"user",theme:"outlined"},D=T;function g(e){for(var n=1;n<arguments.length;n++){var s=arguments[n]!=null?Object(arguments[n]):{},r=Object.keys(s);typeof Object.getOwnPropertySymbols=="function"&&(r=r.concat(Object.getOwnPropertySymbols(s).filter(function(u){return Object.getOwnPropertyDescriptor(s,u).enumerable}))),r.forEach(function(u){V(e,u,s[u])})}return e}function V(e,n,s){return n in e?Object.defineProperty(e,n,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[n]=s,e}var i=function(n,s){var r=g({},n,s.attrs);return t(K,g({},r,{icon:D}),null)};i.displayName="UserOutlined";i.inheritAttrs=!1;var z=i;const E=O({setup(){return{}}});function F(e,n,s,r,u,k){return v(),w("h1",null,"Demo")}var I=b(E,[["render",F]]);const q=O({components:{UserOutlined:z,HTMLHeader:I},setup(){const e=N(),n=M(()=>e.state.auth.user),s=h(["1"]),r=h(["sub1"]);return{selectedKeys:s,openKeys:r,logout:()=>{e.dispatch("auth/logout").then(()=>{j.push("/login")})},user:n}}}),x={class:"demo-dropdown-wrap"},G=c(" Post "),J=c("List"),Q=c("Create");function R(e,n,s,r,u,k){const C=a("HTMLHeader"),p=a("UserOutlined"),l=a("a-menu-item"),_=a("a-menu"),$=a("a-dropdown-button"),S=a("AppstoreOutlined"),f=a("router-link"),U=a("a-sub-menu"),m=a("a-col"),A=a("router-view"),L=a("a-row"),H=a("a-layout");return v(),w(P,null,[t(C,{ref:"header"},null,512),y("div",x,[t($,null,{overlay:o(()=>[t(_,{onClick:e.handleMenuClick},{default:o(()=>[t(l,{key:"1"},{default:o(()=>[t(p),y("span",{onClick:n[0]||(n[0]=(...d)=>e.logout&&e.logout(...d))},"Logout")]),_:1})]),_:1},8,["onClick"])]),icon:o(()=>[t(p)]),default:o(()=>[c(B(e.user.name)+" ",1)]),_:1})]),t(H,{ref:"authLayout"},{default:o(()=>[t(L,null,{default:o(()=>[t(m,{span:3},{default:o(()=>[t(_,{selectedKeys:e.selectedKeys,"onUpdate:selectedKeys":n[1]||(n[1]=d=>e.selectedKeys=d),style:{width:"150px"},mode:"inline",theme:"dark","open-keys":e.openKeys,onOpenChange:e.onOpenChange},{default:o(()=>[t(U,{key:"sub1"},{icon:o(()=>[]),title:o(()=>[t(S),G]),default:o(()=>[t(l,{key:"1"},{default:o(()=>[t(f,{to:"/posts"},{default:o(()=>[J]),_:1})]),_:1}),t(l,{key:"2"},{default:o(()=>[t(f,{to:"/posts/create"},{default:o(()=>[Q]),_:1})]),_:1})]),_:1})]),_:1},8,["selectedKeys","open-keys","onOpenChange"])]),_:1}),t(m,{span:19,offset:1},{default:o(()=>[t(A,{class:"auth-main"})]),_:1})]),_:1})]),_:1},512)],64)}var X=b(q,[["render",R]]);export{X as default};