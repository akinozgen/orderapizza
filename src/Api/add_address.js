import $ from 'jquery';
import ApiResponse from './apiresponse';

export default async function (addressData) {
  const url = localStorage.getItem('remote_url');
  const key = localStorage.getItem('api_key');

  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${url}/api/v1/addresses/insert?apikey=${key}`,
      type: 'POST',
      dataType: 'JSON',
      data: addressData,
      success: response => resolve(new ApiResponse(response)),
    }).fail(reject);
  });
}
