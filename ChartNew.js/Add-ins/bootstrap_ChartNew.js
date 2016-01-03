


var tag_canvas_suffix="_Tag_Canvas";
var count_tag_canvas=0;
var first_tag="not_yet_defined";
var current_tag="not_yet_defined";
var tag_canvas_list=[];
var tag_def_height=400;
var tag_def_width=800;
var tag_animation_only_at_first_display=false;

function setCanvas(tpgraph,data,options,height,width) { 
	var setheight,setwidth;
	if(typeof height=="undefined")setheight=tag_def_height;
	else setheight=height;
	if(typeof width=="undefined")setwidth=tag_def_width;
	else setwidth=width;
	
	var divs = document.getElementsByTagName('div');
	if(first_tag=="not_yet_defined") { first_tag=divs[divs.length-1].id; current_tag=first_tag; }
	if(typeof tag_canvas_list[divs[divs.length-1].id]=="undefined") tag_canvas_list[divs[divs.length-1].id] = [];
	var cnvcnt=tag_canvas_list[divs[divs.length-1].id].length;
	document.write("<canvas id=\""+divs[divs.length-1].id+tag_canvas_suffix+"_"+cnvcnt+"\" height=\""+setheight+"\" width=\""+setwidth+"\"></canvas>");
	tag_canvas_list[divs[divs.length-1].id][tag_canvas_list[divs[divs.length-1].id].length]={ firstDisplay: true, width:setwidth, height: setheight, tpgraph:tpgraph,data:data,options:options, runAnimation:true };
        document.getElementById(divs[divs.length-1].id+tag_canvas_suffix+"_"+cnvcnt).getContext("2d").original_height=setheight;
        document.getElementById(divs[divs.length-1].id+tag_canvas_suffix+"_"+cnvcnt).getContext("2d").original_width=setwidth;
	if(divs[divs.length-1].id==first_tag){
		console.log("Display Canvas: "+divs[divs.length-1].id+tag_canvas_suffix+"_"+cnvcnt);
		tab_disp_canvas(divs[divs.length-1].id+tag_canvas_suffix+"_"+cnvcnt,tpgraph,data,options,true,setwidth,setheight,true);
		if(tag_animation_only_at_first_display==true)tag_canvas_list[divs[divs.length-1].id][tag_canvas_list[divs[divs.length-1].id].length-1]["runAnimation"]=false;
		tag_canvas_list[divs[divs.length-1].id][tag_canvas_list[divs[divs.length-1].id].length-1]["firstDisplay"]=false;	
	}
};


function tab_disp_graph(tab){
	if(typeof tag_canvas_list[tab]!="undefined") {
		for(var i=0;i<tag_canvas_list[tab].length;i++) {
			tab_disp_canvas(tab+tag_canvas_suffix+"_"+i,tag_canvas_list[tab][i]["tpgraph"],tag_canvas_list[tab][i]["data"],tag_canvas_list[tab][i]["options"],tag_canvas_list[tab][i]["runAnimation"],tag_canvas_list[tab][i]["width"],tag_canvas_list[tab][i]["height"],tag_canvas_list[tab][i]["firstDisplay"]);
			if(tag_animation_only_at_first_display==true)tag_canvas_list[tab][i]["runAnimation"]=false;
			tag_canvas_list[tab][i]["firstDisplay"]=false;			
		}
	}
};

function tab_disp_canvas(canvas,tpgraph,data,options,runAnimation,setWidth,setHeight,firstDisp){

	if(!runAnimation){
window.alert("NO ANIMATION");
		bootStrapChartJsResize(document.getElementById(canvas).getContext("2d"),data,options);
		return(false);
	}

	if(!firstDisp) {
//	if(firstDisp==2) {
console.log("Draw Not First Time" + document.getElementById(canvas).getContext("2d").firstPass);
if(document.getElementById(canvas).getContext("2d").firstPass==3)document.getElementById(canvas).getContext("2d").firstPass=5;
//console.log("Size:"+document.getElementById(canvas).getContext("2d").original_height+" "+document.getElementById(canvas).getContext("2d").original_width);
document.getElementById(canvas).getContext("2d").canvas.height=setWidth;
document.getElementById(canvas).getContext("2d").canvas.width=setHeight;
updateChart(document.getElementById(canvas).getContext("2d"),data,options,true,true);
//    	document.getElementById(canvas).getContext("2d").canvas.height=setWidth;
//    	document.getElementById(canvas).getContext("2d").canvas.width=setHeight;
    
//    	document.getElementById(canvas).getContext("2d").firstPass=undefined;
//    	document.getElementById(canvas).getContext("2d").runanimationcompletefunction=true;
//    	document.getElementById(canvas).getContext("2d").tpchart=undefined;
//    	document.getElementById(canvas).getContext("2d").initialWidth=undefined;
//    	document.getElementById(canvas).getContext("2d").chartTextScale=undefined;
//    	document.getElementById(canvas).getContext("2d").chartLineScale=undefined;
//    	document.getElementById(canvas).getContext("2d").chartSpaceScale=undefined;
//    	document.getElementById(canvas).getContext("2d").ChartNewId=undefined;
//    	document.getElementById(canvas).getContext("2d").DefaultchartTextScale=undefined;
//    	document.getElementById(canvas).getContext("2d").DefaultchartLineScale=undefined;
//    	document.getElementById(canvas).getContext("2d").DefaultchartSpaceScale=undefined;
//    	document.getElementById(canvas).getContext("2d").aspectRatio = undefined;    
}
else {
console.log("DRAW First Time");
	switch (tpgraph) {
		case "Bar":
			var chart = new Chart(document.getElementById(canvas).getContext("2d")).Bar(data,options);
		
			break;
		case "Pie":
			var chart = new Chart(document.getElementById(canvas).getContext("2d")).Pie(data,options);
			break;
		case "Doughnut":
			var chart = new Chart(document.getElementById(canvas).getContext("2d")).Doughtnut(data,options);
			break;
		case "Radar":
			var chart = new Chart(document.getElementById(canvas).getContext("2d")).Radar(data,options);
			break;
		case "PolarArea":
			var chart = new Chart(document.getElementById(canvas).getContext("2d")).PolarArea(data,options);
			break;
		case "HorizontalBar":
			var chart = new Chart(document.getElementById(canvas).getContext("2d")).HorizontalBar(data,options);
			break;
		case "StackedBar":
			var chart = new Chart(document.getElementById(canvas).getContext("2d")).StackedBar(data,options);
			break;
		case "HorizontalStackedBar":
			var chart = new Chart(document.getElementById(canvas).getContext("2d")).HorizontalStackedBar(data,options);
			break;
		case "Line":
			var chart = new Chart(document.getElementById(canvas).getContext("2d")).Line(data,options);
			break;
	}
}
};

function setRefreshCanvas() {
$('a[data-toggle=tab]').on('shown.bs.tab', function (e) {
var vl_target=e.target+"";
vl_target=vl_target.split("#").pop();	
current_tag=vl_target;
//console.log("Before resize");
// Ne faire le resize que pour les chart qui ne doivent pas être réanimé !
// sinon problème d'affichage.... (affichage double avec taille différente...)
//bootStrapChartJsResize();
//console.log("After resize");
tab_disp_graph(vl_target);
});
};

function bootStrapChartJsResize(ctx,data,options) {
console.log("BOOTSTRAPRESIZE:"+ctx.firstPass); 	
ctx.firstPass=5;
	if(typeof ctx.firstPass != "undefined") {
		if(ctx.firstPass == 5)ctx.firstPass=6;
	}
	subUpdateChart(ctx,data,options);
	if(typeof ctx.firstPass != "undefined") {
		if(ctx.firstPass == 6)ctx.firstPass=5;
	}
};

