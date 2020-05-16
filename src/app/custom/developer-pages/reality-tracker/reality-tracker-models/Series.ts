import {FuseUtils} from '@fuse/utils';

export class Series {
    seriesGuid?: string;
    seriesName?: string;

    constructor(expense) {
        {
            this.seriesGuid = expense.seriesGuid || FuseUtils.generateGUID();
            this.seriesName = expense.seriesName || '';
        }
    }
}
