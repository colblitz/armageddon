import React from 'react';
import { EmailContext } from './EmailProvider';

export default class EmailConsumer extends React.Component {
  render() {
    console.log("email consumer render");
    const {children} = this.props;

    return (
      <EmailContext.Consumer>
        {({email, token, emailChanged}) => {
          const blah = "lkjasdf";
          return React.Children.map(children, child =>
            React.cloneElement(child, {
              email,
              token,
              emailChanged,
            })
          )
        }}
      </EmailContext.Consumer>
      // <EmailContext.Consumer>
      //   {({email, emailChanged}) => {
      //     console.log("email: ", email);
      //     return React.Children.map(children, child =>
      //       React.cloneElement(child, {
      //         email,
      //         emailChanged,
      //       })
      //     );
      //   }}
      // </EmailContext.Consumer>
    );
  }
}

// {({email, emailChanged}) => {
//           const char = searchTerm
//             ? allChar.filter(
//                 char =>
//                   char.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
//               )
//             : allChar;

//           return React.Children.map(children, child =>
//             React.cloneElement(child, {
//               char,
//               searchTerm,
//               searchTermChanged,
//             })
//           );
//         }}