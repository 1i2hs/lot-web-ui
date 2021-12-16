import { useMemo } from "react";
import dayjs from "dayjs";

function getStyles(lifePercentage) {
  if (lifePercentage >= 90 && lifePercentage <= 100) {
    return {
      textColor: "text-red-600",
      backgroundColor: "bg-red-600",
    };
  } else if (lifePercentage >= 40 && lifePercentage < 90) {
    return {
      textColor: "text-yellow-300",
      backgroundColor: "bg-yellow-300",
    };
  } else {
    return {
      textColor: "text-green-600",
      backgroundColor: "bg-green-600",
    };
  }
}

const timeUnitMap = {
  minute: (purchasedAt) => dayjs().diff(dayjs.unix(purchasedAt), "minute"),
  hour: (purchasedAt) => dayjs().diff(dayjs.unix(purchasedAt), "hour"),
  day: (purchasedAt) => dayjs().diff(dayjs.unix(purchasedAt), "d"),
  month: (purchasedAt) => dayjs().diff(dayjs.unix(purchasedAt), "month"),
  year: (purchasedAt) => dayjs().diff(dayjs.unix(purchasedAt), "year"),
};

function calculateAge(purchasedAt, unit) {
  return timeUnitMap[unit](purchasedAt);
}

export default function useLifeSpan(
  value,
  currentValue,
  purchasedAt,
  lifeSpan,
  currency
) {
  const age = calculateAge(purchasedAt, "day");
  const lifePercentage = (age / lifeSpan) * 100;
  const ageStyles = getStyles(lifePercentage);
  const formattedCurrentValue = useMemo(
    () =>
      new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
        // value * (1 - age / lifeSpan)
        currentValue
      ),
    [currency, currentValue]
  );
  const formattedValue = useMemo(
    () =>
      new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
        value
      ),
    [value, currency]
  );

  return {
    lifePercentage,
    age,
    ageStyles,
    formattedCurrentValue,
    formattedValue,
  };
}
