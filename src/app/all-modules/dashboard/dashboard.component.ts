import { Component, OnInit, HostListener, NgZone } from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";
import { Authority } from "src/app/config/authority.constants";
import { AccountService } from "src/app/core/auth/account.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
@HostListener("window: resize", ["$event"])
export class DashboardComponent implements OnInit {
  public innerHeight: any;

  getScreenHeight() {
    this.innerHeight = window.innerHeight + "px";
  }

  constructor( private accountService: AccountService, private ngZone: NgZone, private router: Router) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + "px";
      });
    };
    this.getScreenHeight();
  }

  ngOnInit() {
     // if already authenticated then navigate to home page

        if(this.accountService.hasAnyAuthority(Authority.ADMIN)){
          this.router.navigate(['/dashboard/admin']);
        }else{
          this.router.navigate(['/dashboard/employee']);
        }

  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + "px";
  }
}
