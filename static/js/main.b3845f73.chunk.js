(this["webpackJsonppicto-selector"]=this["webpackJsonppicto-selector"]||[]).push([[0],{25:function(e,t,n){},26:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),a=n(11),d=n.n(a),i=(n(25),n(13)),s=n(3),o=n(10),l=(n(26),n(9)),j=n(1);function u(e){var t=e.addRowMethod;return Object(j.jsx)("button",{className:"add-row-btn btn btn-primary",onClick:t,children:"Add row"})}function b(){return Object(j.jsx)("button",{className:"btn btn-secondary",onClick:function(){window.print()},children:"Print!"})}var O=n(8),f=n(7),g=function(e){return{id:e.id,name:e.name,rowId:e.rowId,originalId:e.originalId,img:e.img}},h=function(e){var t=0;return e.forEach((function(e){e.id>t&&(t=e.id)})),t+1},p=function(e,t,n,c){var r=Object(i.a)(e);return t&&r.splice(t,1),r.splice(n,0,c),r},x=function(e){return+e.split("row-")[1]||null},m=function(e){return+e.split("card-")[1]||null},v=n(16),I=n(12);function w(e){var t=e.card,n=e.deleteMethod;return Object(j.jsxs)(v.a,{body:!0,className:"doc-card m-2 text-center",children:[Object(j.jsx)(I.a,{width:"100%",src:"/picto/".concat(t.img),alt:t.img}),Object(j.jsx)("div",{className:"doc-card__delete",children:Object(j.jsx)("button",{className:"btn btn-sm btn-danger mt-2 ",onClick:function(){return n(t)},children:"Delete"})})]})}function N(e){var t=e.deleteMethod,n=e.deleteCardMethod,r=e.cards,a=e.row,d=function(){var e={transition:".25s ease"},t=Object(s.a)(Object(s.a)({},e),{},{opacity:0,pointerEvents:"none"}),n=Object(s.a)(Object(s.a)({},e),{},{opacity:1,pointerEvents:"auto"}),r=Object(c.useState)(n),a=Object(o.a)(r,2),d=a[0],i=a[1];return{styleObj:d,handleHover:function(){i(n)},handleHoverLeave:function(){i(t)}}}(),i=d.styleObj,u=d.handleHover,b=d.handleHoverLeave,g=function(){return a.cardsIds.length};return Object(j.jsx)(O.a,{children:Object(j.jsx)(f.a,{children:Object(j.jsx)(l.c,{droppableId:"row-".concat(a.id),direction:"horizontal",children:function(e,c){return Object(j.jsxs)("div",Object(s.a)(Object(s.a)({ref:e.innerRef},e.droppableProps),{},{className:"doc-row card mb-2".concat(c.isDraggingOver?" doc-row--is-dragged-over":"").concat(g()?"":" doc-row--is-empty"),onMouseLeave:b,onMouseEnter:u,children:[Object(j.jsxs)(O.a,{className:"no-gutters flex-nowrap",children:[a.cardsIds.map((function(e,t){var c=r.find((function(t){return t.id===e}));return c?Object(j.jsx)(l.b,{draggableId:"card-"+c.id,index:t,children:function(e){return Object(j.jsx)(f.a,Object(s.a)(Object(s.a)(Object(s.a)({sm:"auto"},e.draggableProps),e.dragHandleProps),{},{ref:e.innerRef,className:"doc-row-col flex-shrink-1",children:Object(j.jsx)(w,{deleteMethod:n,card:c})}))}},e):null})),e.placeholder,!g()&&Object(j.jsx)("div",{className:"doc-row__empty-text",children:"Drag pictures here!"})]}),Object(j.jsx)(O.a,{children:Object(j.jsx)(f.a,{className:"text-right",children:Object(j.jsx)("button",{onClick:function(){return t(a.id)},className:"btn-danger btn btn-sm doc-row-delete",style:i,children:"Delete row"})})})]}))}})})})}function y(e){var t=e.rows,n=e.cards,c=e.setRowsMethod,r=e.setCardsMethod,a=e.userIsDragging,d=e.settings,s=function(e){c(t.filter((function(t){return t.id!==e}))),r(n.filter((function(t){return t.rowId!==e})))},o=function(e){var c=t.find((function(t){return t.id===e.rowId}));c.cardsIds=c.cardsIds.filter((function(t){return t!==e.id})),r(n.filter((function(t){return t.id!==e.id})))};return Object(j.jsxs)("div",{className:"doc".concat(a?" doc--is-dragging":""),children:[function(){if(d.title)return Object(j.jsx)(O.a,{children:Object(j.jsx)(f.a,{children:Object(j.jsx)("h1",{className:"doc-title",children:d.title})})})}(),t.map((function(e,t){return Object(j.jsx)(N,{row:e,deleteCardMethod:o,deleteMethod:s,cards:(c=e.id,n.filter((function(e){return c===e.rowId})))},t);var c})),Object(j.jsx)("div",{className:"text-center",children:Object(j.jsxs)(O.a,{className:"justify-content-md-center",children:[Object(j.jsx)(f.a,{className:"col-md-auto",children:Object(j.jsx)(u,{addRowMethod:function(){var e=Object(i.a)(t);e.push({id:h(t),cardsIds:[]}),c(e)}})}),Object(j.jsx)(f.a,{className:"col-md-auto",children:Object(j.jsx)(b,{})})]})})]})}function D(e){var t=e.card,n=e.isFloating;return Object(j.jsx)(v.a,{body:!0,className:"bg-primary doc-card doc-card--read-only doc-card--small text-center ".concat(n?"doc-card--floating":""),children:Object(j.jsx)(I.a,{width:"100%",src:"/picto/".concat(t.img),alt:t.img})})}function M(e){var t=e.cards,n=e.userIsDragging;return Object(j.jsx)("div",{className:"cards-bank ".concat(n?"cards-bank--dragging":""),children:Object(j.jsx)(l.c,{isDropDisabled:!0,droppableId:"card-bank-droppable",children:function(e,n){return Object(j.jsx)("div",Object(s.a)(Object(s.a)({ref:e.innerRef},e.droppableProps),{},{children:Object(j.jsxs)(O.a,{children:[t.map((function(e,t){return Object(j.jsx)(f.a,{sm:"auto",children:Object(j.jsx)(l.b,{draggableId:"card-org-id-"+e.originalId,index:t,children:function(t,n){return Object(j.jsxs)(r.a.Fragment,{children:[Object(j.jsx)("div",Object(s.a)(Object(s.a)(Object(s.a)({},t.draggableProps),t.dragHandleProps),{},{ref:t.innerRef,children:Object(j.jsx)(D,{isFloating:n.isDragging,card:e})})),n.isDragging&&Object(j.jsx)("div",{children:Object(j.jsx)(D,{card:e})})]})}})},t)})),e.placeholder]})}))}})})}var k=n(34);var C=function(){var e=Object(c.useState)({title:null}),t=Object(o.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)([{id:1,cardsIds:[]},{id:2,cardsIds:[]},{id:3,cardsIds:[]}]),d=Object(o.a)(a,2),u=d[0],b=d[1],v=Object(c.useState)([]),I=Object(o.a)(v,2),w=I[0],N=I[1],D=Object(c.useState)(!1),C=Object(o.a)(D,2),_=C[0],P=C[1],H=[g({name:"card1",originalId:1,img:"putonclothes_c_l.jpg"}),g({name:"card2",originalId:2,img:"putoncoat_c_l.jpg"}),g({name:"card3",originalId:3,img:"putondress_c_l.jpg"}),g({name:"card4",originalId:4,img:"putonshoes_c_l.jpg"})],R=function(e,t,n,c){var r=w.find((function(e){return e.id===t})),a=u.find((function(e){return e.id===r.rowId})),d=u.find((function(t){return t.id===e}));a.cardsIds.splice(c,1),r.rowId=e;var i=p(d.cardsIds,null,n,r.id);d.cardsIds=i},S=function(e,t,n,c){var r=H.find((function(e){return e.originalId===t})),a=u.find((function(t){return t.id===e})),d=Object(s.a)({},r);d.id=h(w),d.rowId=e;var o=p(a.cardsIds,null,n,d.id);a.cardsIds=o,N([].concat(Object(i.a)(w),[d]))};return Object(j.jsx)("div",{className:"picto-app",children:Object(j.jsx)(l.a,{onDragEnd:function(e){P(!1);var t=e.destination,n=e.source,c=e.draggableId;if(t)if("card-bank-droppable"!==t.droppableId)if(n&&"card-bank-droppable"!==n.droppableId){var r=m(c),a=x(t.droppableId);R(a,r,t.index,n.index)}else{var d=function(e){return+e.split("card-org-id-")[1]||null}(c),i=x(t.droppableId);S(i,d,t.index,n.index)}else{var s=m(c);N(w.filter((function(e){return e.id!==s})))}},onDragStart:function(){P(!0)},children:Object(j.jsx)(k.a,{fluid:!0,className:"p-3",children:Object(j.jsxs)(O.a,{children:[Object(j.jsxs)(f.a,{className:"settings-pane ".concat(_?"settings-pane--disabled":""),sm:4,children:[Object(j.jsxs)("div",{class:"form-group",children:[Object(j.jsx)("label",{for:"title",children:"Document title"}),Object(j.jsx)("input",{type:"text",class:"form-control",id:"title","aria-describedby":"emailHelp",placeholder:"Enter title",value:n.title,onChange:function(e){return r(Object(s.a)(Object(s.a)({},n),{},{title:e.target.value}))}}),Object(j.jsx)("small",{id:"titleHelp",class:"form-text text-muted",children:"This title will appear at the top of the document"})]}),Object(j.jsx)(O.a,{children:Object(j.jsx)(f.a,{children:Object(j.jsx)("hr",{})})}),Object(j.jsx)(O.a,{className:"mt-4",children:Object(j.jsx)(f.a,{children:Object(j.jsx)(M,{cards:H,userIsDragging:_})})})]}),Object(j.jsx)(f.a,{className:"picto-doc-wrapper-col",children:Object(j.jsx)(y,{settings:n,userIsDragging:_,setCardsMethod:N,setRowsMethod:b,rows:u,cards:w})})]})})})})},_=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,35)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,d=t.getTTFB;n(e),c(e),r(e),a(e),d(e)}))};d.a.render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(C,{})}),document.getElementById("root")),_()}},[[32,1,2]]]);
//# sourceMappingURL=main.b3845f73.chunk.js.map