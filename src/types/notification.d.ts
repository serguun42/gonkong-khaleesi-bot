export type Notification = {
  /** UUID of notification */
  id: string;
  type: 'user_mentioned' | 'etc...';
  /** ISO 8601 format */
  date: string;
  data: {
    url: string;
    group_id: number;
    /** `Пользователь *** упомянул вас` */
    message: string;
    /** `Пользователь *** упомянул вас {} {}` */
    group_message: string;
    item_type: unknown;
    user: {
      id: number;
      name: string;
    };
    post: {
      id: number;
      header: string;
      url: string;
    };
    comment: {
      id: number;
      url: string;
    };
    rate: unknown;
  };
  read: boolean;
  message: string;
  url: string;
};

/** Key – post ID, value – comments IDs in this post with mentions */
export type PostsWithMentionComments = Map<number, number[]>;
