



// API_NOTIFICATION_MESSAGE
export const API_NOTIFICATION_MESSAGE = {
  loading: {
    title: "Loading",
    message: "Please wait while we are processing your request",
  },
  success:{
    title:"Success",
    message:"Your request has been processed successfully"
  },
  responseFailure: {
    title: "Error",
    message: "An error occured while fetching response from the server. Please try again",
  },
  requestFailure: {
    title: "Error",
    message: "An error occured while parsing the data",
  },
  networkError: {
    title: "Error",
    message: "Network error. Please check your internet connection",
  },
}

//API SERVICE CALL
//SAMPLE REQUEST
//NEED SERVICE CALL:{url:'/', method:'POST/GET/DELETE/PUT', params:'true/false', query:'true/false'}
export const SERVICE_URLS = {
  userSignup: {url:'/signup', method:'POST'},
  userLogin: {url:'/login', method:'POST'},
  uploadFile: {url:'/file/upload', method:'POST', isFormData: true },
  createPost: {url:"create", method:'POST'},
  getAllPosts: {url:"/posts", method:'GET', params:true},
  getPostById: {url:"/post", method:'GET'},
  updatePostById: {url:"/update", method:'PUT'},
  deletePostById: {url:"/delete", method:'DELETE'}
}