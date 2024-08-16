import { useEffect, useRef, useState } from "react";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';


import rigoImage from "../../img/rigo-baby.jpg";


const Home = () => {

	const [allSongs, setAllSongs] = useState([])
	const [id, setId] = useState("")
	const [url, setUrl] = useState("https://youtu.be/R8Q8vqVT_HI?si=iLwIrT08au7Ulsr4")
	const [buttonPlay, setButtonPlay] = useState(false);
	const reproductorAudio = useRef()

	// console.log(id)
	// console.log(url)
	console.log(buttonPlay)

	function listSongs(){
		fetch(`https://playground.4geeks.com/sound/songs`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data.songs)
			
			setAllSongs(currentSongs => currentSongs.concat(data.songs))
			// let ids = data.songs.map((item) => item.id)
			// let urls = data.songs.map((item) => item.url)

			// setId(currentId => currentId.concat(ids))
			// setUrl(currentUrl => currentUrl.concat(urls))

		})
	}

	function buttonStatus(){
		setButtonPlay(currentplay => !currentplay)
		if(!buttonPlay){
			reproductorAudio.current.play()
		}else{
			reproductorAudio.current.pause()
		}
	}
	
	function obtenerUrl(url){
		setUrl(url)
	}
	useEffect(()=>{
		listSongs()
		
	},[])

	return (
		<div className="text-center">
			<ol>
			{
				allSongs.map((item) => {
					return(
						<div>
							<div onClick={()=>obtenerUrl(item.url)}>
								<li key={item.id}>{item.name}</li>
							</div>
						</div>
						
					)
				})
			}
			</ol>
			<div>
				<div>
					<audio controls ref={reproductorAudio}>
						<source src={url} type="audio/mpeg"/>
						<source src={url} type="audio/ogg"/>
					</audio>
				</div>
				<div>
					<button onClick={buttonStatus}>
						<FontAwesomeIcon icon={faPlay} />
					</button>
				</div>
				
			</div>
		</div>
	);
};

export default Home;
