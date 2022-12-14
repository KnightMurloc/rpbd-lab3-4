import React from 'react';
import {BankDetailCollection} from "../api/BankDetailCollection";
import {ProviderCollection} from "../api/providerCollection";

const centerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export class BankDetailForm extends React.Component{
    constructor(props) {
        super(props);

        this.selectProvider = this.selectProvider.bind(this);
        this.saveCurrent = this.saveCurrent.bind(this);

        this.state = {
            obj: props.obj,
            name: props.obj.name,
            city: props.obj.city,
            TIN: props.obj.TIN,
            settlement_account: props.obj.settlement_account,
            provider: props.obj.provider,
            error: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.obj !== state.obj) {
            return {
                obj: props.obj,
                name: props.obj.name ? props.obj.name : "",
                city: props.obj.city ? props.obj.city : "",
                TIN: props.obj.TIN ? props.obj.TIN : "",
                settlement_account: props.obj.settlement_account ? props.obj.settlement_account : "",
                provider: props.obj.provider ? props.obj.provider : null,
                error: null
            }
        }else{
            return state;
        }
    }

    saveCurrent(event){
        event.preventDefault();

        if(!this.state.name || this.state.name.length === 0){
            this.setState(state => {
               state.error = <p>название не указано</p>;
                return state;
            });
            return;
        }

        if(!this.state.city || this.state.city.length === 0){
            this.setState(state => {
                state.error = <p>город не указан</p>;
                return state;
            });
            return;
        }

        if(!this.state.TIN || this.state.TIN.length !== 10){
            this.setState(state => {
                state.error = <p>некоректный ИНН</p>;
                return state;
            });
            return;
        }

        if(!this.state.settlement_account || this.state.settlement_account.length !== 20){
            this.setState(state => {
                state.error = <p>некоректный расчётный счёт</p>;
                return state;
            });
            return;
        }

        BankDetailCollection.update(this.state.obj._id,{
            $set: {
                name: this.state.name,
                city: this.state.city,
                TIN: this.state.TIN,
                settlement_account: this.state.settlement_account,
                provider: this.state.provider,
            }
        },{upsert: true});
    }

    selectProvider(provider){
        this.setState(state => {
            state.provider = provider._id;
            return state;
        });
    }

    render() {
        return <div>
            <form onSubmit={this.saveCurrent}>
                <label>название</label>
                <input value={this.state.name} onChange={e => this.setState({name: e.target.value})}/><br/>
                <label>город</label>
                <input value={this.state.city} onChange={e => this.setState({city: e.target.value})}/><br/>
                <label>ИНН</label>
                <input value={this.state.TIN} onChange={e => this.setState({TIN: e.target.value})}/><br/>
                <label>расчётный счёт</label>
                <input value={this.state.settlement_account} onChange={e => this.setState({settlement_account: e.target.value})}/><br/>
                <label>поставщик</label>
                <p>{this.state.provider == null ? "none" : ProviderCollection.findOne({_id: this.state.provider}).name}</p>
                <input type={"submit"}/>
            </form>
            {this.state.error}

            <div style={centerStyle}>
                <div style={{overflow: "scroll"}}>
                    <table>
                        <thead>
                            <th>название</th>
                        </thead>
                        <tbody>
                        {ProviderCollection.find({}).fetch().map(provider => <tr onClick={e => {this.selectProvider(provider)}}><td>{provider.name}</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}