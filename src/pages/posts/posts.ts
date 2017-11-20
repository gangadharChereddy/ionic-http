import { PostProvider } from './../../providers/post/post';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {

  posts: any[];
  constructor(private service: PostProvider) {
  }

  ionViewWillEnter(){
    this.service.getAll()
    .subscribe(posts => this.posts = posts);
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value };
    input.value = '';

    this.service.create(post)
      .subscribe(
        newPost => {
          post['id'] = newPost.id;
            this.posts.splice(0, 0, post);
          },
          (error) => {
            throw error;
          });
  }

  updatePost(post) {
    this.service.update(post)
      .subscribe(
        updatedPost => {
          console.log(updatedPost);
        });
  }

  deletePost(post) {
    this.service.delete(post.id)
      .subscribe(
        () => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        },
        (error ) => {
         alert("Error Message :"+error.message);
         throw error;
        });
  }
}
