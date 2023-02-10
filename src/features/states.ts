import { initAuthState } from 'features/auth/store';
export { initAuthState } from 'features/auth/store/auth.slice';
import { initPostState } from 'features/posts';
export { initPostState } from 'features/posts/store/posts.slice';
import { RootState } from 'store/store';

export const initRootState = (): RootState => ({
  auth: initAuthState(),
  posts: initPostState(),
  router: {},
});
