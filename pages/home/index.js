import { useState } from "react";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainLayout from "../../components/layout/MainLayout";
import SearchTextField from "../../components/SearchTextField";
import ItemCard from "../../components/ItemCard";
import ItemDetail from "../../components/mobile/ItemDetail";
import AddItemDialog from "../../components/AddItemDialog";
import Progress from "../../components/Progress";

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
    currentValue: 20000,
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
    currentValue: 2005000,
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
  {
    id: 2,
    name: "MacBook Pro 13-in 2020",
    description:
      "This is an secondary laptop for the personal software development",
    alias: "Secondary MacBook 12345678910111212312412",
    addedAt: 1637077110,
    updatedAt: 1637077110,
    purchasedAt: 1583974000,
    value: 3100000,
    currentValue: 20000,
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
  {
    id: 3,
    name: "MacBook Pro 13-in 2020",
    description:
      "This is an secondary laptop for the personal software development",
    alias: "Secondary MacBook 12345678910111212312412",
    addedAt: 1637077110,
    updatedAt: 1637077110,
    purchasedAt: 1583974000,
    value: 3100000,
    currentValue: 20000,
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
  {
    id: 4,
    name: "MacBook Pro 13-in 2020",
    description:
      "This is an secondary laptop for the personal software development",
    alias: "Secondary MacBook 12345678910111212312412",
    addedAt: 1637077110,
    updatedAt: 1637077110,
    purchasedAt: 1583974000,
    value: 3100000,
    currentValue: 20000,
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
  {
    id: 5,
    name: "MacBook Pro 13-in 2020",
    description:
      "This is an secondary laptop for the personal software development",
    alias: "Secondary MacBook 12345678910111212312412",
    addedAt: 1637077110,
    updatedAt: 1637077110,
    purchasedAt: 1583974000,
    value: 3100000,
    currentValue: 20000,
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
  {
    id: 6,
    name: "MacBook Pro 13-in 2020",
    description:
      "This is an secondary laptop for the personal software development",
    alias: "Secondary MacBook 12345678910111212312412",
    addedAt: 1637077110,
    updatedAt: 1637077110,
    purchasedAt: 1583974000,
    value: 3100000,
    currentValue: 20000,
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

const ACTION_TYPE = {
  SET_ITEMS: "SET_ITEMS",
  FETCH_ITEMS: "FETCH_ITEMS",
  OPEN_ITEM_DETAIL: "OPEN_ITEM_DETAIL",
};

export default function Home() {
  // const [items, setItems] = useState([]);

  const router = useRouter();

  const { addItem, itemId } = router.query;

  const isAddItemDialogOpen = addItem !== undefined && addItem !== false;

  return (
    <>
      <div className="flex flex-col gap-2 p-2">
        <SearchTextField
          className="sticky top-[4.5rem] z-10 search-text-field-default"
          placeholder="Search your items"
          onSearch={(keyword) => {
            console.log(keyword);
          }}
        />
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* <Progress message="Loading..." isVisible={true} /> */}

      {/* <ItemDetail
        item={items[0]}
        isOpen={true}
        onClose={() => console.log("2")}
      /> */}

      <AddItemDialog
        isOpen={isAddItemDialogOpen}
        onClose={() => {
          router.push("", undefined, { shallow: true });
        }}
        onAdd={(item) => {
          console.log(item);
        }}
      />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      // Will be passed to the page component as props
    },
  };
}

Home.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
