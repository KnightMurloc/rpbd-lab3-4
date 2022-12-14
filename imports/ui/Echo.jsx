import React from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import {TestCollection} from '../api/testCollection';
import {EmployeesCollection} from '../api/EmployeesCollection';
import {OrderCollection} from "../api/OrderCollection";
import {InredientsCollection} from "../api/IngredientsCollection";
import {Session} from "meteor/session";
import {Tab} from "./Tab";
import {TestForm} from "./TestForm";
import {EmployeesForm} from "./EmployeesForm";
import {OrderForm} from "./OrderForm";
import {IngredientForm} from "./IngredientForm";
import {SnackCollection} from "../api/snackCollection";
import {SnackForm} from "./SnackForm";
import {DrinkCollection} from "../api/DrinksCollection";
import {DrinkForm} from "./DrinkForm";
import {ProviderCollection} from "../api/providerCollection";
import {ProviderForm} from "./ProviderForm";
import {BankDetailCollection} from "../api/BankDetailCollection";
import {BankDetailForm} from "./BankDetailForm";
import {ProductCollection} from "../api/ProductCollection";
import {ProductForm} from "./ProductForm";
import {SnackOrdersCollection} from "../api/SnackOrdersCollection";
import {SnackOrderForm} from "./SnackOrderForm";
import {DrinkOrdersCollection} from "../api/DrinkOrderConllection";
import {DrinkOrderForm} from "./DrinkOrderForm";
// import {usersCollection} from "../api/usersCollection";
import {UserForm} from "./UserForm";

function EployeePreRemove(employee) {
    Meteor.call("PreEmployeeRemove", employee);
}

function IngredientPreRemove(ingredient) {
    Meteor.call("PreIngredientRemove", ingredient);
}

function ProviderPreRemove(provider) {
    Meteor.call("PreProviderRemove", provider);
}

function SnackPreRemove(snack) {
    Meteor.call("PreSnackRemove", snack);
}

function DrinkPreRemove(drink) {
    Meteor.call("PreDrinkRemove", drink);
}

export const Echo = () => {

    const [test_query, test_setQuery] = React.useState(null);
    const [Employees_query, Employees_setQuery] = React.useState(null);
    const [Order_query, Order_setQuery] = React.useState(null);
    const [Inredients_query, Inredients_setQuery] = React.useState(null);
    const [snack_query, snack_setQuery] = React.useState(null);
    const [drinks_query, drinks_setQuery] = React.useState(null);
    const [provider_query, provider_setQuery] = React.useState(null);
    const [bankDetail_query, bankDetail_setQuery] = React.useState(null);
    const [product_query, product_setQuery] = React.useState(null);
    const [snackOrder_query, snackOrder_setQuery] = React.useState(null);
    const [drinkOrder_query, drinkOrder_setQuery] = React.useState(null);
    const [users_query, users_setQuery] = React.useState(null);

    Session.setDefault('lazyloadLimit', 10);
    const tests = useTracker(() => TestCollection.find(test_query != null ? {text: {$regex: test_query}} : {}).fetch());
    const Employees = useTracker(() => EmployeesCollection.find(Employees_query != null ?
        {$or: [
            {first_name : {$regex: Employees_query}},
            {last_name : {$regex: Employees_query}},
            {patronymic : {$regex: Employees_query}},
            {address : {$regex: Employees_query}},
            {birthDate : {$regex: Employees_query}},
            {salary : {$regex: Employees_query}},
            {post : {$regex: Employees_query}},

        ]} : {}).fetch());
    const Order = useTracker(() => OrderCollection.find(Order_query != null ?
        {
            $or : [
                {reason: {$regex: Order_query}},
                {order_number: {$regex: Order_query}},
                {order_date: {$regex: Order_query}},
                {post: {$regex: Order_query}},
            ]
        } : {}).fetch());
    const Inredients = useTracker(() => InredientsCollection.find(Inredients_query != null ?
        {
            $or : [
                {name: {$regex: Inredients_query}},
                {unit: {$regex: Inredients_query}},
            ]
        } : {}).fetch());
    const snack = useTracker(() => SnackCollection.find(snack_query != null ?
        {
            $or: [
                {name: {$regex: snack_query}},
                {size: {$regex: snack_query}},
            ]
        } :{}).fetch());
    const drinks = useTracker(() => DrinkCollection.find(drinks_query != null ?
        {
            $or: [
                {name: {$regex: drinks_query}},
                {strength: {$regex: drinks_query}},
                {container: {$regex: drinks_query}},
                {size: {$regex: drinks_query}},
            ]
        } : {}).fetch());
    const provider = useTracker(() => ProviderCollection.find(provider_query != null ?
        {
            $or: [
                {name: {$regex: provider_query}},
                {post_address: {$regex: provider_query}},
                {phone_number: {$regex: provider_query}},
                {fax: {$regex: provider_query}},
                {email: {$regex: provider_query}},
            ]
    } : {}).fetch());
    const bankDetail = useTracker(() => BankDetailCollection.find(bankDetail_query != null ?
        {
            $or: [
                {name: {$regex: bankDetail_query}},
                {city: {$regex: bankDetail_query}},
                {TIN: {$regex: bankDetail_query}},
                {settlement_account: {$regex: bankDetail_query}},
            ]
        } : {}).fetch());
    const product = useTracker(() => ProductCollection.find(product_query != null ?
        {
            $or: [
                {name: {$regex: product_query}},
                {price: {$regex: product_query}},
                {delivery_terms: {$regex: product_query}},
                {payment_terms: {$regex: product_query}},
            ]
        } : {}).fetch());
    const snackOrder = useTracker(() => SnackOrdersCollection.find(snackOrder_query != null ?
        {
            $or: [
                {table: {$regex: snackOrder_query}}
            ]
        } :{}).fetch());
    const drinkOrder = useTracker(() => DrinkOrdersCollection.find(drinkOrder_query != null ?
        {
            $or: [
                {table: {$regex: drinkOrder_query}}
            ]
        } : {}).fetch());
    let users = null;
    if(Meteor.user().username === "admin"){
        users = useTracker(() => Meteor.users.find(users_query != null ?
            {
                $or: [
                    {username: {$regex:users_query}}
                ]
            } : {}).fetch());
    }

    // console.log(Inredients)
    this.state = {page: 0};

    const [form, setForm] = React.useState(<div>test</div>);

    const tabs = {
        tests: <Tab data={tests} setForm={setForm} columns={{
            text: "text",
            date: obj => {return obj.date ? obj.date.toLocaleDateString() : ""}
        }} form={TestForm} collection={TestCollection} setQuery={test_setQuery}/>,
        employees: <Tab data={Employees} setForm={setForm} columns={{
            first_name: "first_name",
            last_name: "last_name",
            patronymic: "patronymic",
            birthDate: "birthDate",
            salary: "salary",
            post: "post"
        }} form={EmployeesForm} collection={EmployeesCollection} PreRemove={EployeePreRemove} setQuery={Employees_setQuery}/>,
        orders: <Tab data={Order} setForm={setForm} columns={{
            order_number: "order_number",
            order_date: "order_date",
            Employees: obj => {
                return obj.Employees != null ? EmployeesCollection.findOne({_id: obj.Employees}).last_name : ""
            },
            post: "post"
        }} form={OrderForm} collection={OrderCollection} setQuery={Order_setQuery}/>,
        inredients: <Tab data={Inredients} setForm={setForm} columns={{
            name:"name",
            unit:"unit"
        }} form={IngredientForm} collection={InredientsCollection} PreRemove={IngredientPreRemove} setQuery={Inredients_setQuery}/>,
        snacks: <Tab data={snack} setForm={setForm} columns={{
            name: "name",
            size: "size"
        }} form={SnackForm} collection={SnackCollection} PreRemove={SnackPreRemove} setQuery={snack_setQuery}/>,
        drinks: <Tab data={drinks} setForm={setForm} columns={{
            name: "name",
            strength: "strength",
            size: "size"
        }} form={DrinkForm} collection={DrinkCollection} PreRemove={DrinkPreRemove} setQuery={drinks_setQuery}/>,
        provider: <Tab data={provider} setForm={setForm} columns={{
            name: "name",
            email: "email"
        }} form={ProviderForm} collection={ProviderCollection} PreRemove={ProviderPreRemove} setQuery={provider_setQuery}/>,
        bankDetail: <Tab data={bankDetail} setForm={setForm} columns={{
            name: "name",
            city: "city",
            provider: obj => {return obj.provider != null ? ProviderCollection.findOne({_id: obj.provider}).name : ""}
        }} form={BankDetailForm} collection={BankDetailCollection} setQuery={bankDetail_setQuery}/>,
        product: <Tab data={product} setForm={setForm} columns={{
            name: "name",
            price: "price",
            ingredient: obj => {return obj.ingredient != null ? InredientsCollection.findOne({_id: obj.ingredient}).name : ""},
            provider: obj => {return obj.provider != null ? ProviderCollection.findOne({_id: obj.provider}).name : ""}
        }} form={ProductForm} collection={ProductCollection} setQuery={product_setQuery}/>,
        snackOrder: <Tab data={snackOrder} setForm={setForm} columns={{
            waiter: obj => {return obj.waiter != null ? EmployeesCollection.findOne({_id: obj.waiter}).last_name : ""},
            snack: obj => {return obj.snack != null ? SnackCollection.findOne({_id: obj.snack}).name : ""},
            table: "table"
        }} form={SnackOrderForm} collection={SnackOrdersCollection} setQuery={snackOrder_setQuery}/>,
        drinkOrder: <Tab data={drinkOrder} setForm={setForm} columns={{
            waiter: obj => {return obj.waiter != null ? EmployeesCollection.findOne({_id: obj.waiter}).last_name : ""},
            drink: obj => {return obj.drink != null ? DrinkCollection.findOne({_id: obj.drink}).name : ""},
            table: "table"
        }} form={DrinkOrderForm} collection={DrinkOrdersCollection} setQuery={drinkOrder_setQuery}/>
    }

    if(Meteor.user().username === "admin"){
        tabs.users = <Tab data={users} setForm={setForm} columns={{
            username: "username",
        }} form={UserForm} collection={Meteor.users} setQuery={users_setQuery}/>
    }

    const [active, setActive] = React.useState("tests")

    return <div>
        {/*<button onClick={callback}>add rand</button>*/}
        {/*<button onClick={this.state.page++}>next</button>*/}
        {/*<table>*/}
        {/*    <thead>*/}
        {/*        <tr>*/}
        {/*            <th>name</th>*/}
        {/*            <th>date</th>*/}
        {/*        </tr>*/}
        {/*    </thead>*/}
        {/*    /!*{tests.map(test => <tr><td> {test.text}</td><td> {String(test.date)}</td></tr>)}*!/*/}
        {/*    /!*<tr></tr>*!/*/}
        {/*    <tbody>*/}
        {/*        {data}*/}
        {/*    </tbody>*/}
        {/*</table>*/}
        {/*<p>{this.state.page}</p>*/}
        {/*<button onClick={tab.state.page++}>next</button>*/}
        {/*{tab}*/}
        {/*<button onClick={callback}>next</button>*/}
        {/*<Tab data={tests}/>*/}

        <div style={{
            display: "flex",
            flexDirection: "row"
        }}>
            {/*<div style={{width: '50%'}}><Tab data={tests} form={setForm}/></div>*/}

            <div style={{width: '50%'}}>
                <div style={{display: "flex",}}>
                    {Object.keys(tabs).map(key => <button onClick={() => setActive(key)}>{key}</button>)}
                </div>

                {tabs[active]}
            </div>

            <div style={{width: '50%'}}>
                {form}
            </div>
        </div>


    </div>
}