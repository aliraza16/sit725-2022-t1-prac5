import {React} from "react";
import {BrowserRouter, Redirect, Route, Switch,} from "react-router-dom";
import {useSelector} from "react-redux";
import Login from "../../src/containers/Auth/Login/index";
import Register from "../../src/containers/Auth/Register/index";
import Layout from "../../src/containers/Layout/index";
import Brands from "./../containers/Brand/Brands/Brands";


export default function Routes() {

    const {isAuthenticated} = useSelector(({auth}) => auth);

    return (
       <BrowserRouter>
           <Switch>
               <Route path='/' exact component={Register}/>
               <Route path='/login' exact component={Login}/>
               {isAuthenticated?
                   <Layout>
                       <Route component={({ match }) =>
                           <div>
                               <Route path="/brands"  component={Brands}/>
                           </div>
                       }/>
                   </Layout>
                   : <Redirect to='/'/>}
           </Switch>
       </BrowserRouter>
    )

}
