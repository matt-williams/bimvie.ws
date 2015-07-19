Global = {};

// https://github.com/rgrove/lazyload
LazyLoad=function(k){function p(b,a){var g=k.createElement(b),c;for(c in a)a.hasOwnProperty(c)&&g.setAttribute(c,a[c]);return g}function l(b){var a=m[b],c,f;if(a)c=a.callback,f=a.urls,f.shift(),h=0,f.length||(c&&c.call(a.context,a.obj),m[b]=null,n[b].length&&j(b))}function w(){var b=navigator.userAgent;c={async:k.createElement("script").async===!0};(c.webkit=/AppleWebKit\//.test(b))||(c.ie=/MSIE/.test(b))||(c.opera=/Opera/.test(b))||(c.gecko=/Gecko\//.test(b))||(c.unknown=!0)}function j(b,a,g,f,h){var j=
	function(){l(b)},o=b==="css",q=[],d,i,e,r;c||w();if(a)if(a=typeof a==="string"?[a]:a.concat(),o||c.async||c.gecko||c.opera)n[b].push({urls:a,callback:g,obj:f,context:h});else{d=0;for(i=a.length;d<i;++d)n[b].push({urls:[a[d]],callback:d===i-1?g:null,obj:f,context:h})}if(!m[b]&&(r=m[b]=n[b].shift())){s||(s=k.head||k.getElementsByTagName("head")[0]);a=r.urls;d=0;for(i=a.length;d<i;++d)g=a[d],o?e=c.gecko?p("style"):p("link",{href:g,rel:"stylesheet"}):(e=p("script",{src:g}),e.async=!1),e.className="lazyload",
	e.setAttribute("charset","utf-8"),c.ie&&!o?e.onreadystatechange=function(){if(/loaded|complete/.test(e.readyState))e.onreadystatechange=null,j()}:o&&(c.gecko||c.webkit)?c.webkit?(r.urls[d]=e.href,t()):(e.innerHTML='@import "'+g+'";',u(e)):e.onload=e.onerror=j,q.push(e);d=0;for(i=q.length;d<i;++d)s.appendChild(q[d])}}function u(b){var a;try{a=!!b.sheet.cssRules}catch(c){h+=1;h<200?setTimeout(function(){u(b)},50):a&&l("css");return}l("css")}function t(){var b=m.css,a;if(b){for(a=v.length;--a>=0;)if(v[a].href===
	b.urls[0]){l("css");break}h+=1;b&&(h<200?setTimeout(t,50):l("css"))}}var c,s,m={},h=0,n={css:[],js:[]},v=k.styleSheets;return{css:function(b,a,c,f){j("css",b,a,c,f)},js:function(b,a,c,f){j("js",b,a,c,f)}}}(this.document);

Global.baseDir = new String(document.location.protocol + "//" + document.location.host + document.location.pathname);
if (Global.baseDir.substring(Global.baseDir.length - 5) == ".html") {
	Global.baseDir = Global.baseDir.substring(0, Global.baseDir.lastIndexOf("/"));
}
if (Global.baseDir.substring(Global.baseDir.length - 1) != "/") {
	Global.baseDir = Global.baseDir + "/";
}
var baseJsDir = Global.baseDir + "js/";
var baseCssDir = Global.baseDir + "css/";

var base = document.getElementsByTagName("base");
base[0].href = Global.baseDir;

function loadResources() {
	(function() {
	    var link = document.createElement('link');
	    link.type = 'image/x-icon';
	    link.rel = 'shortcut icon';
	    link.href = Global.baseDir + 'img/logo_small.png';
	    document.getElementsByTagName('head')[0].appendChild(link);
	}());
	
	LazyLoad.css([
	    baseCssDir + "bootstrap.min.css?_v=" + Global.version, 
	    baseCssDir + "main.css?_v=" + Global.version, 
	    baseCssDir + "bootstrap-vert-tabs.css?_v=" + Global.version, 
	    baseCssDir + "magic-bootstrap-min.css?_v=" + Global.version
	], function(){});
	
	LazyLoad.js([baseJsDir + "settings.js?_v=" + Global.version], function(){
		var jsToLoad = [
		        		baseJsDir + "jquery-2.1.3.min.js?_v=" + Global.version, 
		       		    baseJsDir + "main.js?_v=" + Global.version, 
		       		    baseJsDir + "history.js?_v=" + Global.version, 
		       		    baseJsDir + "history.adapter.jquery.js?_v=" + Global.version, 
		       		    baseJsDir + "jquery.cookie.js?_v=" + Global.version, 
		       		    baseJsDir + "jquery.numeric.js?_v=" + Global.version, 
		       		    baseJsDir + "jquery.enterpress.js?_v=" + Global.version, 
		       		    baseJsDir + "base64unicode.js?_v=" + Global.version, 
		       		    baseJsDir + "jquery.ui.widget.js?_v=" + Global.version, 
		       		    baseJsDir + "String.js?_v=" + Global.version, 
		       		    baseJsDir + "tree.js?_v=" + Global.version, 
		       		    baseJsDir + "bimserverapibootstrap.js?_v=" + Global.version, 
		       		    baseJsDir + "bootstrap.min.js?_v=" + Global.version, 
		       		    baseJsDir + "sha256.js?_v=" + Global.version, 
		       		    baseJsDir + "utils.js?_v=" + Global.version, 
		       		    baseJsDir + "formatters.js?_v=" + Global.version, 
		       		    baseJsDir + "jquery.fileupload.js?_v=" + Global.version, 
		       		    baseJsDir + "jquery.scrollto.js?_v=" + Global.version, 
		       		    baseJsDir + "pagechanger.js?_v=" + Global.version, 
		       		    baseJsDir + "plugins/pluginmanager.js?_v=" + Global.version, 
		       		    baseJsDir + "plugins/relaticsplugin.js?_v=" + Global.version,
		       		    baseJsDir + "papaparse.min.js?_v=" + Global.version
		    	 	];
		    		
		    		if (Settings.useBimSurfer()) {
		    			jsToLoad = jsToLoad.concat([
		    	   		    baseJsDir + "bimsurfer/api/BIMSURFER.js?_v=" + Global.version, 
		    	   		    baseJsDir + "bimsurfer/lib/scenejs/scenejs.js?_v=" + Global.version, 
		    	   		    baseJsDir + "bimsurfer/lib/scenejs/plugins/node/effects/stereo.js?_v=" + Global.version, 
		    	   		    baseJsDir + "bimsurfer/api/SceneJS.js?_v=" + Global.version, 
		    	   		    baseJsDir + "bimsurfer/api/Constants.js?_v=" + Global.version, 
		    	   		    baseJsDir + "bimsurfer/api/ProgressLoader.js?_v=" + Global.version, 
		    	   		    baseJsDir + "bimsurfer/api/Types/Light.js?_v=" + Global.version, 
		    	   		    baseJsDir + "bimsurfer/api/Types/Light/Ambient.js?_v=" + Global.version, 
		    	   			baseJsDir + "bimsurfer/api/Types/Light/Sun.js?_v=" + Global.version, 
		    	   			baseJsDir + "bimsurfer/api/Control.js?_v=" + Global.version, 
		    	   			baseJsDir + "bimsurfer/api/Control/ClickSelect.js?_v=" + Global.version, 
		    	   			baseJsDir + "bimsurfer/api/Control/LayerList.js?_v=" + Global.version, 
		    	   			baseJsDir + "bimsurfer/api/Control/ProgressBar.js?_v=" + Global.version, 
		    	   			baseJsDir + "bimsurfer/api/Control/PickFlyOrbit.js?_v=" + Global.version, 
		    	   			baseJsDir + "bimsurfer/api/Control/ObjectTreeView.js?_v=" + Global.version, 
		    	   			baseJsDir + "bimsurfer/api/Events.js?_v=" + Global.version, 
		    	   			baseJsDir + "bimsurfer/api/StringView.js?_v=" + Global.version, 
		    	   			baseJsDir + "bimsurfer/api/GeometryLoader.js?_v=" + Global.version, 
		    	   			baseJsDir + "bimsurfer/api/AsyncStream.js?_v=" + Global.version, 
		    	   			baseJsDir + "bimsurfer/api/DataInputStream.js?_v=" + Global.version, 
		    	   			baseJsDir + "bimsurfer/api/Viewer.js?_v=" + Global.version, 
		    	   			baseJsDir + "bimsurfer/api/Util.js?_v=" + Global.version
		       			]);
		    		}
		    		
		    		LazyLoad.js(jsToLoad, function () {
		    			var othis = this;

		    			Global.lastKey = null;

		    			$.ajaxSetup({
		    				cache: true
		    			});

		    			SceneJS.configure({ pluginPath: baseJsDir + "bimsurfer/lib/scenejs/plugins" });
		    			
		    			var jQueryLoad = $.fn.load;
		    			$.fn.load = function(url, params, callback) {
		    				url += "?_v=" + Global.version;
	    			        return jQueryLoad.apply(this, arguments);
		    			}
		    			
		    			$("body").on("keyup", function (e) {
		    				if (e.target.nodeName == "BODY") {
		    					if (e.keyCode == 67 && Global.lastKey == 67) {
		    						console.log("Clearing cookies");
		    						$.removeCookie("address" + window.document.location.port, {path: "/"});
		    						$.removeCookie("username" + window.document.location.port, {path: "/"});
		    						$.removeCookie("autologin" + window.document.location.port, {path: "/"});
		    						Global.lastKey = null;
		    					} else {
		    						Global.lastKey = e.keyCode;
		    					}
		    				}
		    			});
		    			
		    			othis.loadBimServerApiFromAddress = function(address, successFunction, errorFunction){
		    				loadBimServerApi(address, Global.notifier, Global.version, function(api, serverInfo){
		    					Global.bimServerApi = api;
		    					if (serverInfo.serverState == "NOT_SETUP") {
		    						$(".indexcontainer").load(Global.baseDir + "setup.html", function(){
		    							new Setup(address);
		    						});
		    					} else if (serverInfo.serverState == "UNDEFINED") {
		    					} else if (serverInfo.serverState == "MIGRATION_REQUIRED") {
		    						$(".indexcontainer").load(Global.baseDir + "migrate.html", function(){
		    							new Migrate(address);
		    						});
		    					} else if (serverInfo.serverState == "MIGRATION_IMPOSSIBLE") {
		    					} else if (serverInfo.serverState == "FATAL_ERROR") {
		    					} else if (serverInfo.serverState == "RUNNING") {
		    						successFunction(address);
		    					}
		    				}, function(){
		    					errorFunction(address);
		    				});
		    			};
		    			
		    			
		    			function load() {
		    				$(".sidespan").empty();
		    				Global.history = pushInitialState();
		    				var notLoggedInFunction = function(address){
		    					if (Global.history.page == "Login") {
		    						$(".indexcontainer").load(Global.baseDir + "login.html", function(){
		    							othis.current = new Login(address);
		    						});
		    					} else if (Global.history.page == "SelectServer") {
		    						$(".indexcontainer").load(Global.baseDir + "selectserver.html", function(){
		    							othis.current = new SelectServer(null);
		    						});
		    					} else if (Global.history.page == "Register") {
		    						$(".indexcontainer").load(Global.baseDir + "register.html", function(){
		    							othis.current = new Register($(this));
		    						});
		    					} else if (Global.history.page == "ResetPassword") {
		    						$(".indexcontainer").load(Global.baseDir + "resetpassword.html", function(){
		    							othis.current = new ResetPassword($(this), null);
		    						});
		    					} else {
		    						$(".indexcontainer").load(Global.baseDir + "login.html", function(){
		    							othis.current = new Login(address);
		    						});
		    					}
		    				};
		    				
		    				var successFunction = function(address){
		    					// We do have an API
		    					var token = getParameterByName("token");
		    					if (token == null) {
		    						token = $.cookie("autologin" + window.document.location.port);
		    					}
		    					if (token != null) {
		    						Global.bimServerApi.setToken(token, function(){
		    							$(".indexStatus").hide();
									(!Global.onInitialized) || Global.onInitialized();
		    						}, function(){
		    							$.removeCookie("autologin" + window.document.location.port);
		    							notLoggedInFunction(address);
		    						});
		    					} else {
		    						notLoggedInFunction(address);
		    					}
		    				};
		    				
		    				var errorFunction = function(){
		    					$.removeCookie("username" + window.document.location.port, {path: "/"});
		    					$.removeCookie("autologin" + window.document.location.port, {path: "/"});
		    					$.removeCookie("address" + window.document.location.port, {path: "/"});
		    				};

		    				var address = getParameterByName("address");
		    				
		    				if (address != null) {
		    					othis.loadBimServerApiFromAddress(address, successFunction, errorFunction);
		    				} else if ($.cookie("address" + window.document.location.port) != null) {
		    					othis.loadBimServerApiFromAddress($.cookie("address" + window.document.location.port), successFunction, errorFunction);
		    				} else if (!Settings.allowBimServerAddress()) {
		    					Settings.getStaticServerAddress(function(address){
		    						if (address != null) {
		    							othis.loadBimServerApiFromAddress(address, successFunction, errorFunction);
		    						} else {
		    							notLoggedInFunction(address);
		    						}
		    					});
		    				} else {
		    					// NO API
		    					$(".indexcontainer").load(Global.baseDir + "selectserver.html", function(){
		    						new SelectServer();
		    					});
		    				}
		    			}
		    			
		    			History.Adapter.bind(window, "statechange", function(){
		    				if (!pushing) {
		    					load();
		    				}
		    		    });

		    			Global.bimServerApi = null;
		    			Global.objectcache = {};
		    			Global.timeoutId;
		    			
		    			function Notifier() {
		    				var othis = this;
		    				
		    				this.setSelector = function(selector) {
		    					var currentmessage = $(othis.selector).find(".message").html();
		    					$(othis.selector).hide();
		    					othis.selector = selector;
		    					if (currentmessage != "" && currentmessage != undefined) {
		    						$(selector).show();
		    						$(selector).find(".message").html(currentmessage).parent().addClass("alert-success");
		    					} else {
		    						$(othis.selector).hide();
		    					}
		    					$(othis.selector).find(".close").click(othis.clear);
		    				};

		    				this.clear = function() {
		    					$(othis.selector).find(".message").html("").parent().hide();
		    				};

		    				this.resetStatus = function(){
		    					if (othis.lastTimeOut != null) {
		    						clearTimeout(othis.lastTimeOut);
		    						othis.lastTimeOut = null;
		    					}
		    					$(othis.selector).stop(true, true);
		    					$(othis.selector).fadeOut(1000);
		    				};

		    				this.resetStatusQuick = function(){
		    					if (othis.lastTimeOut != null) {
		    						clearTimeout(othis.lastTimeOut);
		    						othis.lastTimeOut = null;
		    					}
		    					$(othis.selector).hide();
		    				};

		    				this.setSuccess = function(status, timeToShow) {
		    					if (timeToShow == null) {
		    						timeToShow = 5000;
		    					}
		    					$(othis.selector).stop(true, true);
		    					if (othis.lastTimeOut != null) {
		    						clearTimeout(othis.lastTimeOut);
		    						othis.lastTimeOut = null;
		    					}
		    					$(othis.selector).find(".message").html(status).parent().removeClass("initialhide").removeClass("alert-danger").removeClass("alert-info").addClass("alert-success").show();
		    					var notifier = this;
		    					if (timeToShow != -1) {
		    						othis.lastTimeOut = setTimeout(function(){
		    							notifier.resetStatus();
		    						}, timeToShow);
		    					}
		    				};
		    				
		    				this.setInfo = function(status, timeToShow) {
		    					if (timeToShow == null) {
		    						timeToShow = 5000;
		    					}
		    					$(othis.selector).stop(true, true);
		    					if (othis.lastTimeOut != null) {
		    						clearTimeout(othis.lastTimeOut);
		    						othis.lastTimeOut = null;
		    					}
		    					$(othis.selector).find(".message").html(status).parent().show().removeClass("alert-danger").removeClass("alert-success").addClass("alert-info");
		    					var notifier = this;
		    					if (timeToShow != -1) {
		    						othis.lastTimeOut = setTimeout(function(){
		    							notifier.resetStatus();
		    						}, timeToShow);
		    					}
		    				};

		    				this.setError = function(error) {
		    					if (othis.lastTimeOut != null) {
		    						clearTimeout(othis.lastTimeOut);
		    						othis.lastTimeOut = null;
		    					}
		    					$(othis.selector).find(".message").html(error).parent().removeClass("alert-info").removeClass("alert-success").addClass("alert-danger").show();
		    				};
		    				
		    				othis.setSelector(".indexStatus .status");
		    			}

		    			Global.notifier = new Notifier();

		    			function loadError() {
		    				window.clearTimeout(Global.timeoutId);
		    				Global.notifier.error("Could not connect");
		    				$.removeCookie("username" + window.document.location.port, {path: "/"});
		    				$.removeCookie("autologin" + window.document.location.port, {path: "/"});
		    				$.removeCookie("address" + window.document.location.port, {path: "/"});
		    				$(".indexcontainer").load(Global.baseDir + "login.html", function(){
		    					new Login();
		    				});
		    			}
		    			
		    			setInterval(function() {
		    				var now = new Date().getTime();
		    				$(".timespan").each(function() {
		    					$(this).html(formatTimeSpan(now - $(this).attr("datetime"), false));
		    				});
		    				$(".duration").each(function() {
		    					var start = new Date(parseInt($(this).attr("start")));
		    					var end = $(this).attr("end") == null ? new Date() : new Date(parseInt($(this).attr("end")));
		    					var diff = end.getTime() - start.getTime();
		    					$(this).html(formatDuration(diff, true));
		    				});
		    			}, 1000);

		    			load();
		    		}, function (err) {
		    			console.log(err);
		    		});			
	});
}

var myRequest = new XMLHttpRequest();
myRequest.onreadystatechange = function() {
	if (myRequest.readyState != 4)  {
		return;
	}
	if (myRequest.status != 200)  {
		Global.version = new Date().getTime();
		loadResources();
		return;
	} else {
		Global.version = JSON.parse(myRequest.responseText).version;
		loadResources();
	}
};
myRequest.open("GET", Global.baseDir + "plugin.version", true);
myRequest.send();

function ThreeDView(containerDiv) {
	var o = this;
	o.containerDiv = containerDiv;
	o.projects = {};
	o.projectModes = {};
	o.loadedOids = {};
	o.models = {};

	this.load = function(stereo){
		o.containerDiv.on("contextmenu", function(e){
			e.preventDefault();
		});

		var promise = new Promise();
		o.viewer = new BIMSURFER.Viewer(Global.bimServerApi, o.containerDiv);
		o.viewer.loadScene(function(){
			promise.fire();
		}, {stereo: stereo});
		return promise;
	};

	var changeColorOfObject = function(object, color){
		var threeDObject = o.viewer.scene.findNode(object.oid);
		if (threeDObject != null) {
			var matrix = threeDObject.nodes[0];
			var geometryNode = matrix.nodes[0];
			if (geometryNode._core.arrays.colors != null) {
				var groupId = threeDObject.findParentByType("translate").data.groupId;
				
				var geometry = {
					type: "geometry",
					primitive: "triangles"
				};
		
				geometry.coreId = geometryNode.getCoreId() + "_Visualization";
				geometry.indices = geometryNode._core.arrays.indices;
				geometry.positions = geometryNode._core.arrays.positions;
				geometry.normals = geometryNode._core.arrays.normals;
				
				geometry.colors = [];
				for (var i=0; i<geometryNode._core.arrays.colors.length; i+=4) {
					geometry.colors[i] = color.r;
					geometry.colors[i+1] = color.g;
					geometry.colors[i+2] = color.b;
					geometry.colors[i+3] = color.a;
				}
				
				var library = o.viewer.scene.findNode("library-" + groupId);
				library.add("node", geometry);
				
				var newGeometry = {
					type: "geometry",
					coreId: geometryNode.getCoreId() + "_Visualization"
				}
				
				matrix.removeNode(geometryNode);
				matrix.addNode(newGeometry);
			} else {
				threeDObject.findParentByType("flags").set("flags", {transparent: color.a < 1});
				threeDObject.parent.set("alpha", color.a);
				threeDObject.parent.set("baseColor", {r: color.r, g: color.g, b: color.b});
			}
		} else {
			console.log("not found");
		}
	};
	
	var updateVisibility = function(object) {
		var threeDObject = o.viewer.scene.findNode(object.oid);
		var mode = object.trans.mode;
		if (threeDObject != null) {
			var matrix = threeDObject.nodes[0];
			var geometryNode = matrix.nodes[0];
			if (mode == 0) {
				threeDObject.findParentByType("enable").setEnabled(true);
				if (geometryNode._core.arrays.colors != null) {
					if (object.trans.colorOverride != null) {
						changeColorOfObject(object, object.trans.colorOverride);
					} else {
						if (geometryNode.coreId != null && ("" + geometryNode.coreId).endsWith("_Visualization")) {
							// This is a complex-material object which had been modified, return it to the old state
							if (geometryNode._core.arrays.colors != null) {
								matrix.removeNode(geometryNode);
								
								var newGeometry = {
									type: "geometry",
									coreId: geometryNode.getCoreId().replace("_Visualization", "")
								}
								
								matrix.addNode(newGeometry);
							}
						}
					}
				} else {
					if (object.trans.colorOverride != null) {
						changeColorOfObject(object, object.trans.colorOverride);
					} else {
						var material = BIMSURFER.Constants.materials[object.getType()];
						// Hack to get the roof to be red.....
						if (object.getType() == "IfcSlab") {
							if (object.getPredefinedType() == "ROOF") {
								material = BIMSURFER.Constants.materials["IfcRoof"];
							}
						}
						if (material == null) {
							material = BIMSURFER.Constants.materials.DEFAULT;
						}
						
						var color = {r: material.r, g: material.g, b: material.b, a: material.a};
						changeColorOfObject(object, color);
					}
				}
			} else if (mode == 1) {
				threeDObject.findParentByType("enable").setEnabled(true);
				var color = {};
				color.a = 0.5;
				color.r = 0.5;
				color.g = 0.5;
				color.b = 0.5;
				changeColorOfObject(object, color);
			} else if (mode == 2) {
				threeDObject.findParentByType("enable").setEnabled(false);
			}
		}
	};
	
	var objectVisibilityChanged = function(objects){
		// todo use groupid
		
		var uniqueRoids = [];
		
		if (!Array.isArray(objects)) {
			objects = [objects];
		}

		var oidsNotLoaded = [];

		for (var i=0; i<objects.length; i++) {
			var object = objects[i];
			
			if (i == 0) {
				// TODO actually do something useful here
				uniqueRoids.push(object.model.roid);
			}
			
			updateVisibility(object);
			
			if (o.loadedOids[object.oid] == null) {
				if (object.isA("IfcProduct")) {
					// Assuming sync return here because of preloading!!
					object.getRepresentation(function(representation){
						if (representation != null) {
							if (Settings.getDefaultHiddenTypes()[object.getType()] == null || object.trans.mode == 0) {
								oidsNotLoaded.push(object.oid);
							}
						}
					});
				}
			}
		}
		if (oidsNotLoaded.length > 0) {
			var models = {};
			uniqueRoids.forEach(function(roid){
				models[roid] = o.models[roid];
			});
			var geometryLoader = new GeometryLoader(Global.bimServerApi, models, o.viewer);

			geometryLoader.setLoadOids(uniqueRoids, oidsNotLoaded);
			
			// This might be needed when the geometryloader comes up with more objects than requested...
			geometryLoader.objectAddedListeners.push(function(oid){
				models[uniqueRoids[0]].get(oid, function(object){
					updateVisibility(object);
				});
				o.loadedOids[oid] = true;
			});
			geometryLoader.progressListeners.push(function(state){
				if (state == "done") {
					for (var i=0; i<oidsNotLoaded.length; i++) {
						o.loadedOids[oidsNotLoaded[i]] = true;
					}
				}
			});
			o.viewer.loadGeometry(geometryLoader);
		}
	};
	
	this.loadProject = function(poid) {
		console.log("loadProject", poid);
		o.projectModes[poid] = 2;
		Global.bimServerApi.call("Bimsie1ServiceInterface", "getProjectByPoid", {poid: poid}, function(project){
			o.projects[poid] = project;
			loadRevision(poid, project.lastRevisionId, project.schema);
		});
	};

	this.showProject = function(poid) {
		setProjectMode(poid, 0);
	};

	this.showProjectGray = function(poid) {
		setProjectMode(poid, 1);
	};

	this.hideProject = function(poid) {
		setProjectMode(poid, 2);
	};

	var setProjectMode = function(poid, mode) {
		o.projectModes[poid] = mode;
		var project = o.projects[poid];
		if (project) {
			var model = o.models[project.lastRevisionId];
			if (model) {
				var objects = [];
				for (var id in model.objects) {
					model.objects[id].trans.mode = mode;
					objects.push(model.objects[id]);
				}
				objectVisibilityChanged(objects);
			}
		}
	};

	this.setCamera = function(eye, dir, l, up) {
		var controls = o.viewer.controls["BIMSURFER.Control.PickFlyOrbit"];
		if ((controls) && (controls.length > 0)) {
			var control = controls[0];
			var view = control.obtainView();
			control.currentPivot = vecSubtract(view.eye, vecNegate(vecMultiplyScalar(view.dir, l)));
			view.eye = eye || view.eye;
			view.dir = dir || view.dir;
			view.up = up || view.up;
			control.restoreView(view);
		}
	}

	var loadRevision = function(poid, roid, schema){
		Global.bimServerApi.getModel(poid, roid, schema, false, function(model){
			o.models[roid] = model;
			loadModel(poid, roid);
		});
	};
	
	var loadModel = function(poid, roid){
		console.time("loadModel");
		console.log("loadModel", poid, roid);
		var countingPromise = new CountingPromise();
		var promise = new Promise();
		var model = o.models[roid];
		if (model == null) {
			console.log("no model", othis.models);
		} else {
			if (model.isPreloaded) {
				promise.fire();
				return promise;
			} else {
				var preLoadQuery = {
					defines: {
						Representation: {
							field: "Representation"
						},
						ContainsElementsDefine: {
							field: "ContainsElements",
							include: {
								field: "RelatedElements",
								include: [
									"IsDecomposedByDefine",
									"ContainsElementsDefine",
									"Representation"
								]
							}
						},
						IsDecomposedByDefine: {
							field: "IsDecomposedBy",
							include: {
								field: "RelatedObjects",
								include: [
									"IsDecomposedByDefine",
									"ContainsElementsDefine",
									"Representation"
								]
							}
						}
					},
					queries: [
					    {
							type: "IfcProject",
							include: [
								"IsDecomposedByDefine",
								"ContainsElementsDefine"
							]
					    },
					    {
					    	type: "IfcRepresentation",
					    	includeAllSubtypes: true
					    },
					    {
					    	type: "IfcProductRepresentation"
					    },
					    {
					    	type: "IfcPresentationLayerWithStyle"
					    },
					    {
					    	type: "IfcProduct",
					    	includeAllSubTypes: true
					    },
					    {
					    	type: "IfcProductDefinitionShape"
					    },
					    {
					    	type: "IfcPresentationLayerAssignment"
					    },
					    {
					    	type: "IfcRelAssociatesClassification",
					    	include: [
					    		{
					    			field: "RelatedObjects"
					    		},
					    		{
					    			field: "RelatingClassification"
					    		}
					    	]
					    },
					    {
					    	type: "IfcSIUnit"
					    },
					    {
					    	type: "IfcPresentationLayerAssignment"
					    }
					]
				};
				
				model.query(preLoadQuery, function(loaded){
				}).done(function(){
					console.timeEnd("loadModel");
					Global.notifier.setInfo("Loading model data...", -1);
					setTimeout(function(){
						model.isPreloaded = true;
						setProjectMode(poid, o.projectModes[poid]);
						Global.notifier.setSuccess("Model data successfully loaded");
						promise.fire();
					}, 0);
				});
			}			
		}
		return promise;
	};
}
