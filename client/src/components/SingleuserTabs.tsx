import { useState } from 'react'
import Profile from './Profile';
import Documents from './Documents';
import { useNavigate, useParams } from 'react-router-dom';

interface RouteParams extends Record<string, string | undefined> {
    id: string;
}
interface RouteParams {
    id: string;
}

function SingleuserTabs() {
    const { id } = useParams<RouteParams>();
    const [basicActive, setBasicActive] = useState("tab2");
    const navigate=useNavigate()

    const handleBasicClick = (value: string) => {
        if (value === basicActive) {
            return;
        } else {
            setBasicActive(value)
        }
    }

    let Tab;
    if (basicActive === "tab2") {
        Tab = <Profile id={id}/>
    }
    else
    {
        Tab=<Documents/>
    }

    return (
        <div className='MainTab'>
            <button  className='tabBtn button is-success ml-1' onClick={() => navigate('/') }>Back</button>
            <button  className={basicActive === 'tab2'? 'button is-primary is-light ml-1':"tabBtn button is-success ml-1"} onClick={() => handleBasicClick('tab2')}>Profile</button>
            <button  className={basicActive === 'tab3'? 'button is-primary is-light ml-1':"tabBtn button is-success ml-1"} onClick={() => handleBasicClick('tab3')}>documents</button>
            {Tab}
        </div>

    )
}


export default SingleuserTabs