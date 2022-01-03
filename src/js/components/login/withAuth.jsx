import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToProtect) {
    return class extends Component {
        __isMounted = false;
        constructor() {
        super();
        this.state = {
        loading: true,
        redirect: false,
    };
    }
    componentDidMount() {
        this.__isMounted = true;
        fetch('/checkToken')
            .then(res => {
                if (res.status === 200) {
                    if (this.__isMounted) {
                        this.setState({ loading: false });
                    }
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                if (this.__isMounted){
                    this.setState({ loading: false, redirect: true });
                }
        });
    };

    componentWillUnmount() {
        this.__isMounted = false;
    };

    render() {
        const { loading, redirect } = this.state;
        if (loading) {
            return null;
        }
        if (redirect) {
            return <Redirect to="/login" />;
        }
        return <ComponentToProtect {...this.props } />;
    }
    }
}



// /* TODO finish hooks/Redux conversion, issue with Route for this component as returned */
// function withAuthHooks (ComponentToProtect)
//     const [loading, setLoading] = useState(true);
//     const [redirect, setRedirect] = useState(false);
//     let _isMounted = false;
//
//     useEffect(()=> {
//         _isMounted = true;
//         checkToken();
//
//         return () => {
//             _isMounted = false;
//         }
//
//     }, []);
//
//     const checkToken = async() => {
//         try {
//             let raw = await fetch('./checkToken');
//             if (raw.status === 200 && _isMounted) {
//                 console.log("IN 200 BLOCK");
//                 setLoading(false);
//
//             } else {
//                 console.log('ISSUE AUTHENTICATING TOKEN : ', raw.error);
//                 throw new Error();
//             }
//         } catch(e) {
//             if (_isMounted) {
//                 setLoading(false);
//                 setRedirect(true);
//             }
//         }
//     }
//
//     if (loading) return null;
//     if (redirect) return (<Redirect to='/Login' />);
//     return <ComponentToProtect />;
//
// };
//
// export default withAuthHooks;
