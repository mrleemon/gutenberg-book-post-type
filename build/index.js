!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=7)}([function(e,t){e.exports=window.wp.element},function(e,t){e.exports=window.wp.data},function(e,t){e.exports=window.wp.i18n},function(e,t){e.exports=window.wp.compose},function(e,t){e.exports=window.wp.components},function(e,t){e.exports=window.wp.plugins},function(e,t){e.exports=window.wp.editPost},function(e,t,o){"use strict";o.r(t);var n=o(0),r=o(2),i=o(3),a=o(4),c=o(5),u=o(6),l=o(1),b=(new Date).getFullYear();let p=({isbn:e,onUpdateIsbn:t})=>Object(n.createElement)(a.TextControl,{label:Object(r.__)("ISBN","gutenberg-book-post-type"),value:e,onChange:e=>t(e)}),s=({publication_year:e,onUpdatePublicationYear:t})=>Object(n.createElement)(a.TextControl,{label:Object(r.__)("Publication Year","gutenberg-book-post-type"),type:"number",value:e||b,min:1,onChange:e=>t(parseInt(e))});p=Object(i.compose)([Object(l.withSelect)(e=>({isbn:e("core/editor").getEditedPostAttribute("meta")._book_isbn})),Object(l.withDispatch)(e=>({onUpdateIsbn:t=>{e("core/editor").editPost({meta:{_book_isbn:t}})}}))])(p),s=Object(i.compose)([Object(l.withSelect)(e=>({publication_year:e("core/editor").getEditedPostAttribute("meta")._book_publication_year})),Object(l.withDispatch)(e=>({onUpdatePublicationYear:t=>{e("core/editor").editPost({meta:{_book_publication_year:t}})}}))])(s),Object(c.registerPlugin)("book-data-panel",{icon:"book",render:()=>"book"!==select("core/editor").getCurrentPostType()?null:Object(n.createElement)(u.PluginDocumentSettingPanel,{name:"book-data",title:Object(r.__)("Book Data","gutenberg-book-post-type"),className:"book-data-panel"},Object(n.createElement)(p,null),Object(n.createElement)(s,null))})}]);