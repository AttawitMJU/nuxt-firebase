<template>
<div class="d-flex justify-end">

    <p class="blue">{{userName}}</p>

    <v-btn @click="signin()" :disabled="disableSignin" color="success" class="ml-5">SignIn</v-btn>
    <v-btn @click="signout()" color="warning" class="ml-5">SignOut</v-btn>
</div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import {db} from '@/plugins/firebaseDB.js'

export default {
    data() {
        return {
            userList: [],
            email: null,
            disableSignin: false,
            userName: '',
            tokenG: '',
        }
    },
    // watch: {
    //     loginUser: function () {
    //         if (this.loginUser != null) {
    //             this.disableSignin = true
    //             console.log(this.disableSignin)
    //         } else {
    //             this.disableSignin = false
    //         }
    //     }
    // },
    // created() {
    //     firebase.auth().onAuthStateChanged(user => {
    //         this.loginUser = user;
    //         console.log('created: ' + user)
    //     });
    // },
    methods: {
        signout() {
            firebase.auth().signOut().then(function () {
                // Sign-out successful.
                console.log('Sign-out')
                this.loginUser = null
                this.userName = 'Bye'
            }).catch(function (error) {
                // An error happened.
                alert('Opps. ' + error.message)
            });
        },
        signin() {
            const provider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken
                    console.log('Token: ' + token)
                    // this.tokenG = token

                    // The signed-in user info.
                    var user = result.user
                    console.log(user)

                    this.email = user.email
                    this.userName = user.displayName
                    this.disableSignin = true


                    // this.$router.replace('/')
                })
                .catch((err) => {
                    alert('Opps. ' + err.message)
                })
        },
    }
}
</script>

<style>

</style>
