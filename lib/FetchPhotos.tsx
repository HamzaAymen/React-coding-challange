import axios from "axios";
const fetchPhotos = async ({ pageParam = 1 }) => {
  const res = await axios.get(
    `https://api.unsplash.com/photos?client_id=2HcMOFxGXR0ClmTtIrs1QQ4ihf-Ip9BI3a0IQJ_OxmI`,
    {
      params: {
        page: pageParam,
        per_page: 30,
      },
    }
  );

  return res;
};

export default fetchPhotos;
