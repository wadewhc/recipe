const { app } = require('@azure/functions');
const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.AZURE_MONGO_DB;
const client = new MongoClient(uri);

const connectDb = async (collection) => {
    await client.connect();
    return client.db('FoodieMateDB').collection(collection);
};

const connectRecipes = async () => {
    await client.connect();
    return client.db('FoodieMateDB').collection('recipes');
};


// Get all shopping list items
app.http('getShoppingList', {
    methods: ['GET'],
    authLevel: 'function',
    route: 'shopping-list',
    handler: async (request, context) => {
        const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
        let token = null
        token = Buffer.from(headers, "base64");
        token = JSON.parse(token.toString());
        const userId = token.userId

        const collection = await connectDb('UserShoppingLists');
        const items = await collection.find({ userId }).toArray();
        await client.close();
        return {
            status: 200,
            jsonBody: items
        };
    }
});

// Add a new item to the shopping list
app.http('addShoppingListItem', {
    methods: ['POST'],
    authLevel: 'function',
    route: 'shopping-list',
    handler: async (request, context) => {
        const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
        let token = null
        token = Buffer.from(headers, "base64");
        token = JSON.parse(token.toString());
        const userId = token.userId

        const { item, quantity } = await request.json();
        const collection = await connectDb('UserShoppingLists');
        const result = await collection.insertOne({ userId, item, quantity });
        await client.close();
        return {
            status: 201,
            jsonBody: { _id: result.insertedId, item, quantity }
        };
    }
});

// Update an existing shopping list item 
app.http('updateShoppingListItem', {
    methods: ['PUT'],
    authLevel: 'function',
    route: 'shopping-list/{id}',
    handler: async (request, context) => {
        const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
        let token = null
        token = Buffer.from(headers, "base64");
        token = JSON.parse(token.toString());
        const userId = token.userId

        const { id } = request.params;
        const { item, quantity } = await request.json();
        const collection = await connectDb('UserShoppingLists');
        const result = await collection.updateOne(
            { _id: new ObjectId(id), userId },
            { $set: { item, quantity } }
        );
        await client.close();
        return {
            status: result.matchedCount > 0 ? 200 : 404,
            jsonBody: { message: 'Updated successfully' }
        };
    }
});


// Delete a shopping list item
app.http('deleteShoppingListItem', {
    methods: ['DELETE'],
    authLevel: 'function',
    route: 'shopping-list/{id}',
    handler: async (request, context) => {
        const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
        let token = null
        token = Buffer.from(headers, "base64");
        token = JSON.parse(token.toString());
        const userId = token.userId

        const { id } = request.params;
        const collection = await connectDb('UserShoppingLists');
        const result = await collection.deleteOne(
            { _id: new ObjectId(id), userId }
        );
        await client.close();
        return {
            status: result.deletedCount > 0 ? 200 : 404,
            jsonBody: { message: 'Deleted successfully' }
        };
    }
});



app.http('signupUser', {
    methods: ['POST'],
    authLevel: 'function',
    handler: async (request, context) => {
        try {
            const user = await request.headers['x-ms-client-principal-id'];
            const collection = await connectDb('Users');

            const result = await collection.insertOne(user);
            return { status: 201, jsonBody: result };
        } catch (error) {
            return { status: 500, body: error.message };
        } finally {
            await client.close();
        }
    }
});

app.http('createRecipe', {
    methods: ['POST'],
    authLevel: 'function',
    handler: async (request, context) => {
        const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
        let token = null
        token = Buffer.from(headers, "base64");
        token = JSON.parse(token.toString());
        const userId = token.userId

        try {
            const recipe = await request.json();
            recipe['userId'] = userId
            const collection = await connectDb('recipes');

            const result = await collection.insertOne(recipe);
            return { status: 201, jsonBody: result };
        } catch (error) {
            return { status: 500, body: error.message };
        } finally {
            await client.close();
        }
    }
});


app.http('editRecipe', {
    methods: ['PUT'],
    authLevel: 'function',
    route: 'recipe/{recipeId}',
    handler: async (request, context) => {
        try {
            const recipeId = request.params.recipeId;
            const updates = await request.json();

            delete updates._id;

            // Filter out empty fields
            const filteredUpdates = Object.fromEntries(
                Object.entries(updates).filter(([key, value]) => value)
            );

            const collection = await connectDb('recipes');
            const result = await collection.updateOne(
                { _id: new ObjectId(recipeId) },
                { $set: filteredUpdates }
            );

            return { status: 200, jsonBody: result };
        } catch (error) {
            console.error('Error updating recipe:', error);
            return { status: 500, body: error.message };
        } finally {
            await client.close();
        }
    }
});

app.http('deleteRecipe', {
    methods: ['DELETE'],
    route: 'recipe/{recipeId}',
    authLevel: 'function',
    handler: async (request, context) => {
        try {
            const recipeId = request.params.recipeId;
            const collection = await connectDb('recipes');
            const result = await collection.deleteOne({ _id: new ObjectId(recipeId) });
            if (!result.deletedCount) {
                return { status: 404, body: 'No recipe found with that ID' };
            }
            return { status: 200, jsonBody: { message: 'Recipe deleted successfully' } };
        } catch (error) {
            console.error('Error deleting recipe:', error);
            return { status: 500, body: error.message };
        } finally {
            await client.close();
        }
    }
});


app.http('addMealPlan', {
    methods: ['POST'],
    authLevel: 'function',
    handler: async (request, context) => {
        try {
            const mealPlan = await request.json();
            const collection = await connectDb('mealplans');

            const result = await collection.insertOne(mealPlan);
            return { status: 201, jsonBody: result };
        } catch (error) {
            return { status: 500, body: error.message };
        } finally {
            await client.close();
        }
    }
});


app.http('editMealPlan', {
    methods: ['PUT'],
    authLevel: 'function',
    handler: async (request, context) => {
        try {
            const mealPlanId = request.params.mealPlanId;
            const updates = await request.json();

            // Filter out empty fields
            const filteredUpdates = Object.fromEntries(
                Object.entries(updates).filter(([key, value]) => value)
            );

            const collection = await connectDb('mealplans');
            const result = await collection.updateOne(
                { _id: new ObjectId(mealPlanId) },
                { $set: filteredUpdates }
            );

            return { status: 200, jsonBody: result };
        } catch (error) {
            return { status: 500, body: error.message };
        } finally {
            await client.close();
        }
    }
});

// get all recipes in the "recipes" collection
app.http('getRecipes', {
    methods: ['GET'],
    authLevel: 'function',
    route: 'recipes',
    handler: async (request, context) => {
        const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
        let token = null
        token = Buffer.from(headers, "base64");
        token = JSON.parse(token.toString());
        const userId = token.userId
        // const userIds = [userId, "ed3490fc-71b4-45ab-b588-d473c000f6f9"];

        const collection = await connectRecipes();
        const recipes = await collection.find({ userId }).toArray();
        
        // const recipes = await collection.find({
        //     userId: { $in: userIds }
        // }).toArray();

        await client.close();
        return {
            status: 200,
            jsonBody: { data: recipes }
        };
    }
});

// get one single recipe from the "recipes" collection for the About Recipe Page
app.http('getOneRecipe', {
    methods: ['GET'],
    authLevel: 'function',
    route: 'recipe/{id}',
    handler: async (request, context) => {
        const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
        let token = null
        token = Buffer.from(headers, "base64");
        token = JSON.parse(token.toString());
        const userId = token.userId;
        const recipeId = request.params.id;

        // const body = await request.json();
        // const recipeId = body.recipeId ?? request.params.id;

        const collection = await connectRecipes();
        const recipe = await collection.findOne({ _id: new ObjectId(recipeId), userId: userId });
        // const recipe = await collection.findOne({ _id: new ObjectId(recipeId) });  

        await client.close();
        return {
            status: 200,
            jsonBody: recipe
        };
    },
});

// get all Tags of recipes
app.http('getTags', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'tags',
    handler: async (request, context) => {
        const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
        let token = null
        token = Buffer.from(headers, "base64");
        token = JSON.parse(token.toString());
        const userId = token.userId

        const collection = await connectDb('tags');
        const tags = await collection.find({ deleted: false }).toArray();

        await client.close();
        return {
            status: 200,
            jsonBody: { data: tags }
        };
    }
});


// get mealplans of a user
app.http('getMealplans', {
    methods: ['GET'],
    authLevel: 'function',
    route: 'mealplans',
    handler: async (request, context) => {

        try {
            const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
            let token = null
            token = Buffer.from(headers, "base64");
            token = JSON.parse(token.toString());
            const userId = token.userId

            const collection = await connectDb('mealplans');
            const mealplans = await collection.find({ userId: userId }).toArray();

            // await client.close();
            return {
                status: 200,
                jsonBody: { data: mealplans }
            };
        } catch (error) {
            console.error("Error fetching meal plans:", error);
            return {
                status: 500,
                jsonBody: { error: "Failed to fetch meal plans." }
            };
        } finally {
            await client.close();
        }
    }
});

app.http('checkDefault7Days', {
    methods: ['GET'],
    authLevel: 'function',
    route: 'checkdefault7days',
    handler: async (request, context) => {


        // // const sevenDays = await request.json();
        // const jason = await request.json();
        // const sevenDays = Object.values(jason);
        // const results = [];
        // // const body = await request.json();
        // // const todoid = body.todoid ?? null;
        // // const summary = body.summary ?? "no text";
        // // const createtime = body.createtime ?? new Date();
        // // const isDone = body.isDone ?? false;
        // // const category = body.category ?? "Undefined";
        // // const userid = body.userid ?? null;
        // // const payload = { todoid, summary, createtime, isDone, category, userid };

        // const collection = await connectDb('mealplans');
        // // const mealplans = await collection.find({ userId: userId }).toArray();

        // for (let oneday of sevenDays) {

        //     let record = await collection.findOne({ date: oneday, userId: userId });
        //     // results.push({ record });
        //     if (!record && typeof oneday === "string") {
        //         record = await collection.insertOne({ userId: userId, date: oneday, meals: { "breakfast": null, "lunch": null, "dinner": null } });
        //         results.push({ date: oneday, status: 'created' });
        //     } else {
        //         results.push({ oneday, status: 'exists' });
        //     }
        // }

        // await client.close();
        // return {
        //     status: 201,
        //     jsonBody: { results: results }
        // };



        try {
            // const jason = await request.json();
            // const sevenDays = Object.values(jason);

            const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
            let token = null
            token = Buffer.from(headers, "base64");
            token = JSON.parse(token.toString());
            const userId = token.userId;

            const results = [];

            const sevenDays = [];

            const oneDayTime = 24 * 60 * 60 * 1000;
            const now = new Date();
            const nowTime = now.getTime();
            for (let i = 0; i < 15; i++) {
                const ShowTime = nowTime + i * oneDayTime;
                const myDate = new Date(ShowTime);
                const year = myDate.getFullYear().toString();
                const month = (myDate.getMonth() + 1).toString();
                const date = myDate.getDate().toString();

                function addzero(dstr) {
                    if (dstr.length !== 2) {
                        return "0" + dstr;
                    }
                    else { return dstr; }
                };
                const save_date = year + "-" + addzero(month) + "-" + addzero(date);
                // const save_date = myDate.toISOString().split('T')[0];
                if (!sevenDays.includes(save_date)) {
                    sevenDays.push(save_date);
                }
            }



            const collection = await connectDb('mealplans');

            for (let oneday of sevenDays) {

                let record = await collection.findOne({ date: oneday, userId: userId });
                // results.push({ record });
                if (!record && typeof oneday === "string") {
                    // record = await collection.insertOne({ userId: userId, date: oneday, meals: { "breakfast": null, "lunch": null, "dinner": null } });
                    results.push({ date: oneday });
                }
            }
            return {
                status: 201,
                jsonBody: { results: results }
            };
        } catch (error) {
            console.error("Error in checkDefault7Days:", error);
            return {
                status: 500,
                jsonBody: { error: "Failed to check for default 7 days due to a server error." }
            };
        } finally {
            await client.close();
        }
    },
});

app.http('createDefault7Days', {
    methods: ['POST'],
    authLevel: 'function',
    route: 'createdefault7days',
    handler: async (request, context) => {


        try {

            const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
            let token = null
            token = Buffer.from(headers, "base64");
            token = JSON.parse(token.toString());
            const userId = token.userId;


            const jason = await request.json();
            const sevenDays = Object.values(jason)[0];
            const results = [];
            const collection = await connectDb('mealplans');

            for (let oneday of sevenDays) {

                let record = await collection.findOne({ date: oneday, userId: userId });
                // results.push({ record });
                if (!record && typeof oneday === "string") {
                    record = await collection.insertOne({ userId: userId, date: oneday, meals: { "breakfast": null, "lunch": null, "dinner": null } });
                    results.push({ date: oneday, status: 'created' });
                } else {
                    results.push({ date: oneday, status: 'exists' });
                }
            }
            return {
                status: 201,
                jsonBody: { results: results }
            };
        } catch (error) {
            console.error("Error in createDefault7Days:", error);
            return {
                status: 500,
                jsonBody: { error: "Failed to create default 7 days due to a server error." }
            };
        } finally {
            await client.close();
        }
    }
});

app.http('searchRecipes', {
    methods: ['GET'],
    authLevel: 'function',
    handler: async (request, context) => {
        const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
        let token = null
        token = Buffer.from(headers, "base64");
        token = JSON.parse(token.toString());
        // const userId_ = token.userId;
        const userId = token.userId;

        const queryParams = new URLSearchParams(request.query);
        console.log("request.query", request.query);

        const query = queryParams.get('q') || '';
        console.log("Search Query:", query);
        const collection = await connectRecipes();

        const filter = { userId: userId };
        if (query) {
            filter.name = { $regex: query, $options: 'i' }; // Use regex for case-insensitive partial matching
        }

        // const userIds = [userId_, "ed3490fc-71b4-45ab-b588-d473c000f6f9"];  // 这是你想查询的userId数组

        // const filter = {
        //     userId: { $in: userIds }
        // };

        // const filter = { userId: userId };
        // if (query) {
        //     filter.name = { $regex: query, $options: 'i' }; // Use regex for case-insensitive partial matching
        // }
        const recipes = await collection.find(filter).toArray();

        await client.close(); // Make sure the connection is managed correctly
        return {
            status: 200,
            jsonBody: { data: recipes }
        };
    }
});

app.http('updateMealPlan', {
    methods: ['PUT'],
    authLevel: 'function',
    route: "update/mealplan",
    handler: async (request, context) => {
        try {
            const headers = Object.fromEntries(request.headers.entries())['x-ms-client-principal'];
            let token = null
            token = Buffer.from(headers, "base64");
            token = JSON.parse(token.toString());
            const userId = token.userId;
            // const updates = await request.json();



            const body = await request.json();
            const selectedDate = body.date ?? null;
            const breakfastRecipe = body.meals.breakfast ?? null;
            const lunchRecipe = body.meals.lunch ?? null;
            const dinnerRecipe = body.meals.dinner ?? null;

            let payload = {};
            if (breakfastRecipe !== null) {
                payload["meals.breakfast"] = breakfastRecipe;
            };
            if (lunchRecipe !== null) {
                payload["meals.lunch"] = lunchRecipe;
            };
            if (dinnerRecipe !== null) {
                payload["meals.dinner"] = dinnerRecipe;
            };
            if (Object.keys(payload).length === 0) throw new Error("No valid meal data provided.");

            const collection = await connectDb('mealplans');
            const result = await collection.updateOne({ userId: userId, date: selectedDate }, { $set: payload });
            const mealplan = await collection.findOne({ userId: userId, date: selectedDate });
            // .find({ userId: userId }).toArray();



            // return {
            //     status: 201,
            //     jsonBody: { _id: result.insertedId, todoid, summary, createtime, isDone, category, userid }
            // };

            if (result.matchedCount === 0) throw new Error("No matching document found.");
            if (result.modifiedCount === 0) throw new Error("No document updated.");

            // return { status: 200, jsonBody: { message: "Meal plan updated successfully"  } };
            return { status: 200, jsonBody: { message: mealplan } };
        } catch (error) {
            return { status: 500, body: error.message };
        } finally {
            await client.close();
        }
    }
});