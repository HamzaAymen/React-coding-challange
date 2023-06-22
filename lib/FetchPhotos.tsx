import axios from "axios";
const fetchPhotos = async ({ pageParam = 1 }) => {
  const res = await axios.get(
    `https://api.unsplash.com/photos?client_id=j3ljZbrNbKKGRA1WKzEpQchL8PlBNk3seFc1qve4r_w`,
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
