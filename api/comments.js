import MakeRequest from './make-request.js';

/**
 * @param {import('../types/comment').CreatingComment} creatingComment
 * @returns {void}
 */
export const SendComment = (creatingComment) => {
  if (!creatingComment) return Promise.reject(new Error('No <creatingComment>'));

  /** @type {Array<keyof import('../types/comment').CreatingComment>} */
  const creatingCommentProps = ['postId', 'sourceCommentId', 'text'];
  // eslint-disable-next-line no-restricted-syntax
  for (const key of creatingCommentProps) {
    if (!creatingComment[key]) {
      return Promise.reject(new Error(`No <creatingComment.${key}>`));
    }
  }

  return MakeRequest(`posts/${creatingComment.postId}/comments`, 'POST', {
    parent_id: creatingComment.sourceCommentId,
    body: creatingComment.text,
    images: [],
  }).then((createdComment) => {
    if (!createdComment.id)
      return Promise.reject(new Error(`Empty created comment: ${JSON.stringify(createdComment, null, 2)}`));

    return Promise.resolve();
  });
};

/**
 * @param {number} postId
 * @returns {Promise<import('../types/comment').CommentsList>}
 */
export const ListComments = (postId) =>
  postId ? MakeRequest(`posts/${postId}/comments`, 'GET') : Promise.reject(new Error('No <postId>'));
