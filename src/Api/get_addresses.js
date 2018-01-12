import $ from 'jquery';
import ApiResponse from './apiresponse';

export default async function (userid) {
  const url = localStorage.getItem('remote_url');
  const key = localStorage.getItem('api_key');

  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${url}/api/v1/addresses/get_user_addresses/${userid}?apikey=${key}`,
      type: 'GET',
      dataType: 'JSON',
      success: response => resolve(new ApiResponse(response)),
    }).fail(reject);
  });
}
