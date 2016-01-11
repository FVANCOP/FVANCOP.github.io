

var drillDownBackData=[];
var drillDownBackConfig=[];

var posDrillDownBackData=0;

function chartDrillUp(event,ctx,config,data,other)
{
	window.alert("IN DRILL UP");
	if(posDrillDownBackData>0) {
		posDrillDownBackData--;
		updateChart(ctx,drillDownBackData[posDrillDownBackData],drillDownBackConfig[posDrillDownBackData],false,false);
	}
}

function chartDrillDown(event,ctx,config,data,other)
{
  window.alert("IN DRILL DOWN")
  if(other != null) {
  	window.alert("NOT UP");
  	if(data.datasets[other.i].drillDownData != null) {
  		if(data.datasets[other.i].drillDownData[other.j] != null) {
  			var vconfig=config;
	  		if(data.datasets[other.i].drillDownConfig != null)if(data.datasets[other.i].drillDownConfig[other.j] != null)vconfig=data.datasets[other.i].drillDownConfig[other.j];
	          	drillDownBackConfig[posDrillDownBackData]=config;
	          	drillDownBackData[posDrillDownBackData++]=data;
			updateChart(ctx,data.datasets[other.i].drillDownData[other.j],vconfig,false,false);
		}
	}
  } else if(config.drillOutsideUp){
  	window.alert("UP");
	if(posDrillDownBackData>0) {
		posDrillDownBackData--;
		updateChart(ctx,drillDownBackData[posDrillDownBackData],drillDownBackConfig[posDrillDownBackData],false,false);
	}
  } else {
  	window.alert("NONE");
  }
}
