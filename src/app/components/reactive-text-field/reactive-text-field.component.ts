import { Component, Input, OnInit } from '@angular/core';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-reactive-text-field',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './reactive-text-field.component.html',
  styleUrl: './reactive-text-field.component.scss'
})
export class ReactiveTextFieldComponent implements OnInit {

  @Input() label: string;
  @Input() required: boolean;

  @Input() field: string = null;
  @Input() minLength: number = null;
  @Input() maxLength: number = null;

  @Input() formControlName: string;

  formGroupDirective: FormGroupDirective;

  constructor(private parentForm: FormGroupDirective) { }

  ngOnInit(): void {
    this.formGroupDirective = this.parentForm;
  }

}
