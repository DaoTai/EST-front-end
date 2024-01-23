import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ToastOptions, toast } from "react-toastify";
import { Fetcher } from "swr";

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
  // Cài đặt plugin relativeTime
  dayjs.extend(relativeTime);
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
  } else if (diffInDays < 30) {
    return `${diffInDays}d`;
  } else {
    return time.format("DD/MM/YYYY"); // Hiển thị ngày tháng năm
  }
};

// Display toast Axios Error

const showToast = (message: string, option?: ToastOptions) => {
  if (message.length <= 80) {
    toast.error(message, option);
  } else {
    toast.error("Failed", option);
  }
};

export const showErrorToast = (error: unknown, option?: ToastOptions) => {
  if (error instanceof AxiosError) {
    if (Array.isArray(error.response?.data)) {
      error.response?.data.forEach((message) => {
        showToast(message, option);
      });
    } else {
      showToast(error.response?.data, option);
    }
  } else {
    showToast(String(error), option);
  }
};

// Fetchers SWR
export const fetcherLessons: Fetcher<ILesson, string> = (url: string) =>
  fetch(url).then((res) => res.json());

// Get TURN Credential
export const fetchTURNCredential = async (): Promise<any> => {
  const mode = process.env.NODE_ENV;
  // const uri =
  //   "https://est-edu.metered.live/api/v1/turn/credentials?apiKey=ae7f71b5dd4068008d178d5761fc927adafc";
  const uri =
    "https://est-edu.metered.live/api/v1/turn/credentials?apiKey=f451bd2b3987d020158971d3de79ac19da62";
  if (mode == "development") {
    return [];
  } else if (mode == "production") {
    const res = await axios.get(uri);
    return res.data;
  }
};
