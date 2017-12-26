import $ from 'jquery';
import ApiResponse from '../Api/apiresponse';

export default class AuthMiddleware {
  constructor() {
    const userdata = localStorage.getItem('userdata');
    this.userdata = JSON.parse(userdata);

    const accessToken = localStorage.getItem('access_token');
    this.access_token = accessToken;
  }

  /**
   * @returns {ApiResponse}
   */
  async checkAuth() {
    const url = localStorage.getItem('remote_url');
    const key = localStorage.getItem('api_key');

    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${url}/api/v1/auth/authorize/${this.userdata.id}/${this.access_token}?apikey=${key}`,
        type: 'GET',
        dataType: 'JSON',
        success: response => resolve(new ApiResponse(response)),
      }).fail(reject);
    });
  }
}
