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
  alertMessage: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.alertMessage = this.router.getCurrentNavigation().extras.state?.success || null;
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

  deleteUser(user: User): void {
    this.userService.deleteUser(user._id).subscribe((data) => {
      this.users = this.users.filter((u) => u !== user);
      this.alertMessage = "User successfully deleted."
    });
  }

  clearAlert(): void {
    this.alertMessage = null;
  }
}
