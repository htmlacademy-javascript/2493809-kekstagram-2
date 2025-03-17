const validateComment = (value) => value.length <= 140;
const validateCommentError = 'Длина комментария не может составлять больше 140 символов';

export { validateComment, validateCommentError };
