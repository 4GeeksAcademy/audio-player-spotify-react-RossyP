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
				if(index > 0){
					reproductorAudio.current.src = "https://playground.4geeks.com" + allSongs[index-1].url
					console.log(reproductorAudio.current)
					reproductorAudio.current.play()
					setId(allSongs[index-1].id)
				}
			}
		})
	}


	function buttonForward(){
		allSongs.forEach((item, index) => {
			if(id === item.id){
				if(index+1 < allSongs.length){
					reproductorAudio.current.src = "https://playground.4geeks.com" + allSongs[index+1].url
					reproductorAudio.current.play()
					setId(allSongs[index+1].id)
				}
			}
		})
	}

	function obtenerId(id){
		setId(id)
	}

	useEffect(()=>{
		listSongs()
		buttonStatus()
		
	},[])

	return (
		<div className="d-flex flex-column justify-content-center align-items-center" style={{height: "100vh"}}>
			<div  className="w-50 bg-primary d-flex flex-column justify-content-center align-items-center">
				<ul className="text-start p-0 m-0"  style={{listStyle: "none", width:"350px", backgroundColor: "pink", maxHeight:"460px", overflow:"auto"}}>
				{
					allSongs.map((item, index) => {
						return(
								<div key={item.id} onClick={()=>{obtenerUrl(item.url), obtenerId(item.id)}} className="bg-warning border p-2">
									<li><span className="fw-bold ps-3">{item.id}. </span>{item.name}</li>
								</div>
						)
					})
				}
				</ul>
				<div className="bg-danger d-flex justify-content-center align-items-center" style={{width:"350px", height:"60px"}}>
					<div>
						<audio  ref={reproductorAudio}></audio>
					</div>
					<div>
						<button className="rounded-circle fs-5 py-1 px-2" onClick={buttonBack}>
							<FontAwesomeIcon icon={faBackward} />
						</button>
						<button className="rounded-circle fs-5 py-1 px-2" onClick={buttonStatus}>
							{buttonPlay ? <FontAwesomeIcon icon={faCirclePlay} /> : <FontAwesomeIcon icon={faPause} />}
						</button>
						<button className="rounded-circle fs-5 py-1 px-2" onClick={buttonForward}>
							<FontAwesomeIcon icon={faForward} />
						</button>
					</div>
					
				</div>
			</div>

		</div>
	);
};

export default Home;
