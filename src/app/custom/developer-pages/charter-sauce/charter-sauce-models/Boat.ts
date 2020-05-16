import {FuseUtils} from '@fuse/utils';

export class Boat {
    boatGuid?: string;
    boatName?: string;
    boatModel?: string;
    boatYear?: number;
    boatDoubleCabinCount?: number;
    boatBunkBedCount?: number;
    boatForePeakCabinCount?: number;

    constructor(expense) {
        {
            this.boatGuid = expense.boatGuid || FuseUtils.generateGUID();
            this.boatName = expense.boatName || '';
            this.boatModel = expense.boatModel || '';
            this.boatYear = expense.boatYear || 0;
            this.boatDoubleCabinCount = expense.boatDoubleCabinCount || 0;
            this.boatBunkBedCount = expense.boatBunkBedCount || 0;
            this.boatForePeakCabinCount = expense.boatForePeakCabinCount || 0;
        }
    }
}
