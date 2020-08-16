import React , {useState , useContext, useEffect} from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const  {setAlert} = alertContext;
    const {login , error , clearErrors , isAuthenticated} = authContext;

    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/');
        }
        if(error === 'Invalid Credentials'){
            setAlert(error , 'dark' );
            clearErrors();
        }
        
    // eslint-disable-next-line
    }, [error , isAuthenticated , props.history]);


    const [user , setUser] = useState({
        email : '',
        password: ''
    });

    const { email, password } = user;

    const onChange = (e) => setUser({ ...user , [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if(email === '' || password === ''){
            setAlert('Plase fill all fields' , 'danger');
        }else{
            login({
                email,
                password
            })
        }
    }

    return (
        <div className="container">
         <div className="row">
            <div className="col-12 col-sm-8">
                <div className="align-content-center">
                    <h1 className="text-center">Account <span className="text-primary">Login</span>{' '} <span className="fa fa-login fa-lg"></span></h1>
                
                    <form onSubmit={onSubmit}>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type="email" name="email" value={email} onChange={onChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" name="password" value={password} onChange={onChange} required/>
                        </div>
                        
                        <input type="submit" className="form-control btn btn-block btn-primary btn-outline-dark" value="Login"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Login;
