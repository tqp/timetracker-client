import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {AutoExpense} from '../../auto-tracker-models/AutoExpense';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmDialogComponent} from '../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FuelActivityService} from '../../fuel-activity/fuel-activity.service';
import {AuthService} from '../../../../services/auth.service';
import {FuseProgressBarService} from '../../../../../../@fuse/components/progress-bar/progress-bar.service';
import {FormGroup} from '@angular/forms';
import {FuelActivityFlat} from '../../auto-tracker-models/FuelActivityFlat';
import {AutoExpenseEditDialogComponent} from '../auto-expense-edit-dialog/auto-expense-edit-dialog.component';
import {AutoExpenseService} from '../auto-expense.service';
import {fuseAnimations} from '../../../../../../@fuse/animations';

@Component({
    selector: 'app-auto-expense-detail',
    templateUrl: './auto-expense-detail.component.html',
    styleUrls: ['./auto-expense-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AutoExpenseDetailComponent implements OnInit {
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    public expenseGuid: string;
    public autoExpense: AutoExpense;
    public dialogRef: any;
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private autoExpenseService: AutoExpenseService,
                private fuelActivityService: FuelActivityService,
                private authService: AuthService,
                private _fuseProgressBarService: FuseProgressBarService,
                public _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.expenseGuid = this.route.snapshot.paramMap.get('guid');
        this.getAutoExpense(this.expenseGuid);
    }

    private getAutoExpense(expenseGuid: string): void {
        this._fuseProgressBarService.show();
        this.autoExpenseService.getAutoExpense(expenseGuid).subscribe(
            result => {
                this.autoExpense = result;
                this._fuseProgressBarService.hide();
            },
            error => {
                console.error('Error: ' + error.message);
                this._fuseProgressBarService.hide();
            }
        );
    }

    public editAutoExpense(expenseGuid: string): void {
        console.log('expenseGuid', expenseGuid);
        this.dialogRef = this._matDialog.open(AutoExpenseEditDialogComponent, {
            panelClass: 'auto-expense-edit-dialog',
            data: {
                expenseGuid: expenseGuid,
                action: 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch (actionType) {
                    case 'save':
                        this.autoExpenseService.updateAutoExpense(formData.getRawValue()).then(() => {
                            this.getAutoExpense(formData.getRawValue().expenseGuid);
                        });
                        break;
                    case 'delete':
                        console.log('delete');
                        // this.deleteContact(contact);
                        break;
                }
            });
    }

    public deleteAutoExpense(expenseGuid: string): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.autoExpenseService.deleteAutoExpense(expenseGuid).then(() => {
                    this.router.navigate(['developer-pages/auto-expense-list']).then();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    public openDetail(fuelActivityFlat: FuelActivityFlat): void {
        console.log('openDetail', fuelActivityFlat.fillGuid);
        this.router.navigate(['/developer-pages/fuel-activity-detail', fuelActivityFlat.fillGuid]).then();
    }
}
