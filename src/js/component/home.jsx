import { useEffect, useRef, useState } from "react";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faCirclePlay, faPause, faBackward } from '@fortawesome/free-solid-svg-icons';

import rigoImage from "../../img/rigo-baby.jpg";


const Home = () => {

	const [allSongs, setAllSongs] = useState([])
	const [id, setId] = useState()
	const [index, setIndex] = useState()
	const [url, setUrl] = useState("")
	const [buttonPlay, setButtonPlay] = useState(false);
	const reproductorAudio = useRef()

	console.log(id);
	console.log(url);
	
	
	console.log(buttonPlay)

	function listSongs(){
		fetch(`https://playground.4geeks.com/sound/songs`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data.songs)
			
			setAllSongs(currentSongs => currentSongs.concat(data.songs))
	
		})
	}

	
	function buttonStatus(){
		
		setButtonPlay(currentplay => !currentplay)
	
		if(buttonPlay){
			
			reproductorAudio.current.play()
		}else{
			reproductorAudio.current.pause()
		}
	}

	function obtenerUrl(url){
		setUrl(url)
		reproductorAudio.current.src = "https://playground.4geeks.com" + url
		reproductorAudio.current.play()
		setButtonPlay(false)
	}

	function buttonBack(){
		allSongs.forEach((item, index) => {
			if(id === item.id){
				if(id > 0){
					reproductorAudio.current.src = "https://playground.4geeks.com" + allSongs[index-1].url
					console.log(reproductorAudio.current)
					reproductorAudio.current.play()
					setId(allSongs[index-1].id)
				}
			}
		})
	}


	function buttonForward(){

	}

	function obtenerId(id){
		setId(id)
	}

	useEffect(()=>{
		listSongs()
		buttonStatus()
		
	},[])

	return (
		<div className="text-center">
			<ol>
			{
				allSongs.map((item, index) => {
					return(
							<div key={item.id} onClick={()=>{obtenerUrl(item.url), obtenerId(item.id)}}>
								<li>{item.name}</li>
							</div>
					)
				})
			}
			</ol>
			<div>
				<div>
					<audio  ref={reproductorAudio}></audio>
				</div>
				<div>
					<button onClick={buttonBack}>
						<FontAwesomeIcon icon={faBackward} />
					</button>
					<button onClick={buttonStatus}>
						{buttonPlay ? <FontAwesomeIcon icon={faCirclePlay} /> : <FontAwesomeIcon icon={faPause} />}
					</button>
					<button onClick={buttonForward}>
						<FontAwesomeIcon icon={faForward} />
					</button>
				</div>
				
			</div>
		</div>
	);
};

export default Home;
