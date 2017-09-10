import { Component } from '@angular/core';

import * as model from '../models/_all.models';


@Component({
    selector: 'app-signup',
    templateUrl: './templates/signup.template.html'
})
export class SignupPage {

    private account: model.Account;
}