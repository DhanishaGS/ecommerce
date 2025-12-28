import Axios from 'axios';

export default Axios.create({
  baseURL: "http://localhost:5000", // Replace with your API's base URL
});
