import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { firestore } from "firebase/app";
import { ToastrService } from "ngx-toastr";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class TodoService {
  constructor(private afs: AngularFirestore, private toster: ToastrService) {}
  getTodos(id: string) {
    return this.afs
      .collection("categories")
      .doc(id)
      .collection("todos")
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
  addTodo(id: string, data) {
    this.afs
      .collection("categories")
      .doc(id)
      .collection("todos")
      .add(data)
      .then((ref) => {
        this.afs
          .doc("categories/" + id)
          .update({ todoCount: firestore.FieldValue.increment(1) });
        this.toster.success("New Todo added successfully");
      });
  }

  updateTodo(categoryId: string, todoId: string, updatedData: string) {
    this.afs
      .collection("categories")
      .doc(categoryId)
      .collection("todos")
      .doc(todoId)
      .update({ todo: updatedData })
      .then(() => {
        this.toster.success(" Todo Updated successfully");
      });
  }

  deleteTodo(categoryId: string, todoId: string) {
    this.afs
      .collection("categories")
      .doc(categoryId)
      .collection("todos")
      .doc(todoId)
      .delete()
      .then(() => {
        this.afs
          .doc("categories/" + categoryId)
          .update({ todoCount: firestore.FieldValue.increment(-1) });
        this.toster.error(" Todo Deleted successfully");
      });
  }

  markComplete(categoryId: string, todoId: string) {
    this.afs
      .collection("categories")
      .doc(categoryId)
      .collection("todos")
      .doc(todoId)
      .update({ isCompleted: true })
      .then(() => {
        this.toster.info(" Todo Marked Completed");
      });
  }

  markUncomplete(categoryId: string, todoId: string) {
    this.afs
      .collection("categories")
      .doc(categoryId)
      .collection("todos")
      .doc(todoId)
      .update({ isCompleted: false })
      .then(() => {
        this.toster.warning(" Todo Marked Uncompleted");
      });
  }
}
