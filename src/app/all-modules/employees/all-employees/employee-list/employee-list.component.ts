import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { combineLatest, Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";

//////////////////////////////////////////////////////////////////////////
//Jhipster
import { IEmployee } from "src/app/model/employee.model";
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from "src/app/config/pagination.constants";
import { EmployeeService } from "src/app/service/employee.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpHeaders, HttpResponse } from "@angular/common/http";



declare const $: any;
@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  public dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public lstEmployee: any;
  public url: any = "employeelist";
  public tempId: any;
  public editId: any;

  public addEmployeeForm: FormGroup;
  public editEmployeeForm: FormGroup;

  public pipe = new DatePipe("en-US");
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public DateJoin;


////////////////////////////////////////////////////////////////////////////////////
//Jhipster
employees?: IEmployee[];
isLoading = false;
totalItems = 0;
itemsPerPage = ITEMS_PER_PAGE;
page?: number;
predicate!: string;
ascending!: boolean;
ngbPaginationPage = 1;
///////////////////////////////////////////////////////////////////////////////////////


  constructor(
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    ////////////////////////////////////////////////////////////////////////////
    //jhipster
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) { }


  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.employeeService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IEmployee[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        () => {
          this.isLoading = false;
          this.onError();
        }
      );
  }


  protected handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === ASC;
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    });
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'lastName') {
      result.push('lastName');
    }


    return result;
  }

  protected onSuccess(data: IEmployee[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/employees/employeelist'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.employees = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }


  ngOnInit() {


    this.handleNavigation();
    ///////////////////////////////////////////////////////////////////////////////


    // for floating label
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
    // this.loadEmployee();
    // // add employee form validation
    // this.addEmployeeForm = this.formBuilder.group({
    //   FirstName: ["", [Validators.required]],
    //   LastName: ["", [Validators.required]],
    //   UserName: ["", [Validators.required]],
    //   Password: ["", [Validators.required]],
    //   ConfirmPassword: ["", [Validators.required]],
    //   DepartmentName: ["", [Validators.required]],
    //   Designation: ["", [Validators.required]],
    //   Email: ["", [Validators.required]],
    //   PhoneNumber: ["", [Validators.required]],
    //   JoinDate: ["", [Validators.required]],
    //   CompanyName: ["", [Validators.required]],
    //   EmployeeID: ["", [Validators.required]],
    // });

    // // edit form validation
    // this.editEmployeeForm = this.formBuilder.group({
    //   FirstName: ["", [Validators.required]],
    //   LastName: ["", [Validators.required]],
    //   UserName: ["", [Validators.required]],
    //   Password: ["", [Validators.required]],
    //   ConfirmPassword: ["", [Validators.required]],
    //   DepartmentName: ["", [Validators.required]],
    //   Designation: ["", [Validators.required]],
    //   Email: ["", [Validators.required]],
    //   PhoneNumber: ["", [Validators.required]],
    //   JoinDate: ["", [Validators.required]],
    //   CompanyName: ["", [Validators.required]],
    //   EmployeeID: ["", [Validators.required]],
    // });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }
  // manually rendering Data table

  rerender(): void {
    $("#datatable").DataTable().clear();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.lstEmployee = [];
    this.loadEmployee();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // Get Employee  Api Call
  loadEmployee() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstEmployee = data;
      this.rows = this.lstEmployee;
      this.srch = [...this.rows];
    });
  }

  // Add employee  Modal Api Call
  addEmployee() {
    let DateJoin = this.pipe.transform(
      this.addEmployeeForm.value.JoinDate,
      "dd-MM-yyyy"
    );
    let obj = {
      firstname: this.addEmployeeForm.value.FirstName,
      lastname: this.addEmployeeForm.value.LastName,
      username: this.addEmployeeForm.value.UserName,
      email: this.addEmployeeForm.value.Email,
      password: this.addEmployeeForm.value.Password,
      confirmpassword: this.addEmployeeForm.value.ConfirmPassword,
      employeeId: this.addEmployeeForm.value.EmployeeID,
      joindate: DateJoin,
      phone: this.addEmployeeForm.value.PhoneNumber,
      company: this.addEmployeeForm.value.CompanyName,
      department: this.addEmployeeForm.value.DepartmentName,
      designation: this.addEmployeeForm.value.Designation,
      mobile: "9944996335",
      role: "Web developer",
    };
    this.srvModuleService.add(obj, this.url).subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.loadEmployee();
    $("#add_employee").modal("hide");
    this.addEmployeeForm.reset();
    this.toastr.success("Employeee added sucessfully...!", "Success");
  }

  // to know the date picker changes
  from(data) {
    this.DateJoin = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // edit modal api call
  editEmployee() {
    let obj = {
      firstname: this.editEmployeeForm.value.FirstName,
      lastname: this.editEmployeeForm.value.LastName,
      username: this.editEmployeeForm.value.UserName,
      email: this.editEmployeeForm.value.Email,
      password: this.editEmployeeForm.value.Password,
      confirmpassword: this.editEmployeeForm.value.ConfirmPassword,
      employeeId: this.editEmployeeForm.value.EmployeeID,
      joindate: this.editEmployeeForm.value.JoinDate,
      phone: this.editEmployeeForm.value.PhoneNumber,
      company: this.editEmployeeForm.value.CompanyName,
      department: this.editEmployeeForm.value.DepartmentName,
      designation: this.editEmployeeForm.value.Designation,
      mobile: "9944996335",
      role: "Web developer",
      id: this.editId,
    };
    this.srvModuleService.update(obj, this.url).subscribe((data1) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.loadEmployee();
    $("#edit_employee").modal("hide");
    this.toastr.success("Employeee Updated sucessfully...!", "Success");
  }

  // To Get The employee Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstEmployee.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstEmployee[index];
    this.editEmployeeForm.setValue({
      FirstName: toSetValues.firstname,
      LastName: toSetValues.lastname,
      UserName: toSetValues.username,
      Email: toSetValues.email,
      Password: toSetValues.password,
      ConfirmPassword: toSetValues.confirmpassword,
      EmployeeID: toSetValues.employeeId,
      JoinDate: toSetValues.joindate,
      PhoneNumber: toSetValues.phone,
      CompanyName: toSetValues.company,
      DepartmentName: toSetValues.department,
      Designation: toSetValues.designation,
    });
  }

  // delete employee data api call
  deleteEmployee() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.loadEmployee();
    $("#delete_employee").modal("hide");
    this.toastr.success("Employee deleted sucessfully..!", "Success");
  }

  //search by Id
  searchId(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.employeeId.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.firstname.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by purchase
  searchByDesignation(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.designation.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //getting the status value
  getStatus(data) {
    this.statusValue = data;
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
