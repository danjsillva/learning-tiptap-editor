// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import officeParser from "officeparser";

type Data = {
  data: string | unknown;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // "data" string returned from promise here is the text parsed from the office file passed in the argument
    const data = await officeParser.parseOfficeAsync("./template-1.docx");
    console.log(data);

    res.status(200).json({ data });
  } catch (err) {
    console.log(err);

    res.status(500).json({ data: err });
  }
}
