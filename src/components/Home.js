import React, {useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import './Home.css'
import Card from './Card.js'

function Home(props) {

    const [profiles, setProfiles] = useState([]);
    const [showList, setShowList] = useState(false);
    const [page, setPage] = useState(1);
    const loading = true;

    const getProfile = async (page) => {
        const api = 'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/' + page + '/24';
        const fetchProfile = await fetch(api);
        const fetchedProfile = await fetchProfile.json();
        const profilesReady = fetchedProfile.list;
        setProfiles(profiles.concat(profilesReady));
        setShowList(true);
    }

    const onScroll = () => {
        const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        
        if (windowBottom >= docHeight-1) {
            setPage(page + 1);
        }
        }


    useEffect(() =>{
        getProfile(page);
        window.addEventListener('scroll', onScroll);
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);


        const setProfile = (id, name) => {
            sessionStorage.setItem('id', id);
            props.setVisitedProfiles(oldArr => [...oldArr, name]);
        }


        const navigate = useNavigate();


  return (
    <div className='home'>
        <div className='profileList'>
            {showList ?
            profiles.map((item) =>
                <div className='cardList' onClick={() => {setProfile(item.id, item.name); navigate(`/user/${item.id}`) }} >
                    <Card name={item.name} prefix={item.prefix} title={item.title} image={item.imageUrl} id={item.id}/>
                </div>
                    )
            : ''}
        </div>
        <div className='loading'>
            {loading ? <div id='spinner'></div> : ''}
        </div>
    </div>
  )
}

export default Home