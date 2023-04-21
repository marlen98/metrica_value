// TODO: Аргументы функции генератора:
// Количество значений  --  numOfBars
// Точка старта (дата начала)  -- arrOfDate
// Количество показателей внутри бара   -- numOfValueInBar
// Минимальное значение  -- minValue
// Максимальное значение  -- maxValue

//Функция для генерации рандомной даты
import React from 'react';

const Transformation = () => {
  const [range, setRange] = React.useState([]);
  React.useEffect(() => {
    function generateRandomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    //кол-во баров от 0 до 25, пример
    let numOfBars = Math.round(Math.random() * (10 - 1) + 1);
    //Рандомное кол-во показаний в баре
    let numOfValueInBar = Math.round(Math.random() * (10 - 1) + 1);

    // локализация moment js
    let moment = require('moment');
    moment.locale('ru');

    let dateOfStart = moment(generateRandomDate(new Date(2010, 0, 1), new Date()));
    // let arrOfDate = Array.from(new Array(numOfBars), () => {
    //   return dateOfStart.add(1, 'months'); //.format('MMMM');
    // });

    let planValue = Math.round(Math.random() * 100);
    // let preFactValue, preYCoordinateValue, yCoordinateValue;
    let factValue = Math.round(Math.random() * 100);
    // console.log(numOfBars);
    // console.log(numOfValueInBar);
    //Улучшенная версия generateValue
    setRange(
      Array.from(new Array(numOfBars * numOfValueInBar), (_, i) => {
        moment.locale('ru');
        // preFactValue = factValue;
        factValue = Math.round(Math.random() * (100 - 1) + 1);
        // preYCoordinateValue = yCoordinateValue;
        if (i % numOfValueInBar === 0) {
          // yCoordinateValue = 0;
          planValue = Math.round(Math.random() * 100);
          dateOfStart.add(1, 'months');
        } //else {
        //   yCoordinateValue = preFactValue + preYCoordinateValue;
        // }
        return {
          id: i % numOfValueInBar, // индекс класса элементов
          date:
            i % numOfValueInBar === 0
              ? moment(dateOfStart.format()).add(1, 'months')
              : moment(dateOfStart).set({ M: dateOfStart.format('M') }), //arrOfDate[Math.floor(i / numOfValueInBar)], //за какой период данные
          fact: factValue, //i * 100 + 100,
          //yCoordinate: yCoordinateValue,
          rank: 1, //разрядность = 1,
          byPeriod: true, //true/false, отображение за период (true) или на дату (false)
          hasPlan: false, //true/false, есть план или нет плана
          plan: planValue, //плановое,
          measure: '%', //единица измерения});
        };
      }),
    );
  }, []);
  //console.log(range[0].date.format('L'));
  return range;
};
//console.log(range);
//console.log(range[0].date.format('L'));
//console.log(range[numOfBars * numOfValueInBar - 1].date.format('L'));

export default Transformation;

//let date = range(numOfBars, numOfValueInBar);

//
//SVG
//

// const margin = {
//   top: 50,
//   right: 50,
//   bottom: 50,
//   left: 50,
// };

// const width = 1400 - margin.left - margin.right;
// const height = 700 - margin.top - margin.bottom;

// const svg = d3
//   .select('main')
//   .append('svg')
//   .attr('width', width + margin.left + margin.right)
//   .attr('height', height + margin.top + margin.bottom)
//   .style('border', '2px solid green')
//   .append('g')
//   .attr('transform', `translate(${margin.left}, ${margin.top})`);

// //date.map((item, n) => svg.append('rect').attr('class', 'bar').attr('width', 100));

// function draw() {
//   const barWidth = 45;
//   const barOffset = 23;
//   const valueRange = [0, d3.max((date, d) => d.indicators[0].fact)];

//   //почему scaleLinear не функция????
//   //const y = d3.scaleLinear().domain(valueRange).range([0, 960]);
//   const bars = svg.selectAll('.bar').date(date);

//   //УДАЛЕНИЕ ЭЛЕМЕНТОВ!!!!!!
//   bars.exit().transition().duration(1000).style('fill', 'Yellow').style('opacity', '0').remove();

//   //почему это обновляет данные???  обнавляет весь DOM
//   bars
//     .attr('class', 'new bar')
//     .style('fill', '#fff')
//     .transition() // не работает!!!!!!!!
//     .duration(1000)
//     .style('opacity', '1')
//     .style('fill', 'rgb(40, 82, 78)')
//     .attr('height', (d) =>
//       d.indicators.reduce(function (accumulator, currentValue) {
//         return accumulator + currentValue.fact;
//       }, -1),
//     )
//     .attr('x', (d, n) => n * barOffset + n * barOffset);

//   bars
//     .enter()
//     .append('rect')
//     .attr('class', 'bar')
//     .style('fill', '#fff')
//     .attr('width', barWidth)
//     .transition()
//     .duration(1000)
//     .style('opacity', '1')
//     .style('fill', 'rgb(180, 70, 85)')
//     .attr('height', (d) =>
//       d.indicators.reduce(function (accumulator, currentValue) {
//         return accumulator + currentValue.fact;
//       }, -1),
//     ) //надо будет поскладывать
//     .attr('x', (d, n) => n * barOffset + n * barOffset);
// }

// draw();

// setInterval(() => {
//   //const elementNum = Math.round(Math.random() * numOfBars);
//   //date[elementNum].indicators[0].fact = Math.round(Math.random() * 500);

//   //Рандомные значения для аргументов функции генератора
//   numOfBars = Math.round(Math.random() * 25); //кол-во баров от 0 до 25, пример

//   //Рандомное кол-во показаний в баре
//   numOfValueInBar = Math.round(Math.random() * (6 - 1) + 1);

//   // console.log('кол-во баров на графике = ' + numOfBars);
//   // console.log('кол-во составляющих бара = ' + numOfValueInBar);
//   // //console.log('дата начала отсчета = ' + dateOfStart);
//   // console.log('____________________________________________________');
//   date = range(numOfBars, numOfValueInBar);

//   draw();
// }, 2000);
