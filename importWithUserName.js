const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const fs = require("fs");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// 電話番号をフォーマットする関数
const formatPhoneNumber = (number) => {
    return number.replace(/-/g, '');
};

(async () => {
    const data = fs.readFileSync("./data/user.json", "utf8");
    const jsonData = JSON.parse(data);
    for (const user of jsonData.results) {
        const phoneNumber = formatPhoneNumber(user.phone_number);
        const dummyEmail = `${phoneNumber}@example.com`;

        try {
            const results = await getAuth()
                .importUsers(
                    [
                        {
                            uid: user.objectId,                                 // NCMBのユーザーIDをFirebaseのUIDにマッピングします。
                            displayName: formatPhoneNumber(user.phone_number),  // NCMBの電話番号を表示名（displayName）にマッピングします。
                            email: dummyEmail,                                  // NCMBの電話番号をFirebaseのメールアドレスにマッピングします。
                            emailVerified: true,                                // メールアドレスの確認状態。メールアドレスの検証を行わないため、初期状態を確認済（true）としています。
                        },
                    ]
                );

            results.errors.forEach((indexedError) => {
                console.log(`Error importing user ${indexedError.index}`);
            });

            const userRecord = await admin.auth().getUserByEmail(dummyEmail);
            console.log("UID:", userRecord.uid);

            // 初期パスワードを仮に固定値を入力していますが、ユーザーごとに異なるパスワードを使うようにしてください。
            await getAuth().updateUser(userRecord.uid, {
                password: 'test123',
            });
            console.log('Successfully updated user:' + userRecord.uid);

        } catch (error) {
            console.log('Error importing users:', error);
        }
    }
})()
