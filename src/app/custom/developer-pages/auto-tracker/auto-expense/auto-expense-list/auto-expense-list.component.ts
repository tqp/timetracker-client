import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmDialogComponent} from '../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FuseProgressBarService} from '../../../../../../@fuse/components/progress-bar/progress-bar.service';
import {AutoExpenseService} from '../auto-expense.service';
import {AuthService} from '../../../../services/auth.service';
import {AutoExpenseEditDialogComponent} from '../auto-expense-edit-dialog/auto-expense-edit-dialog.component';
import {FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {AutoExpense} from '../../auto-tracker-models/AutoExpense';
import {fuseAnimations} from '../../../../../../@fuse/animations';

@Component({
    selector: 'app-auto-expense-list',
    templateUrl: './auto-expense-list.component.html',
    styleUrls: ['./auto-expense-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AutoExpenseListComponent implements OnInit {
    @ViewChild('dialogContent') public dialogRef: any;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    public title = 'Auto Expense';
    public autoExpenseList: AutoExpense[];
    public dataSource;
    public displayedColumns: string[] = [
        'expenseDate',
        'categoryName',
        'expenseCost',
        'buttons'
    ];
    public tableHeight: number;
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _fuseProgressBarService: FuseProgressBarService,
        private autoExpenseService: AutoExpenseService,
        public _matDialog: MatDialog,
        private authService: AuthService,
        private router: Router
    ) {
        this.calculateTableHeight();
    }

    ngOnInit(): void {
        this.getAutoExpenseList();
    }

    private calculateTableHeight(): void {
        const pixelsAboveTable = 150;
        const pixelsBelowTable = 30;
        this.tableHeight = Math.round((window.innerHeight.valueOf() - pixelsAboveTable - pixelsBelowTable));
    }

    public createAutoExpense(): void {
        this.dialogRef = this._matDialog.open(AutoExpenseEditDialogComponent, {
            panelClass: 'auto-expense-edit-dialog',
            data: {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                console.log('response', response.getRawValue());
                const autoExpense: AutoExpense = response.getRawValue();
                this.autoExpenseService.createAutoExpense(autoExpense).then((newAutoExpense) => {
                    console.log('New Auto Expense Created', newAutoExpense);
                    this.getAutoExpenseList();
                });
            });
    }

    private getAutoExpenseList(): void {
        this._fuseProgressBarService.show();
        this.autoExpenseService.getAutoExpenseList().subscribe(
            (result: any) => {
                console.log('result', result);
                this.autoExpenseList = result;
                this.dataSource = new MatTableDataSource(this.autoExpenseList);
                this.dataSource.sort = this.sort;
                this._fuseProgressBarService.hide();
            },
            error => {
                console.error('Error: ' + error.message);
                this.authService.errorHandler(error);
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
                        console.log('formData', formData.getRawValue());
                        this.autoExpenseService.updateAutoExpense(formData.getRawValue()).then(() => {
                            this.getAutoExpenseList();
                        });
                        break;
                    case 'delete':
                        this.deleteAutoExpense(expenseGuid);
                        break;
                }
            });
    }

    deleteAutoExpense(expenseGuid: string): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.autoExpenseService.deleteAutoExpense(expenseGuid).then(() => {
                    this.getAutoExpenseList();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    public openDetail(autoExpense: AutoExpense): void {
        this.router.navigate(['/developer-pages/auto-expense-detail', autoExpense.expenseGuid]).then();
    }
}
