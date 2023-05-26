import { CreatingComment } from '../types/comment.js';
import MakeRequest from './make-request.js';

export function SendComment(creatingComment: CreatingComment) {
  if (!creatingComment) return Promise.reject(new Error('No <creatingComment>'));

  const creatingCommentProps: Array<keyof CreatingComment> = ['postId', 'targetCommentId', 'text'];
  // eslint-disable-next-line no-restricted-syntax
  for (const key of creatingCommentProps) {
    if (!creatingComment[key]) {
      return Promise.reject(new Error(`No <creatingComment.${key}>`));
    }
  }

  return MakeRequest(`posts/${creatingComment.postId}/comments`, 'POST', {
    parent_id: creatingComment.targetCommentId,
    body: creatingComment.text,
    images: [],
  }).then((createdComment) => {
    if (!createdComment.id)
      return Promise.reject(new Error(`Empty created comment: ${JSON.stringify(createdComment, null, 2)}`));

    return Promise.resolve();
  });
}

export function ListComments(postId: number) {
  if (!postId) return Promise.reject(new Error('No <postId>'));

  return MakeRequest(`posts/${postId}/comments`, 'GET');
}
