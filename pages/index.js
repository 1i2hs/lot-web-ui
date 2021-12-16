import { useState } from "react";
import Head from "next/head";
import SearchTextField from "../components/SearchTextField";
import BottomMenu from "../components/mobile/BottomMenu";
import AddUrlDialog from "../components/AddUrlDialog";

import URLCard from "../components/URLCard";
import MainMenu from "../components/MainMenu";
import DeleteAlertDialog from "../components/DeleteAlertDialog";
import ItemCard from "../components/ItemCard";
import ItemDetail from "../components/mobile/ItemDetail";
import OptionDrawer from "../components/mobile/OptionDrawer";
import MainLayout from "../components/layout/MainLayout";

const items = [
  {
    id: 0,
    name: "MacBook Pro 15-in 2017",
    description:
      "This is an primary laptop for the personal software development",
    alias: "Primary MacBook 12345678910111212312412",
    addedAt: 1637077110,
    updatedAt: 1637077110,
    purchasedAt: 1483974000,
    value: 3100000,
    currency: "KRW",
    lifeSpan: 365 * 5,
    tags: [
      {
        id: 0,
        name: "Apple",
      },
      {
        id: 1,
        name: "Laptop",
      },
      {
        id: 2,
        name: "Valuable",
      },
      {
        id: 4,
        name: "Intel",
      },
    ],
    isFavorite: false,
    isArchived: true,
  },
  {
    id: 1,
    name: "MacBook Pro 13-in 2020",
    description:
      "This is an secondary laptop for the personal software development",
    alias: "Secondary MacBook 12345678910111212312412",
    addedAt: 1637077110,
    updatedAt: 1637077110,
    purchasedAt: 1583974000,
    value: 3100000,
    currency: "KRW",
    lifeSpan: 365 * 6,
    tags: [
      {
        id: 0,
        name: "Apple",
      },
      {
        id: 1,
        name: "Laptop",
      },
      {
        id: 2,
        name: "Valuable",
      },
      {
        id: 3,
        name: "M1",
      },
    ],
    isFavorite: true,
    isArchived: false,
  },
];

export default function Home() {
  // const [isAddUrlDialogOpen, setAddUrlDialogOpen] = useState(false);
  // const [isDeleteAlertDialogOpen, setDeleteAlertDialogOpen] = useState(false);
  const [isOptionDrawerOpen, setIsOptionDrawerOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen">
        {/* <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center"> */}
        <div className="flex flex-col gap-2 p-2">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        <br />
        {/* <SearchTextField
          onSearch={(query) => {
            console.log(query);
          }}
        /> */}
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}

Home.getLayout = function getLayout(page, props) {
  return <MainLayout pageProps={props}>{page}</MainLayout>;
};
