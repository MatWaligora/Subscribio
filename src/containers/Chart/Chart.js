import React, { Component } from 'react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { connect } from 'react-redux';
import moment from 'moment';
import './Chart.css';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

class chart extends Component {
  render () {
    const data = months.map(month => ({name: month, value: 0}) );
    this.props.subscriptions.forEach(sub => {
      let startMonthIndex = data.findIndex(item => item.name === months[moment(sub.startDate).get('month')]);
      let lastMonthIndex = data.findIndex(item => item.name === months[moment(sub.endDate).get('month')]);
      let startYear = moment(sub.startDate).get('year');
      let endYear = moment(sub.endDate).get('year');
      for (let i = startMonthIndex; i < (endYear > startYear ? 12 : lastMonthIndex); i++) {
        let { amount, period } = sub;
        amount = Number(amount);
        switch (period) {
          case 'month': data[i].value += amount; break;
          case 'week': data[i].value += (amount * 4); break;
          case 'year': data[i].value += (amount / 12); break;
          return;
        }
      }
    });
    return (
      <div className="Chart">
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    subscriptions: state.subscriptions
  }
};

export default connect(mapStateToProps)(chart);
