import LineChart from './LineChart.jsx'
const Echarts = () => {
  const lineDate = [10,20,30,40,50,60,70,80,90,100]
  return (
    <div style={{ width: 200, height: 150 }}>
      <LineChart lineDate={lineDate} />
    </div>
  )
}
export default Echarts;