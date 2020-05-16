import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {ExpenseCategory} from '../../auto-tracker-models/ExpenseCategory';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmDialogComponent} from '@fuse/components/confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FuseProgressBarService} from '@fuse/components/progress-bar/progress-bar.service';
import {AuthService} from '../../../../services/auth.service';
import {FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {ExpenseCategoryService} from '../expense-category.service';
import {ExpenseCategoryEditDialogComponent} from '../expense-category-edit-dialog/expense-category-edit-dialog.component';

@Component({
    selector: 'app-expense-category-list',
    templateUrl: './expense-category-list.component.html',
    styleUrls: ['./expense-category-list.component.scss']
})
export class ExpenseCategoryListComponent implements OnInit {
    @ViewChild('dialogContent') public dialogRef: any;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    public title = 'Expense Categories';
    public expenseCategoryList: ExpenseCategory[];
    public dataSource;
    public displayedColumns: string[] = [
        'categoryName',
        'buttons'
    ];
    public tableHeight: number;
    public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _fuseProgressBarService: FuseProgressBarService,
        private expenseCategoryService: ExpenseCategoryService,
        public _matDialog: MatDialog,
        private authService: AuthService,
        private router: Router
    ) {
        this.calculateTableHeight();
    }

    ngOnInit(): void {
        this.getExpenseCategoryList();
    }

    private calculateTableHeight(): void {
        const pixelsAboveTable = 150;
        const pixelsBelowTable = 30;
        this.tableHeight = Math.round((window.innerHeight.valueOf() - pixelsAboveTable - pixelsBelowTable));
    }

    public createExpenseCategory(): void {
        this.dialogRef = this._matDialog.open(ExpenseCategoryEditDialogComponent, {
            panelClass: 'expense-category-edit-dialog',
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
                const expenseCategory: ExpenseCategory = response.getRawValue();
                this.expenseCategoryService.createExpenseCategory(expenseCategory).then((newExpenseCategory) => {
                    console.log('New Vehicle Created', newExpenseCategory);
                    this.getExpenseCategoryList();
                });
            });
    }

    private getExpenseCategoryList(): void {
        this._fuseProgressBarService.show();
        this.expenseCategoryService.getExpenseCategoryList().subscribe(
            (result: any) => {
                this.expenseCategoryList = result;
                this.dataSource = new MatTableDataSource(result);
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

    public editExpenseCategory(categoryGuid: string): void {
        console.log('categoryGuid', categoryGuid);
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
                        console.log('formData', formData.getRawValue());
                        this.expenseCategoryService.updateExpenseCategory(formData.getRawValue()).then(() => {
                            this.getExpenseCategoryList();
                        });
                        break;
                    case 'delete':
                        this.deleteExpenseCategory(categoryGuid);
                        break;
                }
            });
    }

    deleteExpenseCategory(categoryGuid: string): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.expenseCategoryService.deleteExpenseCategory(categoryGuid).then(() => {
                    this.getExpenseCategoryList();
                });
            }
            this.confirmDialogRef = null;
        });
    }

    public openDetail(expenseCategory: ExpenseCategory): void {
        this.router.navigate(['/developer-pages/expense-category-detail', expenseCategory.categoryGuid]).then();
    }
}
