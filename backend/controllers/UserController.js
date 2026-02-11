const firebaseAdmin = require('../config/firebaseAdmin');


const registerUser = async(req,res) => {
    try {
        const {firstname, lastname, email, password} = req.body;
        const user = await firebaseAdmin.admin.auth().createUser({
            email,
            password,
            displayName:`${firstname} ${lastname}`
        })

        if(user){
            return res.status(201).json({ 
                message: "User Registered Successfully",
                uid: user.uid, 
                email:user.email 
            })
        }else{
            throw new Error("User data is not valid")
        }
       
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


const loginUser = async(req, res) => {
    try {

        const { email, password } = req.body;
         const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASSGSw-qf99uUdoMTtjqTxmYfQnKtJYfk`, {
            method: "POST",
            body: JSON.stringify({ 
                email,
                password,
                returnSecureToken: true
            }),
        });

        const data = await response.json();
        
        if(response.status === 200){
            return res.json({
                message: "Login successful",
                token: data.idToken,
                uid: data.localId,
                expiresIn: 60 * 20
            });
        }else{
            throw new Error(data.error?.message || "Login failed");
        }    

    } catch (error) {
        res.status(401).json({error: error.message || "Invalid email or password"});
    }
   
}


module.exports = {
    registerUser,
    loginUser
}