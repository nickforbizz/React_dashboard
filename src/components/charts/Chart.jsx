import styles from './chart.module.scss';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'January',
    amt: 850,
  },
  {
    name: 'Feb',
    amt: 1200,
  },
  {
    name: 'March',
    amt: 200,
  },
  {
    name: 'April',
    amt: 1800,
  },
  {
    name: 'May',
    amt: 2181,
  },
  {
    name: 'June',
    amt: 2500,
  },
  {
    name: 'July',
    amt: 1670,
  },
];

function Chart({aspect, title}) {
  return (
    <div className={`${styles.chart_container} card-shadow`}>
      <div className={styles.title}>{title}</div>
      <ResponsiveContainer  aspect={aspect}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id='custom-fill' x1={0} y1={0} x2={0} y2={1}>
              <stop offset={'5%'} stopColor='#8884d8' stopOpacity={0.9} />
              <stop offset={'95%'} stopColor='#8884d8' stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className={styles.chart_grid}/>
          <XAxis dataKey="name" fontSize={'15px'} stroke="gray"/>
          <YAxis fontSize={'15px'}/>
          <Tooltip />
          <Area type="monotone" dataKey="amt" stroke="#8884d8" fillOpacity={1} fill="url(#custom-fill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
