<template>
<div>
    <v-btn @click="getUsers()" color="primary">Get</v-btn>

    <div v-for="(value, name, index) in userList" :key="index">
        <h1>{{name}}</h1>
        <p>{{value.productname}} / {{value.productid}} / {{value.productType}}/ {{value.recommend}}</p>
    </div>
    <!-- <v-simple-table>
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Calories</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, name, index) in userList" :key="index">
                    <td>{{ name }}</td>
                    <td>{{ value.price}}</td>
                </tr>
            </tbody>
        </template>
    </v-simple-table> -->
    <v-data-table :headers="headers" :items="userList" :items-per-page="5" class="elevation-1">
        <template v-slot:item.recommend="{ item }">
            <!-- <v-chip :text="getText(item.recommend)">{{ item.recommend }}</v-chip> -->
            <v-checkbox v-model="item.recommend"></v-checkbox>
        </template>
    </v-data-table>
</div>
</template>

<script>
import firebase from 'firebase/app'
import {
    db
} from '~/plugins/firebaseDB.js'

export default {

    data() {
        return {
            userList: [],
            productid: '',
            productname: '',
            price: 0,
            productType: '',
            recommend: '',
            headers: [{
                    text: 'Productname',
                    align: 'left',
                    sortable: false,
                    value: 'productname',
                },
                {
                    text: 'Product ID',
                    value: 'productid'
                },
                {
                    text: 'Price ($)',
                    value: 'price'
                },
                {
                    text: 'Product Type',
                    value: 'productType'
                },
                {
                    text: 'Recommend',
                    value: 'recommend'
                }
            ],
        }
    },
    methods: {
        getUsers() {
            db.collection("product").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(`${doc.id} => ${doc.data()}`);
                    this.userList.push(doc.data())
                });
            });
        },
        getText(recommend) {
            if (recommend) return 'ok'
            else return '-'
        },
    }
}
</script>

<style>

</style>
