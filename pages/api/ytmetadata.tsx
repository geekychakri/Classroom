import type { NextApiRequest, NextApiResponse } from "next";

const youtube = require("youtube-metadata-from-url");

export default async function ytMetaDataHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await youtube.metadata(
    `https://www.youtube.com/watch?v=${req.query.v}`
  );
  const metadata = (({ title }) => ({ title }))(data); //destructuring and property shorthand
  res.status(200).json(metadata);
}
