import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-kills-per-match',
  standalone: true,
  templateUrl: './kills-per-match.component.html',
  styleUrls: ['./kills-per-match.component.scss'],
})
export class KillsPerMatchComponent implements OnChanges {
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;
  @Input() killsData: { matchId: number; kills: number, title: string }[] = [];

  ngOnChanges(): void {
    if (this.killsData.length) {
      this.createChart();
    }
  }

  private createChart(): void {
    const element = this.chartContainer.nativeElement;
    d3.select(element).select('svg').remove(); // Elimina la gráfica previa si existe

    const margin = { top: 20, right: 30, bottom: 80, left: 50 }; // Más espacio en la parte inferior para títulos largos
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // **Escalas**
    const x = d3.scaleBand()
      .domain(this.killsData.map(d => d.title)) // Usamos el título como dominio
      .range([0, width])
      .padding(0.2); // Espaciado entre los elementos

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.killsData, d => d.kills) || 10])
      .nice()
      .range([height, 0]);

    // **Ejes**
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text') // Rota los textos del eje X para mejor visibilidad
      .style('text-anchor', 'end')
      .attr('dx', '-0.8em')
      .attr('dy', '0.15em')
      .attr('transform', 'rotate(-45)');

    svg.append('g')
      .call(d3.axisLeft(y));

    // **Línea de la gráfica**
    const line = d3.line<{ title: string; kills: number }>()
      .x(d => (x(d.title) ?? 0) + x.bandwidth() / 2) // Centra la línea en cada banda
      .y(d => y(d.kills))
      .curve(d3.curveMonotoneX); // Suaviza la línea

    svg.append('path')
      .datum(this.killsData)
      .attr('fill', 'none')
      .attr('stroke', '#007bff')
      .attr('stroke-width', 2)
      .attr('d', line);

    // **Puntos de la gráfica**
    svg.selectAll('.dot')
      .data(this.killsData)
      .enter().append('circle')
      .attr('cx', d => (x(d.title) ?? 0) + x.bandwidth() / 2)
      .attr('cy', d => y(d.kills))
      .attr('r', 5)
      .attr('fill', '#ff5733')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);
  }
}
