import $ from 'jquery';
import ApiResponse from './apiresponse';

export default async function () {
  const url = localStorage.getItem('remote_url');
  const key = localStorage.getItem('api_key');

  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${url}/api/v1/menus/slider?apikey=${key}`,
      type: 'get',
      dataType: 'json',
      success: response => resolve(new ApiResponse(response)),
    }).fail(reject);
  });
}
