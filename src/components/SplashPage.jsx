import React, { useEffect, useState } from 'react';
import backgroundImage from '../images/main_background.jpeg'

const SplashPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/.auth/me')
            .then(response => response.json())
            .then(data => {
                if (data.clientPrincipal) {
                    setUser(data.clientPrincipal);
                } else {
                    setUser(null);
                }
            })
            .catch(() => setUser(null));
    }, []);

    return (
        <section className="hero is-fullheight-with-navbar" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <div className="hero-body" style={{ margin: 'auto' }}>
                <div className="container has-text-centered" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', padding: '50px' }}>
                    <h1 className="title is-1" style={{ whiteSpace: 'nowrap' }}>
                        FoodieMate
                    </h1>
                    {user ? (
                        <div className="subtitle">👋 Welcome, Foodie! 🥳
                            <div>Create and find your recipes here!</div>
                        </div>
                    ) : (
                        <p className="subtitle">Create and find your recipes here!</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SplashPage;
