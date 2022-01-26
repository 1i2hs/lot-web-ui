import * as firebaseApp from 'firebase/app';
import dayjs from "dayjs";
import { appWithTranslation } from "next-i18next";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState, useEffect } from "react";
import "../styles/globals.css";

firebaseApp.initializeApp({
  apiKey: "AIzaSyBhnL963jvuWI6_sI9PWL9AGlL3gRaxHPQ",
  authDomain: "lifetime-of-things.firebaseapp.com",
  projectId: "lifetime-of-things",
  appId: "1:62913299994:web:4bed025807bd169baf33a3"
})

dayjs.extend(relativeTime);

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Load preferred language & currency info from local storage
  });
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return <Component {...pageProps} />;
}
export default appWithTranslation(MyApp);
