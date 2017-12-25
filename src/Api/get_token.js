import $ from 'jquery';

export default async function (email, password) {
  const url = localStorage.getItem('remote_url');
  const apikey = localStorage.getItem('api_key');

  return new Promise((resolve, reject) => {
    $.post(`${url}/api/v1/auth/get_token/?apikey=${apikey}`, { email, password }, (response) => {
      alert(response);
    }).fail(reject);
  });
}
