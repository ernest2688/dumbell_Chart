import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class App extends Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    var data = [];
    var open = 100;
    var close = 120;

    
    var names = ["12","2345",345345,56,"Richie","Antony","Amada","Idalia","Janella","Marla","Curtis","Shellie","Meggan","Nathanael","Jannette","Tyrell","Sheena","Maranda","Briana","Rosa","Rosanne","Herman",
  "Wayne","Shamika","Suk","Clair","Olivia","Hans","Glennie"];
    for (var i = 0; i < names.length; i++) {
    open += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
    close = open + Math.round(Math.random() * 10) + 3;
    data.push({ category: names[i], open: open, close: close });
    }


    chart.data = data;

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0; 
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.renderer.grid.template.strokeDasharray = "1,3";
    categoryAxis.renderer.labels.template.rotation = 0;
    categoryAxis.renderer.labels.template.horizontalCenter = "left";
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.inside = false;
    
    categoryAxis.renderer.labels.template.adapter.add("dx", function(dx, target) {
        return -target.maxRight / 2;
    })
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.renderer.axisFills.template.disabled = true;
    
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "category";
    series.dataFields.openValueY = "open";
    series.dataFields.valueY = "close";
    series.tooltipText = "open: {openValueY.value} close: {valueY.value}";
    series.sequencedInterpolation = true;
    series.fillOpacity = 0;
    series.strokeOpacity = 1;
    series.columns.template.width = 0.01;
    series.tooltip.pointerOrientation = "horizontal";
    


  
    var obullet = series.bullets.create(am4charts.Bullet);
    let openBullet = obullet.createChild(am4core.Triangle);
    
    obullet.locationY = 1;
    openBullet.horizontalCenter = "middle";
    openBullet.verticalCenter = "middle";
    openBullet.stroke = am4core.color("#fff");
    openBullet.direction = "top";
    openBullet.width = 10;
    openBullet.height = 25;
    
    
    //var openBullet = series.bullets.create(am4charts.CircleBullet);
    
    var cbullet = series.bullets.create(am4charts.Bullet);
    let closeBullet = cbullet.createChild(am4core.Triangle);
    
    closeBullet.fill = chart.colors.getIndex(4);
    closeBullet.stroke = closeBullet.fill;
    closeBullet.horizontalCenter = "middle";
    closeBullet.verticalCenter = "middle";
    closeBullet.stroke = am4core.color("#fff");
    closeBullet.direction = "bottom";
    closeBullet.width = 10;
    closeBullet.height = 25;
    
    chart.cursor = new am4charts.XYCursor();
    
    // chart.scrollbarX = new am4core.Scrollbar();
    // chart.scrollbarY = new am4core.Scrollbar();
    

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    );
  }
}

export default App;