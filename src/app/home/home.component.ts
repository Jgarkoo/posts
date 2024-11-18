import { Component, OnInit } from '@angular/core';
import { CartsService } from '../service/carts.service';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Posts } from '../model/posts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  id: string = ''; 
  postArray: Posts[] = [];

  constructor(private getpost: CartsService, private router: Router){}

  ngOnInit(): void {
    this.fetchPost();
  }

  fetchPost(){
    this.getpost.getPosts().subscribe({next: (res) => {
      this.postArray = res;
    }})
  }

  navToAddPost(){
    this.router.navigate(['/addPosts'])
  }

  deletePost(id: string) {
    this.getpost.deletePost(id).subscribe({
      next: () => {
        this.postArray = this.postArray.filter(post => post.id !== id);
      },
      error: (err) => {
        console.error('Error deleting post:', err);
      }
    });
  }
  
}
