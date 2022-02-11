import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './../contexts/UserContext';

export default function PrivateRoute(props) {
    const { token } = useContext(UserContext);
    const { component: Component, ...rest } = props;

    if (token) {
        return (
            <Route {...rest} render={(props) =>
                (<Component {...props} />)
            }
            />
        )
    }

    return <Redirect to='/login' />
}