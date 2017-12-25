import $ from 'jquery';
import ApiResponse from './apiresponse';

export default async function (userdata) {
  const { username, email, password } = userdata;
  const url = localStorage.getItem('remote_url');
  const key = localStorage.getItem('api_key');

  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${url}/api/v1/users/insert?apikey=${key}`,
      dataType: 'JSON',
      data: {
        username,
        email,
        password,
        role: 'user',
      },
      type: 'POST',
      success: response => resolve(new ApiResponse(response)),
    }).fail(reject);
  });
}
