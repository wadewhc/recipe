import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import CloudinaryWidget from './CloudinaryWidget';
import backgroundImage from '../images/createRecipe.jpeg'
import '../recipes.css';

const CreateRecipePage = () => {
    const navigate = useNavigate();

    const [ingredients, setIngredients] = useState([{ id: 1, item: '', quantity: '' }]);
    const [steps, setSteps] = useState([{ id: 1, text: '' }]);
    const [ingredientsCount, setIngredientsCount] = useState(1);
    const [stepsCount, setStepsCount] = useState(1);

    const [name, setName] = useState("");
    // const [link, setLink] = useState("");

    // const [checkedTags, setCheckedTags] = useState([])
    // const checkedTags = [];

    const [checkedTags, setCheckedTags] = useState([]);
    const handleCheckboxChange = (tag, isChecked) => {
        if (isChecked) {
            setCheckedTags(prev => {
                if (!prev.includes(tag)) {
                    return [...prev, tag];
                }
                return prev;
            });
        } else {
            setCheckedTags(prev => prev.filter(t => t !== tag));
        }
        // console.log("CheckedTags: ", checkedTags);
    };

    const [tags, setTags] = useState([])

    const [imgInfo, setImgInfo] = useState({});
    const [cloudName] = useState("dzvggknvm");
    const [uploadPreset] = useState("ml_default");

    const [uwConfig] = useState({
        cloudName,
        uploadPreset,
        multiple: false,
    });

    const cld = new Cloudinary({ cloud: { cloudName } });

    const recipeImage = cld.image(imgInfo.public_id);

    const fetchDbAllTags = async () => {
        const response = await fetch('/api/tags');
        const data = await response.json();
        setTags(data.data);
    };
    useEffect(() => { fetchDbAllTags(); }, []);

    // console.log("db all tags:", tags);

    const handleCancel = () => {
        navigate('/recipehome');
    };



    const addIngredient = () => {
        setIngredients([...ingredients, { id: ingredientsCount + 1, item: '', quantity: '' }]);
        setIngredientsCount(ingredientsCount + 1)
    };

    const removeIngredient = (id) => {
        setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
    };

    const updateIngredient = (id, field, value) => {
        setIngredients(
            ingredients.map(ingredient =>
                ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
            )
        );
    };

    const addStep = () => {
        setSteps([...steps, { id: stepsCount + 1, text: '' }]);
        setStepsCount(stepsCount + 1)
    };

    const updateStep = (id, value) => {
        setSteps(
            steps.map(step => step.id === id ? { ...step, text: value } : step)
        );
    };

    const removeStep = (id) => {
        setSteps(steps.filter(step => step.id !== id));
    };

    // const checkTag = (value) => {
    //     checkedTags.push(value);
    //     // setSteps([...checkedTags, { tag: stepsCount + 1, text: '' }]);
    //     // setStepsCount(stepsCount + 1)
    // };

    const submitRecipe = async () => {
        const stepsText = steps.map(s => s.text)
        const ingredientsData = ingredients.map((i) => { return { item: i.item, quantity: i.quantity } })
        const payload = {
            name: name,
            steps: stepsText,
            pictureUrl: imgInfo.url ? imgInfo.url : 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Fluent_Emoji_flat_1f37d-fe0f.svg',
            ingredients: ingredientsData,
            tag: checkedTags
        }
        const res = await fetch('/api/createRecipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            navigate('/recipehome')
        }
    };

    return (
        <section className="hero is-fullheight-with-navbar" style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
            <div className="container">
                <h2 className="title is-3" style={{ marginLeft: '10px' }}>Create</h2>
                <div className="columns">
                    <div className="column">
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Tags</label>

                            <div className="control">

                                {tags.map((tag, index) => (

                                    <label key={tag.id} className="checkbox" style={{ width: '160px' }}>
                                        <input type="checkbox" onChange={e => handleCheckboxChange(tag.tag, e.target.checked)} />
                                        {"     " + tag.tag}
                                    </label>
                                ))}

                                {/* <input className="input" type="text" placeholder="Link" onChange={(e) => setLink(e.target.value)} /> */}
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Recipe Picture</label>
                            <p className="control">
                                <CloudinaryWidget uwConfig={uwConfig} setImgInfo={setImgInfo}></CloudinaryWidget>
                            </p>
                            <div style={{ width: "40%",  margin: "0 auto", marginTop:'10px'}}>
                                <AdvancedImage
                                    style={{ maxWidth: "100%" }}
                                    cldImg={recipeImage}
                                    plugins={[responsive(), placeholder()]}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Ingredients</label>
                            <p>Please enter the correct names and quantity.</p>
                            <p style={{ marginBottom: '10px' }}>If any of the ingredients is spelled wrong, the Recipe Nutrient will not work!</p>
                            {ingredients.map((ingredient, index) => (
                                <div key={ingredient.id} className="field has-addons">
                                    <p className="control">
                                        <button className="button" onClick={() => removeIngredient(ingredient.id)}>❌</button>
                                    </p>
                                    <p className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Item"
                                            value={ingredient.item}
                                            onChange={(e) => updateIngredient(ingredient.id, 'item', e.target.value)}
                                        />
                                    </p>
                                    <p className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Quantity"
                                            value={ingredient.quantity}
                                            onChange={(e) => updateIngredient(ingredient.id, 'quantity', e.target.value)}
                                        />
                                    </p>
                                </div>
                            ))}
                            <button className="button" onClick={addIngredient}>+ Add ingredient</button>
                        </div>
                    </div>

                    <div className="column">
                        <div className="field">
                            <label className="label">Steps</label>
                            {steps.map((step, index) => (
                                <div key={step.id} className="field has-addons">
                                    <p className="control">
                                        <button className="button" onClick={() => removeStep(step.id)}>❌</button>
                                    </p>
                                    <p className="control is-expanded">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder={`Step ${index + 1}`}
                                            value={step.text}
                                            onChange={(e) => updateStep(step.id, e.target.value)}
                                        />
                                    </p>
                                </div>
                            ))}
                            <button className="button" onClick={addStep}>+ Add Steps</button>
                        </div>
                    </div>
                </div>
                <div className='has-text-centered'>
                    <button className='button is-success' onClick={() => submitRecipe()} style={{ marginBottom: '10px', marginRight: '10px' }}>Finish</button>
                    <button className="button " onClick={handleCancel} style={{ marginBottom: '20px' }}>Cancel</button> 
                </div>
            </div>
        </section>
    );
};

export default CreateRecipePage;