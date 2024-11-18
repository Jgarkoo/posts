import { Component } from '@angular/core';
import { CartsService } from '../service/carts.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Posts } from '../model/posts';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-posts',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './add-posts.component.html',
  styleUrl: './add-posts.component.scss'
})
export class AddPostsComponent {

  isLoggedIn: boolean = false;

  addPostsForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    body: new FormControl('', [Validators.required, Validators.minLength(20)])
  })

  constructor(private addPosts: CartsService, private router: Router){}

  addPost(){
    if(!this.addPostsForm.valid) {
      return;
    }

    const request : Posts = this.addPostsForm.value as unknown as Posts;
    
    this.addPosts.addPosts(request).subscribe({next: (res) => {
      this.addPostsForm.reset();
      this.isLoggedIn = true;
    }})
  }

  navigateTohmpg(){
    this.router.navigate(['/home']);
  }
}
