import { Application } from "./app";

(async function () {
  try {
    const application = new Application();
    await application.run();
  } catch (e) {
    console.log(e);
  }
})();
