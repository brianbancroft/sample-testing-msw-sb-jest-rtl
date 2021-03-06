import "../src/index.css";

// .storybook/preview.js
if (typeof global.process === "undefined") {
  const { worker } = require("../src/mocks/browser");
  worker.start();
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
