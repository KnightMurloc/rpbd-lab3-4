import React from 'react';
import {ProductCollection} from "../api/ProductCollection";
import {ProviderCollection} from "../api/providerCollection";
import {InredientsCollection} from "../api/IngredientsCollection";

// "name": "fghj",
//     "ingredient": "cvR8YE8P4hiqechqd",
//     "price": 100.5,
//     "delivery_terms": "fghjkbj",
//     "payment_terms": "dmskldmsakld",
//     "provider": "Ep47WhL76B6qrkMt5",

const centerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export class ProductForm extends React.Component{
    constructor(props) {
        super(props);

        this.selectProvider = this.selectProvider.bind(this);
        this.selectIngredient = this.selectIngredient.bind(this);
        this.saveCurrent = this.saveCurrent.bind(this);

        this.state = {
            obj: props.obj,
            name: props.obj.name,
            ingredient: props.obj.ingredient,
            price: props.obj.price,
            delivery_terms: props.obj.delivery_terms,
            payment_terms: props.obj.payment_terms,
            provider: props.obj.provider,
            error: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.obj !== state.obj) {
            return {
                obj: props.obj,
                name: props.obj.name ? props.obj.name : "",
                ingredient: props.obj.ingredient ? props.obj.ingredient : null,
                price: props.obj.price ? props.obj.price : "",
                delivery_terms: props.obj.delivery_terms ? props.obj.delivery_terms : "",
                payment_terms: props.obj.payment_terms ? props.obj.payment_terms : "",
                provider: props.obj.provider ? props.obj.provider : null,
                error: null
            }
        }else{
            return state;
        }
    }

    selectProvider(provider){
        this.setState(state =>{
           state.provider = provider._id;
           return state;
        });
    }

    selectIngredient(ing){
        this.setState(state =>{
            state.ingredient = ing._id;
            return state;
        });
    }

    saveCurrent(event){
        event.preventDefault();
        if(!this.state.name || this.state.name.length === 0){
            this.setState(state => {
                state.error = <p>название не указано</p>
                return state;
            })
            return;
        }

        if(this.state.ingredient == null){
            this.setState(state => {
                state.error = <p>ингредиент не указан</p>
                return state;
            })
            return;
        }

        if(!this.state.price || this.state.price.length === 0){
            this.setState(state => {
                state.error = <p>цена не указана</p>
                return state;
            })
            return;
        }

        if(!this.state.delivery_terms || this.state.delivery_terms.length === 0){
            this.setState(state => {
                state.error = <p>не указаны условия поствки</p>
                return state;
            })
            return;
        }

        if(!this.state.payment_terms || this.state.payment_terms.length === 0){
            this.setState(state => {
                state.error = <p>не указаны условия оплаты</p>
                return state;
            })
            return;
        }

        if(this.state.provider == null){
            this.setState(state => {
                state.error = <p>поставщик не указан</p>
                return state;
            })
            return;
        }
        
        ProductCollection.update(this.state.obj._id,{
            $set: {
                name: this.state.name,
                ingredient: this.state.ingredient,
                price: this.state.price,
                delivery_terms: this.state.delivery_terms,
                payment_terms: this.state.payment_terms,
                provider: this.state.provider,
            }
        },{upsert: true});
    }

    render() {
        return <div>
            <form onSubmit={this.saveCurrent}>
                <label>название</label>
                <input value={this.state.name} onChange={e => this.setState({name: e.target.value})}/><br/>
                <label>цена</label>
                <input value={this.state.price} onChange={e => this.setState({price: e.target.value})}/><br/>
                <label>условия поставки</label>
                <input value={this.state.delivery_terms} onChange={e => this.setState({delivery_terms: e.target.value})}/><br/>
                <label>условия оплаты</label>
                <input value={this.state.payment_terms} onChange={e => this.setState({payment_terms: e.target.value})}/><br/>
                <label>поставщик: </label>
                <span>{this.state.provider == null ? "none" : ProviderCollection.findOne({_id: this.state.provider}).name}</span><br/>
                <label>ингредиент: </label>
                <span>{this.state.ingredient == null ? "none" : InredientsCollection.findOne({_id: this.state.ingredient}).name}</span><br/>
                <input type={"submit"}/>
            </form>
            {this.state.error}

            <div style={centerStyle}>
                <div style={{display: "flex",flexDirection: "row"}}>
                    <div style={{overflow: "scroll",width: '50%'}}>
                        <p>поставщик</p>
                        <table>
                            <thead>
                            <th>название</th>
                            </thead>
                            <tbody>
                            {ProviderCollection.find({}).fetch().map(provider => <tr onClick={e => {this.selectProvider(provider)}}><td>{provider.name}</td></tr>)}
                            </tbody>
                        </table>
                    </div>
                    <div style={{overflow: "scroll",width: '50%'}}>
                        <p>ингредиент</p>
                        <table>
                            <thead>
                            <th>название</th>
                            </thead>
                            <tbody>
                            {InredientsCollection.find({}).fetch().map(ing => <tr onClick={e => {this.selectIngredient(ing)}}><td>{ing.name}</td></tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    }
}