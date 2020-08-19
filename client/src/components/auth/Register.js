import React , {useState , useContext, useEffect} from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const  {setAlert} = alertContext;
    const {register , error , clearErrors , isAuthenticated} = authContext;

    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/');
        }
        if(error === 'User Already Exists'){
            setAlert(error , 'dark' );
            clearErrors();
        }
        
        // eslint-disable-next-line
    }, [error , isAuthenticated , props.history]);

    const [user , setUser] = useState({
        name : '',
        email : '',
        password: '',
        password2: ''
    });

    const { name ,email, password ,password2} = user;

    const onChange = (e) => setUser({ ...user , [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2){
            setAlert('Passwords Do Not Match !' , 'danger');
        } else{
            register({
                name,
                email,
                password
            })
        }
        
    }

    return (
       <div className="container mt-3 pad2">
         <div className="row">
            <div className="col-12 col-sm-6 offset-sm-3">
                <div className="justify-self-center">
                    <h1 className="text-center">Account <span className="text-primary">Register</span>{' '} <span className="fa fa-user-plus fa-lg"></span></h1>
                
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input className="form-control" type="text" name="name" value={name} onChange={onChange} required placeholder="Your Name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type="email" name="email" value={email} onChange={onChange} required placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" name="password" value={password} onChange={onChange} required minLength="6" placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password2">Confirm Password</label>
                            <input className="form-control" type="password" name="password2" value={password2} onChange={onChange} required minLength="6" placeholder="Confirm password"/>
                        </div>
                        <input type="submit" className="form-control btn btn-block btn-light btn-outline-dark" value="Register" />
                    </form>
                </div>
            </div>
        </div>
    </div>
)
}

export default Register
