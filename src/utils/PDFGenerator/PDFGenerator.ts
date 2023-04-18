const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

const pdfGenerator = async (data: any) => {
  const templateHtml = fs.readFileSync(
    path.join(process.cwd(), "src/templates/temp.html"),
    "utf8"
  );

  const template: any = handlebars.compile(templateHtml);
  const html = template(data);

  const pdfPath = path.join(
    process.cwd(),
    `src/pdf/${data.lang}-${data.type}.pdf`
  );

  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setContent(html);

  await page.pdf({ path: pdfPath });

  await browser.close();

  return pdfPath;
};

export { pdfGenerator };
