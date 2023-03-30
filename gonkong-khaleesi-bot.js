import { ListComments } from './api/comments.js';
import { ListNotifications, ReadNotifications } from './api/notifications.js';
import Delay from './util/delay.js';
import LogMessageOrError from './util/log.js';

ListNotifications()
  .then((allNotifications) => {
    const unreadMentions = allNotifications.filter(
      (notification) => !notification.read && notification.type === 'user_mentioned'
    );

    /**
     * Post with comments id to check
     * @type {Map<number, number[]>}
     */
    const postsWithComments = new Map();

    unreadMentions.forEach((notification) => {
      const postId = notification.data?.post?.id;
      const commentId = notification.data?.comment?.id;

      const post = postsWithComments.get(postId);
      if (!post) postsWithComments.set(postId, [commentId]);
      else post.push(commentId);
    });

    return postsWithComments;
    // return Delay(ReadNotifications).then(() => Promise.resolve(postsWithComments));
  })
  .then((postsWithComments) =>
    Promise.all(
      Array.from(postsWithComments).map(([postId, commentsIds], postIndex) =>
        Delay(() => ListComments(postId), postIndex)
          .then((commentsList) =>
            Object.values(commentsList)
              .flat()
              .filter((commentFromPost) => commentsIds.includes(commentFromPost.id) && !commentFromPost?.author?.is_bot)
              .map(
                /** @returns {import('./types/comment').TriggerComment} */ (commentFromPost) => ({
                  post_id: commentFromPost.post_id,
                  comment_id: commentFromPost.id,
                  text: commentFromPost.body_raw,
                })
              )
          )
          .catch((e) => {
            LogMessageOrError(`Cannot get comments list from post ${postId}`, e);
            return Promise.resolve();
          })
      )
    )
  )
  .then((triggerComments) => {
    if (!triggerComments?.length) return;

    /** @type {import('./types/comment').TriggerComment[]} */
    const validComments = triggerComments
      .flat()
      .filter((triggerComment) => triggerComment?.post_id && triggerComment?.comment_id && triggerComment?.text);

    validComments.forEach((validComment, commentIndex) => {
      const triggerText = validComment.text.replace(/@\[\d+]\s*([,.;:-])?\s*/, '').trim();
      console.log({ ...validComment, triggerText });
    });
  })
  .catch(LogMessageOrError);
