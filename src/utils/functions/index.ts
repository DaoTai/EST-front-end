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
  for (const [key, val] of Object.entries(object)) {
    if (Array.isArray(val)) {
      formData.append(String(key + "[]"), val as any);
    } else {
      formData.append(String(key), val as any);
    }
  }
  return formData;
};
