import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBook(author: string) : Promise<Book[]> {
    const apiRoot = 'https://www.googleapis.com/books/v1/volumes'
    let apiURL = `${apiRoot}?q=inauthor:"${author}"&langRestrict=fr`;
    return new Promise((resolve, reject) => {
      this.http.get(apiURL).toPromise().then((data: any) => {
        let results : Book[] = data.items.map((item: any) => {
          return new Book(
            item.volumeInfo.title,
            item.volumeInfo.authors,
            item.volumeInfo.imageLinks.thumbnail
          )
        })
        resolve(results);
      });
    });
  }

  getBooks(author:string): Observable<Book[]> {

    const apiRoot = 'https://www.googleapis.com/books/v1/volumes'
    let apiURL = `${apiRoot}?q=inauthor:"${author}"&langRestrict=fr`;

    return this.http.get(apiURL).pipe(map((data: any) => {
      let results: Book[] = data.items.map((book: any) =>{
        return new Book(
          book.volumeInfo.title !== undefined ? book.volumeInfo.title : "",
          book.volumeInfo.authors !== undefined ? book.volumeInfo.authors : [],
          book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : "",
        )
      });

      return results;
      
    }));

  }
}


