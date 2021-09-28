import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { EmployeeDashboardComponent } from "./employee-dashboard/employee-dashboard.component";
import { Authority } from "src/app/config/authority.constants";
import { UserRouteAccessService } from "src/app/core/auth/user-route-access.service";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "admin",
        data: {
          authorities: [Authority.ADMIN],
        },
        canActivate: [UserRouteAccessService],
        component: AdminDashboardComponent },
      {
        path: "employee",
        data: {
          authorities: [Authority.USER],
        },
        canActivate: [UserRouteAccessService],
        component: EmployeeDashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
