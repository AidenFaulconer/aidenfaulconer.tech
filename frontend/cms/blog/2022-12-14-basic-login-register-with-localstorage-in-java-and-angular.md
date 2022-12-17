---
template: BlogPost
catagory: blog
path: /blog
date: 2022-12-14T01:04:14.766Z
title: Basic Login/Register with localstorage in Java and angular
metaDescription: Fullstack Login/Register with local storage in Java and Angular
thumbnail: https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80
---
<!--StartFragment-->

# Full stack login in java

controller

```java
package com.hackerearth.fullstack.backend.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hackerearth.fullstack.backend.controller.IncorrectPasswordException;
import com.hackerearth.fullstack.backend.entities.Item;
import com.hackerearth.fullstack.backend.entities.Message;
import com.hackerearth.fullstack.backend.entities.User;
import com.hackerearth.fullstack.backend.services.UserService;

@CrossOrigin(origins = "*")
@RestController
public class MyController {

    private UserService userService;

	MyController(UserService userService)
	{
		this.userService=userService;
	}

	public static class userItem
	{
		public User user;
		public Item item;
	}

    private boolean isSuccessful(User user){
        User existingUser = userService.getUser(user.getUserid());
        if(existingUser == null){
            return true;
        }

        return existingUser.getPassword().equals(user.getPassword());
    }

    private boolean isIncorrectUsername(User user){
        return userService.getUser(user.getUserid()) == null;
    }

	
	@PostMapping("/login")
	public ResponseEntity<Message> login(@RequestBody User userr)throws Exception
	{
        //check if the signup is successful
        if(isSuccessful(userr)){
            //send success message
            return new ResponseEntity<>(new Message("Login Success")), HttpStatus.OK);
        }
        else {
            if(isIncorrectUsername(userr)){
                throw new UserNotFoundException();
            }
            else {
                throw new IncorrectPasswordException();
            }
        }  
	}
	
	@PostMapping("/signup")
	public ResponseEntity<Message> signup(@RequestBody User u)throws Exception
	{
		if(isSuccessful(u)){
            return new ResponseEntity<>(new Message("signup success"),HttpStatus.OK);
        }
        else {
            throw new UserAlreadyExistsException();
        }
	}
	
}
```

# User service

```java
package com.hackerearth.fullstack.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.hackerearth.fullstack.backend.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hackerearth.fullstack.backend.dao.UserDao;
import com.hackerearth.fullstack.backend.entities.Item;
import com.hackerearth.fullstack.backend.entities.User;

@Service
public class UserServiceImpl implements UserService {

    UserDao userDao;

    UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public User getUser(String id) {
        // get the user with the given id from the database
        User user = userDao.findById(id).get();

        //check if the user exists
        if(user != null){
            return user;
        }
        else {
            return null;
        }  
	}

	@Override
	public User addUser(User c) {
		return userDao.save(c);
	}
}
```

# Register component

```tsx
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = new User();
  msg='';

  constructor(private _service: RegistrationService, private _route :Router) { }

  ngOnInit() {
  }

  isValid(user:User){
      //check if the user id is not empty
      if(user.userid == null || user.userid.trim() === '')
          return false;

      if(user.password == null || user.password.trim() == '')
        return false

      return true
  }

  registerUser(){
      if(this.isValid(this.user)){
          this._service.registerUserFromRemote(this.user).subscribe(data=>{
              this.msg = 'Registration Success';

              this._route.navigate(['/']);
          });
      }
      else {
          this.msg = "Bad Credentials, Please enter Valid User id and Password"
      }
  }
}
```

# Login Success Component

```tsx
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { FetcherService } from '../fetcher.service';


@Component({
  selector: 'app-loginsuccess',
  templateUrl: './loginsuccess.component.html',
  styleUrls: ['./loginsuccess.component.css']
})
export class LoginsuccessComponent implements OnInit {

constructor(private storage: StorageService,private router: Router,private fetcher:FetcherService){}
urls = []
books 
term
cartcount:number=0;

logout(){
  var cc = parseInt(localStorage.getItem('cartcount')||'0');
  for(var i =1;i<=cc;i++){
    localStorage.removeItem('cartitem'+i.toString());
  }
  localStorage.removeItem('cartcount');
 this.router.navigateByUrl('/');
}

addCart(bookID,title,price,image){

    this.cartcount += 1;

    localStorage.setItem('cartcount', this.cartcount.toString());

    const item = {
        id: bookID,
        title: title,
        price: price,
        image: image,
    };

    localStorage.setItem('cartItem'+this.cartcount.toString(), JSON.stringify(item));
}

  ngOnInit() {

    if(localStorage.getItem('cartcount')==null){
      localStorage.setItem('cartcount','0');
    }
    this.cartcount=parseInt(localStorage.getItem('cartcount')||'0');

    if(!this.storage.getData()){
      this.fetcher.getData().subscribe(data =>{
        this.books = data
        this.books.forEach(element => {
          if(!localStorage.key(element.id)){
              localStorage.setItem(element.id.toString(),'false')
          }
      });
      

      if ('serviceWorker' in navigator) {    
          Array.from(this.urls).forEach(url => fetch(url).then(response =>{
          console.log(response)
          }));
      }
      })
    }else{
      this.books =this.storage.getData()
      this.books.forEach(element => {
        if(!localStorage.key(element.id)){
            localStorage.setItem(element.id.toString(),'false')
        }
    });
    

    if ('serviceWorker' in navigator) {    
        Array.from(this.urls).forEach(url => fetch(url).then(response =>{
        console.log(response)
        }));
    }
    }

    }

    element
    ev($e){
        console.log($e);
    }
    view(bookID){
        console.log(bookID)
        this.router.navigate([bookID])
    
    }
    sBookID
    sTitle
    sAuthors
    sAverage_rating
    sPrice
    sIsbn
    sLanguage_code
    sRatings_count
    sImage
    viewModal(bookID){
      this.sBookID = bookID
    
      this.books.forEach(element => {
        if(element.bookID === this.sBookID){
          this.sTitle = element.title
          this.sPrice= element.price
          this.sAuthors = element.authors
          this.sAverage_rating = element.average_rating
          this.sIsbn=element.isbn
          this.sLanguage_code=element.language_code
          this.sRatings_count=element.ratings_count
          this.sImage = element.Image
        }
      });
    }
    

}
```

<!--StartFragment-->

# Cart Component

```tsx
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { FetcherService } from '../fetcher.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

constructor(private storage: StorageService,private router: Router,private fetcher:FetcherService){}
urls = []
books 

hcart:any=[]
total:number=0;

view(bookID){
  console.log(bookID)
  this.router.navigate([bookID])

}


sBookID
sTitle
sAuthors
sAverage_rating
sPrice
sIsbn
sLanguage_code
sRatings_count
sImage

viewModal(bookID){
this.sBookID = bookID

this.books.forEach(element => {
  if(element.bookID === this.sBookID){
    this.sTitle = element.title
    this.sPrice= element.price
    this.sAuthors = element.authors
    this.sAverage_rating = element.average_rating
    this.sIsbn=element.isbn
    this.sLanguage_code=element.language_code
    this.sRatings_count=element.ratings_count
    this.sImage = element.Image
  }
});
}

  ngOnInit(): void {
    this.refreshCart();
  }

  refreshCart(){
    var c = parseInt(localStorage.getItem('cartcount')||'0');
    this.hcart = []
    this.total=0;
    for(var i=1;i<=c;i++){
      var cbook=(localStorage.getItem('cartitem'+i.toString())||'').split('|')
      this.hcart.push({'id':i,'title':cbook[1],'price':cbook[2],'image':cbook[3]})
      this.total = this.total+parseFloat(cbook[2])
    }
  }

  removeCart(id)
  {
      var c = parseInt(localStorage.getItem('cartcount')||'0');
      var cbook = (localStorage.getItem('carditem'+id.toString())||'').split('|');
      var itemPrice = parseFloat(cbook[2]);
      this.total = this.total - itemPrice;

      localStorage.removeItem('cartitem'+id.toString());

      for(var i=id+1;i<=c;i++){
          var cbook = (
              localStorage.getItem('carditem'+i.toString())||'').split('|') 
          localStorage.setItem('cartitem'+(i-1).toString(),cbook[1]+"|"+cbook[2]+"|"+cbook[3]);
      }

      c = c-1; 
      localStorage.setItem('cartcount',c.toString());

      this.refreshCart(); 
  }


  emptyCart()
  {
      var c = parseInt(localStorage.getItem('cartcount')||'0');

      for(var i=1;i<=c;i++){
          localStorage.removeItem('cartitem'+i.toString());
      }

      localStorage.setItem('cartcount','0');

      this.refreshCart();
  }
}
```

<!--EndFragment--> 



<!--EndFragment-->