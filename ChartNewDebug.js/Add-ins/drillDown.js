

var drillDownBackData=[];
var drillDownBackConfig=[];

var posDrillDownBackData=0;

function chartDrillUp(event,ctx,config,data,other)
{
	if(posDrillDownBackData>0) {
		posDrillDownBackData--;
		updateChart(ctx,drillDownBackData[posDrillDownBackData],drillDownBackConfig[posDrillDownBackData],false,false);
	}
}

function chartDrillDown(event,ctx,config,data,other)
{
  if(other != null) {
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
	if(posDrillDownBackData>0) {
		posDrillDownBackData--;
		updateChart(ctx,drillDownBackData[posDrillDownBackData],drillDownBackConfig[posDrillDownBackData],false,false);
	}
  }
}
