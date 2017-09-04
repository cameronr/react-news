import React from 'react';
import { Route } from 'react-router-dom'

// https://github.com/ReactTraining/react-router/issues/4105#issuecomment-289195202

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

export default PropsRoute;
