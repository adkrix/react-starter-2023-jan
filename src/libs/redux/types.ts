export type TIdKey = number | string;
export type TIdMap = { id: TIdKey };
export type TErrorMap = { [key: TIdKey]: string };

export type TList<T> = {
  items: T[];
  error: string;
  isLoading: boolean;
};

export type TCreating = {
  creatingError: string;
  isCreating: boolean;
};

export type TReading<T> = {
  item: T;
  readingError: string;
  isReading: boolean;
};

export type TUpdating<T> = {
  items: T[];
  updating: TIdKey[];
  updatingErrors: TErrorMap;
};

export type TDeleting<T> = {
  items: T[];
  deleting: TIdKey[];
  deletingErrors: TErrorMap;
};

export type TCrudState<T> = TCreating & TReading<T> & TUpdating<T> & TDeleting<T>;
