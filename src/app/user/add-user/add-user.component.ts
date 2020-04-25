import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent implements OnInit {
  addForm: FormGroup;
  alertMessage: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.addForm = this.formBuilder.group({
      usr_fullname: ["", Validators.required],
      usr_email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
        ],
      ],
      usr_address: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  goBack(): void {
    this.router.navigate(["users"]);
  }

  async onSubmit() {
    try {
      await this.userService.addUser(this.addForm.value).toPromise();

      this.router.navigate(["users"], {
        state: {
          success: `User ${this.addForm.value.usr_fullname} successfully added.`,
        },
      });
    } catch (error) {
      window.alert(error.message)
      this.alertMessage = "An error has occured while processing your request. Please try again."
    }
  }
}
