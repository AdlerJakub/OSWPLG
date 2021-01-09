import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OrderCredentialsService} from './order-credentials.service';
import {OrderCredentialsModel} from './order-credentials.model';

@Component({
  selector: 'app-order-credentials',
  templateUrl: './order-credentials.component.html',
  styleUrls: ['./order-credentials.component.css']
})
export class OrderCredentialsComponent implements OnInit {
  credentialsForm: FormGroup;

  constructor(private router: Router, private orderCredentialsService: OrderCredentialsService) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const credentials = this.credentialsForm.value;
    this.orderCredentialsService.sendOrderCredentials(credentials);
    this.router.navigate(['orderSummary']);
  }

  private initForm() {
    const name = '';
    const surname = '';
    const street = '';
    const houseNumber = '';
    const flatNumber = '';
    const city = '';
    const zipCode = '';
    const phoneNumber = '';
    const email = '';

    this.credentialsForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      surname: new FormControl(surname, Validators.required),
      street: new FormControl(street, Validators.required),
      houseNumber: new FormControl(houseNumber, [Validators.required, Validators.pattern('[0-9]+([a-z]|[A-Z])?')]),
      flatNumber: new FormControl(flatNumber, [Validators.pattern('[0-9]+')]),
      city: new FormControl(city, [Validators.required]),
      zipCode: new FormControl(zipCode, [Validators.required]),
      phoneNumber: new FormControl(phoneNumber, [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{3}')]),
      email: new FormControl(email, [Validators.required, Validators.email])
    });
  }

}
