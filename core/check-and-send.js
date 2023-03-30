import Khaleesi from 'khaleesi-js';
import { ListComments, SendComment } from '../api/comments.js';
import { ListNotifications, ReadNotifications } from '../api/notifications.js';
import Delay from '../util/delay.js';
import LogMessageOrError from '../util/log.js';
import TrimText from '../util/trim-text.js';

const CheckAndSend = () => {
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

      return Delay(ReadNotifications).then(() => Promise.resolve(postsWithComments));
    })
    .then((postsWithComments) =>
      Promise.all(
        Array.from(postsWithComments).map(([postId, commentsIds], postIndex) =>
          Delay(() => ListComments(postId), postIndex)
            .then((commentsBranchedList) => {
              const comments = Object.values(commentsBranchedList).flat();
              /** @type {import('../types/comment').TriggerComment[]} */
              const triggerComments = [];

              comments.forEach((comment) => {
                if (!commentsIds.includes(comment.id)) return;
                if (comment?.author?.is_bot) return;

                const trimmedText = TrimText(comment.body_raw);
                if (!trimmedText) {
                  const parentComment = comments.find(
                    (seekingComment) => seekingComment.id === comment.parent_comment_id
                  );
                  if (!parentComment) return;
                  if (parentComment.author.is_bot) return;

                  const trimmedParentText = TrimText(parentComment.body_raw);
                  if (!trimmedParentText) return;

                  triggerComments.push({
                    postId: comment.post_id,
                    targetCommentId: parentComment.id,
                    replyText: Khaleesi(trimmedParentText),
                  });
                } else {
                  triggerComments.push({
                    postId: comment.post_id,
                    targetCommentId: comment.id,
                    replyText: Khaleesi(trimmedText),
                  });
                }
              });

              return triggerComments;
            })
            .catch((e) => {
              LogMessageOrError(`Cannot get comments list from post ${postId}`, e);
              return Promise.resolve();
            })
        )
      )
    )
    .then((triggerComments) => {
      if (!triggerComments?.length) return Promise.resolve();

      /** @type {import('../types/comment').TriggerComment[]} */
      const validComments = triggerComments
        .flat()
        .filter(Boolean)
        .filter((comment) => comment.postId && comment.targetCommentId && comment.replyText);

      return Promise.all(
        validComments.map((validComment, commentIndex) =>
          Delay(
            () =>
              SendComment({
                postId: validComment.postId,
                targetCommentId: validComment.targetCommentId,
                text: validComment.replyText,
              }),
            commentIndex
          )
        )
      );
    })
    .catch(LogMessageOrError);
};

export default CheckAndSend;
