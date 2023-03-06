import { useEffect, useState } from "react"

export const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(url)
    .then(response => {
      if(!response.ok) throw new Error('Error!', { cause: { response } });
      return response.json();
    })
    .then(data => {
      setData(data);
    })
    .catch(e => {
      switch (e.cause?.response.status) {
        case 404:
          setError('Not Found !');
          break;
        case 500:
          setError('Internal Server Error');
          break;
        case 502:
          setError('invalid response');
          break;
        case 504:
          setError('Its taking too much time');
          break;
        default:
          setError('Failed to fetch Data');
          break;
      }
    })
  }, []);

  return {
    data,
    error
  }
}