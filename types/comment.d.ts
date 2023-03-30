export type Author = {
  id: number;
  name: string;
  description: string;
  ava: string;
  cover: string;
  url: string;
  subscribers_count: any;
  is_active: boolean;
  is_verified: boolean;
  is_bot: boolean;
  subscribed: boolean;
  ban: any;
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
  images: any[];
  date: string;
  is_pinned: boolean;
  is_blacklisted: boolean;
  rate: number;
  url: string;
  voted: number;
  media: any[];
  author: Author;
  is_edited: any;
  is_deleted: boolean;
  disable_rating: boolean;
  can_edit: boolean;
  can_delete: boolean;
  can_ban: boolean;
  item_type: string;
};

export type CommentsList = {
  [parentCommentId: number]: Comment[];
};

export type TriggerComment = {
  post_id: number;
  comment_id: number;
  text: string;
};

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
