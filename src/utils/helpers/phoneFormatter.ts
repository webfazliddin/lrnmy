export const usePhoneFormatter = () => {
  let regex = /[(),-]/g;
  const set = (value: string) => {
    return value.toString().split(" ").join("").replace(regex, "");
  };

  const get = (value: string) => {
    let countryCode = String(value).slice(0, 3);
    let phone = String(value).slice(3);
    countryCode = "998" + phone;
    value = countryCode;
    return value;
  };

  return {
    set,
    get
  };
};
