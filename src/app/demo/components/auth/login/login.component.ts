import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserService } from 'src/app/services/user/user.service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    username: string;
    password: string;

    constructor(
        public layoutService: LayoutService,
        private userService: UserService,
        private router: Router
    ) { }

    login() {
        this.userService.login(this.username, this.password).subscribe(response => {
            if (response.code === 200) {
                localStorage.setItem('token', response.result.token);
                localStorage.setItem('user_id', response.result.id.toString());
                localStorage.setItem('user_fullname', response.result.name + ' ' + response.result.paternal_surname)
                localStorage.setItem('role', response.result.type_role.name)

                this.router.navigateByUrl('/');
            }
        });
    }
}
