import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import backgroundImage from '../images/aboutRecipe.jpeg'
import EditRecipeForm from './EditRecipeForm'

const AboutRecipePage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [theName, setTheName] = useState('');
    const [theTag, setTheTag] = useState([]);
    const [theImage, setTheImage] = useState('');
    const [theIngredients, setTheIngredients] = useState([]);
    const [theSteps, setTheSteps] = useState([]);

    const [shoppingList, setShoppingList] = useState();
    // const [showAddItemForm, setShowAddItemForm] = useState(false);
    // const [activeDropdown, setActiveDropdown] = useState(null);
    // const [editItem, setEditItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [buttonClick, setButton] = useState(false);

    const [recipeAnalysis, setRecipeAnalysis] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [triggerReload, setTriggerReload] = useState(false);

    // useEffect(() => {
    //     fetch(`/api/recipe/${id}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setRecipe(data);
    //             // console.log("data:", data);
    //             // console.log("typeof data:", typeof data);
    //             setLoading(false);
    //             setTheName(data.name);
    //             setTheTag(data.tag);
    //             setTheImage(data.pictureUrl);
    //             setTheIngredients(data.ingredients);
    //             setTheSteps(data.steps);

    //         })
    //         .catch(err => {
    //             console.error("Failed to fetch recipe:", err);
    //             setError(err);
    //             setLoading(false);
    //         });
    // // }, [id]);
    // // }, [recipe, id]);
    // }, [id, triggerReload]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/recipe/${id}`);
                if (!response.ok) throw new Error('Failed to fetch recipe');
                const data = await response.json();
                setRecipe(data);
                setLoading(false);
                setTheName(data.name);
                setTheTag(data.tag);
                setTheImage(data.pictureUrl);
                setTheIngredients(data.ingredients);
                setTheSteps(data.steps);
            } catch (err) {
                console.error("Failed to fetch recipe:", err);
                setError(err);
                setLoading(false);
            }
        };
        fetchData();
    }, [id, triggerReload]);

    // const fetchOneRecipe = async () => {
    //     const response = await fetch('/api/recipe/' + id);
    //     const data = await response.json();
    //     setRecipe(data.data);
    //     console.log(JSON.stringify(data));
    // };
    // useEffect(() => { fetchOneRecipe(); }, []);


    // console.log(recipe);
    // console.log("name: ", theName);
    // console.log("tag: ", theTag);
    // console.log("image: ", theImage);
    // console.log("ingredients: ", theIngredients);
    // console.log("steps:", theSteps);

    const handleDeleteRecipe = async () => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                const response = await fetch(`/api/recipe/${id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Failed to delete the recipe');
                navigate('/recipehome');
            } catch (error) {
                console.error('Error deleting recipe:', error);
            }
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleUpdateRecipe = async (updatedRecipe) => {
        try {
            const response = await fetch(`/api/recipe/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedRecipe)
            });
            if (!response.ok) throw new Error('Failed to update the recipe');
            // const updatedData = await response.json();
            // setRecipe(updatedData);
            setIsEditing(false);
            setTriggerReload(!triggerReload);
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleAddOrUpdateItem = async (item, quantity) => {

        const response = await fetch('/api/shopping-list', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item, quantity })
        });
        if (response.ok) {
            const newItem = await response.json();
            // setShoppingList([...shoppingList, newItem]);
        }
        // }
        // setShowAddItemForm(false);
    };

    const handleFullRecipeAnalysis = async () => {
        const requestBody = {
            title: theName,
            ingr: theIngredients.map(ingredient => `${ingredient.quantity} ${ingredient.item}`),
        };

        const edamamApiUrl = 'https://api.edamam.com/api/nutrition-details';
        const appId = '9425875b';
        const appKey = '6b37f310df8123582deb31e3d771caaa';

        try {
            const response = await fetch(`${edamamApiUrl}?app_id=${appId}&app_key=${appKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            setButton(true);

            if (response.ok) {
                const data = await response.json();
                setRecipeAnalysis(data);

                console.log('Full recipe analysis:', data);
            } else {
                throw new Error('Failed to perform full recipe analysis');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    if (loading) {
        return <div><progress className="progress is-small is-primary" max="100">Loading</progress></div>;
    }

    return (
        <section className="hero is-fullheight-with-navbar" style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
            <div className="container">
                {/* <h2 className="title is-3">{getPathname()}</h2> */}
                {/* <h2 className="title is-3">{recipe.name}</h2> */}
                {/* <h2 className="title is-3" style={{ marginTop: '20px' }}>{theName}</h2> */}
                <div className="is-flex is-justify-content-space-between">
                    <h2 className="title is-3 has-text-centered-touch" style={{ marginTop: '1vw', marginLeft: '0.5rem' }}>{theName}</h2>
                    <button className="button is-info is-light"
                        style={{ marginLeft: 'auto', marginTop: '1vw' }}
                        onClick={() => { handleEdit() }}>
                        📝 Edit
                    </button>
                    <button className="button is-danger is-light"
                        style={{ marginLeft: '0.5rem', marginTop: '1vw' }}
                        onClick={handleDeleteRecipe}>
                        🗑 Delete
                    </button>
                </div>
                {isEditing ? (
                    <EditRecipeForm recipe={recipe} onSave={handleUpdateRecipe} onCancel={handleCancelEdit} />
                ) : (
                    <div className="columns">

                        <div className="column is-5">



                            <div className="table">
                                <table>
                                    <thead>
                                        <tr key="tags">
                                            {theTag.map(cat => (
                                                <th key={cat}>🏷️ {cat}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                </table>
                            </div>


                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img src={theImage} alt={theName} />
                                    </figure>
                                </div>
                            </div>



                            <div className="table">
                                <div className="field">
                                    <label className="label is-large">Ingredients</label>
                                </div>
                                <table className="table" style={{ tableLayout: 'fixed', width: '500px' }}>
                                    <thead>
                                        <tr style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            <th>Item</th>
                                            <th style={{ tableLayout: 'fixed', width: '160px' }}>Quantity</th>
                                            <th style={{ tableLayout: 'fixed', width: '140px' }}>Add ShopList</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {theIngredients.map(ingredient => (
                                            <tr key={ingredient.item} className='ingredientitem' style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {ingredient.item}
                                                </td>
                                                <td>
                                                    {ingredient.quantity}
                                                </td>
                                                <td>
                                                    <button className='button is-primary is-small' onClick={() => handleAddOrUpdateItem(ingredient.item, ingredient.quantity)}>Add</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        <div className="column is-1"></div>
                        <div className="column is-5">
                            <div>
                                <div className="field">
                                    <label className="label is-large">Cooking Steps</label>
                                </div>
                                <div className="table">
                                    <table className="table" style={{ tableLayout: 'fixed', width: '500px' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ tableLayout: 'fixed', width: '75px' }}>Steps</th>
                                                <th>Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {theSteps.map((step, index) => (
                                                <tr key={index} className='step'>
                                                    <th>
                                                        {index + 1}
                                                    </th>
                                                    <td>
                                                        {step}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div className="column is-5">
                                <button className="button is-primary" onClick={handleFullRecipeAnalysis}>
                                    Recipe Nutrient
                                </button>      
                                {buttonClick && recipeAnalysis !== null ?(
                                    <div>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Nutrient</th>
                                                    <th>Quantity</th>
                                                    <th>Unit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><b>Calories</b></td>
                                                    <td>{recipeAnalysis.calories.toFixed(0)}</td>
                                                    <td>kcal</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Fat</b></td>
                                                    <td>{recipeAnalysis.totalNutrients.FAT.quantity.toFixed(2)}</td>
                                                    <td>{recipeAnalysis.totalNutrients.FAT.unit}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Sugar</b></td>
                                                    <td>{recipeAnalysis.totalNutrients.SUGAR.quantity.toFixed(2)}</td>
                                                    <td>{recipeAnalysis.totalNutrients.SUGAR.unit}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Carbohydrates</b></td>
                                                    <td>{recipeAnalysis.totalNutrients.CHOCDF.quantity.toFixed(2)}</td>
                                                    <td>{recipeAnalysis.totalNutrients.CHOCDF.unit}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Protein</b></td>
                                                    <td>{recipeAnalysis.totalNutrients.PROCNT.quantity.toFixed(2)}</td>
                                                    <td>{recipeAnalysis.totalNutrients.PROCNT.unit}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Sodium</b></td>
                                                    <td>{recipeAnalysis.totalNutrients.NA.quantity.toFixed(2)}</td>
                                                    <td>{recipeAnalysis.totalNutrients.NA.unit}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    buttonClick && <p>There is something wrong with your ingredients. Please check both the spelling, quantity and measure.</p>
                                )}
                            </div>
                        </div>

                    </div>
                )}
            </div >
        </section>
    );


}

export default AboutRecipePage;