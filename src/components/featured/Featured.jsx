import './featured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
    return (
        <div className='featured'>
            <div className="top">
                <h1 className="title">Total Users</h1>
                <MoreVertIcon fontSize='small' />
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
                </div>
                <p className="title">Total users joined today</p>
                <p className="count">500</p>
                <p className="desc">
                    Previous records processing. last added users may take time.
                </p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Target</div>
                        <div className="itemResult">
                            <div className="resultCount">1000</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Week</div>
                        <div className="itemResult">
                            <div className="resultCount">1000</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Month</div>
                        <div className="itemResult">
                            <div className="resultCount">1000</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured