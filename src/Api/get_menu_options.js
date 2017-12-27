import $ from 'jquery';
import ApiResponse from './apiresponse';

/**
 * @param {number|string} id
 * @returns {ApiResponse}
 */
export default async function (id) {
  const url = localStorage.getItem('remote_url');
  const key = localStorage.getItem('api_key');

  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${url}/api/v1/menu_options/get_menu_options/${id}?apikey=${key}`,
      type: 'GET',
      dataType: 'JSON',
      success: response => resolve(new ApiResponse(response)),
    }).fail(reject);
  });
}
