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
import moment from 'moment/moment';

const default_data = [
  {
    month: 'January',
    count: 850,
  },
  {
    month: 'Feb',
    count: 1200,
  },
  {
    month: 'March',
    count: 200,
  },
  {
    month: 'April',
    count: 1800,
  },
  {
    month: 'May',
    count: 2181,
  },
  {
    month: 'June',
    count: 2500,
  },
  {
    month: 'July',
    count: 1670,
  },
];

function Chart(props) {
  let {aspect, title, data} = props;
  let dataWithMonth = default_data;

  data = !data ? default_data : data;
  if(data.length > 0){
    dataWithMonth = data.map(data => {
      return {
          month: moment(data.month).format('MMMM'),
          count: data.count
      }
  });

  }

  return (
    <div className={`${styles.chart_container} card-shadow`}>
      <div className={styles.title}>{title}</div>
      <ResponsiveContainer  aspect={aspect}>
        <AreaChart
          width={500}
          height={400}
          data={dataWithMonth}
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
          <XAxis dataKey="month" fontSize={'15px'} stroke="gray" />
          <YAxis fontSize={'15px'}/>
          <Tooltip />
          <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#custom-fill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
