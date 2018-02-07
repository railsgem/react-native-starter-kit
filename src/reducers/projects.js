import Store from '../store/projects';

export const initialState = Store;

export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    case 'PROJECTS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'PROJECTS_REPLACE': {
      let projects = [];
      const tmpProjects = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        let i = 0;
        for (let key in action.data) {
          tmpProjects[i] = action.data[key];
          tmpProjects[i]['id'] = key;
          i += 1;
        };

        projects = tmpProjects.map(item => ({
          id: item.id,
          // title: item.title,
          // body: item.body,
          // category: item.category,
          projectName: item.projectName,
          image: 'https://firebasestorage.googleapis.com/v0/b/react-native-starter-app.appspot.com/o/image-1.jpg?alt=media&token=9f7c839b-2d40-4660-a2a0-bf6c2f64a2e5',
          // author: item.author,
          // ingredients: item.ingredients,
          // method: item.method,
        }));
      }

      return {
        ...state,
        error: null,
        loading: false,
        projects,
      };
    }
    default:
      return state;
  }
}
