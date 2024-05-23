import React, { useState, useEffect } from 'react';
import backgroundImage from '../images/shoppinglist_background.jpeg';
import '../recipes.css';

function UserHomePage() {
    const isMobile = window.innerWidth <= 767;

    const [shoppingList, setShoppingList] = useState();
    const [showAddItemForm, setShowAddItemForm] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [editItem, setEditItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [validPlans, setValidPlans] = useState([]);
    const [recipes, setRecipes] = useState();
    const [loading2, setLoading2] = useState(true);
    const [error, setError] = useState(null);
    const [sevenDays, setSevenDays] = useState([]);


    const oneDayTime = 24 * 60 * 60 * 1000;
    const now = new Date();
    const nowTime = now.getTime(); //+83


    const get7Days = () => {
        for (let i = 0; i < 15; i++) {
            const ShowTime = nowTime + i * oneDayTime;
            const myDate = new Date(ShowTime);
            const save_date = myDate.toISOString().split('T')[0];

            if (!sevenDays.includes(save_date)) {
                sevenDays.push(save_date);
            }
        }
    };

    useEffect(() => {
        console.log('isMobile: ', isMobile)
        const fetchData = async () => {

            get7Days();

            try {

                // Fetch from the first database
                const db4Data = await fetch('/api/recipes').then(res => {
                    if (!res.ok) throw new Error('Failed to fetch from database 4');
                    return res.json();
                })
                    .then(data => {
                        setRecipes(data.data);

                    });


                // Fetch from the third database, might depend on second fetch
                const db3Data = await fetch('/api/mealplans').then(res => {
                    if (!res.ok) throw new Error('Failed to fetch from database 3');
                    return res.json();
                }).then(data => {
                    const valid_data = data.data.filter(mealplan => sevenDays.includes(mealplan.date));
                    setValidPlans(valid_data);
                    return valid_data;
                });

                setLoading(true);
                const response = await fetch('/api/shopping-list');
                const data = await response.json();
                setShoppingList(data);
                setLoading(false);

            }
            catch (error) {
                if (error.message.includes("1 Network response was not ok")) {
                    // Log and ignore
                    console.log("Ignoring specific error:", error);
                } else {
                    setError(error);
                }

            } finally {
                setLoading2(false);
            }

        };
        fetchData();
    }, []);

    const fetchShoppingList = async () => {
        setLoading(true);
        const response = await fetch('/api/shopping-list');
        const data = await response.json();
        setShoppingList(data);
        setLoading(false);
    };

    const handleAddOrUpdateItem = async (e) => {
        e.preventDefault();
        const item = e.target.item.value;
        const quantity = e.target.quantity.value;

        if (editItem) {
            // Update existing item
            const response = await fetch(`/api/shopping-list/${editItem._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item, quantity })
            });
            if (response.ok) {
                fetchShoppingList();
                setEditItem(null);
            }
        } else {
            // Add new item
            const response = await fetch('/api/shopping-list', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item, quantity })
            });
            if (response.ok) {
                const newItem = await response.json();
                setShoppingList([...shoppingList, newItem]);
            }
        }
        setShowAddItemForm(false);
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setShowAddItemForm(true);
        setActiveDropdown(null);
    };

    const handleDelete = async (id) => {
        const response = await fetch(`/api/shopping-list/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            setShoppingList(shoppingList.filter(item => item._id !== id));
            setActiveDropdown(null);
        }
    };

    if (shoppingList === undefined) {
        return (<div><progress className="progress is-small is-primary" max="100">Loading</progress></div>)
    }

    return (
        <section className="hero is-fullheight-with-navbar" style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
            <div className="container" style={{ marginBottom: '5vw' }}>
                <div className="columns">
                    {isMobile ? (
                        <div style={{ overflowX: 'auto', overflowY: 'hidden', whiteSpace: 'nowrap', marginLeft: '5vw', marginRight: '5vw' }}>
                            <h2 className="title is-3 has-text-centered-touch meal-plans" style={{ marginTop: '5vw' }}>Meal Plans</h2>
                            <div className="is-flex" style={{ alignItems: 'start' }}>
                                {validPlans.map((plan, index) => (
                                    <div key={plan.id} className="box" style={{ display: 'inline-block', width: '50vw', marginRight: '1rem', verticalAlign: 'top' }}>
                                        <h3 className="has-text-centered-touch"><strong>{plan.date}</strong></h3>
                                        <div >
                                            <div key="breakfast">
                                                <i><strong>Breakfast:</strong></i>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                    {plan.meals.breakfast === null ? (
                                                        <div>
                                                            <p className="has-text-centered">No plan</p>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {recipes.find(recipe => recipe._id === plan.meals.breakfast) ? (
                                                                <>
                                                                    <p className="has-text-centered">{recipes.find(recipe => recipe._id === plan.meals.breakfast)?.name}</p>
                                                                    <figure className="image" style={{ width: '160px', height: '120px' }}>
                                                                        <img src={recipes.find(recipe => recipe._id === plan.meals.breakfast)?.pictureUrl} alt="Meal Image" style={{ width: '160px', height: '120px', objectFit: 'cover' }} />
                                                                    </figure>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <p className="has-text-centered">No plan</p>
                                                                    {plan.meals.breakfast = null}
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                            </div>

                                            <div key="lunch">
                                                <i><strong>Lunch:</strong></i>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                    {plan.meals.lunch === null ? (
                                                        <div>
                                                            <p className="has-text-centered">No plan</p>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {recipes.find(recipe => recipe._id === plan.meals.lunch) ? (
                                                                <>
                                                                    <p className="has-text-centered">{recipes.find(recipe => recipe._id === plan.meals.lunch)?.name}</p>
                                                                    <figure className="image" style={{ width: '160px', height: '120px' }}>
                                                                        <img src={recipes.find(recipe => recipe._id === plan.meals.lunch)?.pictureUrl} alt="Meal Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                    </figure>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <p className="has-text-centered">No plan</p>
                                                                    {plan.meals.lunch = null}
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                            </div>

                                            <div key="dinner">
                                                <i><strong>Dinner:</strong></i>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                    {plan.meals.dinner === null ? (
                                                        <div>
                                                            <p className="has-text-centered">No plan</p>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {recipes.find(recipe => recipe._id === plan.meals.dinner) ? (
                                                                <>
                                                                    <p className="has-text-centered">{recipes.find(recipe => recipe._id === plan.meals.dinner)?.name}</p>
                                                                    <figure className="image" style={{ width: '160px', height: '120px' }}>
                                                                        <img src={recipes.find(recipe => recipe._id === plan.meals.dinner)?.pictureUrl} alt="Meal Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                    </figure>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <p className="has-text-centered">No plan</p>
                                                                    {plan.meals.dinner = null}
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="column" style={{ overflowY: 'auto', height: '100vh' }}>
                            <h2 className="title is-3 has-text-centered-touch meal-plans">Meal Plans</h2>
                            {validPlans.map((plan, index) => (
                                <div key={plan.id} className="box box-home" style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>
                                    <h3 className="has-text-centered-touch"><strong>{plan.date}</strong></h3>
                                    <div className="columns is-multiline">
                                        <div className="column is-one-third" key="breakfast">
                                            <i><strong>Breakfast:</strong></i>
                                            {plan.meals.breakfast === null
                                                ? (<div>
                                                    <p className="has-text-centered">No plan</p></div>) :
                                                (<div>
                                                    {recipes.find(recipe => recipe._id === plan.meals.breakfast) ? (
                                                        <>
                                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                <p className="has-text-centered">{recipes.find(recipe => recipe._id === plan.meals.breakfast)?.name}</p>
                                                                <figure className="image is-square" style={{ width: '70%', height: '70%' }}>
                                                                    <img src={recipes.find(recipe => recipe._id === plan.meals.breakfast)?.pictureUrl} />
                                                                </figure>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className="has-text-centered">No plan</p>
                                                            {plan.meals.breakfast = null}
                                                        </>
                                                    )}
                                                </div>)}
                                        </div>

                                        <div className="column is-one-third" key="lunch">
                                            <i><strong>Lunch:</strong></i>
                                            {plan.meals.lunch === null
                                                ? (<div>
                                                    <p className="has-text-centered">No plan</p></div>) :
                                                (<div>
                                                    {recipes.find(recipe => recipe._id === plan.meals.lunch) ? (
                                                        <>
                                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                <p className="has-text-centered">{recipes.find(recipe => recipe._id === plan.meals.lunch)?.name}</p>
                                                                <figure className="image is-square" style={{ width: '70%', height: '70%' }}>
                                                                    <img src={recipes.find(recipe => recipe._id === plan.meals.lunch)?.pictureUrl} />
                                                                </figure>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className="has-text-centered">No plan</p>
                                                            {plan.meals.lunch = null}
                                                        </>
                                                    )}
                                                </div>)}
                                        </div>

                                        <div className="column is-one-third" key="dinner">
                                            <i><strong>Dinner:</strong></i>
                                            {plan.meals.dinner === null
                                                ? (<div>
                                                    <p className="has-text-centered">No plan</p></div>) :
                                                (<div>
                                                    {recipes.find(recipe => recipe._id === plan.meals.dinner) ? (
                                                        <>
                                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                <p className="has-text-centered">{recipes.find(recipe => recipe._id === plan.meals.dinner)?.name}</p>
                                                                <figure className="image is-square" style={{ width: '70%', height: '70%' }}>
                                                                    <img src={recipes.find(recipe => recipe._id === plan.meals.dinner)?.pictureUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                </figure>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className="has-text-centered">No plan</p>
                                                            {plan.meals.dinner = null}
                                                        </>
                                                    )}
                                                </div>)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {isMobile ? (
                        <div className="column" style={{ overflowX: 'auto', whiteSpace: 'nowrap', marginRight: '5vw' }}>
                            <div className="is-flex is-justify-content-space-between">
                                <h2 className="title is-3 has-text-centered-touch" style={{ marginTop: '1vw', marginLeft: '0.5rem' }}>Shopping list</h2>
                                <button className="button is-info is-light"
                                    style={{ marginLeft: 'auto', marginTop: '1vw', marginBottom: '1vw', marginRight: '0.5rem' }}
                                    onClick={() => { setEditItem(null); setShowAddItemForm(true); }}>
                                    ➕
                                </button>
                            </div>
                            {showAddItemForm && (
                                <div style={{ marginBottom: '1vw' }}>
                                    <form onSubmit={handleAddOrUpdateItem}>
                                        <div className="field is-grouped">
                                            <p className="control is-expanded">
                                                <input className="input" type="text" name="item" defaultValue={editItem ? editItem.item : ''} placeholder="Item" required />
                                            </p>
                                            <p className="control is-expanded">
                                                <input className="input" type="text" name="quantity" defaultValue={editItem ? editItem.quantity : ''} placeholder="Quantity" required />
                                            </p>
                                            <p className="control">
                                                <button className="button is-success" type="submit">{editItem ? 'Update' : 'Add'}</button>
                                            </p>
                                            <p className="control">
                                                <button className="button is-light" type="button" onClick={() => { setEditItem(null); setShowAddItemForm(false); }}>Cancel</button>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            )}
                            <div className="is-flex" style={{ alignItems: 'start', marginLeft: '2vw', marginRight: '2vw' }}>
                                {shoppingList.map((item, index) => (
                                    <div key={index} className="box" style={{ display: 'inline-block', width: '90vw', marginRight: '1rem', verticalAlign: 'top' }}>
                                        <div className="level">
                                            <div className="level-left">
                                                <div className="level-item">
                                                    <div style={{ flexGrow: 1, textOverflow: 'ellipsis' }}>
                                                        <p><strong>{item.item}</strong></p>
                                                        <p>{item.quantity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="level-right">
                                                <div className="level-item">
                                                    <div className={`dropdown is-up ${activeDropdown === index ? 'is-active' : ''} is-hoverable`}>
                                                        <div className="dropdown-trigger">
                                                            <button className="button" aria-haspopup="true" aria-controls={`dropdown-menu-${index}`}>
                                                                <span>...</span>
                                                            </button>
                                                        </div>
                                                        <div className="dropdown-menu" id={`dropdown-menu-${index}`} role="menu">
                                                            <div className="dropdown-content" style={{ width: '65px' }}>
                                                                <button className="button is-white dropdown-item" onClick={() => handleEdit(item)}>
                                                                    Edit
                                                                </button>
                                                                <button className="button is-white dropdown-item" onClick={() => handleDelete(item._id)}>
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="column" style={{ overflowY: 'auto', height: '100vh' }}>
                            <div className="is-flex is-justify-content-space-between">
                                <h2 className="title is-3 has-text-centered-touch" style={{ marginTop: '1vw', marginLeft: '0.5rem' }}>Shopping list</h2>
                                <button className="button is-info is-light"
                                    style={{ marginLeft: 'auto', marginTop: '1vw', marginBottom: '1vw', marginRight: '0.5rem' }}
                                    onClick={() => { setEditItem(null); setShowAddItemForm(true); }}>
                                    ➕
                                </button>
                            </div>
                            {showAddItemForm && (
                                <div className="box">
                                    <form onSubmit={handleAddOrUpdateItem}>
                                        <div className="field is-grouped">
                                            <p className="control is-expanded">
                                                <input className="input" type="text" name="item" defaultValue={editItem ? editItem.item : ''} placeholder="Item" required />
                                            </p>
                                            <p className="control is-expanded">
                                                <input className="input" type="text" name="quantity" defaultValue={editItem ? editItem.quantity : ''} placeholder="Quantity" required />
                                            </p>
                                            <p className="control">
                                                <button className="button is-success" type="submit">{editItem ? 'Update' : 'Add'}</button>
                                            </p>
                                            <p className="control">
                                                <button className="button is-light" type="button" onClick={() => { setEditItem(null); setShowAddItemForm(false); }}>Cancel</button>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            )}
                            <div className="columns is-multiline">
                                {shoppingList.map((item, index) => (
                                    <div key={index} className="column is-half">
                                        <div className="box" style={{ margin: '0.5rem' }}>
                                            <div className="level">
                                                <div className="level-left">
                                                    <div className="level-item">
                                                        <div style={{ flexGrow: 1, maxWidth: '12vw', textOverflow: 'ellipsis' }}>
                                                            <p><strong>{item.item}</strong></p>
                                                            <p>{item.quantity}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="level-right">
                                                    <div className="level-item">
                                                        <div className={`dropdown is-up ${activeDropdown === index ? 'is-active' : ''} is-hoverable`}>
                                                            <div className="dropdown-trigger">
                                                                <button className="button" aria-haspopup="true" aria-controls={`dropdown-menu-${index}`}>
                                                                    <span>...</span>
                                                                </button>
                                                            </div>
                                                            <div className="dropdown-menu" id={`dropdown-menu-${index}`} role="menu">
                                                                <div className="dropdown-content" style={{ width: '65px' }}>
                                                                    <button className="button is-white dropdown-item" onClick={() => handleEdit(item)}>
                                                                        Edit
                                                                    </button>
                                                                    <button className="button is-white dropdown-item" onClick={() => handleDelete(item._id)}>
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    )}

                </div>
            </div>
        </section >
    );
}

export default UserHomePage;