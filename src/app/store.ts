import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "../service/autherApi";
import { HomeAndSearchApi } from "../service/HomeAndSearchApi";
import { UserApi } from "../service/UserApi";
import usersReducer from "../features/UserSlice";
import authorReducer from "../features/authorSlice";
import HomeAndSearchReducer from "../features/HomeAndSearchSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [HomeAndSearchApi.reducerPath]: HomeAndSearchApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    usersSilce: usersReducer,
    HomeAndSearchSlice: HomeAndSearchReducer,
    authorSlice: authorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      AuthApi.middleware,
      HomeAndSearchApi.middleware,
      UserApi.middleware,
    ]),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
