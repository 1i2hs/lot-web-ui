import { useState } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SearchTextField from "../../components/SearchTextField";
import ItemCard from "../../components/ItemCard";
import ItemDetail from "../../components/mobile/ItemDetail";
import { TextInput } from "../../components/base/Input";

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

export default function Home() {
  const [isDeleteAlertDialogOpen, setIsDeleteAlertDialogOpen] = useState(false);
  const [isOptionDrawerOpen, setIsOptionDrawerOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-2 p-2">
        <SearchTextField
          className="sticky top-1 z-10 search-text-field-default"
          placeholder="Search your items"
          onSearch={(keyword) => {
            console.log(keyword);
          }}
        />
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* <ItemDetail
        item={items[0]}
        isOpen={true}
        onClose={() => console.log("2")}
      /> */}
    </>
  );
}

export async function getStaticProps({ locale }) {
  console.log(locale);
  return {
    props: {
      ...(await serverSideTranslations(locale)),
      // Will be passed to the page component as props
    },
  };
}
