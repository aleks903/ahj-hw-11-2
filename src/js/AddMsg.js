/* eslint-disable class-methods-use-this */
function convertDate(value) {
  const rValue = value < 10 ? `0${value}` : value;
  return rValue;
}

function printData(valueDate) {
  const itemDate = new Date(valueDate);
  const date = convertDate(itemDate.getDate());
  const month = convertDate(itemDate.getMonth() + 1);
  const year = convertDate(itemDate.getFullYear());
  const hours = convertDate(itemDate.getHours());
  const minut = convertDate(itemDate.getMinutes());
  // const second = convertDate(itemDate.getSeconds());
  const itemCreated = `${hours}:${minut} ${date}.${month}.${year}`;
  return itemCreated;
}

export default class AddMsg {
  constructor(parentElement) {
    this.parentEl = parentElement;
  }

  addComment(comments) {
    let htmlComments = '';
    for (const item of comments) {
      htmlComments += `
      <div class="item-comment">
        <div class="comment-avatar"><img src="${item.avatar}"></div>
        <div class="comment-body">
          <div class="comment-author">${item.author}</div>
          <div class="comment-text">${item.content}</div>
        </div>
        <div class="comment-time">${printData(item.created)}</div>
      </div>
      `;
    }
    return htmlComments;
  }

  addItemMsg(objMsg) {
    const {
      title,
      author,
      avatar,
      image,
      created,
    } = objMsg;
    const itemMsg = document.createElement('div');
    itemMsg.className = 'item-msg';
    itemMsg.innerHTML = `
      <div class="img-avatar"><img src="${avatar}"></div>
      <div class="author-data">
        <div class="name-author">${author}</div>
        <div class="created-post">${printData(created)}</div>
      </div>
      <div class="image"><img class="post-img" src="${image}" title="${title}"></div>
      <p>Latest comments</p>
      <div class="class-commets">
        ${this.addComment(objMsg.comments)}
      </div>
    `;
    this.parentEl.prepend(itemMsg);
  }

  addMessages(itemPost) {
    for (const item of itemPost) {
      this.addItemMsg(item);
    }
  }
}
