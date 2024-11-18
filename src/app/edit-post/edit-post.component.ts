import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartsService } from '../service/carts.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Posts } from '../model/posts';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent implements OnInit{

  id: string;
  postSarr: any = {};
  showEditor: boolean = false;
  editedPost: boolean = false;

  editPostForm = new FormGroup ({
    title: new FormControl('',[Validators.required, Validators.minLength(3)]),
    body: new FormControl('',[Validators.required, Validators.minLength(20)])
  })

  constructor(private route: ActivatedRoute, private getSingleP: CartsService, private router: Router){
    this.id = this.route.snapshot.paramMap.get('id') || ' ';
  }

  ngOnInit(): void {
    this.fetchSinglePost();
  }

  fetchSinglePost(){
    this.getSingleP.getSinglePost(this.id).subscribe((res: any) => {
      this.postSarr = res;
      this.editPostForm.patchValue({
        title: this.postSarr.title,
        body: this.postSarr.body
      });
    })
  }

  savePost() {
    if (this.editPostForm.valid) {
      const updatedPost: Posts = this.editPostForm.value as unknown as Posts;

      this.getSingleP.updatePost(this.id, updatedPost).subscribe({
        next: () => {
          this.editedPost = true;
        }
      });
    } 
  }

  showEditorDiv(){
    this.showEditor = !this.showEditor;
  }

  navigateTohmpg(){
    this.router.navigate(['/home']);
  }
}
