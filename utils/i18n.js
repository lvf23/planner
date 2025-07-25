import dotenv from "dotenv";
import i18next from "i18next";

import enUS from "#i18n/en-US";
import ptBR from "#i18n/pt-BR";

dotenv.config();

i18next.init({
  lng: process.env.LANGUAGE ?? "en-US",
  resources: {
    "en-US": enUS,
    "pt-BR": ptBR,
  },
});

i18next.use({
  type: "postProcessor",
  name: "capitalize",
  process: (value) => {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  },
});

const translate = (key, options) => {
  return i18next.t(key, options);
};

export { translate };
