import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import User from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-list-user",
  templateUrl: "./list-user.component.html",
  styleUrls: ["./list-user.component.scss"],
})
export class ListUserComponent implements OnInit {
  users: User[];
  successMessage: string;
  errorMessage: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.successMessage = this.router.getCurrentNavigation().extras.state?.success || null;
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: [User]) => {
      this.users = data;
    });
  }

  addUser(): void {
    this.router.navigate(["add-user"]);
  }

  editUser(user: User): void {
    this.router.navigate(["user", user._id]);
  }

  async deleteUser(user: User) {
    try {
      await this.userService.deleteUser(user._id)

      this.users = this.users.filter((u) => u !== user);
      this.successMessage = "User successfully deleted."
    } catch (error) {
      window.alert(error.message)
      this.errorMessage = "An error has occured while processing your request. Please try again."
    }

  }

  clearSuccess(): void {
    this.successMessage = null;
  }

  clearError(): void {
    this.errorMessage = null;
  }
}
