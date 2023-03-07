import { initAuthState } from 'features/auth/store';
import { initPostState } from 'features/posts';
import { RootState } from 'store/store';

export { initAuthState } from 'features/auth/store/auth.slice';
export { initPostState } from 'features/posts/store/posts.slice';

export const initRootState = (): RootState => ({
  auth: initAuthState(),
  posts: initPostState(),
  router: {},
});
