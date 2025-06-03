import axios from 'axios';
const instance = axios.create({
});

instance.defaults.withXSRFToken = true
// Also add/ configure interceptors && all the other cool stuff



export default instance;