import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AutoExpense} from '../../auto-tracker-models/AutoExpense';
import {AutoExpenseService} from '../auto-expense.service';
import {ExpenseCategoryService} from '../../expense-category/expense-category.service';
import {ExpenseCategory} from '../../auto-tracker-models/ExpenseCategory';

@Component({
    selector: 'app-auto-expense-edit-dialog',
    templateUrl: './auto-expense-edit-dialog.component.html',
    styleUrls: ['./auto-expense-edit-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AutoExpenseEditDialogComponent {
    public action: string;
    public autoExpense: AutoExpense;
    public autoExpenseForm: FormGroup;
    public autoExpenseLoaded = false;
    public dialogTitle: string;
    public expenseCategoryList: ExpenseCategory[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param data
     * @param autoExpenseService
     * @param expenseCategoryService
     * @param expenseCategoryList
     * @param _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<AutoExpenseEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private autoExpenseService: AutoExpenseService,
        private expenseCategoryService: ExpenseCategoryService,
        private _formBuilder: FormBuilder
    ) {
        console.log('data', data);

        this.getCategoryList();

        // Set the defaults
        this.action = data.action;
        this.autoExpense = new AutoExpense({});
        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Expense';
            this.getAutoExpense(data.expenseGuid);
        } else {
            this.dialogTitle = 'New Expense';
        }

        this.autoExpenseForm = this.createAutoExpenseForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createAutoExpenseForm(): FormGroup {
        return this._formBuilder.group({
            expenseGuid: [this.autoExpense.expenseGuid],
            expenseDate: [this.autoExpense.expenseDate],
            expenseCost: [this.autoExpense.expenseCost],
            categoryGuid: [this.autoExpense.categoryGuid]
        });
    }

    private getAutoExpense(expenseGuid: string): void {
        console.log('expenseGuid', expenseGuid);
        this.autoExpenseService.getAutoExpense(expenseGuid).subscribe(
            result => {
                console.log('result', result);
                this.autoExpense = result;
                this.autoExpenseLoaded = true;

                this.autoExpenseForm.controls['expenseGuid'].patchValue(this.autoExpense.expenseGuid);
                this.autoExpenseForm.controls['expenseDate'].patchValue(this.autoExpense.expenseDate);
                this.autoExpenseForm.controls['expenseCost'].patchValue(this.autoExpense.expenseCost.toFixed(2));
                this.autoExpenseForm.controls['categoryGuid'].patchValue(this.autoExpense.categoryGuid);
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
        return null;
    }

    private getCategoryList(): void {
        this.expenseCategoryService.getExpenseCategoryList().subscribe(
            result => {
                console.log('result', result);
                this.expenseCategoryList = result;
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
        return null;
    }
}
