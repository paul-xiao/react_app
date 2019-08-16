import Signin from "../views/user/Signin";
import Signup from "../views/user/Signup";
import Home from "../views/Home";
import About from "../views/About";

const routes = [
    {
      path: "/signin",
      component: Signin
    },
    {
      path: "/signup",
      component: Signup
    },
    {
      path: "/",
      component: Home
    },
    {
      path: "/about",
      component: About
    },
    
  ];

export default routes