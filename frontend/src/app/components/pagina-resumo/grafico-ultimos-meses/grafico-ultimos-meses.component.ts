import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';

@Component({
  selector: 'app-grafico-ultimos-meses',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './grafico-ultimos-meses.component.html',
  styleUrl: './grafico-ultimos-meses.component.scss',
  providers: [
    provideEcharts(),
  ]
})
export class GraficoUltimosMesesComponent {
  
 

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Janeiro', 'Fevereiro', 'Março', 'Abril']
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Despesas',
        type:'line',
        data: [3000, 2000, 1500],
        label: {
          show: true,
          position: 'top',
          formatter: 'R$ {c}'
        }
      },
      {
        name: 'Receitas',
        type:'line',
        data: [1500, 2000, 2500],
        label: {
          show: true,
          position: 'top',
          formatter: 'R$ {c}'
        }
      }
    ]
  }
}
