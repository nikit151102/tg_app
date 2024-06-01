import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { login } from '../../connect-interface';
import { ConnectService } from '../../connect.service';
import { HttpHeaders } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { TelegramService } from '../../../services/telegram.service';

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, ButtonModule]
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  connectForm!: FormGroup;
  errorMessage = '';
  feedback = signal('');

  constructor(
    private fb: FormBuilder,
    private telegram: TelegramService,
    public connectService: ConnectService
  ) {
    this.sendData = this.sendData.bind(this);
  }

  ngOnInit(): void {
    this.connectForm = this.fb.group({
      UserLogin: ['', Validators.required],
      UserPassword: ['', Validators.required]
    });

    this.telegram.MainButton.setText('Отправить сообщение');
    this.telegram.MainButton.show();
    this.telegram.MainButton.disable();
    this.telegram.MainButton.onClick(this.sendData);

    this.connectForm.valueChanges.subscribe(() => {
      this.updateFeedback();
    });
  }

  sendData() {
    const data = {
      login: this.connectForm.get('UserLogin')?.value,
      password: this.connectForm.get('UserPassword')?.value
    };

    this.telegram.sendData(data);
  }

  updateFeedback() {
    if (this.connectForm.valid) {
      this.telegram.MainButton.enable();
    } else {
      this.telegram.MainButton.disable();
    }
  }

  onSubmit() {
    if (this.connectForm.valid) {
      this.sendData();
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }

  ngOnDestroy(): void {
    this.telegram.MainButton.offClick(this.sendData);
  }
}