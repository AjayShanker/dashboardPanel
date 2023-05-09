import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
//import $ from '../../node_modules/jquery/dist/jquery.min.js';

const Login = () => {
    const { loginUser, wait, loggedInCheck } = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [visible, setIsVisible] = useState(false);

      

    

   
    const onChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();

        if (!Object.values(formData).every(val => val.trim() !== '')) {           
            setIsVisible(false);
            setErrMsg('Please Fill in all Required Fields!');
            setTimeout(function() {
                setIsVisible(true);
              }, 6000); 
            return;
        }

        const data = await loginUser(formData);
        if (data.success) {
            e.target.reset();
            setRedirect('Redirecting...');
            await loggedInCheck();
            return;
        }
        setIsVisible(false);
        setErrMsg(data.message);
        setTimeout(function() {
            setIsVisible(true);
          }, 6000);
    }


    return (
        <div className="selection:bg-rose-500 selection:text-white">

            <div className="min-h-screen bg-rose-100 flex justify-center items-center">
                <div className="p-4 flex-1">
                    <div className="w-80 bg-white rounded-3xl mx-auto overflow-hidden shadow-xl">
                        <div className="relative h-48 bg-rose-500 rounded-bl-4xl">
                            <svg className="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                <path fill="#ffffff" fill-opacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        </div>
                        <div className="px-10 pt-4 pb-8 bg-white rounded-tr-4xl">
                            <h1 className="text-2xl font-semibold text-gray-900">Sign In!</h1>
                            <form className="mt-12" onSubmit={submitForm} autocomplete="off" novalidate="novalidate">
                            {!visible && errMsg && <div  id="invalid"><div className="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3 mb-5" role="alert"><svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg><p className="font-bold">{errMsg}</p></div></div>}

                                <div className="relative">
                                    <input id="email" name="email" type="text" value={formData.email} onChange={onChangeInput} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="john@doe.com" />
                                    <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email address</label>
                                </div>
                                <div className="mt-5 relative">
                                    <input id="password" type="password" name="password" value={formData.password} onChange={onChangeInput}  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="Password" />
                                    <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                </div>
                                
                                {redirect ? redirect : <button type="submit" value="Sign in" disabled={wait} className="mt-10 px-4 py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer">Login</button>}
                               
                            </form>
                            <Link to="/signup" className="mt-4 block text-sm text-center font-medium text-rose-600 hover:underline focus:outline-none focus:ring-2 focus:ring-rose-500"> Register </Link>
                        </div>
                    </div>
                </div>
            </div>

          


        </div>
    )
}

export default Login;