import { Comment, CommentsBranchedList, CreatingCommentPayload } from './comment.js';
import { Notification } from './notification.js';

export type UsedHTTPMethods = 'GET' | 'POST';

type GeneralMethod<HTTPMethod extends UsedHTTPMethods, Payload, Response> = {
  method: HTTPMethod;
  payload: Payload;
  response: Response;
};

type GetMethod<Response> = GeneralMethod<'GET', undefined, Response>;
type PostMethod<Payload, Response> = GeneralMethod<'POST', Payload, Response>;

export type APIEndpoints = {
  notifications: GetMethod<Notification[]>;
  'notifications/read': PostMethod<unknown, { success: boolean }>;
  [key: `posts/${number}/comments`]: GetMethod<CommentsBranchedList> | PostMethod<CreatingCommentPayload, Comment>;
};
