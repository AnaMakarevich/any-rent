(this.webpackJsonppractice=this.webpackJsonppractice||[]).push([[0],{12:function(e,t,n){e.exports={wrapper:"Descriptions_wrapper__14HD3",colWrapper:"Descriptions_colWrapper__3InFV",icon:"Descriptions_icon__-FxE_",descriptionTextContainer:"Descriptions_descriptionTextContainer__2nxrI",bottomWrapper:"Descriptions_bottomWrapper__6RSCP",bottomTitle:"Descriptions_bottomTitle__2SSNL"}},19:function(e,t,n){e.exports={wrapper:"HomeRoute_wrapper__1P5wk",filterContainer:"HomeRoute_filterContainer__PbPDp",allItemsContainer:"HomeRoute_allItemsContainer__3PqwI",itemContainer:"HomeRoute_itemContainer__1XhnI",imageContainer:"HomeRoute_imageContainer__3AbOd",itemImage:"HomeRoute_itemImage__1PrQT",itemContentContainer:"HomeRoute_itemContentContainer__2uZBR",itemTitle:"HomeRoute_itemTitle__4URW7",itemDate:"HomeRoute_itemDate__2Aexl",itemDescription:"HomeRoute_itemDescription__2uba7",itemHeader:"HomeRoute_itemHeader__2h5BI",coinContainer:"HomeRoute_coinContainer__2y7KQ",coinIcon:"HomeRoute_coinIcon__2PFkF"}},21:function(e,t,n){e.exports={profileDataCol:"ProfileRoute_profileDataCol__Xs6hc",dataIcon:"ProfileRoute_dataIcon__2wrQI",coinIcon:"ProfileRoute_coinIcon__19fGh",colWrapperData:"ProfileRoute_colWrapperData__1NJDW"}},22:function(e,t,n){e.exports={wrapper:"NavBar_wrapper__aFrfA",container:"NavBar_container__3eHrS",logo:"NavBar_logo__3hXp8",actionsContainer:"NavBar_actionsContainer__2C8mP",actionsContainerPhone:"NavBar_actionsContainerPhone__2JKhT",menuIcon:"NavBar_menuIcon__2DNue",navLink:"NavBar_navLink__16T2b",unselected:"NavBar_unselected__3yJrv",selected:"NavBar_selected__5ZUgm"}},25:function(e,t,n){e.exports={container:"ItemRoute_container__3iMA1",image:"ItemRoute_image__3gC23",imageContainer:"ItemRoute_imageContainer__xD-kT",textContainer:"ItemRoute_textContainer__2b7eB",itemTitle:"ItemRoute_itemTitle__21zps",itemPrice:"ItemRoute_itemPrice__24G1H",actionContainer:"ItemRoute_actionContainer__1LTJE",dropdown:"ItemRoute_dropdown__1e8kk",rentButton:"ItemRoute_rentButton__3HDlz",rentButtonLabel:"ItemRoute_rentButtonLabel__yDl-V",coinIcon:"ItemRoute_coinIcon__2FxaN"}},34:function(e,t,n){e.exports={transactionListWrapper:"TransactionsList_transactionListWrapper__1yoMy",transactionListHeader:"TransactionsList_transactionListHeader__34ma-",navLink:"TransactionsList_navLink__1WI_5",transactionOverviewContainer:"TransactionsList_transactionOverviewContainer__1MTje",dataIcon:"TransactionsList_dataIcon__1OYik"}},57:function(e,t,n){e.exports={main:"Loading_main__2fkUr"}},73:function(e,t,n){},74:function(e,t,n){},84:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),r=n(23),s=n.n(r),i=(n(73),n(74),n(4)),o=n(15),l=n(9),u=n(28),j=n(22),m=n.n(j),d={primary:"#3A7FEF",complementary:"#EFAA3A",black:"black",white:"white",grey0:"#F2F2F2",grey1:"#CCCCCC",grey2:"#999999",grey3:"#666666"},b=n.p+"static/media/logo.307339d3.svg",h=n(14),O=n(39),x=function(e){var t=new Date(e);return"".concat(p(t.getDate()),".").concat(p(t.getMonth()+1),".").concat(t.getFullYear())},f=function(e){var t=JSON.stringify(e);localStorage.setItem("userId",t)};function p(e){return("00"+e).slice(-2)}var _=Object(O.b)({name:"profile",initialState:{loading:!0,isLoggedIn:!1,userId:null,firstName:null,lastName:null,succesfulReturns:null,contractsCountConsumer:null,contractsCountProvider:null,level:null,coinsAmount:null},reducers:{logIn:function(e,t){var n=t.payload,a=n.id,c=n.coins,r=n.first_name,s=n.last_name,i=n.successful_returns,o=n.num_current_contracts_consumer,l=n.num_current_contracts_provider,u=n.level;e.isLoggedIn=!0,e.userId=a,e.firstName=r,e.lastName=s,e.succesfulReturns=i,e.contractsCountConsumer=o,e.contractsCountProvider=l,e.level=u,e.coinsAmount=c,f(e.userId)},simpleLogIn:function(e,t){e.isLoggedIn=!0,e.userId=t.payload,f(e.userId)},logOut:function(e){e.isLoggedIn=!1,e.userId=null,e.firstName=null,e.lastName=null,e.succesfulReturns=null,e.contractsCountConsumer=null,e.contractsCountProvider=null,e.level=null,e.coinsAmount=null,f(e.userId)}}}),g=_.actions,v=g.logIn,N=g.simpleLogIn,C=g.logOut,I=function(e){return e.profile.isLoggedIn},y=function(e){return e.profile},R=_.reducer,k=n(2),L=function(){var e=Object(o.c)(I),t=Object(o.b)();return Object(k.jsxs)(c.a.Fragment,{children:[Object(k.jsx)(u.b,{to:"/",className:m.a.navLink,style:function(e){return{color:e.isActive?d.primary:d.black}},children:"Discover"}),e&&Object(k.jsx)(u.b,{to:"/rent-out",className:m.a.navLink,style:function(e){return{color:e.isActive?d.primary:d.black}},children:"Rent Out"}),e&&Object(k.jsx)(u.b,{to:"/profile",className:m.a.navLink,style:function(e){return{color:e.isActive?d.primary:d.black}},children:"Profile"}),e&&Object(k.jsx)(u.b,{onClick:function(){return t(C())},to:"/login",className:m.a.navLink,style:function(e){return{color:e.isActive?d.primary:d.black}},children:"Log Out"}),!e&&Object(k.jsx)(u.b,{to:"/register",className:m.a.navLink,style:function(e){return{color:e.isActive?d.primary:d.black}},children:"Register"}),!e&&Object(k.jsx)(u.b,{to:"/login",className:m.a.navLink,style:function(e){return{color:e.isActive?d.primary:d.black}},children:"Log In"})]})};function T(){var e=Object(a.useState)(!0),t=Object(l.a)(e,2),n=(t[0],t[1],Object(a.useState)(!1)),c=Object(l.a)(n,2),r=c[0],s=c[1];return Object(k.jsxs)("div",{className:m.a.wrapper,children:[Object(k.jsxs)("div",{className:m.a.container,children:[Object(k.jsx)("img",{src:b,className:m.a.logo,alt:"logo"}),Object(k.jsx)("div",{className:m.a.actionsContainer,children:Object(k.jsx)(L,{})}),Object(k.jsx)(h.h,{size:25,className:m.a.menuIcon,onClick:function(){return s((function(e){return!e}))}})]}),r&&Object(k.jsx)("div",{className:m.a.actionsContainerPhone,children:Object(k.jsx)(L,{})})]})}function w(){var e=Object(o.b)(!0);return Object(a.useEffect)((function(){var t=function(){try{var e=localStorage.getItem("userId");return e?JSON.parse(e):null}catch(t){return console.log(t),null}}();t&&e(N(t))}),[]),Object(k.jsxs)(c.a.Fragment,{children:[Object(k.jsx)(T,{}),Object(k.jsx)(i.a,{})]})}var S=Object(O.b)({name:"item",initialState:{loading:!0,singleItem:null},reducers:{setSingleItem:function(e,t){e.singleItem=t.payload},removeSingleItem:function(e,t){e.singleItem=null},setLoadingRequest:function(e){e.loading=!0},setFinishedRequest:function(e){e.loading=!1}}}),P=S.actions,D=(P.setSingleItem,P.removeSingleItem,P.setLoadingRequest,P.setFinishedRequest,S.reducer),F="https://any-rent.herokuapp.com",A=n(16),B=n(30),H=function(){function e(){Object(A.a)(this,e)}return Object(B.a)(e,null,[{key:"AddHackathon",value:function(e){return fetch("http://localhost:5000/add_hackathon",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))}},{key:"GetAllItems",value:function(){return fetch("http://127.0.0.1:5000/all_items",{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))}},{key:"GetItem",value:function(e){return fetch("http://127.0.0.1:5000/items/".concat(e),{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))}},{key:"PostRentRequest",value:function(e){return fetch("http://127.0.0.1:5000/request_item",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))}},{key:"GetUserProfile",value:function(e){return fetch("http://127.0.0.1:5000/user_profile/".concat(e),{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))}},{key:"GetUserRunningProviderContracts",value:function(e){return fetch("http://127.0.0.1:5000/running_provider_contracts/".concat(e),{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))}},{key:"GetUserRunningConsumerContracts",value:function(e){return fetch("http://127.0.0.1:5000/running_consumer_contracts/".concat(e),{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).catch((function(e){return console.log(e)}))}}]),e}(),W=n(58),E=n(57),q=n.n(E);function G(){return Object(k.jsx)(W.a,{className:q.a.main,animation:"border",role:"status",size:"xl",children:Object(k.jsx)("span",{className:"visually-hidden",children:"Loading..."})})}var U=n(26),J=n(19),z=n.n(J),Y=n(20),M=n(11),Q=n(36),V=function(e){var t=e.id,n=e.image,a=e.date,c=e.coinAmount,r=e.title,s=e.description,o=Object(i.g)();return Object(k.jsxs)("div",{className:z.a.itemContainer,onClick:function(){return o("../item/".concat(t))},children:[Object(k.jsx)("h5",{className:z.a.itemDate,children:x(a)}),Object(k.jsx)("div",{className:z.a.imageContainer,children:Object(k.jsx)("img",{src:F+n,className:z.a.itemImage})}),Object(k.jsxs)("div",{className:z.a.itemContentContainer,children:[Object(k.jsx)("div",{className:z.a.itemHeader,children:Object(k.jsx)("h3",{className:z.a.itemTitle,children:r})}),Object(k.jsx)("p",{className:z.a.itemDescription,children:(s.length>100&&(s=s.substring(0,100)+"..."),s)}),Object(k.jsxs)("div",{className:z.a.coinContainer,children:[Object(k.jsx)(Q.a,{className:z.a.coinIcon}),c]})]})]})};function X(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(!0),s=Object(l.a)(r,2),i=s[0],u=s[1];Object(o.b)();if(Object(a.useEffect)((function(){u(!0),H.GetAllItems().then((function(e){return c(e)})).catch((function(e){return console.log("error",e)})),u(!1)}),[]),i)return Object(k.jsx)("div",{className:"d-flex align-items-center justify-content-center p-5",children:Object(k.jsx)(G,{})});return Object(k.jsx)(U.a,{className:z.a.wrapper,children:Object(k.jsxs)(Y.a,{children:[Object(k.jsx)(M.a,{md:4,children:Object(k.jsx)("div",{className:z.a.filterContainer,children:Object(k.jsx)("h4",{children:"Filters"})})}),Object(k.jsx)(M.a,{md:8,children:Object(k.jsx)("div",{className:z.a.allItemsContainer,children:n.length>0?n.map((function(e){return Object(k.jsx)(V,{id:e.id,image:e.picture_before,date:e.available_since,coinAmount:e.coins,title:e.name,description:e.description})})):Object(k.jsx)("h4",{children:"No Listings found"})})})]})})}var K=n(42),Z=n(24),$=n(25),ee=n.n($),te=n(12),ne=n.n(te),ae=n(52),ce=function(e){var t=e.providerName,n=e.text,a=e.date,r=e.isFragile;return Object(k.jsx)("div",{className:ne.a.wrapper,children:Object(k.jsxs)(Y.a,{children:[Object(k.jsxs)(M.a,{xs:6,md:3,className:ne.a.colWrapper,children:[Object(k.jsx)(h.i,{className:ne.a.icon}),t]}),Object(k.jsxs)(M.a,{xs:6,md:3,className:ne.a.colWrapper,children:[Object(k.jsx)(h.g,{className:ne.a.icon}),"34km"]}),Object(k.jsxs)(M.a,{xs:6,md:3,className:ne.a.colWrapper,children:[Object(k.jsx)(h.l,{className:ne.a.icon}),"Since ",x(a)]}),Object(k.jsxs)(M.a,{xs:6,md:3,className:ne.a.colWrapper,children:[r&&Object(k.jsxs)(c.a.Fragment,{children:[Object(k.jsx)(h.n,{className:ne.a.icon}),"Fragile"]}),!r&&Object(k.jsxs)(c.a.Fragment,{children:[Object(k.jsx)(h.k,{className:ne.a.icon}),"Not Fragile"]})]}),Object(k.jsx)(M.a,{xs:12,className:ne.a.descriptionTextContainer,children:Object(k.jsx)(ae.a,{children:n})})]})})},re=function(e){var t=e.checkedAtReturn,n=e.maxRentLength,a=e.requiredPostActions,c=e.state,r=e.text;return Object(k.jsx)("div",{className:ne.a.wrapper,children:Object(k.jsxs)(Y.a,{children:[Object(k.jsxs)(M.a,{xs:6,md:3,className:ne.a.colWrapper,children:[Object(k.jsx)(h.a,{className:ne.a.icon}),"Control ",t]}),Object(k.jsxs)(M.a,{xs:6,md:3,className:ne.a.colWrapper,children:[Object(k.jsx)(h.j,{className:ne.a.icon}),a]}),Object(k.jsxs)(M.a,{xs:6,md:3,className:ne.a.colWrapper,children:[Object(k.jsx)(h.m,{className:ne.a.icon}),"Max. ",n," days"]}),Object(k.jsxs)(M.a,{xs:6,md:3,className:ne.a.colWrapper,children:[Object(k.jsx)(h.e,{className:ne.a.icon}),c]}),Object(k.jsx)(M.a,{xs:12,className:ne.a.descriptionTextContainer,children:Object(k.jsx)(ae.a,{children:r})})]})})};function se(e){var t,n,c=e.item,r=Object(a.useState)("returns"),s=Object(l.a)(r,2),i=s[0],o=s[1],u=Object(a.useState)(""),j=Object(l.a)(u,2),m=(j[0],j[1],t=c.required_post_actions,n=c.checked_at_return,'\n**Rental Conditions** \n\nYou can read the full rental contract here (link to PDF)\n\n**Before rental:** \n\n- By sending the "Rent" request you are expressing your interest, but the item is not guaranteed to you. It\'s up to the provider to decide if he wants to rent to you.\n- When you get the confirmation and meet with the provider, you **BOTH** have to confirm the item state by confirming the truthfulness of images in the app. The provider cannot change the image while contract is active, which provider you protection from false claims.\n- When the contract is started, the coins are deducted from your account. They are not transferred to the provider until the item is returned.\n\n**During rental:**\n\n- You agree to take care about the rented item and follow standard handling instructions for the item.\n- You agree not to expose the rented item to damage\n- You agree not to rent out this item to anyone\n- You agree that in case of damage you are obliged to pay the provider up to {display kaution}, depending on the damage done.\n- You agree that in case the item is not returned on time and the contract is not prolonged, your personal data is shared with the provider, such that they can take measures. In this case your account will be suspended and you will not be able to rent anything.\n- In case of disagreement a third-party might be invited\n\n**Before you return the item to the owner:** \n\n'.concat(t,"\n\n**On return the provider will check the following:** \n\n").concat(n,"\n")),d=function(e){return e===i?{borderBottom:"1px solid black"}:{borderBottom:"0px"}};return Object(k.jsxs)(Y.a,{className:ne.a.bottomWrapper,children:[Object(k.jsx)(M.a,{className:"d-flex justify-content-center align-items-center",sm:6,children:Object(k.jsx)("p",{className:ne.a.bottomTitle,style:d("information"),onClick:function(){return o("information")},children:"Information"})}),Object(k.jsx)(M.a,{className:"d-flex justify-content-center align-items-center",sm:6,children:Object(k.jsx)("p",{className:ne.a.bottomTitle,style:d("returns"),onClick:function(){return o("returns")},children:"Returns"})}),Object(k.jsxs)(M.a,{className:"w-100",children:["information"==i&&Object(k.jsx)(ce,{providerName:"".concat(c.owner.first_name," ").concat(c.owner.last_name),condition:c.state,date:c.available_since,isFragile:c.fragile,text:c.description}),"returns"==i&&Object(k.jsx)(re,{checkedAtReturn:c.checked_at_return,maxRentLength:c.max_rent_length,requiredPostActions:c.required_post_actions,state:c.state,text:m})]})]})}function ie(){var e=Object(i.h)().itemId,t=Object(a.useState)(null),n=Object(l.a)(t,2),c=n[0],r=n[1],s=Object(a.useState)(!0),u=Object(l.a)(s,2),j=u[0],m=u[1],d=Object(a.useState)(!1),b=Object(l.a)(d,2),h=b[0],O=b[1],x=Object(a.useState)(""),f=Object(l.a)(x,2),p=f[0],_=f[1],g=Object(a.useState)(!1),v=Object(l.a)(g,2),N=v[0],C=v[1],y=Object(a.useState)(!1),R=Object(l.a)(y,2),L=R[0],T=R[1],w=Object(o.c)(I),S=Object(i.g)();Object(a.useEffect)((function(){m(!0),H.GetItem(e).then((function(e){return r(e)})).catch((function(e){return console.log("error",e)})),m(!1)}),[]);var P=function(){return O(!1)};return j?Object(k.jsx)("div",{className:"d-flex justify-content-center align-items-center p-5",children:Object(k.jsx)(G,{})}):c?Object(k.jsxs)(U.a,{children:[Object(k.jsxs)(Y.a,{className:ee.a.container,children:[Object(k.jsx)(M.a,{className:ee.a.imageContainer,md:6,xl:5,children:Object(k.jsx)("img",{src:F+c.picture_before,className:ee.a.image})}),Object(k.jsxs)(M.a,{md:6,xl:7,className:ee.a.textContainer,children:[Object(k.jsxs)("div",{className:ee.a.itemHeaderContainer,children:[Object(k.jsx)("h2",{className:ee.a.itemTitle,children:c.name}),Object(k.jsxs)("h3",{className:ee.a.itemPrice,children:[Object(k.jsx)(Q.a,{className:ee.a.coinIcon}),c.coins]})]}),Object(k.jsx)("div",{className:ee.a.actionContainer,children:Object(k.jsxs)("form",{onSubmit:function(e){O(!0),e.preventDefault()},children:[w&&Object(k.jsx)("label",{className:ee.a.rentButtonLabel,children:"By clicking on this button you accept the terms below."}),w&&Object(k.jsx)(Z.a,{variant:"primary",size:"lg",className:"w-100",disabled:"available"!=c.status||L,onClick:function(){return O(!0)},children:"Rent"}),!w&&Object(k.jsx)("label",{className:ee.a.rentButtonLabel,children:"Being a user is required to use our services."}),!w&&Object(k.jsx)(Z.a,{variant:"secondary",size:"lg",className:"w-100",onClick:function(){return S("/login")},children:"Log In"})]})})]})]}),Object(k.jsx)(se,{item:c}),Object(k.jsxs)(K.a,{show:h,onHide:P,children:[Object(k.jsx)(K.a.Header,{closeButton:!0,children:Object(k.jsx)(K.a.Title,{children:"Complete Renting Request"})}),Object(k.jsxs)(K.a.Body,{className:"show-grid",children:[!N&&!L&&Object(k.jsxs)(U.a,{children:["Contact the Consumer",Object(k.jsx)("div",{className:"mt-2",children:Object(k.jsx)("textarea",{className:"form-control",value:p,onChange:function(e){return _(e.target.value)}})})]}),N&&Object(k.jsx)(U.a,{className:"d-flex justify-content-center align-items-center",children:Object(k.jsx)(G,{})}),L&&Object(k.jsx)(U.a,{className:"d-flex justify-content-center align-items-center",children:"Sucessfully submited!"})]}),Object(k.jsxs)(K.a.Footer,{children:[Object(k.jsx)(Z.a,{variant:"secondary",onClick:P,children:"Close"}),!L&&Object(k.jsx)(Z.a,{variant:"primary",onClick:function(){C(!0),H.PostRentRequest({user_id:1,item_id:c.id,text:p}).then((function(e){e.request_id&&e.request_id>0&&T(!0)})).catch((function(e){return console.log("error",e)})),C(!1)},children:"Submit"})]})]})]}):Object(k.jsx)("h2",{children:"Item is not existing"})}var oe=n(33);function le(){var e=Object(i.g)(),t=Object(o.b)(),n=Object(o.c)(I),c=Object(a.useState)(null),r=Object(l.a)(c,2),s=r[0],u=r[1];return Object(a.useEffect)((function(){n&&e("../profile",{replace:!0})}),[n]),Object(k.jsx)(U.a,{className:"p-5",children:Object(k.jsxs)(oe.a,{onSubmit:function(e){t(N(s)),e.preventDefault()},children:[Object(k.jsxs)(oe.a.Group,{className:"mb-3",children:[Object(k.jsx)(oe.a.Label,{children:"User Id"}),Object(k.jsx)(oe.a.Control,{type:"text",placeholder:"Enter User Id",value:s,onChange:function(e){return u(e.target.value)}}),Object(k.jsx)(oe.a.Text,{className:"text-muted",children:"Detailed User Authentication will be implemented later."})]}),Object(k.jsx)(Z.a,{variant:"primary",type:"submit",children:"Submit"})]})})}var ue=n(21),je=n.n(ue);function me(e){var t=e.firstName,n=e.lastName,a=e.coinsAmount,r=e.succesfulReturns,s=e.contractsCountConsumer,i=e.contractsCountProvider;return Object(k.jsxs)(c.a.Fragment,{children:[Object(k.jsxs)("h2",{children:[t," ",n]}),Object(k.jsxs)(Y.a,{children:[Object(k.jsxs)(M.a,{sm:6,lg:12,xl:6,className:je.a.colWrapperData,children:[Object(k.jsx)(Q.a,{className:"".concat(je.a.coinIcon," ").concat(je.a.dataIcon)})," ",a]}),Object(k.jsxs)(M.a,{sm:6,lg:12,xl:6,className:je.a.colWrapperData,children:[Object(k.jsx)(h.j,{className:je.a.dataIcon})," ",r," Succesful Returns"]}),Object(k.jsxs)(M.a,{sm:6,lg:12,xl:6,className:je.a.colWrapperData,children:[Object(k.jsx)(h.b,{className:je.a.dataIcon})," ",s," Items consumed"]}),Object(k.jsxs)(M.a,{sm:6,lg:12,xl:6,className:je.a.colWrapperData,children:[Object(k.jsx)(h.c,{className:je.a.dataIcon})," ",i," Items borrowed"]})]})]})}var de=n(34),be=n.n(de),he=function(e){var t=e.transaction,n=e.profileIsConsumer,r=Object(a.useState)(!1),s=Object(l.a)(r,2),o=s[0],u=s[1],j=Object(i.g)(),m=n&&t.consumer_confirmed_return||!n&&t.provider_confirmed_return;return Object(k.jsxs)(c.a.Fragment,{children:[Object(k.jsx)("a",{className:be.a.navLink,onClick:function(){return u((function(e){return!e}))},children:t.item.name}),o&&Object(k.jsxs)("div",{className:be.a.transactionOverviewContainer,children:[Object(k.jsxs)(Y.a,{className:"mb-4",children:[Object(k.jsxs)(M.a,{xs:6,className:"d-flex align-items-center",children:[Object(k.jsx)(h.f,{className:be.a.dataIcon}),n?t.provider_confirmed_return?"Provider confirmed Return":"Confirmation pending":t.provider_confirmed_return?"Consumer confirmed Return":"Confirmation pending"]}),Object(k.jsxs)(M.a,{xs:6,className:"d-flex align-items-center",children:[Object(k.jsx)(h.d,{className:be.a.dataIcon})," Start ",x(t.start_date)]}),Object(k.jsxs)(M.a,{xs:6,className:"d-flex align-items-center",children:[Object(k.jsx)(h.d,{className:be.a.dataIcon})," End ",x(t.end_date)]})]}),Object(k.jsxs)("div",{className:"d-flex justify-content-end align-items-center",children:[Object(k.jsx)(Z.a,{size:"sm",variant:"secondary",onClick:function(){return j("../item/".concat(t.item.id))},style:{marginRight:"0.5em"},children:"View Item"}),Object(k.jsx)(Z.a,{size:"sm",variant:"secondary",onClick:function(){},style:{marginRight:"0.5em"},children:"Upload Image"}),!m&&Object(k.jsx)(Z.a,{size:"sm",onClick:function(){},children:"Confirm Return"})]})]})]})};function Oe(e){var t=e.profileIsConsumer,n=e.transactions,a=t?"Consumer":"Provider";return Object(k.jsxs)("div",{className:be.a.transactionListWrapper,children:[Object(k.jsxs)("h3",{className:be.a.transactionListHeader,children:[a,"-Transactions"]}),0==n.length&&Object(k.jsx)("p",{children:"No Open Transactions"}),n.length>0&&n.map((function(e){return Object(k.jsx)(he,{transaction:e,profileIsConsumer:t})}))]})}function xe(){var e=Object(i.g)(),t=Object(o.b)(),n=Object(a.useState)(!0),c=Object(l.a)(n,2),r=(c[0],c[1]),s=Object(a.useState)(!0),u=Object(l.a)(s,2),j=(u[0],u[1]),m=Object(a.useState)(!0),d=Object(l.a)(m,2),b=(d[0],d[1],Object(a.useState)(!0)),h=Object(l.a)(b,2),O=h[0],x=h[1],f=Object(a.useState)(!0),p=Object(l.a)(f,2),_=(p[0],p[1],Object(o.c)(I)),g=Object(o.c)(y),N=(g.isLoggedIn,g.userId),C=g.firstName,R=g.lastName,L=g.succesfulReturns,T=g.contractsCountConsumer,w=g.contractsCountProvider,S=(g.level,g.coinsAmount);Object(a.useEffect)((function(){_||e("../login",{replace:!0})}),[_]),Object(a.useEffect)((function(){_&&(r(!0),H.GetUserProfile(N).then((function(e){return t(v(e))})).catch((function(e){return console.log("error",e)})),r(!1))}),[r,N,_]),Object(a.useEffect)((function(){_&&(j(!0),H.GetUserRunningConsumerContracts(N).then((function(e){return x(e)})).catch((function(e){return console.log("error",e)})),j(!1))}),[N,_]);return Object(k.jsx)(U.a,{children:Object(k.jsxs)(Y.a,{children:[Object(k.jsx)(M.a,{lg:6,className:je.a.profileDataCol,children:Object(k.jsx)(me,{firstName:C,lastName:R,coinsAmount:S,succesfulReturns:L,contractsCountConsumer:T,contractsCountProvider:w})}),Object(k.jsx)(M.a,{lg:6,className:je.a.colWrapper,children:Object(k.jsx)(Oe,{profileIsConsumer:!0,transactions:O})})]})})}function fe(){return Object(k.jsx)("div",{children:"register"})}function pe(){return Object(k.jsx)("div",{children:"rent out"})}function _e(){return Object(k.jsx)("div",{children:"overview"})}var ge=function(){return Object(k.jsx)(i.d,{children:Object(k.jsxs)(i.b,{path:"/",element:Object(k.jsx)(w,{}),children:[Object(k.jsx)(i.b,{index:!0,element:Object(k.jsx)(X,{})}),Object(k.jsxs)(i.b,{path:"item",element:Object(k.jsx)(i.a,{}),children:[Object(k.jsx)(i.b,{index:!0,element:Object(k.jsx)("h4",{children:"Didnt insert any ItemId"})}),Object(k.jsx)(i.b,{path:":itemId",element:Object(k.jsx)(ie,{})})]}),Object(k.jsx)(i.b,{path:"rent-out",element:Object(k.jsx)(pe,{})}),Object(k.jsx)(i.b,{path:"overview",element:Object(k.jsx)(_e,{})}),Object(k.jsx)(i.b,{path:"profile",element:Object(k.jsx)(xe,{})}),Object(k.jsx)(i.b,{path:"login",element:Object(k.jsx)(le,{})}),Object(k.jsx)(i.b,{path:"register",element:Object(k.jsx)(fe,{})})]})})},ve=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,91)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))},Ne=(n(83),Object(O.a)({reducer:{item:D,profile:R}}));s.a.render(Object(k.jsx)(c.a.StrictMode,{children:Object(k.jsx)(o.a,{store:Ne,children:Object(k.jsx)(u.a,{children:Object(k.jsx)(ge,{})})})}),document.getElementById("root")),ve()}},[[84,1,2]]]);
//# sourceMappingURL=main.48c6819c.chunk.js.map