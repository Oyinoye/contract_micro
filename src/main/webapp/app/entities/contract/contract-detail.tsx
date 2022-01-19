import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './contract.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContractDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ContractDetail = (props: IContractDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { contractEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="contractDetailsHeading">
          <Translate contentKey="maxContractApp.contract.detail.title">Contract</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{contractEntity.id}</dd>
          <dt>
            <span id="contractID">
              <Translate contentKey="maxContractApp.contract.contractID">Contract ID</Translate>
            </span>
          </dt>
          <dd>{contractEntity.contractID}</dd>
          <dt>
            <span id="championID">
              <Translate contentKey="maxContractApp.contract.championID">Champion ID</Translate>
            </span>
          </dt>
          <dd>{contractEntity.championID}</dd>
          <dt>
            <span id="vehicleID">
              <Translate contentKey="maxContractApp.contract.vehicleID">Vehicle ID</Translate>
            </span>
          </dt>
          <dd>{contractEntity.vehicleID}</dd>
          <dt>
            <span id="hpAmount">
              <Translate contentKey="maxContractApp.contract.hpAmount">Hp Amount</Translate>
            </span>
          </dt>
          <dd>{contractEntity.hpAmount}</dd>
          <dt>
            <span id="duration">
              <Translate contentKey="maxContractApp.contract.duration">Duration</Translate>
            </span>
          </dt>
          <dd>{contractEntity.duration}</dd>
          <dt>
            <span id="balance">
              <Translate contentKey="maxContractApp.contract.balance">Balance</Translate>
            </span>
          </dt>
          <dd>{contractEntity.balance}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="maxContractApp.contract.status">Status</Translate>
            </span>
          </dt>
          <dd>{contractEntity.status}</dd>
        </dl>
        <Button tag={Link} to="/contract" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/contract/${contractEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ contract }: IRootState) => ({
  contractEntity: contract.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContractDetail);
