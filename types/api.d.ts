import { Comment, CreatingCommentPayload } from './comment';
import { Notification } from './notification';

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
  'notifications/read': PostMethod<{}, { success: boolean }>;
  [key: `posts/${number}/comments`]:
    | GetMethod<CommentsList>
    | PostMethod<CreatingCommentPayload, Comment>;
};

export type MakeRequest = <Endpoint extends keyof APIEndpoints, Method extends APIEndpoints[Endpoint]['method']>(
  endpoint: Endpoint,
  method: Method = 'GET',
  payload: Extract<APIEndpoints[Endpoint], { method: Method }>['payload'] = undefined
) => Promise<Extract<APIEndpoints[Endpoint], { method: Method }>['response']>;
