import React, { Component } from 'react';
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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
      const {startDate, endDate, amount, period} = sub;
      const startMonthIndex = data.findIndex(item => item.name === months[moment(startDate).get('month')]);
      const lastMonthIndex = data.findIndex(item => item.name === months[moment(endDate).get('month')]);
      const startYear = moment(startDate).get('year');
      const endYear = moment(endDate).get('year');

      for (let i = startMonthIndex; i <= (endYear > startYear ? 11 : lastMonthIndex); i++) {
        let amountToAdd = Number(amount);
        switch (period) {
          case 'month': data[i].value += amountToAdd; break;
          case 'week': data[i].value += (amountToAdd * 4); break;
          case 'year': data[i].value += (amountToAdd / 12); break;
        }
      }

    });
    return (
      <div className="Chart">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 15, left: 5 }}>
            <Line type="monotone" dataKey="value" stroke="#f68113" />
            <XAxis dataKey="name" label={{ value: "Month", position: 'insideBottom', offset: -10, stroke: '#f68113' }}/>
            <YAxis dataKey="value" label="Value" label={{ value: "Value", angle: -90, position: 'insideLeft',stroke: '#f68113' }}/>
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    subscriptions: state.sub.subscriptions
  }
};

export default connect(mapStateToProps)(chart);
