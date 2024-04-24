import { formatDistanceStrict, getTime } from "date-fns";

import { getDictionary, locale } from "@/configs/i18n.config";

const dict = getDictionary(locale).dates;

type TimePeriod = keyof Omit<typeof dict, "ago">;

export const getFormattedPostDate = (dateIso: string) => {
  const dateTimestamp = getTime(new Date(dateIso));

  const formattedDate = `${formatDistanceStrict(dateTimestamp, Date.now())} ago`;

  const [num, timePeriod, suffix] = formattedDate.split(" ");

  let translatedDate = `${num} ${dict[timePeriod as TimePeriod]}`;

  if (locale === "bg") {
    translatedDate = `${dict[suffix as "ago"]} ${translatedDate}`;
  } else {
    translatedDate = `${translatedDate} ${suffix}`;
  }

  return translatedDate;
};
