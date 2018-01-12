import $ from 'jquery';
import ApiResponse from './apiresponse';

/**
 * @param {Object} payload
 * @returns {ApiResponse}
 */
export default async function (payload) {
  const url = localStorage.getItem('remote_url');
  const key = localStorage.getItem('api_key');

  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${url}/api/v1/orders/insert?apikey=${key}`,
      type: 'post',
      dataType: 'json',
      data: payload,
      success: response => resolve(new ApiResponse(response)),
    }).fail(reject);
  });
}
