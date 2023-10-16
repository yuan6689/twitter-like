export default () => {
  const usePostTweetModal = () => useState("post_tweet_modal", () => false);
  const useReplyTweet = () => useState("reply_tweet", () => null);

  const closePostTweetModal = () => {
    const postTweetModal = usePostTweetModal();
    postTweetModal.value = false;
  }

  const setReplyTo = (tweet) => {
    const replyTweet = useReplyTweet();
    replyTweet.value = tweet;
  }

  const openPostTweetModal = (tweet = null) => {
    const postTweetModal = usePostTweetModal();
    postTweetModal.value = true;

    setReplyTo(tweet);
  }

  const postTweet = (formData) => {
    const form = new FormData();

    form.append("text", formData.text);
    form.append("replyTo", formData.replyTo);
    for (let i = 0; i < formData.mediaFiles.length; i++) {
      form.append(`image${i}`, formData.mediaFiles[i]);
    }

    return useFetchApi("/api/user/tweets", {
      method: "POST",
      body: form,
    });
  };
  const getTweets = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi("api/tweets", {
          method: "GET",
          params,
        });

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getTweetById = (tweetId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi(`/api/tweets/${tweetId}`, {
          method: "GET" 
        });

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    postTweet,
    getTweets,
    getTweetById,
    usePostTweetModal,
    closePostTweetModal,
    openPostTweetModal,
    useReplyTweet
  };
};
