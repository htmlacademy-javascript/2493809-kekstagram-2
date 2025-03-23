const SHOW_COMMENTS_STEP = 5;

const commentsList = document.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('li');
const pictureShownComments = document.querySelector('.social__comment-shown-count');
const pictureTotalComments = document.querySelector('.social__comment-total-count');
const commentsShowMoreButton = document.querySelector('.comments-loader');
let currentComments = [];
let currentCommentsCount = 0;

const loadComment = (avatarSrc, author, message) => {
  const comment = commentTemplate.cloneNode(true);
  const commentPicture = comment.querySelector('.social__picture');
  const commentText = comment.querySelector('.social__text');

  commentPicture.src = avatarSrc;
  commentPicture.alt = author;
  commentText.textContent = message;

  commentsList.appendChild(comment);
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

  pictureShownComments.textContent = renderedCommentsCount;
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
