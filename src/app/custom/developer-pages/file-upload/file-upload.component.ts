import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadError } from '../../models/UploadError';
import { FileUploadService } from './file-upload.service';
import { MatTableDataSource } from '@angular/material/table';
import { S3File } from '../../models/S3File';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
    public title = 'AWS S3 Actions';
    public displayedColumns: string[] = ['fileName', 'lastModified', 'size', 'actions'];
    public dataSource: MatTableDataSource<S3File>;
    public pageSize: number;

    public uploadForm: FormGroup;
    public error: UploadError;

    @ViewChild('fileToUpload', {static: false}) fileToUpload: ElementRef;

    constructor(private formBuilder: FormBuilder,
                private fileUploadService: FileUploadService) {
    }

    ngOnInit(): void {
        this.uploadForm = this.formBuilder.group({
            fileToUpload: [''],
            fileName: ['']
        });

        this.getFileList();
    }

    private getFileList(): void {
        this.fileUploadService.getObjectList().subscribe(
            result => {
                // console.log('FileUploadComponent -> getObjectList: result=', result);
                const fileList: S3File[] = result.objectSummaries;
                this.dataSource = new MatTableDataSource(fileList);
            },
            error => {
                console.error('Error: ' + error.message);
                // this.authService.errorHandler(error);
            }
        );
    }

    onFileSelect(event): void {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.uploadForm.get('fileToUpload').setValue(file);
        }
    }

    onSubmit(): void {
        const payload = new FormData();
        payload.append('file', this.uploadForm.get('fileToUpload').value);
        payload.append('fileName', this.uploadForm.get('fileName').value);
        // console.log('uploadForm', this.uploadForm);
        this.fileUploadService.uploadMultipartFile(payload).subscribe(
            result => {
                console.log('url: ', result.value);
                this.getFileList();
                this.fileToUpload.nativeElement.value = '';
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
    }

    public deleteObject(object: any): void {
        this.fileUploadService.deleteObject(object).subscribe(
            result => {
                console.log('Deleted File: ' + result.value);
                this.getFileList();
            },
            error => {
                console.error('Error: ' + error.message);
                // this.authService.errorHandler(error);
            }
        );
    }
}
