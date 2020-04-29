export default (state, action) => {
  switch (action.type) {
    case 'CHANGE_EMAIL':
      return {
        ...state,
        email: action.payload
      }
      case 'CHANGE_PASSWORD':
        return {
          ...state,
          password: action.payload
        }
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.payload
      }
    case 'CHANGE_TITLE':
      return {
        ...state,
        title: action.payload
      }
    case 'CHANGE_BODY':
      return {
        ...state,
        body: action.payload
      }
    case 'CHANGE_URL':
      return {
        ...state,
        url: action.payload
      }
    case 'CHANGE_FILE':
      return {
        ...state,
        file: action.payload
      }
      case 'CHANGE_USER':
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}
