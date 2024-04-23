import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ToastrModule, ToastNoAnimationModule } from "ngx-toastr";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CategoryComponent } from "./category/category.component";
import { FooterComponent } from "./layouts/footer/footer.component";
import { NavbarComponent } from "./layouts/navbar/navbar.component";
import { TodoComponent } from "./todo/todo.component";

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    FooterComponent,
    NavbarComponent,
    TodoComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ToastNoAnimationModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig as any),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
