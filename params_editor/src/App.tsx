import { useState, Component } from 'react';

interface Param {
	id: number;
	name: string;
	type: string;
}

interface ParamValue {
	paramId: number;
	value: string;
}

interface Model {
	paramValues: ParamValue[];
	colors: Color[];
}

interface Color {
	id: number;
	name: string;
}

interface Props {
	params: Param[];
	model: Model;
	onModelChange: (model: Model) => void;
}

interface State {
	model: Model;
}

class ParamsEditor extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			model: props.model,
		};
	}

	handleParamChange = (paramId: number, value: string) => {
		const { model } = this.state;
		const { params } = this.props;

		const index = model.paramValues.findIndex(
			(param) => param.paramId === paramId
		);

		const newParamValues = [...model.paramValues];
		if (index !== -1) {
			newParamValues[index] = { paramId, value };
		} else {
			newParamValues.push({ paramId, value });
		}

		const newModel: Model = {
			...model,
			paramValues: newParamValues,
		};

		this.setState({ model: newModel });

		this.props.onModelChange(newModel);
	};

	render() {
		const { params } = this.props;
		const { model } = this.state;

		return (
			<div>
				{params.map((param) => (
					<div key={param.id}>
						<label htmlFor={`param-${param.id}`}>{param.name}:</label>
						<input
							type='text'
							id={`param-${param.id}`}
							value={
								model.paramValues.find((p) => p.paramId === param.id)?.value ||
								''
							}
							onChange={(e) => this.handleParamChange(param.id, e.target.value)}
						/>
					</div>
				))}
			</div>
		);
	}
}

function App() {
	// Пример данных для параметров
	const params = [
		{ id: 1, name: 'Назначение', type: 'string' },
		{ id: 2, name: 'Длина', type: 'string' },
	];

	// Пример модели товара
	const initialModel: Model = {
		paramValues: [
			{ paramId: 1, value: 'повседневное' },
			{ paramId: 2, value: 'макси' },
		],
		colors: [],
	};

	const [model, setModel] = useState(initialModel);

	const handleModelChange = (updatedModel: Model) => {
		setModel(updatedModel);
	};

	return (
		<div>
			<h1>Редактор параметров</h1>
			<ParamsEditor
				params={params}
				model={model}
				onModelChange={handleModelChange}
			/>
			<button onClick={() => console.log(model)}>Вывести параметры</button>
		</div>
	);
}

export default App;
