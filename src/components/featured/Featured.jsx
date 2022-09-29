import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';

// css
import 'react-circular-progressbar/dist/styles.css';
import styles from './featured.module.scss';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

function Featured(props) {
  
  return (
    <div className={`${styles.featured_container_parent} `}> 
    <div className={`${styles.featured_container} Xcard-shadow`}>
      <div className={styles.header}>
        <h4 className={styles.title}>Total Revenue</h4>
        <MoreVertIcon fontSize="small" />
      </div>

      <div className={styles.main}>
        <div className={styles.featured_chart}>
          <CircularProgressbar value={83} text="83%" strokeWidth={2} />
        </div>

        <p className={styles.title}>Total Items Completed today</p>
        <p className={styles.amount}>54</p>
        <p className={styles.descr}>
          This is the total items completed in the last 24 hours
        </p>

        <div className={styles.summary}>
          <div className={styles.item}>
            <div className={styles.item_title}>Target</div>
            <div className={styles.item_result}>
              <KeyboardArrowDown fontSize='small'/>
              <div className={styles.result_amt}>20%</div>
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.item_title}>Last Week</div>
            <div className={`${styles.item_result}  text-success`}>
              <KeyboardArrowUp fontSize='small'/>
              <div className={styles.result_amt}>46%</div>
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.item_title}>Last Month</div>
            <div className={`${styles.item_result}  text-danger`}>
              <KeyboardArrowDown fontSize='small'/>
              <div className={styles.result_amt}>12%</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
}

export default Featured;
