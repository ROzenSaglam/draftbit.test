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
import {
  encodeQueryParam,
  renderParam,
  renderQueryString,
} from '../utils/encodeQueryParam';
import * as GlobalVariables from '../config/GlobalVariableContext';

const cleanHeaders = headers =>
  Object.fromEntries(Object.entries(headers).filter(kv => kv[1] != null));

export const gET$forgotPasswordGET = async (
  Constants,
  { email },
  handlers = {}
) => {
  const paramsDict = {};
  if (email !== undefined) {
    paramsDict['email'] = renderParam(email);
  }
  const url = `https://x8ki-letl-twmt.n7.xano.io/api:cLhKECft/forgot_password${renderQueryString(
    paramsDict,
    'brackets'
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useGET$forgotPasswordGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['testOpenAPIGET$forgotPasswordGET', args],
    () => gET$forgotPasswordGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['testOpenAPIGET$forgotPasswordGETS']),
    }
  );
};

export const FetchGET$forgotPasswordGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  email,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGET$forgotPasswordGET(
    { email },
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
  return children({ loading, data, error, refetchGET$forgotPassword: refetch });
};

export const pATCH$resetPasswordPATCH = async (
  Constants,
  { email, new_password },
  handlers = {}
) => {
  const url = `https://x8ki-letl-twmt.n7.xano.io/api:cLhKECft/reset_password`;
  const options = {
    body: JSON.stringify({ email: email, new_password: new_password }),
    headers: cleanHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    method: 'PATCH',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const usePATCH$resetPasswordPATCH = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['testOpenAPIPATCH$resetPasswordPATCH', args],
    () => pATCH$resetPasswordPATCH(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries([
          'testOpenAPIPATCH$resetPasswordPATCHES',
        ]),
    }
  );
};

export const pOST$verifyOtpPOST = async (
  Constants,
  { email, otp_code },
  handlers = {}
) => {
  const url = `https://x8ki-letl-twmt.n7.xano.io/api:cLhKECft/verify_otp`;
  const options = {
    body: JSON.stringify({ email: email, otp_code: otp_code }),
    headers: cleanHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const usePOST$verifyOtpPOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['testOpenAPIPOST$verifyOtpPOST', args],
    () => pOST$verifyOtpPOST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['testOpenAPIPOST$verifyOtpPOSTS']),
    }
  );
};

export const FetchPOST$verifyOtpPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  email,
  otp_code,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = usePOST$verifyOtpPOST(
    { email, otp_code },
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
  return children({ loading, data, error, refetchPOST$verifyOtp: refetch });
};
