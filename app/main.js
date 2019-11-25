import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import App from './components/App';
import EmailProvider from './components/EmailProvider';
import EmailConsumer from './components/EmailConsumer';

console.log("In main.js");

// See if we're logged in
var token = localStorage.getItem('token');
if (token) {
  var decoded = jwt.decode(token, {complete: true});
  if (decoded.payload.exp > (Date.now() / 1000)) {
    var email = localStorage.getItem('email');
    console.log("token still good, email: ", email);
    // token is still good
  } else {
    // token expired
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }
}

console.log("asdf");

var url = window.location.href;
console.log("url is: ", url);
// if (url.indexOf("/u/") > 0) {
//   var username = url.substring(url.indexOf("/u/") + 3);
//   store.dispatch(usernameChanged(username));
//   store.dispatch(login());
// }

render((
  <BrowserRouter>
    <div className='entire-page'>
      <EmailProvider>
        <EmailConsumer>
          <App />
        </EmailConsumer>
      </EmailProvider>
    </div>
  </BrowserRouter>
), document.getElementById('app'));



// render((
//   <BrowserRouter>
//     <Route path="/" component={App}>
//       <IndexRoute component={Home}/>
//       <Route path="schedule" component={Schedule}/>
//       <Route path="faq" component={FAQ}/>
//       <Route path="rsvp" component={RSVP}/>
//       <Route path="*" component={Home}/>
//     </Route>
//   </BrowserRouter>
// ), document.getElementById('app'))