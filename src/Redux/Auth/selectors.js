export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectLocation = (state) => state.auth.location;
export const selectUserName = (state) => state.auth.userData.name;
export const selectGreating = (state) => state.auth.greating;
export const selectGoingToRead = (state) => state.auth.goingToRead;
