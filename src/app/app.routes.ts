import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { LogInComponent } from './log-in/log-in.component';
import { AddPostsComponent } from './add-posts/add-posts.component';
import { EditPostComponent } from './edit-post/edit-post.component';

export const routes: Routes = [
    
    {   
        path: 'login',
        title: 'logIn page',
        component: LogInComponent
    },
    
    {   
        path: 'home',
        title: 'home page',
        component: HomeComponent
    },

    {
        path: 'addPosts',
        title: 'add-posts',
        component: AddPostsComponent
    },

    {
        path: 'edit-post/:id',
        title: 'edite',
        component: EditPostComponent
    },

    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
   
    {
        path: '**',
        component: ErrorComponent
    }
    
];
