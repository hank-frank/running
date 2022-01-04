import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const parseUserToken = () => {
    const cookies = document.cookie.split(' ');
    let userToken;
    for (let cookie of cookies) {
        cookie = cookie.split("=");
        if (cookie[0] === 'token') {
            userToken = cookie[1];
        }
    }
    return userToken || null;
}

export const fetchData = createAsyncThunk(
    'user/fetchData',
    async (thunkAPI) => {
        try {
            const userToken = parseUserToken();
            if (!userToken) return null;
            console.log('IN FETCH DATA: ', userToken);

            let raw = await fetch('/userData', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userToken})
            });

            return await raw.json()

        } catch(e) {
            console.error("FETCH USERS: ", e);
            return e;
        }
    }
)

export const checkToken = createAsyncThunk(
    'user/checkToken',
    async (thunkAPI) => {
        try {
            let raw = await fetch('/checkToken', {
                method: 'get',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }});

            return await raw.json()

        } catch(e) {
            console.error("FETCH USERS: ", e);
            return e;
        }
    }
)

export const login = createAsyncThunk(
    'user/login',
    async (userData, thunkAPI) => {
        if (!userData.userName || !userData.password) return;
        try {
            let raw = await fetch('/auth', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (raw.status !== 200) {
                throw new Error(raw.status);
            }

            let userJson = await raw.json();
            return await userJson;

        } catch(e) {
            console.error("LOGIN: ", e);
            throw new Error(e);
        }
    }
)

const updateRun = (runToUpdate, currentState) => {
    const tempUserData = {...currentState.user.userData};
    console.log(tempUserData);
    tempUserData.schedule.weeks[runToUpdate.week].runs.forEach((run) => {
        console.log('run: ', run, run.id, runToUpdate.id);
        if (run.id === runToUpdate.id) {
            console.log(run.isComplete)
            /* TODO WHY WONT THIS UPDATE */
            run.isComplete = !run.isComplete;
            console.log(run.isComplete)
        }
    });

    return tempUserData;
}

export const toggleRun = createAsyncThunk(
    'user/toggleRun',
    async (runToUpdate, { getState }) => {
        let state = getState();
        console.log('IN SAVE SLICE', state);
        const updatedData = updateRun(runToUpdate, state);

        console.log('state after preupdate: ', updatedData)
        try {
            let raw = await fetch('/save', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            console.log('save raw: ', raw);
            let data = await raw.json();
            console.log('SAVE RESPONSE : ', data);
            return await data;
        } catch(e) {
            console.log('toggleRunError', e);
        }

})

const initialState = {
    userData: {},
    authenticated: false,
    loginErrorMessage: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserData: (state, action) => {
            state.userData = action.payload;
        },

        // toggleRun: (state, action) => {
        //     let updatedRun = action.payload;
        //
        //     state.userData.schedule.weeks[updatedRun.week].runs.forEach((run) => {
        //         if (run.id === updatedRun.id) {
        //             run.isComplete = !run.isComplete;
        //         }
        //     });
        // },

        logout:async (state, action) => {
            /* TODO use logout success message to display message on login page after being rerouted*/
            await fetch('/logout');
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            console.log(action.payload);
            state.userData = action.payload;
        })

        builder.addCase(fetchData.rejected, (state, action) => {
        /* TODO handle rejection */
            console.log('USERDATA REJECTION');
        })

        builder.addCase(login.fulfilled, (state, action) => {
            console.log(action.payload);
            state.userData = action.payload;
            state.authenticated = true;
        })

        builder.addCase(login.rejected, (state, action) => {
            //TODO handle rejection, probably set errormessage?
            console.log("LOGIN REJECTED");
            state.authenticated = false;
            state.loginErrorMessage = "Invalid username or password, try again brosef!";

        })

        builder.addCase(toggleRun.fulfilled, (state, action) => {
            console.log(action.payload);
            // state.userData = action.payload;
            // state.authenticated = true;
        })

        builder.addCase(toggleRun.rejected, (state, action) => {
            //TODO handle rejection, probably set errormessage?
            console.log("SAVE REJECTED");


        })
    }
})

export const { updateUserData, logout } = userSlice.actions;
export default userSlice.reducer;
