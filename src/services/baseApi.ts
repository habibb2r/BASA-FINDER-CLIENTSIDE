import {
    BaseQueryApi,
    BaseQueryFn,
    DefinitionType,
    FetchArgs,
    createApi,
    fetchBaseQuery,
  } from '@reduxjs/toolkit/query/react';
  // import { RootState } from '../store';
  // import { logout, setUser } from '../features/auth/authSlice';
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const baseQuery = fetchBaseQuery({
  
  baseUrl: 'http://localhost:5000/api/v1',
  
    credentials: 'include',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as RootState).auth.token;
  
      // if (token) {
      //   headers.set('authorization', `${token}`);
      // }
  
      return headers;
    },
  });
  const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  > = async (args, api, extraOptions): Promise<any> => {
    // let result = await baseQuery(args, api, extraOptions);
  
    // if (result?.error?.status === 404) {
    //   // toast.error("User not found")
    //   toast.error("Not Found !")
    // }
  
    // if (result?.error?.status === 401) {
    //   console.log('🔄 Refreshing token...');
  
  
        const res = await fetch('http://localhost:5000/api/v1/refresh-token', {
        // const res = await fetch('https://basa-finder-server-seven.vercel.app/api/v1/refresh-token', {
        method: 'POST',
        credentials: 'include',
      });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const data = await res.json();
  
      // if (data?.data?.accessToken) {
      //   const user = (api.getState() as RootState).auth.user;
  
      //   api.dispatch(
      //     setUser({
      //       user,
      //       token: data.data.accessToken,
      //     })
      //   );
  
      //   result = await baseQuery(args, api, extraOptions);
  
      //   // je api karone expire hoyeche or fail hoyeche sei api ke again call korte hobe
  
      // } else {
      //   api.dispatch(logout());
      // }
    }
  
    // return result;
  // };
  
  export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ['rentalListings', 'rentalRequests', 'payments', 'users', 'reset'],
    endpoints: () => ({}),
  });
  