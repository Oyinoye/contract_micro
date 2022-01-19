import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './amortization.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAmortizationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AmortizationDetail = (props: IAmortizationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { amortizationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="amortizationDetailsHeading">
          <Translate contentKey="maxContractApp.amortization.detail.title">Amortization</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{amortizationEntity.id}</dd>
          <dt>
            <span id="amortizationID">
              <Translate contentKey="maxContractApp.amortization.amortizationID">Amortization ID</Translate>
            </span>
          </dt>
          <dd>{amortizationEntity.amortizationID}</dd>
          <dt>
            <span id="currentMonth">
              <Translate contentKey="maxContractApp.amortization.currentMonth">Current Month</Translate>
            </span>
          </dt>
          <dd>{amortizationEntity.currentMonth}</dd>
          <dt>
            <span id="interest">
              <Translate contentKey="maxContractApp.amortization.interest">Interest</Translate>
            </span>
          </dt>
          <dd>{amortizationEntity.interest}</dd>
          <dt>
            <span id="principalAmount">
              <Translate contentKey="maxContractApp.amortization.principalAmount">Principal Amount</Translate>
            </span>
          </dt>
          <dd>{amortizationEntity.principalAmount}</dd>
          <dt>
            <span id="principalBalance">
              <Translate contentKey="maxContractApp.amortization.principalBalance">Principal Balance</Translate>
            </span>
          </dt>
          <dd>{amortizationEntity.principalBalance}</dd>
          <dt>
            <Translate contentKey="maxContractApp.amortization.contract">Contract</Translate>
          </dt>
          <dd>{amortizationEntity.contract ? amortizationEntity.contract.contractID : ''}</dd>
        </dl>
        <Button tag={Link} to="/amortization" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/amortization/${amortizationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ amortization }: IRootState) => ({
  amortizationEntity: amortization.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AmortizationDetail);
