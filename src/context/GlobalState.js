import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

const initialState = {
	email: '',
	password: '',
	name: '',
	title: '',
	body: '',
	url: '',
	file: '',
	user: {},
	showPassword: '',
	profilePost: []
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(AppReducer, initialState);

	function changeEmail(email) {
		dispatch({
			type: 'CHANGE_EMAIL',
			payload: email
		});
	}

	function changePassword(password) {
		dispatch({
			type: 'CHANGE_PASSWORD',
			payload: password
		});
	}

	function changeName(name) {
		dispatch({
			type: 'CHANGE_NAME',
			payload: name
		});
	}

	function changeTitle(title) {
		dispatch({
			type: 'CHANGE_TITLE',
			payload: title
		});
	}

	function changeBody(body) {
		dispatch({
			type: 'CHANGE_BODY',
			payload: body
		});
	}

	function changeUrl(url) {
		dispatch({
			type: 'CHANGE_URL',
			payload: url
		});
	}

	function changeFile(file) {
		dispatch({
			type: 'CHANGE_FILE',
			payload: file
		});
	}

	function changeUser(user) {
		dispatch({
			type: 'CHANGE_FILE',
			payload: user
		});
	}

	function changeShowPassword(password) {
		dispatch({
			type: 'CHANGE_SHOWPASSWORD',
			payload: password
		});
	}

	function changeProfilePost(post) {
		dispatch({
			type: 'CHANGE_PROFILE_POST',
			payload: post
		});
	}

	return (
		<GlobalContext.Provider
			value={{
				email: state.email,
				password: state.password,
				name: state.name,
				body: state.body,
				title: state.title,
				url: state.url,
				file: state.file,
				user: state.user,
				showPassword: state.showPassword,
				profilePost: state.profilePost,
				changeEmail,
				changePassword,
				changeName,
				changeTitle,
				changeBody,
				changeUrl,
				changeFile,
				changeUser,
				changeShowPassword,
				changeProfilePost
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
