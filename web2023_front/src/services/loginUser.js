import axios from 'axios';

export async function loginUser(requestData) {
  try {
    const response = await axios.get('http://localhost:8081/posts', requestData);

    if (response.data.success) {
      console.log('Navigating to /posts');
      return response.data;
    } else {
      console.error('JEBEM TI MATER');
     
    }
  } catch (error) {
    console.error('Request error:', error);
    
  }
}