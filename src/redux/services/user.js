function getUserDataService() {
  return fetch(process.env.REACT_APP_USER_API , {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json())
  .catch((error) => {throw error})
}

export default getUserDataService