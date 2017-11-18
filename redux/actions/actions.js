import types from './types';


const addUser = function(user = {}) {
  return {
    type: ADD_USER,
    payload: {user},
  };
};

const editUser = function(id, newProps = {}) {
  return {
    type: EDIT_USER,
    payload: {user: newProps},
  };
};

const deleteUser = function(id) {
  return {
    type: DELETE_USER,
    payload: id;
  };
};

const addSession = function(session = {}) {
  return {
    type: ADD_SESSION,
    payload: {session},
  };
};

const editSession = function(id, newProps = {}) {
  return {
    type: EDIT_ACTIVITY,
    payload: {id, newProps},
  };
};

const deleteSession = function(id) {
  return {
    type: DELETE_SESSION,
    payload: id;
  };
};

const addActivity = function(activity = {}) {
  return {
    type: ADD_ACTIVITY,
    payload: {activity},
  };
};

const editActivity = function(id, newProps = {}) {
  return {
    type: EDIT_ACTIVITY,
    payload: {id, newProps},
  };
};

const deleteActivity = function(id) {
  return {
    type: DELETE_ACTIVITY,
    payload: id;
  };
};

const addCategory = function(category = {}) {
  return {
    type: ADD_CATEGORY,
    payload: {category},
  };
};

const editCategory = function(id, newProps = {}) {
  return {
    type: EDIT_CATEGORY,
    payload: {id, newProps},
  };
};

const deleteCategory = function(id) {
  return {
    type: DELETE_CATEGORY,
    payload: id;
  };
};


export {
  addUser,
  editUser,
  deleteUser,
  addSession,
  editSession,
  deleteSession,
  addActivity,
  editActivity,
  deleteActivity,
  addCategory,
  editCategory,
  deleteCategory,
};