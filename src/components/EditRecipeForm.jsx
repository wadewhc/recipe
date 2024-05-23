import React, { useState, useEffect } from 'react';
import CloudinaryWidget from './CloudinaryWidget';
import { v4 as uuidv4 } from 'uuid';

const EditRecipeForm = ({ recipe, onSave, onCancel }) => {
    const [name, setName] = useState(recipe.name);
    const [ingredients, setIngredients] = useState(recipe.ingredients.map(ing => ({ ...ing, id: uuidv4() })));
    const [steps, setSteps] = useState(recipe.steps.map(step => ({ text: step, id: uuidv4() })));

    const [tags, setTags] = useState(recipe.tag || []);
    const [allTags, setAllTags] = useState([]);

    const [image, setImage] = useState(recipe.pictureUrl || '');
    const [cloudName] = useState("dzvggknvm");
    const [uploadPreset] = useState("ml_default");
    const [uwConfig] = useState({
        cloudName,
        uploadPreset,
        multiple: false,
    });

    useEffect(() => {
        fetch('/api/tags')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch tags');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.data) {
                    setAllTags(data.data.map(tag => tag.tag));
                }
            })
            .catch(error => console.error('Failed to fetch tags:', error));
    }, []);

    const handleIngredientChange = (id, field, value) => {
        const newIngredients = ingredients.map(ingredient =>
            ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
        );
        setIngredients(newIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { id: uuidv4(), item: '', quantity: '' }]);
    };

    const handleRemoveIngredient = (id) => {
        setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
    };

    const handleStepChange = (id, value) => {
        const newSteps = steps.map(step =>
            step.id === id ? { ...step, text: value } : step
        );
        setSteps(newSteps);
    };

    const handleAddStep = () => {
        setSteps([...steps, { id: uuidv4(), text: '' }]);
    };

    const handleRemoveStep = (id) => {
        setSteps(steps.filter(step => step.id !== id));
    };

    const handleTagChange = (tag) => {
        setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };

    const handleImageChange = (info) => {
        setImage(info.url);
    };

    const handleSave = () => {
        onSave({
            ...recipe,
            name,
            ingredients,
            steps: steps.map(step => step.text),
            tag: tags,
            pictureUrl: image
        });
    };

    return (
        <div className="box">
            <div className="field">
                <label className="label">Recipe Name</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
            </div>
            <div className="field">
                <label className="label">Tags</label>
                <div className="control">
                    {allTags.map((tag, index) => (
                        <label key={index} className="checkbox mr-2">
                            <input type="checkbox"
                                checked={tags.includes(tag)}
                                onChange={() => handleTagChange(tag)} />
                            {" " + tag}
                        </label>
                    ))}
                </div>
            </div>
            <div className="field">
                <label className="label">Recipe Picture</label>
                <div className="control">
                    <CloudinaryWidget uwConfig={uwConfig} setImgInfo={handleImageChange}></CloudinaryWidget>
                    {image && <img src={image} alt="Recipe" className="image is-128x128" />}
                </div>
            </div>
            <div className="field">
                <label className="label">Ingredients</label>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="field has-addons">
                        <p className="control">
                            <input className="input" type="text" placeholder="Item" value={ingredient.item} onChange={(e) => handleIngredientChange(ingredient.id, 'item', e.target.value)} />
                        </p>
                        <p className="control">
                            <input className="input" type="text" placeholder="Quantity" value={ingredient.quantity} onChange={(e) => handleIngredientChange(ingredient.id, 'quantity', e.target.value)} />
                        </p>
                        <p className="control">
                            <button className="button is-danger" onClick={() => handleRemoveIngredient(ingredient.id)}>Remove</button>
                        </p>
                    </div>
                ))}
                <button className="button is-primary" onClick={handleAddIngredient}>Add Ingredient</button>
            </div>
            <div className="field">
                <label className="label">Steps</label>
                {steps.map((step, index) => (
                    <div key={index} className="field has-addons">
                        <p className="control is-expanded">
                            <input className="input" type="text" placeholder={`Step ${index + 1}`} value={step.text} onChange={(e) => handleStepChange(step.id, e.target.value)} />
                        </p>
                        <p className="control">
                            <button className="button is-danger" onClick={() => handleRemoveStep(step.id)}>Remove</button>
                        </p>
                    </div>
                ))}
                <button className="button is-primary" onClick={handleAddStep}>Add Step</button>
            </div>
            <div className="buttons">
                <button className="button is-success" onClick={handleSave}>Save Changes</button>
                <button className="button" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default EditRecipeForm;
