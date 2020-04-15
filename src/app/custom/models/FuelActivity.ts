import {FuseUtils} from '../../../@fuse/utils';

export class FuelActivity {
    fuelActivityGuid: string;
    fuelActivityDate: string;

    // Car Data
    fuelActivityOdometer: number;
    fuelActivityTripMeter: number;
    fuelActivityMilesPerGallon: number;

    // Station Data
    fuelActivityGallons: number;
    fuelActivityPricePerGallon: number;
    fuelActivityTotalCost: number;

    /**
     * Constructor
     *
     * @param fuelActivity
     */
    constructor(fuelActivity) {
        {
            this.fuelActivityGuid = fuelActivity.fuelActivityGuid || FuseUtils.generateGUID();
            this.fuelActivityDate = fuelActivity.fuelActivityDate || '';

            this.fuelActivityOdometer = fuelActivity.fuelActivityOdometer || '';
            this.fuelActivityTripMeter = fuelActivity.fuelActivityTripMeter || '';
            this.fuelActivityMilesPerGallon = fuelActivity.fuelActivityMilesPerGallon || '';

            this.fuelActivityGallons = fuelActivity.fuelActivityGallons || '';
            this.fuelActivityPricePerGallon = fuelActivity.fuelActivityPricePerGallon || '';
            this.fuelActivityTotalCost = fuelActivity.fuelActivityTotalCost || '';
        }
    }
}
