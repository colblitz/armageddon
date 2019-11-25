import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Login';

import Home from './Home';
import Schedule from './Schedule';
import FAQ from './FAQ';
import RSVP from './RSVP';

import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

function App({email, token, emailChanged}) {
  console.log("rendering app with email: ", email);
  console.log("rendering app with token: ", token);
  if (email) {
    // return (<div>asdf</div>);
    return (
      <React.Fragment>
        <Header />
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="/schedule" component={Schedule}/>
          <Route path="/faq" component={FAQ}/>
          <Route path="/rsvp" component={RSVP}/>
        </Switch>
        <Footer />
      </React.Fragment>
    );
  } else {
    // return (<div>hauehg</div>);
    return (
      <Login emailChanged={emailChanged} />
    );
  }
}


// class App extends React.Component {
//   render() {
//     return (
//       <Header />
//       <Navbar />
//       <Switch>
//         <Route exact path='/' component={Home}/>
//         <Route path="/schedule" component={Schedule}/>
//         <Route path="/faq" component={FAQ}/>
//         <Route path="/rsvp" component={RSVP}/>
//       </Switch>
//       <Footer />
//     );
//   }
// }

export default App;