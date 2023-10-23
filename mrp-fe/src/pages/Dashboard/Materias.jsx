import InputSelect from '../../components/InputSelect/InputSelect';
import axios from 'axios';
import './materias.scss';
import { useEffect, useState } from 'react';
import Select from 'react-select';

const Materias = ({consultasS}) => {
	
	const [materias, setMaterias] = useState([]);
	const [materia, setMateria] = useState({});

	const getMaterias = async () => {
		try{
			let url = 'http://localhost:8090/materias'
			const response = await axios.get(url);
			if(response.status === 200){
				setMaterias(response.data);
			}
		}catch(err){
			console.error(err);
		}
	};

	const createMateriaOption = (materia) => {
		return {
			value: materia.id,
			label: materia.nombre
		}
	}

	useEffect(() => {
		getMaterias();
	}, []);

	return (
		<main className="layout-materias">
			<div className="materias-upper">
				<div className="materias-upper__title">
					<h2>Materias</h2>
				</div>
				<fieldset className="materias-upper__fieldset-select">
          <legend className="materias-upper__legend"> Buscar materia</legend>
					<InputSelect
            className="fieldset-select__input-select" 
            objects={materias}
            placeholder={"Seleccione una materia"}
            set={setMateria}
            createOption={createMateriaOption}
            />
        </fieldset>
			</div>
		</main>
	)
}

export default Materias;