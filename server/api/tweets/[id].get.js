import { getTweetById } from "../../db/tweets"
import { tweetTransformer } from "../../transformers/tweet";

export default defineEventHandler(async (event) => {
  const {id} = event.context.params;

  const tweet = await getTweetById(id,{
    include: {
      author: true,
      mediaFiles: true,
      replies: {
        include: {
          author: true,
          mediaFiles: true,
          replyTo: {
            include: {
              author: true
            }
          }
        }
      },
      replyTo: {
        include: {
          author: true
        }
      }
    }
  });

  return {
    tweets: tweetTransformer(tweet)
  }
})