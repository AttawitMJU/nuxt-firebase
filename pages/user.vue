<template>
<section class="container">
    <div>
        <h2>
            Write to Firestore.
        </h2>
        <div>
            <button @click="writeToFirestore" :disabled="writeSuccessful">
                <span v-if="!writeSuccessful">Write now</span>
                <span v-else>Successful!</span>
            </button>
        </div>
        <button @click="writeUser">Write User</button>
    </div>

    <div>
        <h2>
            Read from Firestore.
        </h2>
        <div>
            <button @click="getUserList" :disabled="readSuccessful">
                <span v-if="!readSuccessful">Read now</span>
                <span v-else>Successful!</span>
            </button>
            <!-- <p>{{text}}</p> -->
            <h3>{{users}}</h3>
        </div>
    </div>
</section>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseDb from '@/plugins/firebase.js'
export default {
    data() {
        return {
            users: [],
            writeSuccessful: false,
            readSuccessful: false,
            text: 'This is Text',
            items: null,
            newItem: {
                name: '',
                price: ''
            }
        }
    },

    methods: {
        writeToFirestore() {
            // const ref = fireDb.collection('test').doc('test')
            // const document = {
            //     text: 'This is a test message.3'
            // }
            // try {
            //     // await ref.set(document)
            //     // fireDb.collection("cities").add({
            //     //     name: "Tokyo",
            //     //     country: "Japan"
            //     // })
            //     var citiesRef = fireDb.collection("cities");

            //     citiesRef.doc("SF").set({
            //         name: "San Francisco",
            //         state: "CA",
            //         country: "USA",
            //         capital: false,
            //         population: 860000,
            //         regions: ["west_coast", "norcal"]
            //     });
            //     citiesRef.doc("LA").set({
            //         name: "Los Angeles",
            //         state: "CA",
            //         country: "USA",
            //         capital: false,
            //         population: 3900000,
            //         regions: ["west_coast", "socal"]
            //     });
            //     citiesRef.doc("DC").set({
            //         name: "Washington, D.C.",
            //         state: null,
            //         country: "USA",
            //         capital: true,
            //         population: 680000,
            //         regions: ["east_coast"]
            //     });
            //     citiesRef.doc("TOK").set({
            //         name: "Tokyo",
            //         state: null,
            //         country: "Japan",
            //         capital: true,
            //         population: 9000000,
            //         regions: ["kanto", "honshu"]
            //     });
            //     citiesRef.doc("BJ").set({
            //         name: "Beijing",
            //         state: null,
            //         country: "China",
            //         capital: true,
            //         population: 21500000,
            //         regions: ["jingjinji", "hebei"]
            //     });
            // } catch (e) {
            //     // TODO: error handling
            //     console.error(e)
            // }
            // this.writeSuccessful = true
        },
        writeUser() {
            const db = firebase.firestore()
            db.collection("actors").add({
                name: "Anbu Selvan4",
                email: "anbu.selvan@email.com",
                age: 25
            })
            // db.collection("users").doc("002").set({
            //     name: "Anbu Selvan4",
            //     email: "anbu.selvan@email.com",
            //     age: 25
            // })

            var users = [{
                    name: "Raja",
                    email: "raja.tamil@email.com",
                    createdAt: new Date("2019-01-01 12:08:00")
                },
                {
                    name: "Arivu",
                    email: "arivu.selvan@email.com",
                    createdAt: new Date("2018-01-23 09:13:00")
                }, {
                    name: "Mike",
                    email: "mike.author@email.com",
                    createdAt: new Date("2018-08-08 06:37:00")
                }, {
                    name: "Praba",
                    email: "praba.karan@email.com",
                    createdAt: new Date("2018-10-09 18:26:00")
                },
                {
                    name: "Muhammad",
                    email: "muhammad.ali@email.com",
                    createdAt: new Date("2018-03-13 12:13:00")
                }
            ];
            // const db = firebase.firestore();
            users.forEach(user => {
                db.collection("users").doc().set(user);
            });
        },

        getUserList() {
            const db = firebase.firestore()
            db.collection("users")
                .get()
                .then(snap => {
                    snap.forEach(doc => {
                        console.log(doc.data());
                        console.log(doc.id);
                        this.users.push(doc.data())
                    });
                });
        },

        readFromFirestore() {
            // const ref = fireDb.collection('test').doc('test')
            // const ref = fireDb.collection("cities")
            // let snap
            // try {
            //     snap = ref.get()
            // } catch (e) {
            //     // TODO: error handling
            //     console.error(e)
            // }
            // this.text = snap.data().text
            // var docRef = fireDb.collection("cities").doc("SF");

            // docRef.get().then(function (doc) {
            //     if (doc.exists) {
            //         console.log("Document data:", doc.data());
            //         // this.text = doc.data()
            //     } else {
            //         // doc.data() will be undefined in this case
            //         console.log("No such document!");
            //     }
            // }).catch(function (error) {
            //     console.log("Error getting document:", error);
            // });
            // this.readSuccessful = true
        }
    }
}
</script>

<style>
.container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>
