import $ from 'jquery';
import ApiResponse from './apiresponse';

/**
 * @param {string} email
 * @param {string} password
 * @returns {ApiResponse}
 */
export default async function (email, password) {
  const url = localStorage.getItem('remote_url');
  const apikey = localStorage.getItem('api_key');

  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${url}/api/v1/auth/get_token/?apikey=${apikey}`,
      type: 'POST',
      dataType: 'JSON',
      data: {
        email,
        password,
      },
      success: response => resolve(new ApiResponse(response)),
    }).fail(reject);
  });
}
