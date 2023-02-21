import reducer, {
  initPostState,
  postsActions,
  selectItems,
} from 'features/posts/store/posts.slice';
import { initRootState } from 'features/states';
import { Post } from 'features/posts/types';
import { RootState, store } from 'store/store';
import { TSucceededResponse } from '../../../../libs/core/api';

const expectedPosts: Post[] = [
  { id: '1', attributes: { content: 'post1', description: 'description1', title: 'post1' } },
  { id: '2', attributes: { content: 'post2', description: 'description2', title: 'post2' } },
];
const expectedResponse: TSucceededResponse<Post[]> = {
  data: expectedPosts,
  meta: {},
};

describe('State tests', () => {
  it('should initially set post to an empty array', () => {
    const state = store.getState().posts;
    expect(state.items.length).toEqual(0);
  });
});

describe('Reducer tests', () => {
  it('should return the initial state when passed an empty action', () => {
    // Given
    const initialState = undefined;

    const action = { type: '' };

    // When
    const result = reducer(initialState, action);

    // Then
    expect(result).toEqual(initPostState());
  });

  it('should add received posts', () => {
    // Given
    const initialState = undefined;

    const action = postsActions.fetchAllSucceeded(expectedResponse);

    // When
    const result = reducer(initialState, action);

    // Then
    expect(Object.keys(result.items).length).toEqual(expectedPosts.length);
    expect(result.items).toEqual(expectedPosts);
  });
});

describe('Selectors tests', () => {
  it('should return empty posts', () => {
    // Given
    const state: RootState = initRootState();

    // When
    const result = selectItems(state);

    // Then
    expect(result).toEqual([]);
  });
});

const expectedSagaPosts: Post[] = [
  { id: '1', attributes: { title: 'saga', description: 'saga', content: 'saga' } },
];

jest.mock('../../api/index', () => ({
  async getPosts() {
    return { data: expectedSagaPosts };
  },
}));

describe('Saga tests', () => {
  it('should return all posts when fetchAll dispatched (using mocked Rest API)', async () => {
    // When
    await store.dispatch(postsActions.fetchAll());

    // Then
    expect(store.getState().posts.items).toEqual(expectedSagaPosts);
  });
});
