!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){!function(){e.exports=this.wp.element}()},function(e,t,n){"use strict";n.r(t);var o=n(0),r=wp.i18n.__,i=wp.compose.compose,u=wp.components.TextControl,a=wp.plugins.registerPlugin,c=wp.editPost.PluginDocumentSettingPanel,l=wp.data,b=l.select,p=l.withSelect,s=l.withDispatch,f=(new Date).getFullYear(),d=function(e){var t=e.isbn,n=e.onUpdateIsbn;return Object(o.createElement)(u,{label:r("ISBN","gutenberg-book-post-type"),value:t,onChange:function(e){return n(e)}})},m=function(e){var t=e.publication_year,n=e.onUpdatePublicationYear;return Object(o.createElement)(u,{label:r("Publication Year","gutenberg-book-post-type"),type:"number",value:t||f,min:1,onChange:function(e){return n(parseInt(e))}})};d=i([p((function(e){return{isbn:e("core/editor").getEditedPostAttribute("meta")._book_isbn}})),s((function(e){return{onUpdateIsbn:function(t){e("core/editor").editPost({meta:{_book_isbn:t}})}}}))])(d),m=i([p((function(e){return{publication_year:e("core/editor").getEditedPostAttribute("meta")._book_publication_year}})),s((function(e){return{onUpdatePublicationYear:function(t){e("core/editor").editPost({meta:{_book_publication_year:t}})}}}))])(m);a("book-data-panel",{icon:"book",render:function(){return"book"!==b("core/editor").getCurrentPostType()?null:Object(o.createElement)(c,{name:"book-data",title:r("Book Data","gutenberg-book-post-type"),className:"book-data-panel"},Object(o.createElement)(d,null),Object(o.createElement)(m,null))}})}]);