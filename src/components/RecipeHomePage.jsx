import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../recipes.css';
import backgroundImage from '../images/recipeHome.jpeg';

const RecipeHomePage = () => {
    const [recipes, setRecipes] = useState([{}]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true)

    const fetchRecipes = async () => {
        const response = await fetch('/api/recipes');
        const data = await response.json();
        setRecipes(data.data);
        setLoading(false)
    };
    useEffect(() => { fetchRecipes(); }, []);


    const tags = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Fast Food', 'Vegan', 'Desserts', 'Salads', 'Seafood', 'Italian Cuisine', 'Beverages']
    // State for the active tag
    const [activeTag, setActiveTag] = useState('All');


    const navigate = useNavigate();

    const goToCreateRecipe = () => {
        navigate('/createrecipe');
    };

    const handleSearchChange = async (event) => {
        const input = event.target.value;
        setSearchTerm(input);
    };


    if (loading) {
        return (<div><progress className="progress is-small is-primary" max="100">Loading</progress></div>)
    };

    return (
        <section className="hero is-fullheight-with-navbar" style={{ 
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5)), url(${backgroundImage})`, 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat' 
        }}>
        <div>
            <div className="tabs">
                <ul>
                    {tags.map((tag) => (
                        <li
                            key={tag}
                            className={activeTag === tag ? 'is-active' : ''}
                            onClick={() => setActiveTag(tag)}
                        >
                            <a>{tag}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="field" style={{ width: '70%' }}>
                    <p className="control has-icons-left">
                        <input
                            className="input"
                            type="search"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <div className='icon-text'>
                            <span className="is-left">
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                    </p>
                </div>
                <button className="button is-primary" style={{ marginBottom: '10px', marginLeft: '10px', height:'100%' }} onClick={goToCreateRecipe}>
                    + Create Recipe
                </button>
            </div>

            <div className="columns is-multiline card-container">
                {recipes
                    .filter((recipe) => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .filter((recipe) => activeTag === 'All' || recipe.tag.includes(activeTag))
                    .map((recipe) => (
                        <div className="column is-one-fifth" key={recipe._id}>
                            <div className="card">
                                <div className="card-image">
                                    {/* Placeholder for recipe image */}
                                    <figure className="image is-4by3">
                                        <img src={recipe.pictureUrl} alt={recipe.name} onClick={() => navigate('/aboutrecipe/' + recipe._id)} />
                                        {/* <img src={recipe.pictureUrl} alt={recipe.name} onClick={() => navigate(`/aboutrecipe/${encodeURIComponent(recipe.name)}`)} /> */}
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <p className="title is-5 has-text-centered">{recipe.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
        </section>
    );
};

export default RecipeHomePage;