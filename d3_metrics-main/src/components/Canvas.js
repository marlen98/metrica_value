import React, { useRef } from 'react';
import useWindowSize from './useWindowSize';
import Transformation from './Transformation';
import * as d3 from 'd3';
import 'moment/locale/ru';

const Canvas = () => {
  //console.log(props.data);
  const nameRef = useRef(null); //ссылается на элемент в DOM дереве (svg)
  const [width, height] = useWindowSize();
  const _data = Transformation();
  const color = ['#503143', '#9a532b', '#c49b60', '#79ad9f', '#193439', '#1a1a1d'];

  console.log(width, height);
  //МАССИВ МЕСЯЦЕВ и ДОБАВЛЕНИЕ Y КООРДИНАТЫ
  let domainValue = [];
  let maxDomain = [];

  let ind;

  _data.forEach((num, index, arr) => {
    num.date.locale('ru');
    if (num.id === 0) {
      domainValue.push(num.date.format('MMMM'));
      num['yCoordinate'] = 0;
    } else {
      num['yCoordinate'] = arr[index - 1].yCoordinate + arr[index - 1].fact;
    }

    ind = num.id;
  });

  _data.forEach((num, index, arr) => {
    if (num.id === ind) {
      maxDomain.push(num.yCoordinate + num.fact);
    }
  });

  //console.log(maxDomain);
  console.log(_data);

  // D3
  const svg = d3.select('svg');

  // MARGINS
  const margin = { top: 20, right: 20, bottom: 100, left: 100 };
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.bottom - margin.top;
  const graph = svg.append('g').attr('width', graphWidth).attr('height', graphHeight);
  const bars = graph.selectAll('rect').data(_data);

  // SCALES
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(maxDomain)])
    .range([0, graphHeight]);
  const x = d3.scaleBand().domain(domainValue).range([0, width]).padding(0.2);

  // КООРДИНАТНЫЕ ПРЯМЫЕ
  const yAxisGroup = graph.append('g');
  const xAxisGroup = graph.append('g').attr('transform', `translate(0, ${graphHeight})`);

  //УДАЛЕНИЕ БАРОВ
  bars.exit().remove();

  //ДОБАВЛЯЕМ АТРИБУТЫ ДЛЯ RECT, КОТОРЫЕ УЖЕ В DOM
  bars
    .attr('width', x.bandwidth())
    .attr('height', (d) => y(d.fact))
    .attr('x', (d) => x(d.date.format('MMMM')))
    .attr('y', (d) => y(d.yCoordinate))
    .attr('fill', (d) => color[d.id]);

  //ДОБАВЛЯЕМ RECT В DOMы
  bars
    .enter()
    .append('rect')
    .attr('width', x.bandwidth())
    .attr('height', (d) => y(d.fact))
    .attr('x', (d) => x(d.date.format('MMMM')))
    .attr('y', (d) => y(d.yCoordinate))
    .attr('fill', (d) => color[d.id % color.length]);

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y).tickFormat((d) => d.fact);
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
  yAxisGroup.selectAll('text').attr('transform', 'translate(500)');

  return <svg ref={nameRef} width={width} height={height}></svg>;
};

export default Canvas;

// TODO: что-то надо сделать с тем, что блоки растянуты больше, чем нужно
// возможно из-за этого не видно у координаты -- НЕТ
// их совсем нет
