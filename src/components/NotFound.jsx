import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/main_background.jpeg'


const NotFound = ({ user }) => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/userhome');
    };

    return (
        <section className="hero is-fullheight-with-navbar" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <div className="hero-body">
                <div className="container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', padding: '50px' }} >
                    <div className="columns is-centered">
                        <div className="column is-half has-text-centered">
                            <h1 className="title">404 - Not Found</h1>
                            <p className="subtitle">Oops, the page you are looking for does not exist</p>
                            <button className="button is-primary" onClick={goToHome}>Go back to Home</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
