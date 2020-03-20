import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { TimeActivityService } from './time-activity.service';
import { SearchParams } from '../../models/SearchParams';
import { TimeActivity } from '../../models/TimeActivity';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-time-activity',
    templateUrl: './time-activity.component.html',
    styleUrls: ['./time-activity.component.scss']
})
export class TimeActivityComponent implements OnInit, AfterViewInit {
    @ViewChild('tableContainer', {read: ElementRef, static: true}) public matTableRef: ElementRef;
    public dataSource: TimeActivity[] = [];
    public title = 'Time Activity';
    public displayedColumns: string[] = ['date', 'employee', 'time', 'decimalHours'];
    public tableHeight: number;
    public tableFiltersForm: FormGroup;
    public loadingTable: boolean;
    public loadedRecordsCount: number;
    public allRecordsCount: number;
    public noRecordsFound = false;
    public searchParams: SearchParams = {};

    constructor(private timeActivityService: TimeActivityService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.calculateTableHeight();

        // Build Table Filter Form
        this.tableFiltersForm = this.formBuilder.group({
            nameFilter: ['']
        });

        this.loadAllPageData();

        // Subscribe to changes in the filter
        this.tableFiltersForm.controls['nameFilter'].valueChanges.pipe(debounceTime(500)).subscribe(nameFilter => {
            // const filters: SearchFilters = [];
            // filters.nameFilter = nameFilter;
            this.getTimeActivityRowCount(this.searchParams);
            this.getTimeActivity_FirstPage(this.searchParams);
        });

        // // Refresh on timer trigger
        // this.timerSubscription = this.eventService.timerEvent.subscribe(() => {
        //    // Do stuff
        // });
    }

    ngAfterViewInit(): void {
        // Initialize scroll sensing
        fromEvent(this.matTableRef.nativeElement, 'scroll')
            .pipe(debounceTime(100))
            .subscribe((e: any) => {
                this.onTableScroll(e);
            });
    }

    private loadAllPageData(): void {
        this.matTableRef.nativeElement.scrollTop = 0; // Reset scroll position to top
        this.searchParams.pageIndex = 1; // Reset pagination

        // Load table data
        this.getTimeActivityRowCount(this.searchParams);
        this.getTimeActivity_FirstPage(this.searchParams);
    }

    private calculateTableHeight(): void {
        const screenHeight = window.innerHeight;
        const pixelsAboveTable = 300;
        const pixelsBelowTable = 50;
        this.tableHeight = screenHeight - pixelsAboveTable - pixelsBelowTable;
    }

    private getTimeActivityRowCount(searchParams: SearchParams): void {
        this.timeActivityService.getTimeActivityRowCount(searchParams).subscribe(
            response => {
                console.log('TimeActivityComponent -> getTimeActivityRowCount: response=', response);
                this.allRecordsCount = response.data;
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
    }

    private getTimeActivity_FirstPage(searchParams: SearchParams): void {
        const records: TimeActivity[] = [];
        this.loadingTable = true;
        this.timeActivityService.getTimeActivity(searchParams).subscribe(
            (response: any) => {
                console.log('TimeActivityComponent -> getTimeActivity: response=', response);
                response.forEach(row => {
                    records.push(row);
                });
                this.loadedRecordsCount = records.length;
                this.dataSource = records;
                this.noRecordsFound = response.length <= 0;
                this.loadingTable = false;
            },
            error => {
                console.error('Error: ' + error.message);
            }
        );
    }

    private getTimeActivity_NextPage(searchParams: SearchParams): void {
        const records = this.dataSource.map(x => Object.assign({}, x)); // 'Deep' copy dataSource array
        this.loadingTable = true;
        this.timeActivityService.getTimeActivity(searchParams).subscribe(
            (response: any) => {
                response.data.forEach(row => {
                    records.push(row);
                });
                this.loadedRecordsCount = records.length;
                this.dataSource = records;
                this.noRecordsFound = response.data.length <= 0;
                this.loadingTable = false;
            },
            error => {
                console.error('Error: ', error.message);
            }
        );
    }

    private onTableScroll(e: any): void {
        const scrollThreshold = 200; // If the user has scrolled within 200px of the bottom, get more data.
        const tableViewHeight = e.target.offsetHeight; // viewport: -500px
        const tableScrollHeight = e.target.scrollHeight; // The length of table
        const scrollLocation = e.target.scrollTop; // How far the user has scrolled
        // console.log('tableViewHeight', tableViewHeight, '\ntableScrollHeight', tableScrollHeight, '\nscrollLocation', scrollLocation);
        const scrollDownLimit = tableScrollHeight - tableViewHeight - scrollThreshold;
        if (scrollLocation > scrollDownLimit && this.loadedRecordsCount < this.allRecordsCount) {
            this.searchParams.pageIndex++;
            this.getTimeActivity_NextPage(this.searchParams);
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(): void {
        this.calculateTableHeight();
    }

}
