import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import User from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup;
  alertMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.editForm = this.formBuilder.group({
      _id: "",
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

  ngOnInit(): void {
    let userId = this.route.snapshot.params.id;

    this.userService.getUserById(userId).subscribe((data: User) => {
      this.editForm = this.formBuilder.group({
        _id: data._id,
        usr_fullname: [data.usr_fullname, Validators.required],
        usr_email: [
          data.usr_email,
          [
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
          ],
        ],
        usr_address: [data.usr_address, Validators.required],
      });
    });
  }

  goBack(): void {
    this.router.navigate(["users"]);
  }

  async onSubmit() {
    try {
      await this.userService.updateUser(this.editForm.value).toPromise()

      this.router.navigate(["users"], {
        state: {
          success: `User successfully updated.`,
        },
      });
    } catch (error) {
      window.alert(error.message)
      this.alertMessage = "An error has occured while processing your request. Please try again."
    }
  }
}
