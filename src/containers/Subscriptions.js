import React, {Component} from 'react';
import {connect} from 'react-redux';
import Subscription from '../components/Subscription/Subscription';

class Subscriptions extends Component {

    state = {
        showInputs: false
    };

    addNewSubscription = () => {
        this.setState({showInputs: true});
    };

    render() {
        const subs = this.props.subscriptions.map(subscription => {
            return (
                <Subscription {...subscription} key={subscription.id}/>
            )
        });

        return (
            <div>
                {subs}
                <div className="Subscription" onClick={this.addNewSubscription}>
                    <p className="Subscription-new">Add new</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        subscriptions: state.subscriptions
    }
};

export default connect(mapStateToProps)(Subscriptions);