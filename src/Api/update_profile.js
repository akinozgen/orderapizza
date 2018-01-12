import $ from 'jquery';
import ApiResponse from './apiresponse';

export default async function (id, data) {
  const url = localStorage.getItem('remote_url');
  const key = localStorage.getItem('api_key');

  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${url}/api/v1/users/update/${id}?apikey=${key}`,
      type: 'POST',
      dataType: 'json',
      data,
      success: response => resolve(new ApiResponse(response)),
    }).fail(reject);
  });
}
