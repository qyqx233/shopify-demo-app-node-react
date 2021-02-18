// @ts-nocheck

import React, { createContext } from "react";
import {Provider, Context} from '@shopify/app-bridge-react';

function MyComponent() {
    console.log(API_KEY);
    return (
      <Context.Consumer>
        {app => {
          // Do something with App Bridge `app` instance...
          if (app) {
            app.getState().then(state => console.log(state));
            // console.log(app);
          } else {
              console.log('null');
          }
  
          return (<span>Hello world!</span>);
        }}
      </Context.Consumer>
    );
  };

export default MyComponent;