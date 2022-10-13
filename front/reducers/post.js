export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'minimax',
      },
      content: '첫 번째 게시글',
      Images: [
        {
          src: 'https://i.ytimg.com/vi/l1Wu02Eq560/maxresdefault.jpg',
        },
        {
          src: 'https://i.ytimg.com/vi/4mG8iGdiun4/maxresdefault.jpg',
        },
        {
          src: 'https://i.ytimg.com/vi/0Ar9bq1yjP0/maxresdefault.jpg',
        },
      ],
      Comments: [
        {
          User: {
            nickname: '지락실',
          },
          content: '안유진 최고~',
        },
        {
          User: {
            nickname: '나영석',
          },
          content: '우주최강 양파쿵야 안유진',
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: '더미데이터',
  User: {
    id: 1,
    nickname: 'minimax',
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
