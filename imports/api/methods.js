import { Meteor } from 'meteor/meteor';

import {OrderCollection} from "./OrderCollection";
import {SnackCollection} from "./snackCollection";
import {DrinkCollection} from "./DrinksCollection";
import {BankDetailCollection} from "./BankDetailCollection";
import {ProductCollection} from "./ProductCollection";
import {SnackOrdersCollection} from "./SnackOrdersCollection";
import {DrinkOrdersCollection} from "./DrinkOrderConllection";

Meteor.methods({
    'PreEmployeeRemove'(employee) {
        console.log({Employees: employee._id});
        OrderCollection.update({Employees: employee._id}, {$set: {Employees: null}}, {multi: true});
        SnackOrdersCollection.remove({waiter: employee._id},{multi: true});
        DrinkOrdersCollection.remove({waiter: employee._id},{multi: true});
    },
    'PreIngredientRemove'(ing){
        SnackCollection.update({},{$pull: {ingredients: {ingredient: ing._id}}}, {multi: true})
        DrinkCollection.update({},{$pull: {ingredients: {ingredient: ing._id}}}, {multi: true})
        ProductCollection.remove({ingredient: ing._id},{multi: true});
    },
    'PreProviderRemove'(provider){
        console.log(provider._id)
        BankDetailCollection.remove({provider: provider._id},{multi: true})
        ProductCollection.remove({provider: provider._id},{multi: true});
    },
    'PreSnackRemove'(snack){
        SnackOrdersCollection.remove({snack: snack._id},{multi: true});
    },
    'PreDrinkRemove'(drink){
        DrinkOrdersCollection.remove({drink: drink._id},{multi: true});
    },
    'ChangePassword'(user, password){
        Accounts.setPassword(user,password);
    },
    'CreateUser'(username,password){
        if(Accounts.findUserByUsername(username)){
            return "такой пользователь уже существует"
        }else {
            Accounts.createUser({
                username: username,
                password: password
            });
            return "";
        }
    }
});