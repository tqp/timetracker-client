import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../services/token.service';
import {ChartOptions} from './models/ChartOptions';

@Injectable({
    providedIn: 'root'
})
export class ManagerDashboardService {

    constructor(private http: HttpClient,
                private tokenService: TokenService) {
    }

    public getChart(): ChartOptions {
        const options = this.getChartOptions();
        // options.dataset = this.getData();
        return options;
    }

    public getChartOptions(): any {
        return {
            chartType: 'line',
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            colors: [
                {
                    borderColor: '#42a5f5',
                    backgroundColor: '#42a5f5',
                    pointBackgroundColor: '#1e88e5',
                    pointHoverBackgroundColor: '#1e88e5',
                    pointBorderColor: '#ffffff',
                    pointHoverBorderColor: '#ffffff'
                }
            ],
            options: {
                spanGaps: false,
                legend: {
                    display: false
                },
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 32,
                        left: 32,
                        right: 32
                    }
                },
                elements: {
                    point: {
                        radius: 4,
                        borderWidth: 2,
                        hoverRadius: 4,
                        hoverBorderWidth: 2
                    },
                    line: {
                        tension: 0
                    }
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: false,
                                drawBorder: false,
                                tickMarkLength: 18
                            },
                            ticks: {
                                fontColor: '#ffffff',
                                min: 0
                            }
                        }
                    ],
                    yAxes: [
                        {
                            display: false
                        }
                    ]
                },
                plugins: {
                    filler: {
                        propagate: false
                    },
                    xLabelsOnTop: {
                        active: true
                    }
                }
            }
        };
    }

    public getAggregatedHoursByMonth(): Observable<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return this.http.get(environment.apiUrl + '/api/v1/time-activity/aggregated-by-month', {headers: this.tokenService.setAuthorizationHeader(token)});
        } else {
            console.error('No token was present.');
            return null;
        }
    }
}
