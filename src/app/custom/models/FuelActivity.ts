import {FuseUtils} from '../../../@fuse/utils';

export class FuelActivity {
    activityGuid?: string;
    activityDate?: string;

    // Car Data
    activityOdometer?: number;
    activityTripMeter?: number;
    activityMilesPerGallon?: number;

    // Station Data
    stationGuid?: string;
    activityGallons?: number;
    activityPricePerGallon?: number;
    activityTotalCost?: number;

    /**
     * Constructor
     *
     * @param fuelActivity
     */
    constructor(fuelActivity: FuelActivity) {
        {
            this.activityGuid = fuelActivity.activityGuid || FuseUtils.generateGUID();
            this.activityDate = fuelActivity.activityDate || '';

            this.activityOdometer = fuelActivity.activityOdometer || 0;
            this.activityTripMeter = fuelActivity.activityTripMeter || 0;
            this.activityMilesPerGallon = fuelActivity.activityMilesPerGallon || 0;

            this.stationGuid = fuelActivity.stationGuid || '';
            this.activityGallons = fuelActivity.activityGallons || 0;
            this.activityPricePerGallon = fuelActivity.activityPricePerGallon || 0;
            this.activityTotalCost = fuelActivity.activityTotalCost || 0;
        }
    }
}
