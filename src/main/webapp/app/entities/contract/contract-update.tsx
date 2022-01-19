import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './contract.reducer';
import { IContract } from 'app/shared/model/contract.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IContractUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ContractUpdate = (props: IContractUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { contractEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/contract');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...contractEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="maxContractApp.contract.home.createOrEditLabel" data-cy="ContractCreateUpdateHeading">
            <Translate contentKey="maxContractApp.contract.home.createOrEditLabel">Create or edit a Contract</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : contractEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="contract-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="contract-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="contractIDLabel" for="contract-contractID">
                  <Translate contentKey="maxContractApp.contract.contractID">Contract ID</Translate>
                </Label>
                <AvField id="contract-contractID" data-cy="contractID" type="text" name="contractID" />
              </AvGroup>
              <AvGroup>
                <Label id="championIDLabel" for="contract-championID">
                  <Translate contentKey="maxContractApp.contract.championID">Champion ID</Translate>
                </Label>
                <AvField id="contract-championID" data-cy="championID" type="text" name="championID" />
              </AvGroup>
              <AvGroup>
                <Label id="vehicleIDLabel" for="contract-vehicleID">
                  <Translate contentKey="maxContractApp.contract.vehicleID">Vehicle ID</Translate>
                </Label>
                <AvField id="contract-vehicleID" data-cy="vehicleID" type="text" name="vehicleID" />
              </AvGroup>
              <AvGroup>
                <Label id="hpAmountLabel" for="contract-hpAmount">
                  <Translate contentKey="maxContractApp.contract.hpAmount">Hp Amount</Translate>
                </Label>
                <AvField id="contract-hpAmount" data-cy="hpAmount" type="string" className="form-control" name="hpAmount" />
              </AvGroup>
              <AvGroup>
                <Label id="durationLabel" for="contract-duration">
                  <Translate contentKey="maxContractApp.contract.duration">Duration</Translate>
                </Label>
                <AvField id="contract-duration" data-cy="duration" type="text" name="duration" />
              </AvGroup>
              <AvGroup>
                <Label id="balanceLabel" for="contract-balance">
                  <Translate contentKey="maxContractApp.contract.balance">Balance</Translate>
                </Label>
                <AvField id="contract-balance" data-cy="balance" type="string" className="form-control" name="balance" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="contract-status">
                  <Translate contentKey="maxContractApp.contract.status">Status</Translate>
                </Label>
                <AvField id="contract-status" data-cy="status" type="text" name="status" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/contract" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  contractEntity: storeState.contract.entity,
  loading: storeState.contract.loading,
  updating: storeState.contract.updating,
  updateSuccess: storeState.contract.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContractUpdate);
