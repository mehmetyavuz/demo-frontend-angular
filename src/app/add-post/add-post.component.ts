import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import {PostPayload} from "./post-payload";
import {AddPostService} from "../add-post.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('');
  body = new FormControl('');

  constructor(private addPostService: AddPostService,
              private router: Router,
              private localStorage: LocalStorageService) {
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body
    });
    this.postPayload = {
      id: '',
      title: '',
      content: '',
      username: ''
    }
  }

  ngOnInit(): void {
  }

  addPost() {
    this.postPayload.content = this.addPostForm.get('body')?.value;
    this.postPayload.title = this.addPostForm.get('title')?.value;
    this.postPayload.username = this.localStorage.retrieve('username') ;

    this.addPostService.addPost(this.postPayload).subscribe(() => {
      this.router.navigateByUrl('/')
    }, () => {
      console.log('Saving Post failed!')
    });
  }
}
