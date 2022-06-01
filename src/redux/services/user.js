const url = 'https://jsonplaceholder.typicode.com/users';

function getUserDataService() {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json())
  .catch((error) => {throw error})
}

export default getUserDataService