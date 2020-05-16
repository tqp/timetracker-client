import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {ExpenseCategory} from '../../auto-tracker-models/ExpenseCategory';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ExpenseCategoryService} from '../expense-category.service';

@Component({
    selector: 'app-expense-category-edit-dialog',
    templateUrl: './expense-category-edit-dialog.component.html',
    styleUrls: ['./expense-category-edit-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExpenseCategoryEditDialogComponent {
    public action: string;
    public expenseCategory: ExpenseCategory;
    public expenseCategoryForm: FormGroup;
    public expenseCategoryLoaded = false;
    public dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param data
     * @param expenseCategoryService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ExpenseCategoryEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private expenseCategoryService: ExpenseCategoryService,
        private _formBuilder: FormBuilder
    ) {
        console.log('data', data);

        // Set the defaults
        this.action = data.action;
        this.expenseCategory = new ExpenseCategory({});
        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Category';
            this.getExpenseCategory(data.categoryGuid);
        } else {
            this.dialogTitle = 'New Category';
        }

        this.expenseCategoryForm = this.createExpenseCategoryForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createExpenseCategoryForm(): FormGroup {
        return this._formBuilder.group({
            categoryGuid: [this.expenseCategory.categoryGuid],
            categoryName: [this.expenseCategory.categoryName]
        });
    }

    private getExpenseCategory(categoryGuid: string): void {
        console.log('categoryGuid', categoryGuid);
        this.expenseCategoryService.getExpenseCategory(categoryGuid).subscribe(
            result => {
                console.log('result', result);
                this.expenseCategory = result;
                this.expenseCategoryLoaded = true;

                this.expenseCategoryForm.controls['categoryGuid'].patchValue(this.expenseCategory.categoryGuid);
                this.expenseCategoryForm.controls['categoryName'].patchValue(this.expenseCategory.categoryName);
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
        return null;
    }
}
