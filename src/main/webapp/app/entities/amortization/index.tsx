import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Amortization from './amortization';
import AmortizationDetail from './amortization-detail';
import AmortizationUpdate from './amortization-update';
import AmortizationDeleteDialog from './amortization-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AmortizationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AmortizationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AmortizationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Amortization} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AmortizationDeleteDialog} />
  </>
);

export default Routes;
