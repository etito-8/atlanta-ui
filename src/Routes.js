import React, { Suspense, lazy } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

/* loader component for Suspense*/
import PageLoader from './components/Common/PageLoader';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';
// import BaseHorizontal from './components/Layout/BaseHorizontal';

/* Used to render a lazy component with react-router */
const waitFor = Tag => props => <Tag {...props}/>;

//ADDED PATHS
const AdminOnlyfunc = lazy(() => import('./components/Functionality/AdminOnlyfunc'));
const AdminCustomerfunc = lazy(() => import('./components/Functionality/AdminCustomerfunc'));
const ManagerOnlyfunc = lazy(() => import('./components/Functionality/ManagerOnlyfunc'));
const ManagerCustomerfunc = lazy(() => import('./components/Functionality/ManagerCustomerfunc'));
const Customerfunc = lazy(() => import('./components/Functionality/Customerfunc'));
const UserFunc = lazy(() => import('./components/Functionality/UserFunc'));

const Login = lazy(() => import('./components/Pages/Login'));
const Register = lazy(() => import('./components/Pages/Register'));
const Maintenance = lazy(() => import('./components/Pages/Maintenance'));

// ADDED PATHS (register)
const UserRegister = lazy(() => import('./components/Pages/UserRegister'));
const CustomerRegister = lazy(() => import('./components/Pages/CustomerRegister'));
const ManagerOnly =  lazy(() => import('./components/Pages/ManagerOnly'));
const ManagerCustomer =  lazy(() => import('./components/Pages/ManagerCustomer'));

//ADDED PATHS (create & schedule)
const CreateTheater = lazy(() => import('./components/Create/CreateTheater'));
const CreateMovie = lazy(() => import('./components/Create/CreateMovie'));
const TheaterOverview = lazy(() => import('./components/Create/TheaterOverview'));
const ManagerScheduleMovie = lazy(() => import('./components/Create/ManagerScheduleMovie'));

//ADDED PATHS (exploring  & viewing)
const CustomerExploreMovie = lazy(() => import('./components/Explore/CustomerExploreMovie'));
const CustomerViewHistory = lazy(() => import('./components/Explore/CustomerViewHistory'));
const UserVisitHistory = lazy(() => import('./components/Explore/UserVisitHistory'));
const UserExploreTheater = lazy(() => import('./components/Explore/UserExploreTheater'));

//ADDED PATHS (manage & detail for admin)
const ManageUser = lazy(() => import('./components/Manage/ManageUser'));
const ManageCompany = lazy(() => import('./components/Manage/ManageCompany'));
const AdminCompanyDetail = lazy(() => import('./components/Manage/AdminCompanyDetail'));


// List of routes that uses the page layout
// listed here to Switch between layouts
// depending on the current pathname
const listofPages = [
    '/login',
    '/register',
    '/maintenance',
    '/userRegister',
    '/managerOnly',
    '/customerRegister',
    '/managerCustomer',

];

const Routes = ({ location }) => {
    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = { enter: 500, exit: 500 };

    // Animations supported
    //      'rag-fadeIn'
    //      'rag-fadeInRight'
    //      'rag-fadeInLeft'

    const animationName = 'rag-fadeIn'

    if(listofPages.indexOf(location.pathname) > -1) {
        return (
            // Page Layout component wrapper
            <BasePage>
                <Suspense fallback={<PageLoader/>}>
                    <Switch location={location}>
                        <Route path="/login" component={waitFor(Login)}/>
                        <Route path="/register" component={waitFor(Register)}/>
                        <Route path="/maintenance" component={waitFor(Maintenance)}/>
                        <Route path="/userRegister" component={waitFor(UserRegister)}/>
                        <Route path="/customerRegister" component={waitFor(CustomerRegister)}/>
                        <Route path="/managerOnly" component={waitFor(ManagerOnly)}/>
                        <Route path="/managerCustomer" component={waitFor(ManagerCustomer)}/>
                    </Switch>
                </Suspense>
            </BasePage>
        )
    }
    else {
        return (
            // Layout component wrapper
            // Use <BaseHorizontal> to change layout
            <Base>
              <TransitionGroup>
                <CSSTransition key={currentKey} timeout={timeout} classNames={animationName} exit={false}>
                    <div>
                        <Suspense fallback={<PageLoader/>}>
                            <Switch location={location}>

                                {/*Maps (Added {functionalities n' dat})*/}
                                <Route path="/admin-only-func" component={waitFor(AdminOnlyfunc)}/>
                                <Route path="/admin-customer-func" component={waitFor(AdminCustomerfunc)}/>
                                <Route path="/manager-only-func" component={waitFor(ManagerOnlyfunc)}/>
                                <Route path="/manager-customer-func" component={waitFor(ManagerCustomerfunc)}/>
                                <Route path="/customer-func" component={waitFor(Customerfunc)}/>
                                <Route path="/user-func" component={waitFor(UserFunc)}/>

                                {/*Extras (Added) */}
                                <Route path="/create-theater" component={waitFor(CreateTheater)}/>
                                <Route path="/create-movie" component={waitFor(CreateMovie)}/>
                                <Route path="/theater-overview" component={waitFor(TheaterOverview)}/>
                                <Route path="/schedule-movie" component={waitFor(ManagerScheduleMovie)}/>

                                {/*Ecommerce (Added Paths for exploring and history stuff) */}
                                <Route path="/explore-movie" component={waitFor(CustomerExploreMovie)}/>
                                <Route path="/view-history" component={waitFor(CustomerViewHistory)}/>
                                <Route path="/visit-history" component={waitFor(UserVisitHistory)}/>
                                <Route path="/explore-theater" component={waitFor(UserExploreTheater)}/>


                                {/*ADDED PATHS*/}
                                <Route path="/manage-user" component={waitFor(ManageUser)}/>
                                <Route path="/manage-company" component={waitFor(ManageCompany)}/>
                                <Route path="/admin-company-detail" component={waitFor(AdminCompanyDetail)}/>

                                <Redirect to="/user-func"/>
                            </Switch>
                        </Suspense>
                    </div>
                </CSSTransition>
              </TransitionGroup>
            </Base>
        )
    }
}

export default withRouter(Routes);