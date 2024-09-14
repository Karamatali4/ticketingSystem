

import { DualAxes } from '@ant-design/plots';
import React from 'react';
import ReactDOM from 'react-dom';

const AgentDashboard = () => {
  const uvBillData = [
    { time: '2019-03', value: 350, type: 'uv' },
    { time: '2019-04', value: 900, type: 'uv' },
    { time: '2019-05', value: 300, type: 'uv' },
    { time: '2019-06', value: 450, type: 'uv' },
    { time: '2019-07', value: 470, type: 'uv' },
    { time: '2019-03', value: 220, type: 'bill' },
    { time: '2019-04', value: 300, type: 'bill' },
    { time: '2019-05', value: 250, type: 'bill' },
    { time: '2019-06', value: 220, type: 'bill' },
    { time: '2019-07', value: 362, type: 'bill' },
  ];

  const transformData = [
    { time: '2019-03', count: 800, name: 'a' },
    { time: '2019-04', count: 600, name: 'a' },
    { time: '2019-05', count: 400, name: 'a' },
    { time: '2019-06', count: 380, name: 'a' },
    { time: '2019-07', count: 220, name: 'a' },
    { time: '2019-03', count: 750, name: 'b' },
    { time: '2019-04', count: 650, name: 'b' },
    { time: '2019-05', count: 450, name: 'b' },
    { time: '2019-06', count: 400, name: 'b' },
    { time: '2019-07', count: 320, name: 'b' },
    { time: '2019-03', count: 900, name: 'c' },
    { time: '2019-04', count: 600, name: 'c' },
    { time: '2019-05', count: 450, name: 'c' },
    { time: '2019-06', count: 300, name: 'c' },
    { time: '2019-07', count: 200, name: 'c' },
  ];

  const config = {
    xField: 'time',
    scale: { color: { range: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#6F5EF9'] } },
    children: [
      {
        data: uvBillData,
        type: 'line',
        yField: 'value',
        colorField: 'type',
        shapeField: 'smooth',
        style: { lineWidth: 3, lineDash: [5, 5] },
      },
      {
        data: transformData,
        type: 'line',
        yField: 'count',
        colorField: 'name',
        axis: { y: false },
        style: { lineWidth: 3 },
      },
      {
        data: transformData,
        type: 'point',
        yField: 'count',
        colorField: 'name',
        sizeField: 3,
        shapeField: 'point',
        axis: { y: false },
        tooltip: false,
      },
    ],
  };


  const data = [
    {
      Month: 'Jan',
      Evaporation: 2,
      Precipitation: 2.6,
      Temperature: 2,
    },
    {
      Month: 'Feb',
      Evaporation: 4.9,
      Precipitation: 5.9,
      Temperature: 2.2,
    },
    {
      Month: 'Mar',
      Evaporation: 7,
      Precipitation: 9,
      Temperature: 3.3,
    },
    {
      Month: 'Apr',
      Evaporation: 23.2,
      Precipitation: 26.4,
      Temperature: 4.5,
    },
    {
      Month: 'May',
      Evaporation: 25.6,
      Precipitation: 28.7,
      Temperature: 6.3,
    },
    {
      Month: 'Jun',
      Evaporation: 76.7,
      Precipitation: 70.7,
      Temperature: 10.2,
    },
    {
      Month: 'Jul',
      Evaporation: 135.6,
      Precipitation: 175.6,
      Temperature: 20.3,
    },
    {
      Month: 'Aug',
      Evaporation: 162.2,
      Precipitation: 182.2,
      Temperature: 23.4,
    },
    {
      Month: 'Sep',
      Evaporation: 32.6,
      Precipitation: 48.7,
      Temperature: 23,
    },
    {
      Month: 'Oct',
      Evaporation: 20,
      Precipitation: 18.8,
      Temperature: 16.5,
    },
    {
      Month: 'Nov',
      Evaporation: 6.4,
      Precipitation: 6,
      Temperature: 12,
    },
    {
      Month: 'Dec',
      Evaporation: 3.3,
      Precipitation: 2.3,
      Temperature: 6.2,
    },
  ];

  const configTwo = {
    data,
    xField: 'Month',
    scale: { y: { nice: false } },
    children: [
      {
        type: 'line',
        yField: 'Temperature',
        shapeField: 'smooth',
        colorField: '#EE6666',
        scale: { y: { domainMax: 30 } },
        axis: {
          y: {
            title: 'Temperature (°C)',
            style: { titleFill: '#EE6666' },
          },
        },
      },
      {
        type: 'interval',
        yField: 'Evaporation',
        colorField: '#5470C6',
        scale: { y: { domainMax: 200 } },
        style: { fillOpacity: 0.8 },
        axis: {
          y: {
            position: 'right',
            title: 'Evaporation (ml)',
            style: { titleFill: '#5470C6' },
          },
        },
      },
      {
        type: 'line',
        yField: 'Precipitation',
        shapeField: 'smooth',
        colorField: '#91CC75',
        style: {
          lineWidth: 2,
          lineDash: [2, 2],
        },
        axis: {
          y: {
            position: 'right',
            title: 'Precipitation (ml)',
            style: { titleFill: '#91CC75' },
          },
        },
      },
    ],
  };
  return (
  <>
  <DualAxes {...config} />
  <DualAxes {...configTwo} />
  </>

);
};

export default AgentDashboard;


