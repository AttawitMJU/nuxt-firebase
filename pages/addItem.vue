<template>
<div class="container">
    <div class="card">
        <div class="card-header">
            <h3>Add Item</h3>
        </div>
        <div class="card-body">
            <v-form ref="form" v-on:submit.prevent="addItem">

                <v-text-field v-model="newItem.name" label="Item Name:" outlined clearable></v-text-field>

                <v-text-field v-model="newItem.price" label="Item Price:" prefix="$" outlined clearable></v-text-field>

                <v-btn color="success" class="mr-4" @click="addItem">
                    Add Item
                </v-btn>

                <v-btn color="warning" class="mr-4" @click="reset">
                    Reset Form
                </v-btn>
            </v-form>
        </div>
    </div>
</div>
</template>

<script>
// import firebase from 'firebase/app'
// import 'firebase/firestore'

import {FirebaseStore} from '@/plugins/firebase.js'

export default {
    data() {
        return {
            newItem: {
                name: '',
                price: ''
            }
        }
    },
    methods: {
        addItem() {
            // Initialize Cloud Firestore through Firebase
            // const db = firebase.firestore()

            const itemsRef = FirebaseStore.collection('items')
            itemsRef.add({
            // db.collection("items").add({
                name: this.newItem.name,
                price: this.newItem.price,
            })
            this.newItem.name = '';
            this.newItem.price = '';
            this.$router.push('/')
        },
        reset() {
            this.$refs.form.reset()
        },
    }
}
</script>

<style>

</style>
