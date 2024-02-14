(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{5771:function(e,t,i){Promise.resolve().then(i.bind(i,8367))},8367:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return r}});var a=i(3827);class n{static set WORKER_PATH(e){console.warn("Setting QrScanner.WORKER_PATH is not required and not supported anymore. Have a look at the README for new setup instructions.")}static async hasCamera(){try{return!!(await n.listCameras(!1)).length}catch(e){return!1}}static async listCameras(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!navigator.mediaDevices)return[];let t=async()=>(await navigator.mediaDevices.enumerateDevices()).filter(e=>"videoinput"===e.kind),i;try{e&&(await t()).every(e=>!e.label)&&(i=await navigator.mediaDevices.getUserMedia({audio:!1,video:!0}))}catch(e){}try{return(await t()).map((e,t)=>({id:e.deviceId,label:e.label||(0===t?"Default Camera":"Camera ".concat(t+1))}))}finally{i&&(console.warn("Call listCameras after successfully starting a QR scanner to avoid creating a temporary video stream"),n._stopVideoStream(i))}}async hasFlash(){let e;try{if(this.$video.srcObject){if(!(this.$video.srcObject instanceof MediaStream))return!1;e=this.$video.srcObject}else e=(await this._getCameraStream()).stream;return"torch"in e.getVideoTracks()[0].getSettings()}catch(e){return!1}finally{e&&e!==this.$video.srcObject&&(console.warn("Call hasFlash after successfully starting the scanner to avoid creating a temporary video stream"),n._stopVideoStream(e))}}isFlashOn(){return this._flashOn}async toggleFlash(){this._flashOn?await this.turnFlashOff():await this.turnFlashOn()}async turnFlashOn(){if(!this._flashOn&&!this._destroyed&&(this._flashOn=!0,this._active&&!this._paused))try{if(!await this.hasFlash())throw"No flash available";await this.$video.srcObject.getVideoTracks()[0].applyConstraints({advanced:[{torch:!0}]})}catch(e){throw this._flashOn=!1,e}}async turnFlashOff(){this._flashOn&&(this._flashOn=!1,await this._restartVideoStream())}destroy(){this.$video.removeEventListener("loadedmetadata",this._onLoadedMetaData),this.$video.removeEventListener("play",this._onPlay),document.removeEventListener("visibilitychange",this._onVisibilityChange),window.removeEventListener("resize",this._updateOverlay),this._destroyed=!0,this._flashOn=!1,this.stop(),n._postWorkerMessage(this._qrEnginePromise,"close")}async start(){if(this._destroyed)throw Error("The QR scanner can not be started as it had been destroyed.");if((!this._active||this._paused)&&("https:"!==window.location.protocol&&console.warn("The camera stream is only accessible if the page is transferred via https."),this._active=!0,!document.hidden)){if(this._paused=!1,this.$video.srcObject)await this.$video.play();else try{let{stream:e,facingMode:t}=await this._getCameraStream();!this._active||this._paused?n._stopVideoStream(e):(this._setVideoMirror(t),this.$video.srcObject=e,await this.$video.play(),this._flashOn&&(this._flashOn=!1,this.turnFlashOn().catch(()=>{})))}catch(e){if(!this._paused)throw this._active=!1,e}}}stop(){this.pause(),this._active=!1}async pause(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(this._paused=!0,!this._active)return!0;this.$video.pause(),this.$overlay&&(this.$overlay.style.display="none");let t=()=>{this.$video.srcObject instanceof MediaStream&&(n._stopVideoStream(this.$video.srcObject),this.$video.srcObject=null)};return e?(t(),!0):(await new Promise(e=>setTimeout(e,300)),!!this._paused&&(t(),!0))}async setCamera(e){e!==this._preferredCamera&&(this._preferredCamera=e,await this._restartVideoStream())}static async scanImage(e,t,i,a){let s=arguments.length>4&&void 0!==arguments[4]&&arguments[4],r=arguments.length>5&&void 0!==arguments[5]&&arguments[5],o,h=!1;t&&("scanRegion"in t||"qrEngine"in t||"canvas"in t||"disallowCanvasResizing"in t||"alsoTryWithoutScanRegion"in t||"returnDetailedScanResult"in t)?(o=t.scanRegion,i=t.qrEngine,a=t.canvas,s=t.disallowCanvasResizing||!1,r=t.alsoTryWithoutScanRegion||!1,h=!0):t||i||a||s||r?console.warn("You're using a deprecated api for scanImage which will be removed in the future."):console.warn("Note that the return type of scanImage will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true."),t=!!i;try{let c,d,l;if([i,c]=await Promise.all([i||n.createQrEngine(),n._loadImage(e)]),[a,d]=n._drawToCanvas(c,o,a,s),i instanceof Worker){let e=i;t||n._postWorkerMessageSync(e,"inversionMode","both"),l=await new Promise((t,i)=>{let s,r,h,c=-1;r=a=>{a.data.id===c&&(e.removeEventListener("message",r),e.removeEventListener("error",h),clearTimeout(s),null!==a.data.data?t({data:a.data.data,cornerPoints:n._convertPoints(a.data.cornerPoints,o)}):i(n.NO_QR_CODE_FOUND))},h=t=>{e.removeEventListener("message",r),e.removeEventListener("error",h),clearTimeout(s),i("Scanner error: "+(t?t.message||t:"Unknown Error"))},e.addEventListener("message",r),e.addEventListener("error",h),s=setTimeout(()=>h("timeout"),1e4);let l=d.getImageData(0,0,a.width,a.height);c=n._postWorkerMessageSync(e,"decode",l,[l.data.buffer])})}else l=await Promise.race([new Promise((e,t)=>window.setTimeout(()=>t("Scanner error: timeout"),1e4)),(async()=>{try{var[t]=await i.detect(a);if(!t)throw n.NO_QR_CODE_FOUND;return{data:t.rawValue,cornerPoints:n._convertPoints(t.cornerPoints,o)}}catch(i){if(t=i.message||i,/not implemented|service unavailable/.test(t))return n._disableBarcodeDetector=!0,n.scanImage(e,{scanRegion:o,canvas:a,disallowCanvasResizing:s,alsoTryWithoutScanRegion:r});throw"Scanner error: ".concat(t)}})()]);return h?l:l.data}catch(c){if(!o||!r)throw c;let t=await n.scanImage(e,{qrEngine:i,canvas:a,disallowCanvasResizing:s});return h?t:t.data}finally{t||n._postWorkerMessage(i,"close")}}setGrayscaleWeights(e,t,i){let a=!(arguments.length>3)||void 0===arguments[3]||arguments[3];n._postWorkerMessage(this._qrEnginePromise,"grayscaleWeights",{red:e,green:t,blue:i,useIntegerApproximation:a})}setInversionMode(e){n._postWorkerMessage(this._qrEnginePromise,"inversionMode",e)}static async createQrEngine(e){if(e&&console.warn("Specifying a worker path is not required and not supported anymore."),e=()=>i.e(318).then(i.bind(i,9318)).then(e=>e.createWorker()),!(!n._disableBarcodeDetector&&"BarcodeDetector"in window&&BarcodeDetector.getSupportedFormats&&(await BarcodeDetector.getSupportedFormats()).includes("qr_code")))return e();let t=navigator.userAgentData;return t&&t.brands.some(e=>{let{brand:t}=e;return/Chromium/i.test(t)})&&/mac ?OS/i.test(t.platform)&&await t.getHighEntropyValues(["architecture","platformVersion"]).then(e=>{let{architecture:t,platformVersion:i}=e;return/arm/i.test(t||"arm")&&13<=parseInt(i||"13")}).catch(()=>!0)?e():new BarcodeDetector({formats:["qr_code"]})}_onPlay(){this._scanRegion=this._calculateScanRegion(this.$video),this._updateOverlay(),this.$overlay&&(this.$overlay.style.display=""),this._scanFrame()}_onLoadedMetaData(){this._scanRegion=this._calculateScanRegion(this.$video),this._updateOverlay()}_onVisibilityChange(){document.hidden?this.pause():this._active&&this.start()}_calculateScanRegion(e){let t=Math.round(2/3*Math.min(e.videoWidth,e.videoHeight));return{x:Math.round((e.videoWidth-t)/2),y:Math.round((e.videoHeight-t)/2),width:t,height:t,downScaledWidth:this._legacyCanvasSize,downScaledHeight:this._legacyCanvasSize}}_updateOverlay(){requestAnimationFrame(()=>{if(this.$overlay){var e=this.$video,t=e.videoWidth,i=e.videoHeight,a=e.offsetWidth,n=e.offsetHeight,s=e.offsetLeft,r=e.offsetTop,o=window.getComputedStyle(e),h=o.objectFit,c=t/i,d=a/n;switch(h){case"none":var l=t,g=i;break;case"fill":l=a,g=n;break;default:("cover"===h?c>d:c<d)?l=(g=n)*c:g=(l=a)/c,"scale-down"===h&&(l=Math.min(l,t),g=Math.min(g,i))}var[u,v]=o.objectPosition.split(" ").map((e,t)=>{let i=parseFloat(e);return e.endsWith("%")?(t?n-g:a-l)*i/100:i});o=this._scanRegion.width||t,d=this._scanRegion.height||i,h=this._scanRegion.x||0;var m=this._scanRegion.y||0;(c=this.$overlay.style).width="".concat(o/t*l,"px"),c.height="".concat(d/i*g,"px"),c.top="".concat(r+v+m/i*g,"px"),i=/scaleX\(-1\)/.test(e.style.transform),c.left="".concat(s+(i?a-u-l:u)+(i?t-h-o:h)/t*l,"px"),c.transform=e.style.transform}})}static _convertPoints(e,t){if(!t)return e;let i=t.x||0,a=t.y||0,n=t.width&&t.downScaledWidth?t.width/t.downScaledWidth:1;for(let s of(t=t.height&&t.downScaledHeight?t.height/t.downScaledHeight:1,e))s.x=s.x*n+i,s.y=s.y*t+a;return e}_scanFrame(){!this._active||this.$video.paused||this.$video.ended||("requestVideoFrameCallback"in this.$video?this.$video.requestVideoFrameCallback.bind(this.$video):requestAnimationFrame)(async()=>{if(!(1>=this.$video.readyState)){var e=Date.now()-this._lastScanTimestamp,t=1e3/this._maxScansPerSecond;e<t&&await new Promise(i=>setTimeout(i,t-e)),this._lastScanTimestamp=Date.now();try{var i=await n.scanImage(this.$video,{scanRegion:this._scanRegion,qrEngine:this._qrEnginePromise,canvas:this.$canvas})}catch(e){if(!this._active)return;this._onDecodeError(e)}!n._disableBarcodeDetector||await this._qrEnginePromise instanceof Worker||(this._qrEnginePromise=n.createQrEngine()),i?(this._onDecode?this._onDecode(i):this._legacyOnDecode&&this._legacyOnDecode(i.data),this.$codeOutlineHighlight&&(clearTimeout(this._codeOutlineHighlightRemovalTimeout),this._codeOutlineHighlightRemovalTimeout=void 0,this.$codeOutlineHighlight.setAttribute("viewBox","".concat(this._scanRegion.x||0," ")+"".concat(this._scanRegion.y||0," ")+"".concat(this._scanRegion.width||this.$video.videoWidth," ")+"".concat(this._scanRegion.height||this.$video.videoHeight)),this.$codeOutlineHighlight.firstElementChild.setAttribute("points",i.cornerPoints.map(e=>{let{x:t,y:i}=e;return"".concat(t,",").concat(i)}).join(" ")),this.$codeOutlineHighlight.style.display="")):this.$codeOutlineHighlight&&!this._codeOutlineHighlightRemovalTimeout&&(this._codeOutlineHighlightRemovalTimeout=setTimeout(()=>this.$codeOutlineHighlight.style.display="none",100))}this._scanFrame()})}_onDecodeError(e){e!==n.NO_QR_CODE_FOUND&&console.log(e)}async _getCameraStream(){if(!navigator.mediaDevices)throw"Camera not found.";let e=/^(environment|user)$/.test(this._preferredCamera)?"facingMode":"deviceId",t=[{width:{min:1024}},{width:{min:768}},{}];for(let i of[...t.map(t=>Object.assign({},t,{[e]:{exact:this._preferredCamera}})),...t])try{let e=await navigator.mediaDevices.getUserMedia({video:i,audio:!1}),t=this._getFacingMode(e)||(i.facingMode?this._preferredCamera:"environment"===this._preferredCamera?"user":"environment");return{stream:e,facingMode:t}}catch(e){}throw"Camera not found."}async _restartVideoStream(){let e=this._paused;await this.pause(!0)&&!e&&this._active&&await this.start()}static _stopVideoStream(e){for(let t of e.getTracks())t.stop(),e.removeTrack(t)}_setVideoMirror(e){this.$video.style.transform="scaleX("+("user"===e?-1:1)+")"}_getFacingMode(e){return(e=e.getVideoTracks()[0])?/rear|back|environment/i.test(e.label)?"environment":/front|user|face/i.test(e.label)?"user":null:null}static _drawToCanvas(e,t,i){let a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];i=i||document.createElement("canvas");let n=t&&t.x?t.x:0,s=t&&t.y?t.y:0,r=t&&t.width?t.width:e.videoWidth||e.width,o=t&&t.height?t.height:e.videoHeight||e.height;return a||(a=t&&t.downScaledWidth?t.downScaledWidth:r,t=t&&t.downScaledHeight?t.downScaledHeight:o,i.width!==a&&(i.width=a),i.height!==t&&(i.height=t)),(t=i.getContext("2d",{alpha:!1})).imageSmoothingEnabled=!1,t.drawImage(e,n,s,r,o,0,0,i.width,i.height),[i,t]}static async _loadImage(e){if(e instanceof Image)return await n._awaitImageLoad(e),e;if(e instanceof HTMLVideoElement||e instanceof HTMLCanvasElement||e instanceof SVGImageElement||"OffscreenCanvas"in window&&e instanceof OffscreenCanvas||"ImageBitmap"in window&&e instanceof ImageBitmap)return e;if(e instanceof File||e instanceof Blob||e instanceof URL||"string"==typeof e){let t=new Image;t.src=e instanceof File||e instanceof Blob?URL.createObjectURL(e):e.toString();try{return await n._awaitImageLoad(t),t}finally{(e instanceof File||e instanceof Blob)&&URL.revokeObjectURL(t.src)}}else throw"Unsupported image type."}static async _awaitImageLoad(e){e.complete&&0!==e.naturalWidth||await new Promise((t,i)=>{let a=n=>{e.removeEventListener("load",a),e.removeEventListener("error",a),n instanceof ErrorEvent?i("Image load error"):t()};e.addEventListener("load",a),e.addEventListener("error",a)})}static async _postWorkerMessage(e,t,i,a){return n._postWorkerMessageSync(await e,t,i,a)}static _postWorkerMessageSync(e,t,i,a){if(!(e instanceof Worker))return -1;let s=n._workerMessageId++;return e.postMessage({id:s,type:t,data:i},a),s}constructor(e,t,i,a,s){this._legacyCanvasSize=n.DEFAULT_CANVAS_SIZE,this._preferredCamera="environment",this._maxScansPerSecond=25,this._lastScanTimestamp=-1,this._destroyed=this._flashOn=this._paused=this._active=!1,this.$video=e,this.$canvas=document.createElement("canvas"),i&&"object"==typeof i?this._onDecode=t:(i||a||s?console.warn("You're using a deprecated version of the QrScanner constructor which will be removed in the future"):console.warn("Note that the type of the scan result passed to onDecode will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true."),this._legacyOnDecode=t),t="object"==typeof i?i:{},this._onDecodeError=t.onDecodeError||("function"==typeof i?i:this._onDecodeError),this._calculateScanRegion=t.calculateScanRegion||("function"==typeof a?a:this._calculateScanRegion),this._preferredCamera=t.preferredCamera||s||this._preferredCamera,this._legacyCanvasSize="number"==typeof i?i:"number"==typeof a?a:this._legacyCanvasSize,this._maxScansPerSecond=t.maxScansPerSecond||this._maxScansPerSecond,this._onPlay=this._onPlay.bind(this),this._onLoadedMetaData=this._onLoadedMetaData.bind(this),this._onVisibilityChange=this._onVisibilityChange.bind(this),this._updateOverlay=this._updateOverlay.bind(this),e.disablePictureInPicture=!0,e.playsInline=!0,e.muted=!0;let r=!1;if(e.hidden&&(e.hidden=!1,r=!0),document.body.contains(e)||(document.body.appendChild(e),r=!0),i=e.parentElement,t.highlightScanRegion||t.highlightCodeOutline){if(a=!!t.overlay,this.$overlay=t.overlay||document.createElement("div"),(s=this.$overlay.style).position="absolute",s.display="none",s.pointerEvents="none",this.$overlay.classList.add("scan-region-highlight"),!a&&t.highlightScanRegion){this.$overlay.innerHTML='<svg class="scan-region-highlight-svg" viewBox="0 0 238 238" preserveAspectRatio="none" style="position:absolute;width:100%;height:100%;left:0;top:0;fill:none;stroke:#e9b213;stroke-width:4;stroke-linecap:round;stroke-linejoin:round"><path d="M31 2H10a8 8 0 0 0-8 8v21M207 2h21a8 8 0 0 1 8 8v21m0 176v21a8 8 0 0 1-8 8h-21m-176 0H10a8 8 0 0 1-8-8v-21"/></svg>';try{this.$overlay.firstElementChild.animate({transform:["scale(.98)","scale(1.01)"]},{duration:400,iterations:1/0,direction:"alternate",easing:"ease-in-out"})}catch(e){}i.insertBefore(this.$overlay,this.$video.nextSibling)}t.highlightCodeOutline&&(this.$overlay.insertAdjacentHTML("beforeend",'<svg class="code-outline-highlight" preserveAspectRatio="none" style="display:none;width:100%;height:100%;fill:none;stroke:#e9b213;stroke-width:5;stroke-dasharray:25;stroke-linecap:round;stroke-linejoin:round"><polygon/></svg>'),this.$codeOutlineHighlight=this.$overlay.lastElementChild)}this._scanRegion=this._calculateScanRegion(e),requestAnimationFrame(()=>{let t=window.getComputedStyle(e);"none"===t.display&&(e.style.setProperty("display","block","important"),r=!0),"visible"!==t.visibility&&(e.style.setProperty("visibility","visible","important"),r=!0),r&&(console.warn("QrScanner has overwritten the video hiding style to avoid Safari stopping the playback."),e.style.opacity="0",e.style.width="0",e.style.height="0",this.$overlay&&this.$overlay.parentElement&&this.$overlay.parentElement.removeChild(this.$overlay),delete this.$overlay,delete this.$codeOutlineHighlight),this.$overlay&&this._updateOverlay()}),e.addEventListener("play",this._onPlay),e.addEventListener("loadedmetadata",this._onLoadedMetaData),document.addEventListener("visibilitychange",this._onVisibilityChange),window.addEventListener("resize",this._updateOverlay),this._qrEnginePromise=n.createQrEngine()}}n.DEFAULT_CANVAS_SIZE=400,n.NO_QR_CODE_FOUND="No QR code found",n._disableBarcodeDetector=!1,n._workerMessageId=0;var s=i(4090);function r(){let e=(0,s.useRef)(null),t=(0,s.useRef)(null),i=(0,s.useRef)(null),[r,o]=(0,s.useState)(null),[h,c]=(0,s.useState)(!1),d=async()=>{var a;e.current.hidden=!1,i.current=new n(e.current,e=>{o(e.data)},{highlightScanRegion:!0,overlay:t.current}),await (null===(a=i.current)||void 0===a?void 0:a.start()),c(!0)};return(0,a.jsxs)("main",{className:"flex min-h-screen flex-col items-center justify-center gap-4 p-24",children:[(0,a.jsx)("video",{hidden:!0,ref:e}),h?(0,a.jsx)("a",{className:"block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700",children:(0,a.jsxs)("p",{className:"font-normal",children:[" ",null!=r?r:"Focus the QR code in highlighed region"]})}):(0,a.jsx)("button",{onClick:d,className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",children:"Start QR Scanner"})]})}}},function(e){e.O(0,[971,69,744],function(){return e(e.s=5771)}),_N_E=e.O()}]);