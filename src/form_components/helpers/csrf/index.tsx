import Cookies from 'js-cookie';
import React from 'react';

const csrftoken = Cookies.get('csrftoken');
const CSRFToken = () => {
  return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />;
};
export default CSRFToken;
