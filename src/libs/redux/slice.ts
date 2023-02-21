import { PayloadAction } from '@reduxjs/toolkit';

import { TFailedResponse, TSucceededResponse } from 'libs/core/api';
import { TIdKey, TReading, TList, TCreating, TUpdating, TDeleting, TIdMap } from 'libs/redux/types';

export const getListKit = <T extends { id: TIdKey }>() => ({
  state(): TList<T> {
    return {
      items: [],
      error: '',
      isLoading: false,
    };
  },
  request(state: TList<T>) {
    state.error = '';
    state.isLoading = true;
  },
  succeeded(state: TList<T>, action: PayloadAction<TSucceededResponse<T[]>>) {
    state.items = action.payload.data;
    state.error = '';
    state.isLoading = false;
  },
  failed(state: TList<T>, action: PayloadAction<TFailedResponse>) {
    state.error = action.payload.error.message;
    state.isLoading = false;
  },
});

export const getCreatingKit = () => ({
  state(): TCreating {
    return {
      creatingError: '',
      isCreating: false,
    };
  },
  request(state: TCreating) {
    state.creatingError = '';
    state.isCreating = true;
  },
  succeeded(state: TCreating) {
    state.creatingError = '';
    state.isCreating = false;
  },
  failed(state: TCreating, action: PayloadAction<TFailedResponse>) {
    state.creatingError = action.payload.error.message;
    state.isCreating = false;
  },
});

export const getReadingSet = <T extends TIdMap>() => ({
  state(): TReading<T> {
    return {
      item: <T>{},
      readingError: '',
      isReading: false,
    };
  },
  request(state: TReading<T>) {
    state.readingError = '';
    state.isReading = true;
  },
  succeeded(state: TReading<T>, action: PayloadAction<TSucceededResponse<T>>) {
    state.item = action.payload.data;
    state.isReading = false;
  },
  failed(state: TReading<T>, action: PayloadAction<TFailedResponse>) {
    state.readingError = action.payload.error.message;
    state.isReading = false;
  },
});

export const getUpdatingKit = <T extends TIdMap>() => ({
  state(): TUpdating<T> {
    return {
      items: [],
      updating: [],
      updatingErrors: {},
    };
  },
  clearError(state: TUpdating<T>, action: Required<PayloadAction<T>>) {
    delete state.updatingErrors[action.payload.id];
  },
  clearAllErrors(state: TUpdating<T>) {
    state.updatingErrors = {};
  },
  request(state: TUpdating<T>, action: Required<PayloadAction<T>>) {
    delete state.updatingErrors[action.payload.id];
    state.updating = [...state.updating, action.payload.id];
  },
  succeeded(state: TUpdating<T>, action: PayloadAction<TSucceededResponse<T>>) {
    const { data } = action.payload;
    state.items = state.items.map((item: T) => (item.id === data.id ? data : item));
    state.updating = state.updating.filter(id => id !== data.id);
  },
  failed(state: TUpdating<T>, action: PayloadAction<TFailedResponse>) {
    state.updatingErrors[action.payload.data?.id as TIdKey] = action.payload.error.message;
    state.updating = state.updating.filter(id => id !== action.payload.data?.id);
  },
});

export const getDeletingKit = <T extends TIdMap>() => ({
  state(): TDeleting<T> {
    return {
      items: [],
      deletingErrors: {},
      deleting: [],
    };
  },
  clearError(state: TDeleting<T>, action: Required<PayloadAction<T>>) {
    delete state.deletingErrors[action.payload.id];
  },
  clearAllErrors(state: TDeleting<T>) {
    state.deletingErrors = {};
  },
  request(state: TDeleting<T>, action: Required<PayloadAction<T>>) {
    delete state.deletingErrors[action.payload.id];
    state.deleting = [...state.deleting, action.payload.id];
  },
  succeeded(state: TDeleting<T>, action: PayloadAction<TSucceededResponse<T>>) {
    const { data } = action.payload;
    state.items = state.items.filter(item => item.id !== data.id);
    state.deleting = state.deleting.filter(id => id !== data.id);
  },
  failed(state: TDeleting<T>, action: PayloadAction<TFailedResponse>) {
    state.deletingErrors[action.payload.data?.id as TIdKey] = action.payload.error.message;
    state.deleting = state.deleting.filter(id => id !== action.payload.data?.id);
  },
});

export const getCrudKit = <T extends TIdMap>() => ({
  creating: getCreatingKit(),
  reading: getReadingSet<T>(),
  updating: getUpdatingKit<T>(),
  deleting: getDeletingKit<T>(),
});
