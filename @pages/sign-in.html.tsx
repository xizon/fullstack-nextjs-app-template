import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import Layout from '@/components/Layout';


// Authority 
import useAuth from '@/utils/hooks/useAuth';


/** Render data
 * ---------------------------------
*/
const SignIn = () => {

    const { isInitialized, isAuthenticated, login, logout } = useAuth();

    console.log('[Sign In] useAuth() -> isAuthenticated: ', isAuthenticated);
    console.log('[Sign In] useAuth() -> isInitialized: ', isInitialized);
    

    const rootRef = useRef<any>(null);
    const usernameRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);

    const [loginOk, setLoginOk] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    function dismissError() {
        setError('');
    }

    function handleSubmit(e) {
        e.preventDefault();

        const root = rootRef.current;
        const $inputs = Array.prototype.slice.call(root.querySelectorAll('input'));

        if (!username) {
            setError('Username is required');
            return false;
        }

        if (!password) {
            setError('Password is required');
            return false;
        }

        //control status
        $inputs.forEach((node) => {
            node.disabled = true;
        });


        //
        const formData = new FormData();
        const defaultPostData = {
            action: 'login_check',
            user_name: username,
            user_password: password
        };

        for (let k in defaultPostData) {
            formData.append(k, defaultPostData[k]);
        }
        /*
        // For multiple form fields data acquisition
        const formData = new FormData();
        const oldFormData = $this.serializeArray();
        oldFormData.forEach(function(item){
            formData.append(item.name, item.value);
        });
        formData.append('action', 'load_singlepages_ajax_content');
        */

        login(formData).then(function (response: any) {

            console.log('Login Info: ', response);

            const {code, error} = response;


            /*
             ////////////////////////////////////////////////////////////
             ///////////////   (1) Network or API error   ///////////////
             ////////////////////////////////////////////////////////////
             */
            if (code == -1) {
                //control status
                $inputs.forEach((node) => {
                    node.disabled = false;
                });

                //update state
                setError('ERROR: ' + code + ': ' + error + '!');
                return false;
            }


            /*
             ////////////////////////////////////////////////////////////
             ////////////////   (2) Login successful   //////////////////
             ////////////////////////////////////////////////////////////
            */

            // This is where you would call Firebase, an API etc...
            if (code == 200) {

                //control status
                $inputs.forEach((node) => {
                    node.disabled = false;
                });

                //update state
                setLoginOk(true);
                setError('');

                return false;


            }

            /*
             ////////////////////////////////////////////////////////////
             ////////////////   (3) Login failed       //////////////////
             ////////////////////////////////////////////////////////////
             */
            if (code == 401 || code == 419) {

                //control status
                $inputs.forEach((node) => {
                    node.disabled = false;
                });

                //update state
                setError('ERROR: ' + code + ': ' + error + '!');
                return false;

            }

        });



    }

    function handleUserChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    };

    function handlePassChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function signOut(e: React.MouseEvent) {
        e.preventDefault();
        logout();

        //update state
        setLoginOk(false);
    }

    useEffect(() => {

        //Authority
        //-----
        if ( !isAuthenticated ) {
            setLoginOk(false);
        } else {
            setLoginOk(true);
        }

    }, [loginOk, isAuthenticated]); 

    
    return (
        <>
            <Head>
                <title>Sign In</title>
            </Head>


            <Layout
                pageTitle="Sign In"
                contentComponent={<>
{
                    (loginOk) ?
                        <div>
                            <Link href="/dashboard/index.html">Go to dashboard</Link>  | <a href="#" onClick={signOut}>Sign out</a>
                        </div>
                        :
                        <div ref={rootRef}>
                            <p>Test Account: <code>admin</code> Password: <code>admin</code></p>
                            <form onSubmit={handleSubmit.bind(this)}>


                                <div style={{ padding: "5px" }}>
                                    <label style={{ padding: "10px", display: "inline-block", width: "100px" }}>Username</label>
                                    <input ref={usernameRef} type="text" value={username} onChange={handleUserChange} />
                                </div>

                                <div style={{ padding: "5px" }}>
                                    <label style={{ padding: "10px", display: "inline-block", width: "100px" }}>Password</label>
                                    <input ref={passwordRef} type="password" value={password} onChange={handlePassChange} />
                                </div>

                                <div style={{ padding: "5px" }}>
                                    <label style={{ padding: "10px", display: "inline-block", width: "100px" }}></label>
                                    <input style={{ padding: "7px 25px", background: "#191919", outline: "none", color: "#fff", borderRadius: "30px", border: "none", fontSize: "14px" }} type="submit" value="Log In" />
                                </div>


                                <div style={{ padding: "5px" }}>
                                    <label style={{ padding: "10px", display: "inline-block", width: "100px" }}></label>

                                    {error &&
                                        <span onClick={dismissError}>
                                            {error}, <a href="#" onClick={dismissError}>back</a>
                                        </span>
                                    }

                                </div>

                            </form>
                        </div>
                }
                
                </>}
            />


        </>
    )
};


export default SignIn;
