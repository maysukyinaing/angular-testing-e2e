import { NgModule } from '@angular/core';
import {HomeComponent} from "./courses/home/home.component";
import {AboutComponent} from "./about/about.component";
import {CourseComponent} from "./courses/course/course.component";
import {CourseResolver} from "./courses/services/course.resolver";
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: "",
        component: HomeComponent

    },
    {
        path: "about",
        component: AboutComponent
    },
    {
        path: 'courses/:id',
        component: CourseComponent,
        resolve: {
            course: CourseResolver
        }
    },
    {
        path: "**",
        redirectTo: '/'
    }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
