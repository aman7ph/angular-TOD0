import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastrService } from "ngx-toastr";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private afs: AngularFirestore, private toster: ToastrService) {}

  getCategorie(id: string) {
    return this.afs
      .doc("categories/" + id)
      .get()
      .pipe(map((docSnapshot) => docSnapshot.data()));
  }
  getCategories() {
    return this.afs
      .collection("categories")
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((item) => {
            const data = item.payload.doc.data();
            const id = item.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
  saveCategory(data) {
    this.afs
      .collection("categories")
      .add(data)
      .then((ref) => {
        this.toster.success("New Category added successfully");
      });
  }

  updateCategory(
    id: string,
    updatedCategoryName: string,
    updatedCategoryDescription: string
  ) {
    this.afs
      .doc("categories/" + id)
      .update({
        categori: updatedCategoryName,
        description: updatedCategoryDescription,
      })
      .then(() => {
        this.toster.success(" Category Updated successfully");
      });
  }

  deleteCategory(id: string) {
    this.afs
      .doc("categories/" + id)
      .delete()
      .then(() => {
        this.toster.error(" Category Deleted successfully");
      });
  }
}
