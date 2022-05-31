import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const storeUrl =
    "https://store.nintendo.co.uk/en_gb/nintendo-64-controller-for-nintendo-switch-000000000010006981.html";

  const html = await fetch(storeUrl).then((response) => response.text());

  const isOutOfStock = html.includes("This item is out of stock");

  if (isOutOfStock) {
    return res.status(200).json({ message: "Out of stock" });
  }

  await nodemailer
    .createTransport({
      secure: true,
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    .sendMail({
      from: `<${process.env.EMAIL_FROM_ADDRESS}>`,
      to: process.env.EMAIL_TO_ADDRESS,
      subject: "N64 controller is in stock!",
      text: `Woo it's in stock! View the store page: ${storeUrl}`,
      html: `Woo it's in stock! <a href="${storeUrl}">View the store page.</a>`,
    });

  res.status(200).json({ message: "In Stock" });
}
