export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const capitalizeEveryWord = (string) => {
  return string
    .split(' ')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ');
};
export const numToBool = (num) => {
  return num === 1 ? true : false;
};
export const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};

export const getAddress = (response) => {
  let address = '';
  for (let item of response) {
    //if (item?.name) address += `${item?.name}, `;
    if (item?.street) address += `${item?.street}, `;
    if (item?.postalCode) address += `${item?.postalCode}, `;
    if (item?.city) address += `${item?.city}, `;
    if (item?.subregion) address += `${item?.subregion}, `;
    if (item?.region) address += `${item?.region}, `;
    if (item?.country) address += `${item?.country}`;
  }
  return {
    address,
    name: response[0]?.name,
    street: response[0]?.street,
    postalCode: response[0]?.postalCode,
    city: response[0]?.city,
    subregion: response[0]?.subregion,
    region: response[0]?.region,
    country: response[0]?.country,
  };
};
