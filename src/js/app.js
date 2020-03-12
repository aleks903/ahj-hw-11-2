import { ajax } from 'rxjs/ajax';
import { pluck, catchError, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import AddMsg from './AddMsg.js';

const elMessages = document.querySelector('.incom-messages');
const addMsg = new AddMsg(elMessages);
const url = 'https://heroku-ahj-11-2.herokuapp.com/posts';
// const url = 'http://localhost:7070/posts';

function loadPostComments(postsData) {
  return new Observable((observer) => {
    for (const item of postsData) {
      const Aj = ajax.getJSON(`${url}/${item.id}/comments/latest`);
      // let tempComm = {};
      Aj.subscribe((value) => {
        item.comments = value.data;
        // tempComm = item;
        observer.next(item);
      });
    }
  });
}

(() => {
  ajax
    .getJSON(`${url}/latest`)
    .pipe(
      pluck('data'),
      catchError(() => of([])),
      switchMap((posts) => combineLatest(loadPostComments(posts))),
    )
    .subscribe((result) => {
      addMsg.addMessages(...result);
      // console.log(...result);
    });
})();
