(this.webpackJsonpcrud_app=this.webpackJsonpcrud_app||[]).push([[0],{166:function(e,t,a){},167:function(e,t,a){},197:function(e,t,a){"use strict";a.r(t);var c=a(0),n=a.n(c),s=a(143),r=a.n(s),i=(a(166),a(167),a(8)),l=a(209),o=a(213),j=a(211),d=a(32),u=a.n(d),b=a(2);var p=a(210),h=a(108);function O(){var e="https://pip-react-spring-postgres.herokuapp.com",t=Object(c.useState)([]),a=Object(i.a)(t,2),n=a[0],s=a[1];Object(c.useEffect)((function(){console.log("hello"),u.a.get("".concat(e,"/api/v1/loanpass")).then((function(e){console.log(e.data),s(e.data)}))}),[]);var r=function(t){u.a.delete("".concat(e,"/api/v1/loanpass/").concat(t)).then((function(){u.a.get("".concat(e,"/api/v1/loanpass")).then((function(e){s(e.data)}))}))};return Object(b.jsx)("div",{children:Object(b.jsxs)(p.a,{singleLine:!0,children:[Object(b.jsx)(p.a.Header,{children:Object(b.jsxs)(p.a.Row,{children:[Object(b.jsx)(p.a.HeaderCell,{children:"passId"}),Object(b.jsx)(p.a.HeaderCell,{children:"attractionId"}),Object(b.jsx)(p.a.HeaderCell,{children:"passNumber"}),Object(b.jsx)(p.a.HeaderCell,{children:"previousLoanBy"}),Object(b.jsx)(p.a.HeaderCell,{children:"description"})]})}),Object(b.jsx)(p.a.Body,{children:n.map((function(e){return Object(b.jsxs)(p.a.Row,{children:[Object(b.jsx)(p.a.Cell,{children:e.passId}),Object(b.jsx)(p.a.Cell,{children:e.attractionId}),Object(b.jsx)(p.a.Cell,{children:e.passNumber}),Object(b.jsx)(p.a.Cell,{children:e.previousLoanBy}),Object(b.jsx)(p.a.Cell,{children:e.description}),Object(b.jsx)(h.b,{to:"/update",children:Object(b.jsx)(p.a.Cell,{children:Object(b.jsx)(j.a,{onClick:function(){return function(e){var t=e.passId,a=e.attractionId,c=e.passNumber,n=e.previousLoanBy,s=e.description;localStorage.setItem("passId",t),localStorage.setItem("attractionId",a),localStorage.setItem("passNumber",c),localStorage.setItem("previousLoanBy",n),localStorage.setItem("description",s)}(e)},children:"Update"})})}),Object(b.jsx)(p.a.Cell,{children:Object(b.jsx)(j.a,{onClick:function(){return r(e.passId)},children:"Delete"})})]})}))})]})})}var x=a(7);function g(){var e=Object(x.m)(),t=Object(c.useState)(""),a=Object(i.a)(t,2),n=a[0],s=a[1],r=Object(c.useState)(""),o=Object(i.a)(r,2),d=o[0],p=o[1],h=Object(c.useState)(""),O=Object(i.a)(h,2),g=O[0],m=O[1],f=Object(c.useState)(""),v=Object(i.a)(f,2),I=v[0],C=v[1],S=Object(c.useState)(""),N=Object(i.a)(S,2),y=N[0],F=N[1];Object(c.useEffect)((function(){s(localStorage.getItem("passId")),p(localStorage.getItem("attractionId")),m(localStorage.getItem("passNumber")),C(localStorage.getItem("previousLoanBy")),F(localStorage.getItem("description"))}),[]);return Object(b.jsx)("div",{children:Object(b.jsxs)(l.a,{className:"create-form",children:[Object(b.jsxs)(l.a.Field,{children:[Object(b.jsx)("label",{children:"attractionId"}),Object(b.jsx)("input",{placeholder:"attractionId",value:d,onChange:function(e){return p(e.target.value)}})]}),Object(b.jsxs)(l.a.Field,{children:[Object(b.jsx)("label",{children:"passNumber"}),Object(b.jsx)("input",{placeholder:"passNumber",value:g,onChange:function(e){return m(e.target.value)}})]}),Object(b.jsxs)(l.a.Field,{children:[Object(b.jsx)("label",{children:"previousLoanBy"}),Object(b.jsx)("input",{placeholder:"previousLoanBy",value:I,onChange:function(e){return C(e.target.value)}})]}),Object(b.jsxs)(l.a.Field,{children:[Object(b.jsx)("label",{children:"description"}),Object(b.jsx)("input",{placeholder:"description",value:y,onChange:function(e){return F(e.target.value)}})]}),Object(b.jsx)(j.a,{type:"submit",onClick:function(){u.a.put("".concat("https://pip-react-spring-postgres.herokuapp.com","/api/v1/loanpass/").concat(n,"?attractionId=").concat(d,"&passNumber=").concat(g,"&previousLoanBy=").concat(I,"&description=").concat(y,")"),null).then((function(){e("/read")})).catch((function(e){alert("error in update! staying on this page."+e)}))},children:"Update"})]})})}function m(){var e="https://pip-react-spring-postgres.herokuapp.com",t=Object(x.m)(),a=Object(c.useState)(""),n=Object(i.a)(a,2),s=n[0],r=n[1],d=Object(c.useState)(""),p=Object(i.a)(d,2),h=p[0],O=p[1],g=Object(c.useState)(""),m=Object(i.a)(g,2),f=m[0],v=m[1],I=Object(c.useState)(!1),C=Object(i.a)(I,2),S=C[0],N=C[1];return Object(b.jsx)("div",{children:Object(b.jsxs)(l.a,{className:"create-form",children:[Object(b.jsxs)(l.a.Field,{children:[Object(b.jsx)("label",{children:"attractionId"}),Object(b.jsx)("input",{placeholder:"attractionId",onChange:function(e){return r(e.target.value)}})]}),Object(b.jsxs)(l.a.Field,{children:[Object(b.jsx)("label",{children:"PassNumber"}),Object(b.jsx)("input",{placeholder:"PassNumber",onChange:function(e){return O(e.target.value)}})]}),Object(b.jsxs)(l.a.Field,{children:[Object(b.jsx)("label",{children:"description"}),Object(b.jsx)("input",{placeholder:"description",onChange:function(e){return v(e.target.value)}})]}),Object(b.jsx)(l.a.Field,{children:Object(b.jsx)(o.a,{label:"I agree to the Terms and Conditions",onChange:function(e){return N(!S)}})}),Object(b.jsx)(j.a,{onClick:function(){alert("sent a post request:\n"+("{attractioId: "+s+",\n passNumber: "+h+",\n description: "+f+"}")+"\nto ".concat(e,"/api/v1/loanpass")),u.a.post("".concat(e,"/api/v1/loanpass"),{attractionId:s,passNumber:h,description:f}).then((function(){alert("success! going to read page"),t("/read")})).catch((function(e){alert("error in creation! staying on this page."+e)}))},type:"submit",children:"Submit"})]})})}var f=function(){return Object(b.jsxs)("div",{className:"main",children:[Object(b.jsx)("h2",{className:"main-header",children:"React Crud Operations"}),Object(b.jsx)("a",{href:"/createloanpass",children:"Create Loan Pass"}),Object(b.jsx)("a",{href:"/read",children:"Read"}),Object(b.jsx)(h.a,{children:Object(b.jsxs)(x.c,{children:[Object(b.jsx)(x.a,{exact:!0,path:"/createloanpass",element:Object(b.jsx)(m,{})}),Object(b.jsx)(x.a,{exact:!0,path:"/read",element:Object(b.jsx)(O,{})}),Object(b.jsx)(x.a,{exact:!0,path:"/update",element:Object(b.jsx)(g,{})})]})})]})},v=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,214)).then((function(t){var a=t.getCLS,c=t.getFID,n=t.getFCP,s=t.getLCP,r=t.getTTFB;a(e),c(e),n(e),s(e),r(e)}))};a(196);r.a.createRoot(document.getElementById("root")).render(Object(b.jsx)(n.a.StrictMode,{children:Object(b.jsx)(f,{})})),v()}},[[197,1,2]]]);
//# sourceMappingURL=main.ffe73fa0.chunk.js.map