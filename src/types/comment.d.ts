export type Author = {
  id: number;
  name: string;
  description: string;
  ava: string;
  cover: string;
  url: string;
  subscribers_count: unknown;
  is_active: boolean;
  is_verified: boolean;
  is_bot: boolean;
  subscribed: boolean;
  ban: unknown;
  adult_content: boolean;
};

export type Comment = {
  id: number;
  user_id: number;
  post_id: number;
  parent_comment_id: number;
  body: string;
  body_raw: string;
  body_short: string;
  images: unknown[];
  date: string;
  is_pinned: boolean;
  is_blacklisted: boolean;
  rate: number;
  url: string;
  voted: number;
  media: unknown[];
  author: Author;
  is_edited: unknown;
  is_deleted: boolean;
  disable_rating: boolean;
  can_edit: boolean;
  can_delete: boolean;
  can_ban: boolean;
  item_type: string;
};

export type CommentsBranchedList = {
  [parentCommentId: number]: Comment[];
};

export type CreatingCommentPayload = {
  /** ID of target comment */
  parent_id: number;
  /** Sending text */
  body: string;
  /** @constant */
  images: [];
};

export type CreatingComment = {
  postId: number;
  /** ID of target comment */
  targetCommentId: number;
  /** Sending text */
  text: string;
};
