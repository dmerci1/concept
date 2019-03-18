import axios from 'axios';

const YELP_API_KEY = '6INdFjgrtE61ZymdDNd53m9Wv9xhYQJFFCgXE-Z43P43OIsEsK0KFFykjRF_gmUGtwpoAFGDKpP4FUQIR3Y7RCzWbTKM3yKnjCESh17MhnarMxyvPLMC1eabXouiW3Yx';

const api = axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
  }
});

const getLocalBars = userLocation => {
  return api
    .get('/businesses/search', {
      params: {
        categories: 'bars, All',
          radious: 10,
        ...userLocation,
        }
    })
    .then(res =>
      res.data.businesses.map(business => {
        return {
          id: business.id,
          name: business.name,
          coords: business.coordinates,
          location: business.location.address1,
          phone: business.display_phone,
          price: business.price,
          distance: business.distance,
          image: business.image_url
        }
      })
      )
      .catch(error => console.error(error))
}

export default {
  getLocalBars
}
