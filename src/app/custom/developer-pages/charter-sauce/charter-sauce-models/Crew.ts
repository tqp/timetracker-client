import {FuseUtils} from '@fuse/utils';

export class Crew {
    crewGuid?: string;
    crewLastName?: string;
    crewFirstName?: string;

    constructor(expense) {
        {
            this.crewGuid = expense.crewGuid || FuseUtils.generateGUID();
            this.crewLastName = expense.crewName || '';
            this.crewFirstName = expense.crewModel || '';
        }
    }
}
