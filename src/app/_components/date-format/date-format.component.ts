import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormDateConfig } from 'src/app/_models/form-date-config.model';
import { DATE_FORMATS } from './datepicker-format';

@Component({
  selector: 'date-format',
  templateUrl: './date-format.component.html',
  styleUrls: ['./date-format.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ]
})
export class DateFormatComponent implements OnInit {

  /**
   * Flag to re-render the input using ChangeDetectorRef
   */
  showDateInput: boolean = true;

  /**
   * Form group, is filled into the constructor
   */
  form: FormGroup<FormDateConfig>;

  /**
   * A dummy list of date formats
   */
  dateFormatsList: string[] = [
    'dd.MM.yyyy',
    'dd-MM-yyyy',
    'dd/MM/yyyy',
    'MM.dd.yyyy',
    'MM-dd-yyyy',
    'MM/dd/yyyy',
    'yyyy.MM.dd',
    'yyyy-MM-dd',
    'yyyy/MM/dd'
  ];

  constructor(
    fb: NonNullableFormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
    this.form = fb.group({
      format: new FormControl(this.dateFormatsList[0], { nonNullable: true }),
      selectedDate: new FormControl(new Date(), { nonNullable: true }),
    })
  }

  ngOnInit(): void {
    this.setFormat();

    this.form.controls.format.valueChanges
      .subscribe(() => {
        this.setFormat();

        this.showDateInput = false;
        this.cdRef.detectChanges();
        this.showDateInput = true;
      })
  }

  setFormat() {
    const format = this.format.value.replace('dd', 'DD');

    DATE_FORMATS.parse.dateInput = format;
    DATE_FORMATS.display.dateInput = format;
  }

  get format() {
    return this.form.controls.format;
  }

  get selectedDate() {
    return this.form.controls.selectedDate;
  }
}
