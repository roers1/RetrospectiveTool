import {Component, OnInit} from '@angular/core';
import {RetrospectiveService} from '../../services/retrospective/retrospective.service';
import {Retrospective} from '../../../models/Retrospective';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    retrospectives: Retrospective[];

    constructor(public retrospectiveService: RetrospectiveService, public router: Router, public authService: AuthService) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/']);
        } else {
            this.retrospectiveService.getRetrospectives().subscribe(x => {
                this.retrospectives = x;
            });
        }
    }

    getLength() {
        return new Array(Math.ceil(this.retrospectives.length / 2));
    }

    getRetrospectives(index) {
        return [this.retrospectives[index * 2], this.retrospectives[index * 2 + 1]];
    }

    removeBoard($event: number) {
        this.retrospectives = this.retrospectives.filter(x => x.id !== $event);
    }
}
