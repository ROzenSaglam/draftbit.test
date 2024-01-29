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

export const addCategoryPOST = (Constants, { id, name }, handlers = {}) =>
  fetch(`https://x8ki-letl-twmt.n7.xano.io/api:MaAmC-b1/categories`, {
    body: JSON.stringify({ Name: name, user_id: id }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  }).then(res => handleResponse(res, handlers));

export const useAddCategoryPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => addCategoryPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('addcategory', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('addcategory');
        queryClient.invalidateQueries('addcategories');
      },
    }
  );
};

export const FetchAddCategoryPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  id,
  name,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useAddCategoryPOST(
    { id, name },
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
  return children({ loading, data, error, refetchAddCategory: refetch });
};

export const createSingleRecordCategoryPOST = (
  Constants,
  { categories_id, categoryName },
  handlers = {}
) =>
  fetch(
    `https://x8ki-letl-twmt.n7.xano.io/api:MaAmC-b1/categories/${
      typeof categories_id === 'string'
        ? categories_id
        : JSON.stringify(categories_id ?? '')
    }`,
    {
      body: JSON.stringify({ category: categoryName }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const useCreateSingleRecordCategoryPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      createSingleRecordCategoryPOST(
        Constants,
        { ...initialArgs, ...args },
        handlers
      ),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('categories', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('category');
        queryClient.invalidateQueries('categories');
      },
    }
  );
};

export const FetchCreateSingleRecordCategoryPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  categories_id,
  categoryName,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useCreateSingleRecordCategoryPOST(
    { categories_id, categoryName },
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
  return children({
    loading,
    data,
    error,
    refetchCreateSingleRecordCategory: refetch,
  });
};

export const deleteTaskDELETE = (Constants, { id, tasks_id }, handlers = {}) =>
  fetch(
    `https://x8ki-letl-twmt.n7.xano.io/api:MaAmC-b1/tasks/${
      typeof tasks_id === 'string' ? tasks_id : JSON.stringify(tasks_id ?? '')
    }`,
    {
      body: JSON.stringify({ tasks_id: id }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }
  ).then(res => handleResponse(res, handlers));

export const useDeleteTaskDELETE = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => deleteTaskDELETE(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('delete', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('delete');
        queryClient.invalidateQueries('deletes');
      },
    }
  );
};

export const editTasksRecordPOST = (
  Constants,
  { date, id, image, notes, priority, status, task, tasks_id },
  handlers = {}
) =>
  fetch(
    `https://x8ki-letl-twmt.n7.xano.io/api:MaAmC-b1/tasks/${
      typeof tasks_id === 'string' ? tasks_id : JSON.stringify(tasks_id ?? '')
    }`,
    {
      body: JSON.stringify({
        tasks_id: id,
        Task: task,
        Priority: priority,
        Deadline: date,
        Status: status,
        Notes: notes,
        file: image,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then(res => handleResponse(res, handlers));

export const useEditTasksRecordPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      editTasksRecordPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('edittask', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('edittask');
        queryClient.invalidateQueries('edittasks');
      },
    }
  );
};

export const FetchEditTasksRecordPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  date,
  id,
  image,
  notes,
  priority,
  status,
  task,
  tasks_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useEditTasksRecordPOST(
    { date, id, image, notes, priority, status, task, tasks_id },
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
  return children({ loading, data, error, refetchEditTasksRecord: refetch });
};

export const getAllCategoriesGET = (Constants, _args, handlers = {}) =>
  fetch(`https://x8ki-letl-twmt.n7.xano.io/api:MaAmC-b1/categories`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then(res => handleResponse(res, handlers));

export const useGetAllCategoriesGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['xanoGetAllCategoriesGET', args],
    () => getAllCategoriesGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['xanoGetAllCategoriesGETS']),
    }
  );
};

export const FetchGetAllCategoriesGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetAllCategoriesGET(
    {},
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
  return children({ loading, data, error, refetchGetAllCategories: refetch });
};

export const getOneRecordGET = (Constants, { tasks_id }, handlers = {}) =>
  fetch(
    `https://x8ki-letl-twmt.n7.xano.io/api:MaAmC-b1/tasks/${
      typeof tasks_id === 'string' ? tasks_id : JSON.stringify(tasks_id ?? '')
    }`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then(res => handleResponse(res, handlers));

export const useGetOneRecordGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['gettask', args],
    () => getOneRecordGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['gettasks']),
    }
  );
};

export const FetchGetOneRecordGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  tasks_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetOneRecordGET(
    { tasks_id },
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
  return children({ loading, data, error, refetchGetOneRecord: refetch });
};

export const getCategoriesPOST = (Constants, { user_id }, handlers = {}) =>
  fetch(`https://x8ki-letl-twmt.n7.xano.io/api:MaAmC-b1/categoriesByUser`, {
    body: JSON.stringify({ user_id: user_id }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  }).then(res => handleResponse(res, handlers));

export const useGetCategoriesPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => getCategoriesPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('cate', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('cate');
        queryClient.invalidateQueries('cates');
      },
    }
  );
};

export const FetchGetCategoriesPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useGetCategoriesPOST(
    { user_id },
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
  return children({ loading, data, error, refetchGetCategories: refetch });
};

export const queryAllTasksPOST = (Constants, { search }, handlers = {}) =>
  fetch(`https://x8ki-letl-twmt.n7.xano.io/api:MaAmC-b1/Query_all_tasks`, {
    body: JSON.stringify({ search_text: search }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  }).then(res => handleResponse(res, handlers));

export const useQueryAllTasksPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => queryAllTasksPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('edittask', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('edittask');
        queryClient.invalidateQueries('edittasks');
      },
    }
  );
};

export const FetchQueryAllTasksPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  search,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useQueryAllTasksPOST(
    { search },
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
  return children({ loading, data, error, refetchQueryAllTasks: refetch });
};

export const authmeGET = (Constants, _args, handlers = {}) =>
  fetch(`https://x8ki-letl-twmt.n7.xano.io/api:MaAmC-b1/auth/me`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['Xano_Authtoken'],
      'Content-Type': 'application/json',
    },
  }).then(res => handleResponse(res, handlers));

export const useAuthmeGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['xanoAuthmeGET', args],
    () => authmeGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['xanoAuthmeGETS']),
    }
  );
};

export const FetchAuthmeGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useAuthmeGET({}, { refetchInterval, handlers: { onData, ...handlers } });

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
  return children({ loading, data, error, refetchAuthme: refetch });
};

export const createTasksPOST = (
  Constants,
  { categoryId, date, file, note, priority, status, task, userId },
  handlers = {}
) =>
  fetch(`https://x8ki-letl-twmt.n7.xano.io/api:MaAmC-b1/tasks`, {
    body: JSON.stringify({
      Task: task,
      Priority: priority,
      Deadline: date,
      Status: status,
      user_id: userId,
      categories_id: categoryId,
      Notes: note,
      file: file,
    }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  }).then(res => handleResponse(res, handlers));

export const useCreateTasksPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => createTasksPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('newtask', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('newtask');
        queryClient.invalidateQueries('newtasks');
      },
    }
  );
};

export const FetchCreateTasksPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  categoryId,
  date,
  file,
  note,
  priority,
  status,
  task,
  userId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useCreateTasksPOST(
    { categoryId, date, file, note, priority, status, task, userId },
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
  return children({ loading, data, error, refetchCreateTasks: refetch });
};

export const deleteCategoryDELETE = (
  Constants,
  { categories_id, categoryId },
  handlers = {}
) =>
  fetch(
    `https://x8ki-letl-twmt.n7.xano.io/api:MaAmC-b1/categories/${
      typeof categories_id === 'string'
        ? categories_id
        : JSON.stringify(categories_id ?? '')
    }`,
    {
      body: JSON.stringify({ categories_id: categoryId }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }
  ).then(res => handleResponse(res, handlers));

export const useDeleteCategoryDELETE = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      deleteCategoryDELETE(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('deletecategory', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('deletecategory');
        queryClient.invalidateQueries('deletecategories');
      },
    }
  );
};

export const filterByUserAndCatPOST = (
  Constants,
  { categories_id, user_id },
  handlers = {}
) =>
  fetch(`https://x8ki-letl-twmt.n7.xano.io/api:MaAmC-b1/filterByUserAndCat`, {
    body: JSON.stringify({ user_id: user_id, categories_id: categories_id }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  }).then(res => handleResponse(res, handlers));

export const useFilterByUserAndCatPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      filterByUserAndCatPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('filtertaskcat', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('filtertaskcat');
        queryClient.invalidateQueries('filtertaskcats');
      },
    }
  );
};

export const FetchFilterByUserAndCatPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  categories_id,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useFilterByUserAndCatPOST(
    { categories_id, user_id },
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
  return children({ loading, data, error, refetchFilterByUserAndCat: refetch });
};

export const filterByUserIdPOST = (Constants, { user_id }, handlers = {}) =>
  fetch(`https://x8ki-letl-twmt.n7.xano.io/api:MaAmC-b1/filterByUserId`, {
    body: JSON.stringify({ user_id: user_id }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  }).then(res => handleResponse(res, handlers));

export const useFilterByUserIdPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args =>
      filterByUserIdPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('filterTask', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('filterTask');
        queryClient.invalidateQueries('filterTasks');
      },
    }
  );
};

export const FetchFilterByUserIdPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useFilterByUserIdPOST(
    { user_id },
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
  return children({ loading, data, error, refetchFilterByUserId: refetch });
};

export const getSearchResultGET = (Constants, _args, handlers = {}) =>
  fetch(`https://x8ki-letl-twmt.n7.xano.io/api:MaAmC-b1/Query_all_tasks`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then(res => handleResponse(res, handlers));

export const useGetSearchResultGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['xanoGetSearchResultGET', args],
    () => getSearchResultGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () =>
        queryClient.invalidateQueries(['xanoGetSearchResultGETS']),
    }
  );
};

export const FetchGetSearchResultGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetSearchResultGET(
    {},
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
  return children({ loading, data, error, refetchGetSearchResult: refetch });
};

export const getTasksGET = (Constants, _args, handlers = {}) =>
  fetch(`https://x8ki-letl-twmt.n7.xano.io/api:MaAmC-b1/tasks`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then(res => handleResponse(res, handlers));

export const useGetTasksGET = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['xanoGetTasksGET', args],
    () => getTasksGET(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['xanoGetTasksGETS']),
    }
  );
};

export const FetchGetTasksGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useGetTasksGET(
    {},
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
  return children({ loading, data, error, refetchGetTasks: refetch });
};

export const loginPOST = (Constants, { email, pswr }, handlers = {}) =>
  fetch(`https://x8ki-letl-twmt.n7.xano.io/api:MaAmC-b1/auth/login`, {
    body: JSON.stringify({ email: email, password: pswr }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  }).then(res => handleResponse(res, handlers));

export const useLoginPOST = (
  args = {},
  { refetchInterval, handlers = {} } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['newuser', args],
    () => loginPOST(Constants, args, handlers),
    {
      refetchInterval,
      onSuccess: () => queryClient.invalidateQueries(['newusers']),
    }
  );
};

export const FetchLoginPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  email,
  pswr,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useLoginPOST(
    { email, pswr },
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
  return children({ loading, data, error, refetchLogin: refetch });
};

export const signupPOST = (Constants, { email, name, psw }, handlers = {}) =>
  fetch(`https://x8ki-letl-twmt.n7.xano.io/api:MaAmC-b1/auth/signup`, {
    body: JSON.stringify({ name: name, email: email, password: psw }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  }).then(res => handleResponse(res, handlers));

export const useSignupPOST = (initialArgs = {}, { handlers = {} } = {}) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => signupPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('newuser', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('newuser');
        queryClient.invalidateQueries('newusers');
      },
    }
  );
};

export const FetchSignupPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  email,
  name,
  psw,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useSignupPOST(
    { email, name, psw },
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
  return children({ loading, data, error, refetchSignup: refetch });
};
