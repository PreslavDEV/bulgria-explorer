import { formatDistanceStrict, getTime } from "date-fns";

export const getFormattedPostDate = (dateIso: string) => {
  const dateTimestamp = getTime(new Date(dateIso));

  return `${formatDistanceStrict(dateTimestamp, Date.now())} ago`;
};
