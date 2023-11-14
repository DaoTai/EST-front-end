import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Fetcher } from "swr";

// Cài đặt plugin relativeTime
dayjs.extend(relativeTime);

// get changed values between 2 objects
export const getChangedValuesObject = (obj1: any, obj2: any) => {
  const changedValues = {} as any;
  for (const key of Object.keys(obj1)) {
    if (obj1[key as any] !== obj2[key as any]) {
      changedValues[key] = obj1[key as any];
    }
  }
  return changedValues;
};

// convert object to form data
export const convertObjectToFormData = (object: any) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(object)) {
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(String(key + "[]"), item as any));
    } else {
      formData.append(String(key), value as any);
    }
  }
  return formData;
};

// Distance time between then and now
export const getDistanceTimeToNow = (timestamp: string) => {
  const now = dayjs(); // Thời gian hiện tại
  const time = dayjs(timestamp); // Thời gian cần tính khoảng cách
  // Tính toán khoảng cách thời gian
  const diffInMinutes = now.diff(time, "minute");
  const diffInHours = now.diff(time, "hour");
  const diffInDays = now.diff(time, "day");

  if (diffInMinutes < 1) {
    return "just";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d`;
  } else {
    return time.format("DD/MM/YYYY"); // Hiển thị ngày tháng năm
  }
};
export const fetcherLessons: Fetcher<ILesson, string> = (url: string) =>
  fetch(url).then((res) => res.json());
