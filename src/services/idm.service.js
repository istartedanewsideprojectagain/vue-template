import AxiosService from './axios.idm.service';

const IdmService = {
  async login(creds) {
    return AxiosService.post('/auth/login', creds, false);
  },  
};

export default IdmService;
