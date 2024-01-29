import * as React from 'react';
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from 'react-query';
import useFetch from 'react-fetch-hook';
import { useIsFocused } from '@react-navigation/native';
import { handleResponse, isOkStatus } from '../utils/handleRestApiResponse';
import usePrevious from '../utils/usePrevious';
import encodeQueryParam from '../utils/encodeQueryParam';
import * as GlobalVariables from '../config/GlobalVariableContext';

export const getLatLongGET = (Constants, { address, api_key }, handlers = {}) =>
  fetch(
    `https://api.geocod.io/v1.7/geocode?q=${encodeQueryParam(
      `${typeof address === 'string' ? address : JSON.stringify(address ?? '')}`
    )}&limit=1&format=simple&api_key=${encodeQueryParam(
      `${typeof api_key === 'string' ? api_key : JSON.stringify(api_key ?? '')}`
    )}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        api: Constants['geocodio_api_key'],
      },
    }
  ).then(res => handleResponse(res, handlers));

export const useGetLatLongGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['geocodioGetLatLongGET', args],
    () => getLatLongGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['geocodioGetLatLongGETS']),
    }
  );
};

export const FetchGetLatLongGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  address,
  api_key,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetLatLongGET(
    { address, api_key },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchGetLatLong: refetch });
};

export const reverseGetLocationGET = (
  Constants,
  { api_key, latitude, longitude },
  handlers = {}
) =>
  fetch(
    `https://api.geocod.io/v1.7/reverse?q=${encodeQueryParam(
      `${
        typeof latitude === 'string' ? latitude : JSON.stringify(latitude ?? '')
      },${
        typeof longitude === 'string'
          ? longitude
          : JSON.stringify(longitude ?? '')
      }`
    )}&limit=1&format=simple&api_key=${encodeQueryParam(
      `${typeof api_key === 'string' ? api_key : JSON.stringify(api_key ?? '')}`
    )}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        api_key: Constants['geocodio_api_key'],
      },
    }
  ).then(res => handleResponse(res, handlers));

export const useReverseGetLocationGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['geocodioReverseGetLocationGET', args],
    () => reverseGetLocationGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['geocodioReverseGetLocationGETS']),
    }
  );
};

export const FetchReverseGetLocationGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  api_key,
  latitude,
  longitude,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useReverseGetLocationGET(
    { api_key, latitude, longitude },
    { refetchInterval, handlers: { onData, ...handlers } }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchReverseGetLocation: refetch });
};
