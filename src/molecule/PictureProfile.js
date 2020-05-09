import React from 'react';

function PictureProfile({ title, body, img }) {
	return (
		<div>
			<img src={img} alt="profile" style={{ width: '200px', height: '200px' }} />
		</div>
	);
}

export default PictureProfile;
