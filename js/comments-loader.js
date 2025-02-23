const commentsList = document.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('li');
const pictureShownComments = document.querySelector('.social__comment-shown-count');
const pictureTotalComments = document.querySelector('.social__comment-total-count');
const pictureCommentsCount = document.querySelector('.social__comment-count');
const commentsShowMoreButton = document.querySelector('.comments-loader');
let currentComments = [];
let currentCommentsCount = 0;
const SHOW_COMMENTS_STEP = 5;

const loadComment = (avatarSrc, author, message) => {
  const newComment = commentTemplate.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatarSrc;
  newComment.querySelector('.social__picture').alt = author;
  newComment.querySelector('.social__text').textContent = message;

  commentsList.appendChild(newComment);
};

const showNextComments = () => {
  const renderedComments = currentComments.slice(currentCommentsCount, currentCommentsCount + SHOW_COMMENTS_STEP);
  const renderedCommentsCount = renderedComments.length + currentCommentsCount;

  renderedComments.forEach(({ avatar, name, message }) => {
    loadComment(avatar, name, message);
  });

  if(renderedCommentsCount >= currentComments.length) {
    commentsShowMoreButton.classList.add('hidden');
  }

  pictureCommentsCount.textContent = `${renderedCommentsCount} из ${currentComments.length} комментариев`;
  currentCommentsCount += SHOW_COMMENTS_STEP;
};

const showComments = (comments) => {
  commentsList.innerHTML = '';
  currentComments = comments;
  pictureShownComments.textContent = currentCommentsCount + SHOW_COMMENTS_STEP;
  pictureTotalComments.textContent = comments.length;
  showNextComments();
  commentsShowMoreButton.addEventListener('click', showNextComments);
};


const clearComments = () => {
  currentComments = [];
  currentCommentsCount = 0;
  commentsShowMoreButton.classList.remove('hidden');
  commentsShowMoreButton.removeEventListener('click', showNextComments);
};

export { showComments, clearComments};
