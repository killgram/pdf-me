import { UrlConfiguration } from "../../configurations";

const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

const pdfGenerator = async (data: any, size: "small" | "full") => {
  const templateHtml = fs.readFileSync(
    path.join(process.cwd(), `src/templates/${size}.html`),
    "utf8"
  );

  const template: any = handlebars.compile(templateHtml);
  const html = template(data);

  const pdfPath = path.join(
    process.cwd(),
    `src/pdf/${UrlConfiguration.patientName}-${data.lang}-${data.type}.pdf`
  );

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

  const page = await browser.newPage();

  await page.setContent(html);

  await page.pdf({ path: pdfPath });

  await browser.close();

  return pdfPath;
};

export { pdfGenerator };
