import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Role } from "../../models";

export const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3333",
  }),
  endpoints: (builder) => ({
    getRoles: builder.query<Role[], unknown>({
      query: () => "/roles",
    }),
    newRole: builder.mutation<
      Role,
      { name: string; description: string; parent: string | null }
    >({
      query: (body) => ({
        url: "/roles",
        method: "POST",
        body,
      }),
    }),
    getARoleById: builder.query<Role, { id: string }>({
      query: ({ id }) => ({
        url: `/roles/${id}`,
      }),
    }),
    getChildrenByParentId: builder.query<Role[], { id: string }>({
      query: ({ id }) => ({
        url: `/roles/${id}/children`,
      }),
    }),
    getRoots: builder.query<Role[], unknown>({
      query: () => ({
        url: "/roles/root",
      }),
    }),
  }),
});

export const {
  useGetRolesQuery,
  useNewRoleMutation,
  useLazyGetRolesQuery,
  useGetARoleByIdQuery,
  useGetChildrenByParentIdQuery,
  useGetRootsQuery,
  useLazyGetARoleByIdQuery,
  useLazyGetChildrenByParentIdQuery,
  useLazyGetRootsQuery,
} = rolesApi;
