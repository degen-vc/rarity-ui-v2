import {useState} from 'react';

const Input = ({label='', placeholder = '', defaultValue = '', setValue, validateOnBlur = '', validateOnChange = '',  className = ''}) => {
	const [state, setState] = useState(defaultValue);
	const [error, setError] = useState(false);

	const handleChange = (value) => {
		if (validateOnChange && (value && !validateOnChange(value))) return;
		if (error) setError('');
		setState(value);
	};

	const handleBlur = () => {
		let hasError = false;
		if (validateOnBlur) hasError = validateOnBlur(state);
		if (validateOnBlur && hasError) {
			setError(hasError);
		}
		setValue(state);
	};

	return (
		<div className={className}>
			{label && <p className={'text-megaxs text-black py-2 dark:text-white'}>{label}</p>}
			<input
				onChange={e => handleChange(e?.target?.value || '')}
				onBlur={handleBlur}
				className={'border-4 border-black dark:border-dark-100 bg-white dark:bg-dark-600 border-solid h-10 w-full text-xs px-2 focus:outline-none text-black dark:text-white'}
				placeholder={placeholder}
				value={state}
			/>
			{error && <p className={'text-megaxs text-tag-withdraw pt-2'}>{error}</p>}
		</div>
	);
};

export default Input;