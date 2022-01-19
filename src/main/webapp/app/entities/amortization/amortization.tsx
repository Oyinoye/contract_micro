// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './amortization.reducer';
import { IAmortization } from 'app/shared/model/amortization.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAmortizationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Amortization = (props: IAmortizationProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { amortizationList, match, loading } = props;
  return (
    <div>
      <h2 id="amortization-heading" data-cy="AmortizationHeading">
        <Translate contentKey="maxContractApp.amortization.home.title">Amortizations</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="maxContractApp.amortization.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="maxContractApp.amortization.home.createLabel">Create new Amortization</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {amortizationList && amortizationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="maxContractApp.amortization.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="maxContractApp.amortization.amortizationID">Amortization ID</Translate>
                </th>
                <th>
                  <Translate contentKey="maxContractApp.amortization.currentMonth">Current Month</Translate>
                </th>
                <th>
                  <Translate contentKey="maxContractApp.amortization.interest">Interest</Translate>
                </th>
                <th>
                  <Translate contentKey="maxContractApp.amortization.principalAmount">Principal Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="maxContractApp.amortization.principalBalance">Principal Balance</Translate>
                </th>
                <th>
                  <Translate contentKey="maxContractApp.amortization.contract">Contract</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {amortizationList.map((amortization, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${amortization.id}`} color="link" size="sm">
                      {amortization.id}
                    </Button>
                  </td>
                  <td>{amortization.amortizationID}</td>
                  <td>{amortization.currentMonth}</td>
                  <td>{amortization.interest}</td>
                  <td>{amortization.principalAmount}</td>
                  <td>{amortization.principalBalance}</td>
                  <td>
                    {amortization.contract ? (
                      <Link to={`contract/${amortization.contract.id}`}>{amortization.contract.contractID}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${amortization.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${amortization.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${amortization.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="maxContractApp.amortization.home.notFound">No Amortizations found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ amortization }: IRootState) => ({
  amortizationList: amortization.entities,
  loading: amortization.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Amortization);
