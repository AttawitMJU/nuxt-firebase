<template>
<div>
    <v-btn @click="getProduct()" color="primary">Get</v-btn>

    <!-- <div v-for="(value, name, index) in productList" :key="index">
        <h1>{{name}}</h1>
        <p>{{value.productname}} / {{value.productid}} / {{value.productType}}/ {{value.recommend}}</p>
    </div> -->

    <!-- <v-data-table :headers="headers" :items="productList" :items-per-page="5" class="elevation-1">
        <template v-slot:item.recommend="{ item }">
            <v-checkbox v-model="item.recommend"></v-checkbox>
        </template>
    </v-data-table> -->

    <v-data-table :headers="headers" :items="productList" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Product</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <div class="flex-grow-1"></div>

                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.productid" label="ProductID"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.productname" label="Product name"></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.price" label="Price ($)"></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <!-- <v-text-field v-model="editedItem.productType" label="Type"></v-text-field> -->

                                        <v-select v-model="editedItem.productType" :items="items" label="ประเภทสินค้า" outlined required></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <!-- <v-text-field v-model="editedItem.recommend" label="Recommend"></v-text-field> -->
                                        <v-checkbox v-model="editedItem.recommend" label="Recommend"></v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <div class="flex-grow-1"></div>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-toolbar>
        </template>

        <template v-slot:item.recommend="{ item }">
            <v-checkbox v-model="item.recommend"></v-checkbox>
        </template>

        <template v-slot:item.action="{ item }">
            <v-icon class="mr-2" @click="editItem(item)" color="yellow darken-2">
                mdi-file-document-edit-outline
            </v-icon>
            <v-icon @click="deleteItem(item)" color="red">
                mdi-delete-forever
            </v-icon>
        </template>

        <template v-slot:no-data>
            <v-btn color="primary" @click="getProduct()">Reset</v-btn>
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
            productList: [],
            productid: '',
            productname: '',
            price: 0,
            productType: '',
            recommend: '',
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
            ],
            dialog: false,
            headers: [{
                    text: 'Product ID',
                    align: 'right',
                    value: 'productid'
                },
                {
                    text: 'Productname',
                    align: 'left',
                    // sortable: false,
                    value: 'productname',
                },

                {
                    text: 'Price ($)',
                    align: 'right',
                    value: 'price'
                },
                {
                    text: 'Product Type',
                    value: 'productType'
                },
                {
                    text: 'Recommend',
                    value: 'recommend',
                    align: 'center',
                },
                {
                    text: 'Actions',
                    value: 'action',
                    sortable: false
                },
            ],
            editedIndex: -1,
            editedItem: {
                productid: '',
                productname: '',
                price: 0,
                productType: '',
                recommend: '',
            },
            defaultItem: {
                productid: '',
                productname: '',
                price: 0,
                productType: '',
                recommend: '',
            },
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
    },
    created() {
        this.getProduct()
    },
    methods: {
        getProduct() {
            db.collection("product").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(`${doc.id} => ${doc.data()}`);
                    this.productList.push(doc.data())
                });
            });
        },

        getText(recommend) {
            if (recommend) return 'ok'
            else return '-'
        },
        editItem(item) {
            this.editedIndex = this.productList.indexOf(item)
            this.editedItem = Object.assign({}, item)

            db.collection("product").doc(item.productid).set({
                    productid: item.productid,
                    productname: item.productname,
                    price: item.price,
                    productType: item.productType,
                    recommend: item.recommend
                })
                .then( (docRef) =>{
                    // console.log("Document written with ID: ", docRef.id);
                })
                .catch( (error)=> {
                    console.error("Error adding document: ", error);
                });

            this.dialog = true
        },
        deleteItem(item) {
            const index = this.productList.indexOf(item)

            var del = confirm('Are you sure you want to delete this item?') && this.productList.splice(index, 1)

            if (del) {
                db.collection("product").doc(item.productid).delete().then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            }
        },
        close() {
            this.dialog = false
            // setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            // }, 300)
        },
        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.productList[this.editedIndex], this.editedItem)
            } else {
                this.productList.push(this.editedItem)
            }
            this.close()
        },

    }
}
</script>

<style>

</style>
