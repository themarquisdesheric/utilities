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
