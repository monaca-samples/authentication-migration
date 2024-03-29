const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const fs = require("fs");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

(async () => {
    const data = fs.readFileSync("./data/user.json", "utf8");
    const jsonData = JSON.parse(data);
    for (const user of jsonData.results) {

        try {
            const results = await getAuth()
                .importUsers([
                    {
                        uid: user.objectId,         // NCMBのユーザーIDをFirebaseのUIDにマッピングします。
                        displayName: user.userName, // NCMBのユーザー名をFirebaseの表示名（displayName）にマッピングします。
                        email: user.mailAddress,    // NCMBのメールアドレスをFirebaseのメールアドレスにマッピングします。
                        emailVerified: false,       // メールアドレスの確認状態。ここでは、初期状態を未確認（false）としています。
                    },
                ]);

            results.errors.forEach((indexedError) => {
                console.log(`Error importing user ${indexedError.index}`);
            });
        } catch (error) {
            console.log('Error importing users:', error);
        }
    }
})()
