import{readFileSync as r,writeFileSync as w,mkdirSync as j}from"node:fs";
let T="!2R%'+,0aaaaaaaa*******&***&***a***aaaaaaaaaaaaaAEEA!aaaaaaaaaaa&)aaaaaaaaaaaaaa%%\"%",I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
for(let k=1;k<41;k++){
let d="i"+(k<10?"00":"0")+k,P=r(I+"/"+d+"/program.bin"),N=r(I+"/"+d+"/input.bin"),S=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),U=new Uint8Array(65536),o=0,g=0,pc=0,h=0,sp=0,cp=0,e=0;
R:for(;;){
if(h==1e6){e=10;break}
if(pc<0||pc>=P.length){e=9;break}
let z=T.charCodeAt(P[pc])-33;
if(P[pc]>83||z>63){e=5;break}
let t=P[pc],m=z>>4,u=z>>2&3,v=z&3;
if(m==3)m=4;
if(pc+m>=P.length){e=9;break}
h++;
let x=pc+1+m;
if(sp<u){e=2;break}
if(sp-u+v>256){e=3;break}
pc=x;
if(t==0){e=0;break}
if(t==83){e=S[--sp]&255;break}
switch(t){
case 1:S[sp++]=(P[x-1]<<24)>>24;break;
case 2:S[sp++]=P[x-4]|P[x-3]<<8|P[x-2]<<16|P[x-1]<<24;break;
case 3:sp--;break;
case 4:S[sp]=S[sp-1];sp++;break;
case 5:{let q=S[sp-1];S[sp-1]=S[sp-2];S[sp-2]=q;break}
case 6:S[sp]=S[sp-2];sp++;break;
case 7:{let q=S[sp-3];S[sp-3]=S[sp-2];S[sp-2]=S[sp-1];S[sp-1]=q;break}
case 23:S[sp-1]=-S[sp-1]|0;break;
case 27:S[sp-1]=~S[sp-1];break;
case 48:case 49:case 50:{let y=(P[x-2]|P[x-1]<<8)<<16>>16,z=1;if(t>48){let q=S[--sp];z=t==49?q==0:q!=0}if(z)pc=x+y;break}
case 51:if(cp==64){e=7;break R}C[cp++]=x;pc=P[x-2]|P[x-1]<<8;break;
case 52:if(!cp){e=8;break R}pc=C[--cp];break;
case 64:{let q=S[sp-1];if(q<0||q>255){e=6;break R}S[sp-1]=M[q];break}
case 65:{let q=S[sp-1],f=S[sp-2];if(q<0||q>255){e=6;break R}sp-=2;M[q]=f;break}
case 80:{let s=String(S[sp-1]);if(o+s.length>65536){e=11;break R}sp--;for(let i=0;i<s.length;i++)U[o++]=s.charCodeAt(i);break}
case 81:if(o>65535){e=11;break R}U[o++]=S[--sp]&255;break;
case 82:S[sp++]=g<N.length?N[g++]:-1;break;
default:{let b=S[sp-1],a=S[sp-2],f;if(t>18&&t<23&&!b){e=4;break R}if(t<23)f=t<19?t==16?a+b|0:t==17?a-b|0:Math.imul(a,b):t==19?a/b|0:t==20?a%b|0:t==21?(a>>>0)/(b>>>0)|0:(a>>>0)%(b>>>0)|0;else if(t<28)f=t==24?a&b:t==25?a|b:a^b;else if(t<31)f=t==28?a<<(b&31):t==29?a>>(b&31):(a>>>(b&31))|0;else f=t==32?a==b?1:0:t==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0;sp-=2;S[sp++]=f;break}
}
}
j(O+"/"+d,{recursive:true});
w(O+"/"+d+"/stdout.bin",U.slice(0,o));
w(O+"/"+d+"/exit.txt",e+"\n");
}
