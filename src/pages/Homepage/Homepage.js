import ArtistCard from "../../components/ArtistCard/ArtistCard"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import styles from "./Homepage.module.css"
import NavHeader from "../../components/NavHeader/NavHeader"
import Footer from "../../components/Footer/Footer"
import FilterBtn from "../../components/FilterBtn/FilterBtn"

export default function Homepage({ user }) {
    const [artArr, setArtArr] = useState([])
    const [refresh, setRefresh] = useState(false)
    const getData = () => {
        (async () => {
            try {
                const response = await axios.get(`/api/art/`)
                console.log("response is", response)
                setArtArr(response.data)
                console.log("updated art", response.data)
                if (response.status === 200) {
                    setRefresh(!refresh)
                } else {
                    console.log('Something went wrong')
                }

            } catch (err) {
                console.log(err)
            }
        })()
    }

    useEffect(() => {
        getData()
    }, [])
    const loaded = () => {
        return (
            <div>
                <Link to={`/user/${user._id}`}> <p>Link to User Page</p></Link>
                <NavHeader />
                <div className={styles.discoverArt}>
                    {artArr.map((artData, idx) => {
                        return (
                            <div>
                                <Link className={styles.userAvatar} to={`/art/${artData._id}`}> <img src={artData.user.avatar} style={{ width: 69, height: 69, borderRadius: 40, margin: "20px 100x 3px 100px" }} /></Link>
                                <div className={styles.artText} >{artData.user.username}</div>
                            </div>
                        )
                    })}
                </div>
                <div className={styles.filterBar}>
                    <FilterBtn />
                </div>
                <div>
                    {artArr.map((artData, idx) => {
                        return (
                            <ArtistCard user={user} artData={artData} key={idx} className={styles.artistCard} />
                        )
                    })}
                </div>
                <Footer />
            </div>
        )
    }

    const loading = () => {
        return <h1>Loading</h1>
    }
    return (
        user && user.artCollection ? loaded() : loading()
    )
};

