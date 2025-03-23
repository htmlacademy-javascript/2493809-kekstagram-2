const validateComment = (value) => value.length <= 140;
const validationCommentError = 'Длина комментария не может составлять больше 140 символов';

export { validateComment, validationCommentError };
