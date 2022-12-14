import React from 'react';
import {ProviderCollection} from "../api/providerCollection";

export class ProviderForm extends React.Component{
    constructor(props) {
        super(props);

        this.saveCurrent = this.saveCurrent.bind(this);

        this.state = {
            obj: props.obj,
            name: props.obj.name,
            post_address: props.obj.post_address,
            phone_number: props.obj.phone_number,
            fax: props.obj.fax,
            email: props.obj.email,
            error: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.obj !== state.obj) {
            return {
                obj: props.obj,
                name: props.obj.name ? props.obj.name : "",
                post_address: props.obj.post_address ? props.obj.post_address : "",
                phone_number: props.obj.phone_number ? props.obj.phone_number : "",
                fax: props.obj.fax ? props.obj.fax : "",
                email: props.obj.email ? props.obj.email : "",
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
               state.error = <p>имя не указано</p>
                return state;
            });
            return;
        }

        if(!this.state.post_address || this.state.post_address.length === 0){
            this.setState(state => {
                state.error = <p>почтовый адресс не указан</p>
                return state;
            });
            return;
        }

        if(!this.state.phone_number || this.state.phone_number.length === 0){
            this.setState(state => {
                state.error = <p>номер не указан</p>
                return state;
            });
            return;
        }

        if(!this.state.fax || this.state.fax.length === 0){
            this.setState(state => {
                state.error = <p>факс не указан</p>
                return state;
            });
            return;
        }

        if(!this.state.email || this.state.email.length === 0){
            this.setState(state => {
                state.error = <p>email не указан</p>
                return state;
            });
            return;
        }

        ProviderCollection.update(this.state.obj._id, {
            $set: {
                name: this.state.name,
                post_address: this.state.post_address,
                phone_number: this.state.phone_number,
                fax: this.state.fax,
                email: this.state.email,
            }
        },{upsert: true});

        // TestCollection.update(this.state.obj._id, {
        //     $set: {
        //         text: this.state.text
        //     },
        //
        // },{upsert: true});
        // this.props.tab.forceUpdate();
    }

    render() {
        return <div>
            <form onSubmit={this.saveCurrent}>
                <label>название</label>
                <input value={this.state.name} onChange={e => {this.setState({name: e.target.value})}}/><br/>
                <label>почтовый адресс</label>
                <input value={this.state.post_address} onChange={e => {this.setState({post_address: e.target.value})}}/><br/>
                <label>ноомер телефона</label>
                <input value={this.state.phone_number} onChange={e => {this.setState({phone_number: e.target.value})}}/><br/>
                <label>факс</label>
                <input value={this.state.fax} onChange={e => {this.setState({fax: e.target.value})}}/><br/>
                <label>email</label>
                <input value={this.state.email} onChange={e => {this.setState({email: e.target.value})}}/><br/>
                <input type={"submit"}/>
            </form>
            {this.state.error}
        </div>
    }
}