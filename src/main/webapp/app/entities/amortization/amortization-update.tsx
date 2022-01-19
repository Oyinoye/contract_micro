import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IContract } from 'app/shared/model/contract.model';
import { getEntities as getContracts } from 'app/entities/contract/contract.reducer';
import { getEntity, updateEntity, createEntity, reset } from './amortization.reducer';
import { IAmortization } from 'app/shared/model/amortization.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAmortizationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AmortizationUpdate = (props: IAmortizationUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { amortizationEntity, contracts, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/amortization');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getContracts();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...amortizationEntity,
        ...values,
        contract: contracts.find(it => it.id.toString() === values.contractId.toString()),
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
          <h2 id="maxContractApp.amortization.home.createOrEditLabel" data-cy="AmortizationCreateUpdateHeading">
            <Translate contentKey="maxContractApp.amortization.home.createOrEditLabel">Create or edit a Amortization</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : amortizationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="amortization-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="amortization-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="amortizationIDLabel" for="amortization-amortizationID">
                  <Translate contentKey="maxContractApp.amortization.amortizationID">Amortization ID</Translate>
                </Label>
                <AvField id="amortization-amortizationID" data-cy="amortizationID" type="text" name="amortizationID" />
              </AvGroup>
              <AvGroup>
                <Label id="currentMonthLabel" for="amortization-currentMonth">
                  <Translate contentKey="maxContractApp.amortization.currentMonth">Current Month</Translate>
                </Label>
                <AvField id="amortization-currentMonth" data-cy="currentMonth" type="text" name="currentMonth" />
              </AvGroup>
              <AvGroup>
                <Label id="interestLabel" for="amortization-interest">
                  <Translate contentKey="maxContractApp.amortization.interest">Interest</Translate>
                </Label>
                <AvField id="amortization-interest" data-cy="interest" type="string" className="form-control" name="interest" />
              </AvGroup>
              <AvGroup>
                <Label id="principalAmountLabel" for="amortization-principalAmount">
                  <Translate contentKey="maxContractApp.amortization.principalAmount">Principal Amount</Translate>
                </Label>
                <AvField
                  id="amortization-principalAmount"
                  data-cy="principalAmount"
                  type="string"
                  className="form-control"
                  name="principalAmount"
                />
              </AvGroup>
              <AvGroup>
                <Label id="principalBalanceLabel" for="amortization-principalBalance">
                  <Translate contentKey="maxContractApp.amortization.principalBalance">Principal Balance</Translate>
                </Label>
                <AvField
                  id="amortization-principalBalance"
                  data-cy="principalBalance"
                  type="string"
                  className="form-control"
                  name="principalBalance"
                />
              </AvGroup>
              <AvGroup>
                <Label for="amortization-contract">
                  <Translate contentKey="maxContractApp.amortization.contract">Contract</Translate>
                </Label>
                <AvInput id="amortization-contract" data-cy="contract" type="select" className="form-control" name="contractId" required>
                  <option value="" key="0" />
                  {contracts
                    ? contracts.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.contractID}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/amortization" replace color="info">
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
  contracts: storeState.contract.entities,
  amortizationEntity: storeState.amortization.entity,
  loading: storeState.amortization.loading,
  updating: storeState.amortization.updating,
  updateSuccess: storeState.amortization.updateSuccess,
});

const mapDispatchToProps = {
  getContracts,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AmortizationUpdate);
