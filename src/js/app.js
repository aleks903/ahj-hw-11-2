import { ajax } from 'rxjs/ajax';
import { concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import AddMsg from './AddMsg.js';

const elMessages = document.querySelector('.incom-messages');
const addMsg = new AddMsg(elMessages);
// const url = 'https://aleks-heroku.herokuapp.com/messages/unread';
const url = 'http://localhost:7070/posts/latest';

function getRequest(postsData) {
  return new Observable((observer) => {
    for (const item of postsData) {
      const Aj = ajax.getJSON(`http://localhost:7070/posts/${item.id}/comments/latest`);
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
  const Aj = ajax.getJSON(url);
  Aj.pipe(concatMap((result) => getRequest(result.data)))
    .subscribe((result) => {
      addMsg.addMessages(result);
    });
})();
