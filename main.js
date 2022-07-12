const CONSTS = {
	SERVER_URL: 'https://api.genderize.io',
}


function CreateTextElement() {
	return (
		<div className="text__hight">
			Genderize (react)
			<NameForm />
		</div>
	)
}


class NameForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: '', result: '', color: '#ada5a5', };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		if (this.state.value.length < 3) {
			this.setState({ result: 'Name is too short', color: 'red' })
		} else {
			this.requestGender();
		}
		event.preventDefault();
	}

	async requestGender() {
		let firstName = this.state.value;
		const url = `${CONSTS.SERVER_URL}?name=${firstName}`;
		let response = await fetch(url);
		let json = await response.json();

		firstName = firstName[0].toUpperCase() + firstName.slice(1);

		this.setState({ result: `${firstName} - ${json.gender}`,  color: '#ada5a5' })
	}

	render() {
		return (
			<div>
				<form className="countdown__form" onSubmit={this.handleSubmit}>
					<input className="countdown__input" type="text" placeholder="Enter the name" autoFocus required onChange={this.handleChange} />
					<button type="submit">Send</button>
				</form>
				<WarningMessage result={this.state.result} color={this.state.color} />
			</div>

		);
	}
}


function WarningMessage(props) {
	return (
		<div className="notion-callout">
			<p className="notion-text" style={{color: props.color}}>{props.result}</p>
		</div>
	)
}


ReactDOM.render(
	<CreateTextElement />,
	document.getElementById('container')
);