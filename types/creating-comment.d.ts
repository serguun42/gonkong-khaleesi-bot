import { Comment } from './comment';

export type CreatingCommentPayload = {
  /** Source/replying to comment id */
  parent_id: number;
  /** Sending text */
  body: string;
  /** @constant */
  images: [];
};

export type CreatingComment = {
  postId: number;
  /** Source/replying to comment id */
  sourceCommentId: number;
  /** Sending text */
  text: string;
};

export type CreatedComment = Comment;
