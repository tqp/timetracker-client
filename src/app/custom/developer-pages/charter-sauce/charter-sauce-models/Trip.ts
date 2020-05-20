import {FuseUtils} from '@fuse/utils';

export class Trip {
    tripGuid?: string;
    tripName?: string;
    tripStartDate?: string;
    tripEndDate?: string;

    constructor(expense) {
        {
            this.tripGuid = expense.tripGuid || FuseUtils.generateGUID();
            this.tripName = expense.tripName || '';
            this.tripStartDate = expense.tripStartDate || '';
            this.tripEndDate = expense.tripEndDate || '';
        }
    }
}
