import * as chartJs from 'chart.js';
import {Color} from 'ng2-charts';

export interface ChartOptions {
    // data?: any;
    dataset?: any[];
    chartType?: chartJs.ChartType;
    labels?: string[];
    colors?: Color[];
    options?: any;
}
