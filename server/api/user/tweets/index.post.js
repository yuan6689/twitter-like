import formidable  from "formidable";
import { tweetTransformer } from "../../../transformers/tweet";
import { createTweet } from "../../../db/tweets";
import { createMediaFile } from "../../../db/mediaFile";

export default defineEventHandler(async (event) => {
  const form = formidable();

  const response = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });

  const { fields, files } = response;

  console.log("index.post.js", fields, files);

  const userId = event.context?.auth.user.id;

  const tweetData = {
    text: fields.text,
    authorId: userId
  }

  const replyTo = fields.replyTo;

  if(replyTo && replyTo !== "null" && replyTo !== "undefined"){
    tweetData.replyToId = replyTo;
  }

  // console.log("Object(key)", Object.keys(files).map(key => {
  //   return files[key];
  // }));
  const tweet = await createTweet(tweetData);
  console.log('tweet: ', tweet);

  const promiseArr = Object.keys(files).map(async (key) => {
    const file = files[key];
    console.log('file: ', file);
    
    const cloudinaryResource = await uploadCloudinary(file.filepath);

    // console.log("cloudinary",cloudinaryResource);

    return await createMediaFile({
      url: cloudinaryResource.secure_url,
      providerPublicId: cloudinaryResource.public_id,
      userId,
      tweetId: tweet.id
    })
  })

  await Promise.all(promiseArr)

  return {
    tweet: tweetTransformer(tweet),
    // files
  };
});
