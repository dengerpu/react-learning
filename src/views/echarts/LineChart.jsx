import React, { useEffect, useRef } from 'react';
// import * as echarts from 'echarts';
import * as echarts from 'echarts/core';
import {
    LineChart
} from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
} from 'echarts/components';
import {
    CanvasRenderer,
    SVGRenderer
} from 'echarts/renderers';

// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LineChart,
    CanvasRenderer,
    SVGRenderer,
    LegendComponent
]);
const EchartComponent = ({ lineData = [] }) => {
    const chartRef = useRef(null);
    let chartInstance = null;
    const initChart = () => {
        const isSingle = (lineData.length === 1);
        const symbol = () => isSingle ? 'emptyCircle' : 'none';
        chartInstance = echarts.init(chartRef.current);
        const option = {
            grid: {
                containLabel: false,
            },
            xAxis: [{
                show: false,
                type: 'category',
                boundaryGap: false,
            }],
            yAxis: [{
                show: false
            }],
            tooltip: {
                show: false,
                // 禁用小手指光标
                pointer: 'none'
            },
            series: [{
                name: 'chart',
                type: 'line',
                smooth: true,
                symbol,
                symbolSize: 5,
                showSymbol: true,
                lineStyle: {
                    width: 2,
                    color: '#2261F5'
                },
                areaStyle: { //区域填充样式
                    origin: 'start',
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(47,109,235,0.24)'
                    }, {
                        offset: 1,
                        color: 'rgba(47,109,235,0)'
                    }], false)
                },
                data: lineData,
                // 自定义系列，用于在数据点上显示竖线
                markLine: {
                    symbol: 'none',
                    data: [
                        {
                            xAxis: 0, 
                            lineStyle: {
                                color: 'red', // 竖线颜色
                                type: [10, 5] // 竖线样式
                            }
                        }
                    ]
                }
            }],
        };
        if (isSingle) {
            option.series[0].markLine = {
                symbol: 'none',
                data: [
                    {
                        xAxis: 0, // 在 y 轴数值为 30 的位置显示竖线
                        lineStyle: {
                            color: 'red', // 竖线颜色
                            type: [10, 5] // 竖线样式
                        }
                    }
                ]
            };
        }
        chartInstance.setOption(option);
    };
    const resizeChart = () => {
        if (chartInstance) {
            chartInstance.resize();
        }
    };
    useEffect(() => {
        initChart();
        chartInstance.getZr().on('mousemove', function (params) {
            chartInstance.getZr().setCursorStyle('default');
        });
        window.addEventListener('resize', resizeChart);
        // 注意：这里需要返回一个清理函数，以确保在组件卸载时销毁ECharts实例
        return () => {
            window.removeEventListener('resize', resizeChart);
            chartInstance.dispose();
        };
    }, []);
    return <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>;
};
export default EchartComponent;