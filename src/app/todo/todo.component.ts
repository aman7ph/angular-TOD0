import { Component, Input, OnInit } from "@angular/core";
import { TodoService } from "../service/todo.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CategoryService } from "../service/category.service";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent implements OnInit {
  // category;
  categoryId: string;
  todos: Array<object>;
  todoId: string;
  updateStatus: string = "Add";
  todoValue: string = "";

  constructor(
    private TodoService: TodoService,
    private ActivatedRoute: ActivatedRoute
  ) // private CategoryService: CategoryService
  {}

  ngOnInit() {
    this.categoryId = this.ActivatedRoute.snapshot.paramMap.get("id");
    this.TodoService.getTodos(this.categoryId).subscribe((val) => {
      this.todos = val;
    });

    // this.CategoryService.getCategorie(this.categoryId).subscribe((val) => {
    //   this.category = val;
    // });
  }
  onSubmit(f: NgForm) {
    if (this.updateStatus === "Add") {
      let todo = {
        todo: f.value.todoText,
        isCompleted: false,
      };
      this.TodoService.addTodo(this.categoryId, todo);
      f.resetForm();
    } else {
      this.TodoService.updateTodo(
        this.categoryId,
        this.todoId,
        f.value.todoText
      );
      f.resetForm();
      this.updateStatus = "Add";
    }
  }

  onEdit(id: string, todo: string) {
    this.todoId = id;
    this.updateStatus = "Update";
    this.todoValue = todo;
  }
  onDelete(todoId: string) {
    this.TodoService.deleteTodo(this.categoryId, todoId);
  }

  onComplet(todoId: string) {
    this.TodoService.markComplete(this.categoryId, todoId);
  }
  onUnComplet(todoId: string) {
    this.TodoService.markUncomplete(this.categoryId, todoId);
  }
}
