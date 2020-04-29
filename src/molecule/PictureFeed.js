import React, { useState } from 'react';
import './PictureFeed.css';

function PictureFeed() {
	const [ heart, setHeart ] = useState(true);
	return (
		<div className="wrapper_img_feed">
			<h3>ramesh</h3>
			<img src="images.jpg" alt="profile" className="img_feed" />
			<img src={heart ? 'heart_full.svg' : 'heart_empty.svg'} alt="heart for like" />
			<p>title</p>
			<p>this is an amzing post</p>
			<input type="text" placeholder="add a comment" />
		</div>
	);
}

export default PictureFeed;
