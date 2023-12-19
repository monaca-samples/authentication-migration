const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const fs = require("fs");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

try {
    const data = fs.readFileSync("./data/user.json", "utf8");
    const jsonData = JSON.parse(data);
    jsonData.results.forEach(user => {
        console.log(user);
        getAuth()
            .importUsers([
                {
                    uid: user.objectId,
                    displayName: user.userName,
                    email: user.mailAddress,
                    emailVerified: false,
                },
            ])
            .then((results) => {
                results.errors.forEach((indexedError) => {
                    console.log(`Error importing user ${indexedError.index}`);
                });
            })
            .catch((error) => {
                console.log('Error importing users :', error);
            });
    });

} catch (err) {
    console.error(err);
}
