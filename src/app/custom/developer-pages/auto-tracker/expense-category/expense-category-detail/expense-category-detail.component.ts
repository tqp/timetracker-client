import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmDialogComponent} from '@fuse/components/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FuseProgressBarService} from '@fuse/components/progress-bar/progress-bar.service';
import {AuthService} from '../../../../services/auth.service';
import {FormGroup} from '@angular/forms';
import {ExpenseCategory} from '../../auto-tracker-models/ExpenseCategory';
import {FuelActivityService} from '../../fuel-activity/fuel-activity.service';
import {FuelActivityFlat} from '../../auto-tracker-models/FuelActivityFlat';
import {ExpenseCategoryService} from '../expense-category.service';
import {ExpenseCategoryEditDialogComponent} from '../expense-category-edit-dialog/expense-category-edit-dialog.component';

@Component({
    selector: 'app-expense-category-detail',
    templateUrl: './expense-category-detail.component.html',
    styleUrls: ['./expense-category-detail.component.scss']
})
export class ExpenseCategoryDetailComponent implements OnInit {
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    public categoryGuid: string;
    public expenseCategory: ExpenseCategory;
    public dialogRef: any;
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    public dataSource;
    public displayedColumns: string[] = [
        'fillDate',
        'fillOdometer',
        'fillMilesTraveled',
        'fillGallons',
        'fillCostPerGallon',
        'fillTotalCost'
    ];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private expenseCategoryService: ExpenseCategoryService,
                private fuelActivityService: FuelActivityService,
                private authService: AuthService,
                private _fuseProgressBarService: FuseProgressBarService,
                public _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.categoryGuid = this.route.snapshot.paramMap.get('guid');
        this.getExpenseCategory(this.categoryGuid);
    }

    private getExpenseCategory(categoryGuid: string): void {
        this._fuseProgressBarService.show();
        this.expenseCategoryService.getExpenseCategory(categoryGuid).subscribe(
            result => {
                this.expenseCategory = result;
                this._fuseProgressBarService.hide();
            },
            error => {
                console.error('Error: ' + error.message);
                this._fuseProgressBarService.hide();
            }
        );
    }

    public editExpenseCategory(categoryGuid: string): void {
        this.dialogRef = this._matDialog.open(ExpenseCategoryEditDialogComponent, {
            panelClass: 'expense-category-edit-dialog',
            data: {
                categoryGuid: categoryGuid,
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
                        this.expenseCategoryService.updateExpenseCategory(formData.getRawValue()).then(() => {
                            this.getExpenseCategory(formData.getRawValue().categoryGuid);
                        });
                        break;
                    case 'delete':
                        console.log('delete');
                        // this.deleteContact(contact);
                        break;
                }
            });
    }

    public deleteExpenseCategory(categoryGuid: string): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.expenseCategoryService.deleteExpenseCategory(categoryGuid).then(() => {
                    this.router.navigate(['developer-pages/expense-category-list']).then();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    public openDetail(fuelActivityFlat: FuelActivityFlat): void {
        console.log('openDetail', fuelActivityFlat.fillGuid);
        this.router.navigate(['/developer-pages/expense-category-detail', fuelActivityFlat.fillGuid]).then();
    }
}
