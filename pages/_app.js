import "../styles/globals.css";
import MainLayout from "../components/layout/MainLayout";
import dayjs from "dayjs";
import { appWithTranslation } from "next-i18next";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState, useEffect } from "react";

dayjs.extend(relativeTime);

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log("HI");
    // Load preferred language & currency info from local storage
  });
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
export default appWithTranslation(MyApp);
