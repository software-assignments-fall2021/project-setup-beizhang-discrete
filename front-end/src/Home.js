import React, {useEffect} from 'react'

function Home(props) {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);
    return (
        <div className="Home">
            {/*implement home page*/}
            <center><p>home page goes here</p></center>
        </div>
    )
}

export default Home;