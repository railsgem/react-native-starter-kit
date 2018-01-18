import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';

/**
  * Create Project
  */
export function createProject(formData) {

  const {
    projectName,
    description,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Are they a user?
    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return reject({ message: ErrorMessages.missingFirstName });

    // Validation checks
    if (!projectName) return reject({ message: ErrorMessages.missingFirstName });
    if (!description) return reject({ message: ErrorMessages.missingLastName });

    await statusMessage(dispatch, 'loading', true);
    // const newPostKey = Firebase.ref(`projects/${UID}/${newPostKey}`);
    const newPostKey = FirebaseRef.child(`projects/${UID}`).push().key;
    // Go to Firebase
    return FirebaseRef.child(`projects/${UID}/${newPostKey}`)
      .set({
        projectName,
        description,
        createdAt: Firebase.database.ServerValue.TIMESTAMP,
        lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
      }).then(() => statusMessage(dispatch, 'loading', false).then(resolve));
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Get Projects
  */
export function getProjects() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('projects/8sVkuCqI2CNcR1Xhp37Kq2AifhV2')
    .on('value', (snapshot) => {
      const projects = snapshot.val() || {};

      return resolve(dispatch({
        type: 'RECIPES_REPLACE',
        data: projects,
      }));
    })).catch(e => console.log(e));
}

/**
  * Get Meals
  */
export function getMeals() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise((resolve, reject) => FirebaseRef
    .child('meals').once('value')
    .then((snapshot) => {
      const meals = snapshot.val() || {};

      return resolve(dispatch({
        type: 'MEALS_REPLACE',
        data: meals,
      }));
    }).catch(reject)).catch(e => console.log(e));
}

/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'RECIPES_ERROR',
    data: message,
  })));
}
