import { useState } from 'react'
import Profile from './Profile';
import Documents from './Documents';
import { useNavigate, useParams } from 'react-router-dom';
import SingleUserNav from './SingleUserNav';

interface RouteParams extends Record<string, string | undefined> {
    id: string;
}
interface RouteParams {
    id: string;
}

function SingleuserTabs() {
    const { id } = useParams<RouteParams>();
    const [basicActive, setBasicActive] = useState("profileTab");
    const navigate = useNavigate()

    const handleBasicClick = (value: string) => {
        if (value === basicActive) {
            return;
        } else {
            setBasicActive(value)
        }
    }

    let Tab;
    if (basicActive === "profileTab") {
        Tab = <Profile id={id} />
    }
    else {
        Tab = <Documents id={id} />
    }

    return (
        <div className='MainTab'>
            <button className='tabBtn button is-success ml-1' onClick={() => navigate('/')}>Back</button>
            <button className={basicActive === 'profileTab' ? 'button is-primary is-light ml-1' : "tabBtn button is-success ml-1"} onClick={() => handleBasicClick('profileTab')}>Profile</button>
            <button className={basicActive === 'documentTab' ? 'button is-primary is-light ml-1' : "tabBtn button is-success ml-1"} onClick={() => handleBasicClick('documentTab')}>documents</button>
            <SingleUserNav id={ id } />
            {Tab}
        </div>

    )
}


export default SingleuserTabs