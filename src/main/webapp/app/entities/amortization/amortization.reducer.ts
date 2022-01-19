import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAmortization, defaultValue } from 'app/shared/model/amortization.model';

export const ACTION_TYPES = {
  FETCH_AMORTIZATION_LIST: 'amortization/FETCH_AMORTIZATION_LIST',
  FETCH_AMORTIZATION: 'amortization/FETCH_AMORTIZATION',
  CREATE_AMORTIZATION: 'amortization/CREATE_AMORTIZATION',
  UPDATE_AMORTIZATION: 'amortization/UPDATE_AMORTIZATION',
  PARTIAL_UPDATE_AMORTIZATION: 'amortization/PARTIAL_UPDATE_AMORTIZATION',
  DELETE_AMORTIZATION: 'amortization/DELETE_AMORTIZATION',
  RESET: 'amortization/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAmortization>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type AmortizationState = Readonly<typeof initialState>;

// Reducer

export default (state: AmortizationState = initialState, action): AmortizationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AMORTIZATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AMORTIZATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_AMORTIZATION):
    case REQUEST(ACTION_TYPES.UPDATE_AMORTIZATION):
    case REQUEST(ACTION_TYPES.DELETE_AMORTIZATION):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_AMORTIZATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_AMORTIZATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AMORTIZATION):
    case FAILURE(ACTION_TYPES.CREATE_AMORTIZATION):
    case FAILURE(ACTION_TYPES.UPDATE_AMORTIZATION):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_AMORTIZATION):
    case FAILURE(ACTION_TYPES.DELETE_AMORTIZATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_AMORTIZATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_AMORTIZATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_AMORTIZATION):
    case SUCCESS(ACTION_TYPES.UPDATE_AMORTIZATION):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_AMORTIZATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_AMORTIZATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/amortizations';

// Actions

export const getEntities: ICrudGetAllAction<IAmortization> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_AMORTIZATION_LIST,
  payload: axios.get<IAmortization>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IAmortization> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AMORTIZATION,
    payload: axios.get<IAmortization>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAmortization> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AMORTIZATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAmortization> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AMORTIZATION,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IAmortization> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_AMORTIZATION,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAmortization> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AMORTIZATION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
