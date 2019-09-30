<template>
<v-form ref="form" v-model="valid" lazy-validation class="mt-10">
    <v-text-field v-model="productid" :counter="10" :rules="nameRules" outlined label="รหัสสินค้า" required></v-text-field>

    <v-text-field v-model="productname" label="ชื่อสินค้า" outlined required></v-text-field>
    <v-text-field v-model="price" label="ราคา" type="number" outlined required></v-text-field>

    <v-select v-model="productType" :items="items" :rules="[v => !!v || 'Item is required']" label="ประเภทสินค้า" outlined required></v-select>

    <v-checkbox v-model="recommend" :rules="[v => !!v || 'You must agree to continue!']" label="สินค้าแนะนำ" required></v-checkbox>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="addProduct()">
        Add Product
    </v-btn>
    <v-btn color="orange lighten-2" class="mr-4" @click="reset">
        Reset Form
    </v-btn>
</v-form>
</template>

<script>
import {db} from '@/plugins/firebaseDB.js'

export default {
    data: () => ({
        productid: '',
        productname: '',
        price: 0,
        productType: '',
        recommend: '',

        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        select: null,
        items: [
            'Item 1',
            'Item 2',
            'Item 3',
            'Item 4',
        ],
        checkbox: false,
    }),

    methods: {
        addProduct() {
            // ทดสอบการรับข้อมูล
            console.log(this.productid)
            console.log(this.productname)
            console.log(this.price)
            console.log(this.productType)
            console.log(this.recommend)
           
            // ส่งข้อมูล --> Firbase
            // db.collection("product").add({
                
            db.collection("product").doc(this.productid).set({
                    productid: this.productid,
                    productname: this.productname,
                    price: this.price,
                    productType: this.productType,
                    recommend: this.recommend
                })
                .then(function (docRef) {
                    // console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        },
        validate() {
            if (this.$refs.form.validate()) {
                this.snackbar = true
            }
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
    },
}
</script>

<style>

</style>
