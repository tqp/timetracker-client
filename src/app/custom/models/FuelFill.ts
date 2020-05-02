import {FuseUtils} from '../../../@fuse/utils';

export class FuelFill {
    fillGuid?: string;
    stationGuid?: string;
    fillDate?: string;
    fillOdometer?: number;
    fillMilesTraveled?: number;
    fillMilesPerGallon?: number;
    fillGallons?: number;
    fillCostPerGallon?: number;
    fillTotalCost?: number;

    /**
     * Constructor
     *
     * @param fuelFill
     */
    constructor(fuelFill: FuelFill) {
        {
            this.fillGuid = fuelFill.fillGuid || FuseUtils.generateGUID();
            this.fillDate = fuelFill.fillDate || '';

            this.fillOdometer = fuelFill.fillOdometer || 0;
            this.fillMilesTraveled = fuelFill.fillMilesTraveled || 0;
            this.fillMilesPerGallon = fuelFill.fillMilesPerGallon || 0;

            this.stationGuid = fuelFill.stationGuid || '';
            this.fillGallons = fuelFill.fillGallons || 0;
            this.fillCostPerGallon = fuelFill.fillCostPerGallon || 0;
            this.fillTotalCost = fuelFill.fillTotalCost || 0;
        }
    }
}
