import { ajax } from 'rxjs/ajax';
import { pluck, catchError, switchMap } from 'rxjs/operators';
import { Observable, of, zip } from 'rxjs';
import AddMsg from './AddMsg.js';

const elMessages = document.querySelector('.incom-messages');
const addMsg = new AddMsg(elMessages);
// const url = 'https://heroku-ahj-11-2.herokuapp.com/posts';
const url = 'http://localhost:7070/posts';

function loadPostComments(item) {
  // console.log(item);
  return new Observable((observer) => {
      const Aj = ajax.getJSON(`${url}/${item.id}/comments/latest`);
      Aj.subscribe((value) => {
        item.comments = value.data;
        observer.next(item);
      });
  });
}

(() => {
  ajax
    .getJSON(`${url}/latest`)
    .pipe(
      pluck('data'),
      catchError(() => of([])),
      switchMap((posts) => zip(...posts.map(loadPostComments))),
    )
    .subscribe((result) => {
      addMsg.addMessages(result);
      // console.log(result);
    });
})();
