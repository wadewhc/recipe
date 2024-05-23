import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../recipes.css';

const PlansPage = () => {
    const navigate = useNavigate();
    const [shouldFetch, setShouldFetch] = useState(true);
    const [sevenDays, setSevenDays] = useState([]);

    const [breakfastRecipe, updateBreakfastRecipe] = useState(null);
    const [lunchRecipe, updateLunchRecipe] = useState(null);
    const [dinnerRecipe, updateDinnerRecipe] = useState(null);
    const [reload, setReload] = useState(false);

    const buttonRef = useRef(null);

    function fresh() {
        navigate('/plans');
    }

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


    const [mealplans, setMealplans] = useState([]);
    const [validPlans, setValidPlans] = useState([]);


    const [recipes, setRecipes] = useState();
    const [shouldFetchRecipe, setShouldFetchRecipe] = useState(true);


    const [dataFromDB1, setDataFromDB1] = useState(null);
    const [dataFromDB2, setDataFromDB2] = useState(null);
    const [dataFromDB3, setDataFromDB3] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recipesDictionary, setRecipesDictionary] = useState(null);

    const fetchData = async () => {

        if (shouldFetch) {
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


                const db1Data = await fetch('/api/checkdefault7days')
                    .then(response => {
                        if (!response.ok) throw new Error('1 Network response was not ok.');
                        return response.json();
                    });
                setDataFromDB1(db1Data);
                // setShouldFetch(false);

                let unexistdates = [];
                let db2Data = null;
                const temp = Object.values(db1Data)[0];


                if (temp.length !== 0) {
                    // unexistdates = db1Data.results[0].date;
                    const unexistdates = db1Data.results.map(dateDict => dateDict.date);
                    // console.log("unexistdates: ", unexistdates);
                    if (unexistdates.length !== 0) {
                        db2Data = await fetch('/api/createdefault7days', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ day_list: unexistdates })

                        })
                            .then(response => {
                                if (!response.ok) throw new Error('2 Network response was not ok.');
                                return response.json();
                            });

                        setDataFromDB2(db2Data);
                        // console.log("db2Data: ", db2Data.results);
                    }
                };



                // Fetch from the third database, might depend on second fetch
                const db3Data = await fetch('/api/mealplans').then(res => {
                    if (!res.ok) throw new Error('Failed to fetch from database 3');
                    return res.json();
                }).then(data => {
                    const valid_data = data.data.filter(mealplan => sevenDays.includes(mealplan.date));
                    setValidPlans(valid_data);
                    return valid_data;
                });

                setDataFromDB3(db3Data);





            }
            catch (error) {
                if (error.message.includes("1 Network response was not ok")) {
                    // Log and ignore
                    console.log("Ignoring specific error:", error);
                } else {
                    setError(error); // Re-throw errors that are not to be ignored
                }

            } finally {
                setLoading(false);
                // setShouldFetch(false);
            }

        }
    };

    useEffect(() => { fetchData() }, [reload]);


    const [selectedDate, setSelectedDate] = useState(null);
    const [todayMealIDs, setTodayMealIds] = useState([]);
    const [selectedBreakfast, setSelectedBreakfast] = useState([]);
    const [selectedLunch, setSelectedLunch] = useState([]);
    const [selectedDinner, setSelectedDinner] = useState([]);



    const handleSelectDate = (date, breakfast, lunch, dinner) => {
        setSelectedDate(date);
        setTodayMealIds([breakfast, lunch, dinner]);
        setSelectedBreakfast([breakfast]);
        setSelectedLunch([lunch]);
        setSelectedDinner([dinner]);

    };

    if (loading) return (<div><progress className="progress is-small is-primary" max="100">Loading</progress></div>)
    if (error) return <p>Error loading data: {error.message}</p>;



    const handleChangeBreakfast = async () => {
        // const id = todo._id;

        let payload = { date: selectedDate, meals: {} };
        // if (breakfastRecipe !== null) {
        payload.meals.breakfast = breakfastRecipe;


        const response = await fetch(`/api/update/mealplan`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (response.status === 200) {
            console.log('Success:', data.message);

            setReload(prev => !prev);

            setSelectedBreakfast([data.message.meals.breakfast]);

        } else {
            console.error('Error:', data.error);
        };

    };


    const handleChangeLunch = async () => {

        let payload = { date: selectedDate, meals: {} };
        payload.meals.lunch = lunchRecipe;

        const response = await fetch(`/api/update/mealplan`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (response.status === 200) {
            console.log('Success:', data.message);

            setReload(prev => !prev);
            setSelectedLunch([data.message.meals.lunch]);

        } else {
            console.error('Error:', data.error);

        };
    };

    const handleChangeDinner = async () => {

        let payload = { date: selectedDate, meals: {} };
        payload.meals.dinner = dinnerRecipe;

        const response = await fetch(`/api/update/mealplan`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (response.status === 200) {
            console.log('Success:', data.message);

            setReload(prev => !prev);
            setSelectedDinner([data.message.meals.dinner]);
            // handleSelectDate(data.message.date, data.message.meals.breakfast, data.message.meals.lunch, data.message.meals.dinner);
        } else {
            console.error('Error:', data.error);
            // alert(`Failed to update meal plan: ${data.error}`);
        };
    };

    return (
        <div className="columns">

            <div className="column is-one-fifth" style={{ overflowY: 'auto', height: '788px' }}>


                {validPlans.map((plan, index) => (

                    <div key={plan.id} className={`box box-plan ${selectedDate === plan.date ? 'is-selected' : ''}`} ref={buttonRef} onClick={() => handleSelectDate(plan.date, plan.meals.breakfast, plan.meals.lunch, plan.meals.dinner)}>
                        <h3><strong>{plan.date}</strong></h3>
                        <div key="breakfast">
                            <div className="columns is-multiline">
                                <div className="column is-one-third" key="breakfast"><i><strong>Breakfast:</strong></i></div>
                
                                <div className="column is-two-thirds" key="breakfastplan">
                                    {plan.meals.breakfast === null ? <p>No plan</p> :
                                        (recipes.find(recipe => recipe._id === plan.meals.breakfast) ?
                                            <p>{recipes.find(recipe => recipe._id === plan.meals.breakfast)?.name}</p> :
                                            (() => { plan.meals.breakfast = null; return <p>No plan</p>; })()
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div key="lunch">
                            <div className="columns is-multiline">
                                <div className="column is-one-third" key="lunch"><i><strong>Lunch:</strong></i></div>
                                <div className="column is-two-thirds" key="lunchplan">
                                    {plan.meals.lunch === null ? <p>No plan</p> :
                                        (recipes.find(recipe => recipe._id === plan.meals.lunch) ?
                                            <p>{recipes.find(recipe => recipe._id === plan.meals.lunch)?.name}</p> :
                                            (() => { plan.meals.lunch = null; return <p>No plan</p>; })()
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div key="dinner">
                            <div className="columns is-multiline">
                                <div className="column is-one-third" key="dinner"><i><strong>Dinner:</strong></i></div>
                                <div className="column is-two-thirds" key="dinnerplan">
                                    {plan.meals.dubber === null ? <p>No plan</p> :
                                        (recipes.find(recipe => recipe._id === plan.meals.dinner) ?
                                            <p>{recipes.find(recipe => recipe._id === plan.meals.dinner)?.name}</p> :
                                            (() => { plan.meals.dinner = null; return <p>No plan</p>; })()
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                ))}

            </div>
            <div className="column recipe-selections">

                <h2 className="title is-3">Meal Plans with Recipes</h2>

                {selectedDate ? (
                    <div>
                        <h2>Selected Date: <strong>{selectedDate}</strong></h2>
                        <div className="columns is-multiline">
                            {selectedBreakfast[0] === null ?
                                (<div className="column is-one-third" key="recipeBreakfast">
                                    <h3><strong>Breakfast:</strong></h3>
                                    <p>No plan</p>
                                    <div class="content">
                                        <p>Please choose a recipe for this meal using the dropdown below:</p>
                                    </div>

                                    <div>
                                        {recipes.length > 0 && (
                                            <div class="columns">
                                                <div class="column is-8">
                                                    <div class="select-save-container">
                                                        <div class="select is-primary is-small">
                                                            <select id="recipe-select" onChange={e => updateBreakfastRecipe(e.target.value)}>
                                                            <option>Select a recipe</option>
                                                                {recipes.map((rec) => (
                                                                    <option key={rec._id} value={rec._id}>
                                                                        {rec.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <button class='button is-primary is-outlined is-small save' onClick={handleChangeBreakfast}>Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </div>) :
                                (recipes
                                    .filter((recipe) => selectedBreakfast.includes(recipe._id))
                                    .map((recipe) => (
                                        <div className="column is-one-third" key={recipe._id}>
                                            <h3><strong>Breakfast:</strong></h3>
                                            <div className="card">
                                                <div className="card-image">
                                                    <figure className="image is-4by3">
                                                        <img src={recipe.pictureUrl} alt={recipe.name} onClick={() => navigate('/aboutrecipe/' + recipe._id)} />
                                                    </figure>
                                                </div>
                                                <div className="card-content">
                                                    {/* <p className="title is-5 has-text-centered">{recipe.name}</p> */}
                                                    <div class="column is-12">
                                                        <div class="select is-primary">
                                                            <select id="recipe-select" className="title has-text-centered" defaultValue={selectedBreakfast} onChange={e => updateBreakfastRecipe(e.target.value)}>

                                                                {recipes.map((rec) => (
                                                                    <option key={rec._id} value={rec._id} selected={selectedBreakfast === rec._id}>
                                                                        {rec.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div class="column is-12" style={{ "textAlign": "center" }}>
                                                            <button class='button is-primary is-outlined is-small' onClick={handleChangeBreakfast}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                  
                                        </div>
                                    )))}
                            {selectedLunch[0] === null ?
                                (<div className="column is-one-third" key="recipeLunch">
                                    <h3><strong>Lunch:</strong></h3>
                                    <p>No plan</p>
                                    <div class="content">
                                        <p>Please choose a recipe for this meal using the dropdown below:</p>
                                    </div>

                                    <div>
                                    {recipes.length > 0 && (
                                        <div class="columns">
                                            <div class="column is-8">
                                                <div class="select-save-container">
                                                    <div class="select is-primary is-small">
                                                        <select id="recipe-select" onChange={e => updateLunchRecipe(e.target.value)}>
                                                        <option>Select a recipe</option>
                                                            {recipes.map((rec) => (
                                                                <option key={rec._id} value={rec._id}>
                                                                    {rec.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <button class='button is-primary is-outlined is-small save' onClick={handleChangeLunch}>Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    </div>
                                </div>
                                ) :
                                (recipes
                                    .filter((recipe) => selectedLunch.includes(recipe._id))
                                    .map((recipe) => (
                                        <div className="column is-one-third" key={recipe._id}>
                                            <h3><strong>Lunch:</strong></h3>
                                            <div className="card">
                                                <div className="card-image">
                                                    <figure className="image is-4by3">
                                                        <img src={recipe.pictureUrl} alt={recipe.name} onClick={() => navigate('/aboutrecipe/' + recipe._id)} />
                                                    </figure>
                                                </div>
                                                <div className="card-content">
                                                    <div class="column is-12">
                                                        <div class="select is-primary">
                                                            <select id="recipe-select" className="title has-text-centered" defaultValue={selectedLunch} onChange={e => updateLunchRecipe(e.target.value)}>

                                                                {recipes.map((rec) => (
                                                                    <option key={rec._id} value={rec._id} selected={selectedLunch === rec._id}>
                                                                        {rec.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div class="column is-12" style={{ "textAlign": "center" }}>
                                                            <button class='button is-primary is-outlined is-small' onClick={handleChangeLunch}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )))}
                            {selectedDinner[0] === null ?
                                (<div className="column is-one-third" key="recipeDinner">
                                    <h3><strong>Dinner:</strong></h3>
                                    <p>No plan</p>
                                    <div class="content">
                                        <p>Please choose a recipe for this meal using the dropdown below:</p>
                                    </div>

                                    <div>
                                    {recipes.length > 0 && (
                                        <div class="columns">
                                            <div class="column is-8">
                                                <div class="select-save-container">
                                                    <div class="select is-primary is-small">
                                                        <select id="recipe-select" onChange={e => updateDinnerRecipe(e.target.value)}>
                                                        <option>Select a recipe</option>
                                                            {recipes.map((rec) => (
                                                                <option key={rec._id} value={rec._id}>
                                                                    {rec.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <button class='button is-primary is-outlined is-small save' onClick={handleChangeDinner}>Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div class="content">
                                        <p> </p>
                                    </div>
                                    <div class="content">
                                        &nbsp;
                                    </div>
    
                                    </div></div>) :
                                (recipes
                                    .filter((recipe) => selectedDinner.includes(recipe._id))
                                    .map((recipe) => (
                                        <div className="column is-one-third" key={recipe._id}>
                                            <h3><strong>Dinner:</strong></h3>
                                            <div className="card">
                                                <div className="card-image">
                                                    <figure className="image is-4by3">
                                                        <img src={recipe.pictureUrl} alt={recipe.name} onClick={() => navigate('/aboutrecipe/' + recipe._id)} />
                                                    </figure>
                                                </div>
                                                <div className="card-content">
                                                    {/* <p className="title is-5 has-text-centered">{recipe.name}</p> */}
                                                    <div class="column is-12">
                                                        <div class="select is-primary">
                                                            <select id="recipe-select" className="title has-text-centered" defaultValue={selectedDinner} onChange={e => updateDinnerRecipe(e.target.value)}>

                                                                {recipes.map((rec) => (
                                                                    <option key={rec._id} value={rec._id} selected={selectedDinner === rec._id}>
                                                                        {rec.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div class="column is-12" style={{ "textAlign": "center" }}>
                                                            <button class='button is-primary is-outlined is-small' onClick={handleChangeDinner}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2>No Date Selected -- Please select a date in the left.</h2>
                    </div>
                )
                }
        

            </div >


        </div >
    );
};

export default PlansPage;
