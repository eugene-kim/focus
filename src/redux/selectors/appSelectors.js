// --------------------------------------------------
// USER
// --------------------------------------------------

export const getUserProps = state => state.app.user.props;
export const getUserFetchStatus = state => state.app.user.fetchStatus;
export const getUser = state => state.app.user;

const getScreenState = state => state.app.screenState;
export const getAddActivityModalState = state => getScreenState(state).AddActivityModal.isOpen;