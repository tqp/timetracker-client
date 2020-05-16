import { Component, OnInit } from '@angular/core';
import {FuelFill} from '../auto-tracker-models/FuelFill';
import * as Highcharts from 'highcharts';
import {AutoTrackerDashboardService} from './auto-tracker-dashboard.service';

@Component({
  selector: 'app-auto-tracker-dashboard',
  templateUrl: './auto-tracker-dashboard.component.html',
  styleUrls: ['./auto-tracker-dashboard.component.scss']
})
export class AutoTrackerDashboardComponent implements OnInit {
    public title = 'Auto Tracker Dashboard';
    public chart: any;
    public fuelFill: FuelFill;

    constructor(private autoTrackerDashboardService: AutoTrackerDashboardService) {
        // HighchartsMore(Highcharts); // Add support for Highcharts' 'arearange' chart
        // AnnotationsModule(Highcharts); // Add support for Highchart' annotations
        Highcharts.setOptions({
            colors: [
                'rgb(5, 141, 199)',
                'rgb(80, 180, 150)',
                'rgb(237, 86, 27)'
            ]
        });
    }

    ngOnInit(): void {
        this.populateFillDataCharts();
    }

    private populateFillDataCharts(): void {
        this.autoTrackerDashboardService.getFillHistory().subscribe(
            (result: any) => {
                const fuelFillData: any = result;
                fuelFillData.sort((a, b) => (a.fillDate > b.fillDate) ? 1 : -1);
                this.generateFillChart(fuelFillData);
                this.generateCostPerGallonChart(fuelFillData);
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
    }

    private generateFillChart(fuelFillData: FuelFill): void {
        document.getElementById('fillHistoryChart').innerText = ''; // clear chart
        const fillHistoryChartDiv = document.createElement('div');
        document.getElementById('fillHistoryChart').appendChild(fillHistoryChartDiv);
        this.chart = Highcharts.chart(fillHistoryChartDiv, this.getFillChartOptions(fuelFillData), (chart) => {
        });
    }

    private generateCostPerGallonChart(fuelFillData: FuelFill): void {
        document.getElementById('costPerGallonChart').innerText = ''; // clear chart
        const costPerGallonChartDiv = document.createElement('div');
        document.getElementById('costPerGallonChart').appendChild(costPerGallonChartDiv);
        this.chart = Highcharts.chart(costPerGallonChartDiv, this.getCostPerGallonChartOptions(fuelFillData), (chart) => {
        });
    }

    private getFillChartOptions(data: any): any {
        return {
            chart: {
                backgroundColor: 'rgba(40, 40, 40, 0',
                height: '250px',
                marginLeft: 80,
                marginTop: 40,
                marginRight: 80,
                resetZoomButton: {
                    theme: {
                        display: 'none'
                    }
                },
                zoomType: 'x',
                type: 'spline'
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    animation: false,
                    marker: {
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    }
                }
            },
            series: [
                {
                    name: 'Miles Traveled',
                    borderColor: 'rgba(255, 119, 119, 0)',
                    type: 'spline',
                    data: data.map((item: FuelFill) => {
                        const date = new Date(item.fillDate).getTime();
                        const value = item.fillMilesTraveled;
                        return [date, value];
                    }),
                    lineWidth: 2,
                    color: 'rgb(5, 141, 199)',
                    fillOpacity: 0.3,
                    marker: {
                        enabled: true,
                        radius: 3
                    },
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
                },
                {
                    name: 'Miles Per Gallon',
                    borderColor: 'rgba(255, 119, 119, 0)',
                    type: 'spline',
                    data: data.map((item: FuelFill) => {
                        const date = new Date(item.fillDate).getTime();
                        if (item.fillMilesPerGallon > 0) {
                            const value = item.fillMilesPerGallon;
                            return [date, value];
                        } else {
                            return [date, null];
                        }
                    }),
                    lineWidth: 2,
                    color: 'rgb(80, 180, 150)',
                    fillOpacity: 0.3,
                    marker: {
                        enabled: true,
                        radius: 3
                    },
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
                    yAxis: 1
                }
            ],
            time: {
                useUTC: null
            },
            title: {
                text: null
            },
            tooltip: {
                shared: true
            },
            xAxis: [
                {
                    type: 'datetime',
                    crosshair: true,
                    gridLineColor: 'rgba(204, 214, 235, 1)'
                }
            ],
            yAxis: [
                {
                    allowDecimals: false,
                    lineColor: 'rgba(0, 0, 0, 1)',
                    // min: 0,
                    gridLineColor: 'rgba(204, 214, 235, 1)',
                    minorGridLineColor: 'rgba(204, 214, 235, 1)',
                    title: {
                        text: 'Miles Traveled',
                        style: {
                            color: 'rgb(5, 141, 199)'
                        }
                    },
                    labels: {
                        style: {
                            color: 'rgb(5, 141, 199)'
                        }
                    }
                },
                {
                    allowDecimals: false,
                    lineColor: 'rgba(0, 0, 0, 1)',
                    // min: 0,
                    gridLineColor: 'rgba(204, 214, 235, 1)',
                    minorGridLineColor: 'rgba(204, 214, 235, 1)',
                    title: {
                        text: 'Miles per Gallon',
                        style: {
                            color: 'rgb(80, 180, 150)'
                        }
                    },
                    labels: {
                        style: {
                            color: 'rgb(80, 180, 150)'
                        }
                    },
                    opposite: true
                }
            ]
        };
    }

    private getCostPerGallonChartOptions(data: any): any {
        return {
            chart: {
                backgroundColor: 'rgba(40, 40, 40, 0',
                height: '250px',
                marginLeft: 80,
                marginTop: 40,
                marginRight: 80,
                resetZoomButton: {
                    theme: {
                        display: 'none'
                    }
                },
                zoomType: 'x',
                type: 'spline'
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    animation: false,
                    marker: {
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    }
                }
            },
            series: [
                {
                    name: 'Cost Per Gallon',
                    borderColor: 'rgba(255, 119, 119, 0)',
                    type: 'spline',
                    data: data.map((item: FuelFill) => {
                        const date = new Date(item.fillDate).getTime();
                        const value = item.fillCostPerGallon;
                        return [date, value];
                    }),
                    lineWidth: 2,
                    color: 'rgb(5, 141, 199)',
                    fillOpacity: 0.3,
                    marker: {
                        enabled: true,
                        radius: 3
                    },
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
                }
            ],
            time: {
                useUTC: null
            },
            title: {
                text: null
            },
            tooltip: {
                shared: true
            },
            xAxis: [
                {
                    type: 'datetime',
                    crosshair: true,
                    gridLineColor: 'rgba(204, 214, 235, 1)'
                }
            ],
            yAxis: [
                {
                    allowDecimals: false,
                    lineColor: 'rgba(0, 0, 0, 1)',
                    // min: 0,
                    gridLineColor: 'rgba(204, 214, 235, 1)',
                    minorGridLineColor: 'rgba(204, 214, 235, 1)',
                    title: {
                        text: '$/Gal.',
                        style: {
                            color: 'rgb(5, 141, 199)'
                        }
                    },
                    labels: {
                        style: {
                            color: 'rgb(5, 141, 199)'
                        }
                    }
                }
            ]
        };
    }

}

