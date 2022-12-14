import { Meteor } from 'meteor/meteor';
import {TestCollection} from "../imports/api/testCollection";
import {EmployeesCollection} from "../imports/api/EmployeesCollection";
import {OrderCollection} from "../imports/api/OrderCollection";
import {InredientsCollection} from "../imports/api/IngredientsCollection";
import {SnackCollection} from "../imports/api/snackCollection";
import {DrinkCollection} from "../imports/api/DrinksCollection";
import {ProviderCollection} from "../imports/api/providerCollection";
import {BankDetailCollection} from "../imports/api/BankDetailCollection";
import {ProductCollection} from "../imports/api/ProductCollection";
import {SnackOrdersCollection} from "../imports/api/SnackOrdersCollection";
import {DrinkOrdersCollection} from "../imports/api/DrinkOrderConllection";
import "../imports/api/methods"

const SEED_USERNAME = 'admin';
const SEED_PASSWORD = 'luka';

Meteor.startup(async () => {
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
        });
    }

    // if(EmployeesCollection.find({}).count() === 0){
    //     EmployeesCollection.insert({
    //         first_name: "test"
    //     });
    // }

    // console.log(OrderCollection.find({}).count())
});
