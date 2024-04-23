import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CategoryService } from "../service/category.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  color: Array<any> = [
    "#FF6F61",
    "#6B5B95",
    "#88B04B",
    "#F7CAC9",
    "#92A8D1",
    "#955251",
    "#B565A7",
    "#009B77",
    "#DD4124",
    "#D65076",
    "#45B8AC",
    "#EFC050",
    "#7FCDCD",
    "#BC243C",
    "#DA5552",
  ];
  categoryDescription: string = "";
  categorieName: string = "";
  updateStatus: string = "Add";
  categories: Array<object>;
  categoryId: string;
  constructor(private CategoryService: CategoryService) {}

  ngOnInit() {
    this.CategoryService.getCategories().subscribe((val) => {
      this.categories = val;
    });
  }
  onSubmit(f: NgForm) {
    if (this.updateStatus === "Add") {
      let random = Math.floor(Math.random() * this.color.length);
      let todoCategory = {
        categori: f.value.categoryName,
        description: f.value.categoryDescription,
        colorCode: this.color[random],
        todoCount: 0,
      };
      this.CategoryService.saveCategory(todoCategory);
      f.resetForm();
    } else {
      this.CategoryService.updateCategory(
        this.categoryId,
        f.value.categoryName,
        f.value.categoryDescription
      );
      f.resetForm();
      this.updateStatus = "Add";
    }
  }

  onEdit(id: string, categori: string, description: string) {
    this.categoryId = id;
    this.updateStatus = "Update";
    this.categorieName = categori;
    this.categoryDescription = description;
  }

  onDelete(id: string) {
    this.CategoryService.deleteCategory(id);
  }
}
