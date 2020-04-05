import {Component, OnInit} from '@angular/core';
import {ManagerDashboardService} from './manager-dashboard.service';
import {ChartOptions} from './models/ChartOptions';
import {FuseProgressBarService} from '../../../../@fuse/components/progress-bar/progress-bar.service';

@Component({
    selector: 'app-manager-dashboard',
    templateUrl: './manager-dashboard.component.html',
    styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent implements OnInit {
    public title = 'Manager Dashboard';
    public billableHoursChartOptions: ChartOptions;
    public billableHoursChartData: any;
    public billableHoursSelectedYear = 2020;
    public distinctYears: number[];

    widgets: ChartOptions;
    chartData: any;
    selectedYear = 2020;
    widget5SelectedDay = 'today';

    constructor(private managerDashboardService: ManagerDashboardService,
                private _fuseProgressBarService: FuseProgressBarService) {
        // Register the custom chart.js plugin
        this._registerCustomChartJSPlugin();
    }

    ngOnInit(): void {
        this.widgets = this.managerDashboardService.getChart();
        // console.log('widgets', this.widgets);

        this.chartData = [
            {
                label: 'Monthly Hours',
                data: [],
                fill: 'start'
            }
        ];

        this.getData(this.selectedYear);

        // // Get distinct years from data
        // this.distinctYears = aggregatedHoursByMonth.map(item => item.year)
        //     .filter((value, index, self) => self.indexOf(value) === index);
        //
        // // filter
        // // const temp = aggregatedHoursByMonth.filter((item) => {
        // //     return item.year === 2020;
        // // });
        // // console.log('temp', temp);
        //
        // // loop
        // // aggregatedHoursByMonth.forEach((item) => {
        // //     console.log(item.year);
        // // });
    }

    private getData(selectedYear: number): void {
        this.selectedYear = selectedYear;
        this.managerDashboardService.getAggregatedHoursByMonth().subscribe(
            result => {

                this.distinctYears = result.map(item => item.year)
                    .filter((value, index, self) => self.indexOf(value) === index);


                console.log('result', result);
                let dog = result.filter((item) => {
                    return item.year === selectedYear;
                });

                dog = dog.map((item) => {
                    return item.decimalHours;
                });

                console.log('dog', dog);
                this.chartData = [
                    {
                        label: 'Sales',
                        data: dog,
                        fill: 'start'
                    }
                ];
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
    }

    /**
     * Register a custom plugin
     */
    private _registerCustomChartJSPlugin(): void {
        (window as any).Chart.plugins.register({
            afterDatasetsDraw: (chart, easing): any => {
                // Only activate the plugin if it's made available
                // in the options
                if (
                    !chart.options.plugins.xLabelsOnTop ||
                    (chart.options.plugins.xLabelsOnTop && chart.options.plugins.xLabelsOnTop.active === false)
                ) {
                    return;
                }

                // To only draw at the end of animation, check for easing === 1
                const ctx = chart.ctx;

                chart.data.datasets.forEach((dataset, i): any => {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach((element, index): any => {

                            // Draw the text in black, with the specified font
                            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                            const fontSize = 13;
                            const fontStyle = 'normal';
                            const fontFamily = 'Roboto, Helvetica Neue, Arial';
                            ctx.font = (window as any).Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                            // Just naively convert to string for now
                            // const dataString = dataset.data[index].toString() + 'k';
                            const dataString = dataset.data[index].toString();

                            // Make sure alignment settings are correct
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            const padding = 15;
                            const startY = 24;
                            const position = element.tooltipPosition();
                            ctx.fillText(dataString, position.x, startY);

                            ctx.save();

                            ctx.beginPath();
                            ctx.setLineDash([5, 3]);
                            ctx.moveTo(position.x, startY + padding);
                            ctx.lineTo(position.x, position.y - padding);
                            ctx.strokeStyle = 'rgba(255,255,255,0.12)';
                            ctx.stroke();

                            ctx.restore();
                        });
                    }
                });
            }
        });
    }
}
