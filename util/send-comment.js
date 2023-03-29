import LogMessageOrError from './log.js';
import MakeRequest from './make-request.js';

/**
 * @param {import('../types/creating-comment').CreatingComment} creatingComment
 * @returns {void}
 */
const SendComment = (creatingComment) => {
  if (!creatingComment) return;

  /** @type {Array<keyof import('../types/creating-comment').CreatingComment>} */
  const creatingCommentProps = ['postId', 'sourceCommentId', 'text'];
  // eslint-disable-next-line no-restricted-syntax
  for (const key of creatingCommentProps) {
    if (!creatingComment[key]) {
      LogMessageOrError(new Error(`No <creatingComment.${key}>`), creatingComment);
      return;
    }
  }

  MakeRequest(`posts/${creatingComment.postId}/comments`, 'POST', {
    parent_id: creatingComment.sourceCommentId,
    body: creatingComment.text,
    images: [],
  })
    .then((createdComment) => {
      if (!createdComment.id)
        return Promise.reject(new Error(`Empty created comment: ${JSON.stringify(createdComment, null, 2)}`));

      return Promise.resolve();
    })
    .catch((e) => LogMessageOrError(e, creatingComment));
};

export default SendComment;
