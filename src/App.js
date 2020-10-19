import React from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import Display from './Display';
import Form from './Form';

function App() {
	// URL VARIABLE
	const url = 'http://localhost:4500';
	// STATE TO HOLD DOGS
	const [dogs, setDogs] = React.useState([]);
	// Empty dog for Form
	const emptyDog = {
		name: '',
		age: 0,
		img: '',
	};

	//SelectDog for user to select a dog to update
	const [selectedDog, setSelectedDog] = React.useState(emptyDog);

	// FUNCTION TO FETCH DOGS
	const getDogs = () => {
		fetch(url + '/dog/')
			.then((response) => response.json())
			.then((data) => {
				setDogs(data);
			});
	};
	// Get dogs on page load
	React.useEffect(() => {
		getDogs();
	}, []);
	//handleCreate Function for creating dogs
	const handleCreate = (newDog) => {
		fetch(url + '/dog/', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newDog),
		}).then((response) => getDogs());
	};

	//handleUpdate to update a dog when form is clicked
	const handleUpdate = (dog) => {
		fetch(url + '/dog/' + dog._id, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dog),
		}).then((response) => getDogs());
	};

	//selectDog which selects a dog
	const selectDog = (dog) => {
		setSelectedDog(dog);
	};

	//deleteDog function to delete a dog
	const deleteDog = (dog) => {
		fetch(url + '/dog/' + dog._id, {
			method: 'delete',
		}).then((response) => getDogs());
	};

	return (
		<div className='App'>
			<h1>DOG LISTING SITE</h1>
			<hr />
			<Link to='/create'>
				<button>Add Dog</button>
			</Link>
			<main>
				<Switch>
					<Route
						exact
						path='/'
						render={(rp) => (
							<Display {...rp} dogs={dogs} selectDog={selectDog} deleteDog={deleteDog} />
						)}
					/>
					<Route
						exact
						path='/create'
						render={(rp) => (
							<Form
								{...rp}
								label='create'
								dog={emptyDog}
								handleSubmit={handleCreate}
							/>
						)}
					/>
					<Route
						exact
						path='/edit'
						render={(rp) => (
							<Form
								{...rp}
								label='update'
								dog={selectedDog}
								handleSubmit={handleUpdate}
							/>
						)}
					/>
				</Switch>
			</main>
		</div>
	);
}

export default App;
