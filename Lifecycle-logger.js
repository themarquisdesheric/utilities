// a HOC that logs the lifecycle methods of react components

import React, { Component } from 'react';
import styled from 'styled-components';

var LoggerContainer = styled.div`
  background-color: aliceblue;
  border: 2px grooved aquamarine;
  border-radius: 5px;
`;

LoggerContainer.displayName = 'LoggerContainer';

var H2 = styled.h2`
  color: blueviolet;
`;

H2.displayName = 'H2';

export default function Loggify(WrappedComponent) {
  var originals = {};
  var methodsToLog = ['componentWillMount', 'componentDidMount', 'componenWillUnmount', 'setState'];

  methodsToLog.forEach(function(method) {
    if (WrappedComponent.prototype[method]) {
      originals[method] = WrappedComponent.prototype[method];
    }

    WrappedComponent.prototype[method] = function(...args) {
      var original = originals[method];

      console.groupCollapsed(`${WrappedComponent.displayName} called ${method}`);
      console.groupEnd();

      if (original) {
        original = original.bind(this);
        original(...args);
      }
    };

    WrappedComponent.prototype.setState = function(partialState, callback) {
      console.groupCollapsed(`${WrappedComponent.displayName} setState`);
      console.log('partialState', partialState);
      console.log('callback', callback);
      console.groupEnd();

      this.updater.enqueueSetState(this, partialState, callback, 'setState');
    };

  });

  return class extends Component {
    render() {
      return (

        <LoggerContainer>
          <H2>
            {WrappedComponent.displayName} is now loggified: 
          </H2>
          <WrappedComponent
            {...this.props}
          />
        </LoggerContainer>
        
      );
    }
  };
}
